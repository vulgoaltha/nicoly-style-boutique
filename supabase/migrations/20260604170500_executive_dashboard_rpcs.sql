-- Migration file para Dashboard Executivo
-- Funções RPC para otimizar chamadas de agregação do painel

-- 1. Métricas Financeiras Executivas
CREATE OR REPLACE FUNCTION get_executive_financial_metrics()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'today_revenue', COALESCE(SUM(total) FILTER (WHERE DATE(created_at) = CURRENT_DATE AND payment_status = 'paid'), 0),
    'week_revenue', COALESCE(SUM(total) FILTER (WHERE created_at >= date_trunc('week', CURRENT_DATE) AND payment_status = 'paid'), 0),
    'month_revenue', COALESCE(SUM(total) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE) AND payment_status = 'paid'), 0),
    'avg_ticket', COALESCE(SUM(total) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE) AND payment_status = 'paid') / NULLIF(COUNT(*) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE) AND payment_status = 'paid'), 0), 0),
    'max_order_month', COALESCE(MAX(total) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE) AND payment_status = 'paid'), 0),
    'min_order_month', COALESCE(MIN(total) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE) AND payment_status = 'paid'), 0),
    'predicted_revenue', COALESCE(SUM(total) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE) AND payment_status IN ('paid', 'pending')), 0)
  ) INTO result
  FROM orders
  WHERE status != 'cancelled';
  
  RETURN result;
END;
$$;

-- 2. Funil de Pedidos
CREATE OR REPLACE FUNCTION get_order_funnel()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'received', COUNT(*),
    'payment_pending', COUNT(*) FILTER (WHERE payment_status = 'pending'),
    'paid', COUNT(*) FILTER (WHERE payment_status = 'paid'),
    'processing', COUNT(*) FILTER (WHERE status = 'processing'),
    'shipped', COUNT(*) FILTER (WHERE status = 'shipped'),
    'delivered', COUNT(*) FILTER (WHERE status = 'delivered'),
    'cancelled', COUNT(*) FILTER (WHERE status = 'cancelled')
  ) INTO result
  FROM orders
  WHERE created_at >= date_trunc('month', CURRENT_DATE);
  
  RETURN result;
END;
$$;

-- 3. Insights de Clientes
CREATE OR REPLACE FUNCTION get_customer_insights()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  v_new_customers int;
  v_recurring_customers int;
  v_inactive_customers int;
  v_top_buyers json;
BEGIN
  -- Novos clientes no mes
  SELECT COUNT(DISTINCT customer_email) INTO v_new_customers
  FROM orders o1
  WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)
  AND NOT EXISTS (
    SELECT 1 FROM orders o2 WHERE o2.customer_email = o1.customer_email AND o2.created_at < DATE_TRUNC('month', CURRENT_DATE)
  );

  -- Clientes recorrentes (mais de 1 pedido na vida)
  SELECT COUNT(*) INTO v_recurring_customers
  FROM (
    SELECT customer_email FROM orders GROUP BY customer_email HAVING COUNT(*) > 1
  ) sub;

  -- Clientes inativos (> 90 dias sem compra)
  SELECT COUNT(*) INTO v_inactive_customers
  FROM (
    SELECT customer_email, MAX(created_at) as last_order
    FROM orders
    GROUP BY customer_email
    HAVING MAX(created_at) < CURRENT_DATE - INTERVAL '90 days'
  ) sub2;

  -- Top compradores
  SELECT json_agg(t) INTO v_top_buyers
  FROM (
    SELECT customer_name, customer_email, SUM(total) as lifetime_value, COUNT(*) as total_orders
    FROM orders
    WHERE payment_status = 'paid'
    GROUP BY customer_email, customer_name
    ORDER BY lifetime_value DESC
    LIMIT 10
  ) t;

  result := json_build_object(
    'new_customers_month', v_new_customers,
    'recurring_customers', v_recurring_customers,
    'inactive_customers', v_inactive_customers,
    'top_buyers', COALESCE(v_top_buyers, '[]'::json)
  );

  RETURN result;
END;
$$;

-- 4. Performance de Produtos
CREATE OR REPLACE FUNCTION get_product_performance(p_interval text DEFAULT 'month')
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  v_date_from timestamp;
BEGIN
  IF p_interval = 'today' THEN
    v_date_from := CURRENT_DATE;
  ELSIF p_interval = 'week' THEN
    v_date_from := date_trunc('week', CURRENT_DATE);
  ELSE
    v_date_from := date_trunc('month', CURRENT_DATE);
  END IF;

  SELECT json_agg(t) INTO result
  FROM (
    SELECT 
      oi.product_id, 
      oi.product_name, 
      oi.product_image,
      SUM(oi.quantity) as quantity_sold,
      SUM(oi.quantity * oi.unit_price) as revenue
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE o.created_at >= v_date_from AND o.payment_status = 'paid'
    GROUP BY oi.product_id, oi.product_name, oi.product_image
    ORDER BY quantity_sold DESC
    LIMIT 10
  ) t;

  RETURN COALESCE(result, '[]'::json);
END;
$$;
