-- Migration file 2 para Dashboard Executivo
-- Funções RPC para gráficos e central de alertas

-- 1. Dados para Gráfico de Vendas
CREATE OR REPLACE FUNCTION get_sales_chart_data(p_interval text DEFAULT 'month')
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  v_date_from timestamp;
BEGIN
  IF p_interval = 'today' THEN
    v_date_from := date_trunc('day', CURRENT_DATE);
    SELECT json_agg(t) INTO result
    FROM (
      SELECT 
        to_char(created_at, 'HH24:00') as label,
        SUM(total) as revenue,
        COUNT(*) as orders
      FROM orders
      WHERE created_at >= v_date_from AND payment_status = 'paid'
      GROUP BY to_char(created_at, 'HH24:00')
      ORDER BY label ASC
    ) t;
  ELSIF p_interval = 'week' THEN
    v_date_from := date_trunc('week', CURRENT_DATE);
    SELECT json_agg(t) INTO result
    FROM (
      SELECT 
        to_char(created_at, 'Day') as label,
        SUM(total) as revenue,
        COUNT(*) as orders
      FROM orders
      WHERE created_at >= v_date_from AND payment_status = 'paid'
      GROUP BY date_trunc('day', created_at), to_char(created_at, 'Day')
      ORDER BY date_trunc('day', created_at) ASC
    ) t;
  ELSE
    v_date_from := date_trunc('month', CURRENT_DATE);
    SELECT json_agg(t) INTO result
    FROM (
      SELECT 
        to_char(created_at, 'DD/MM') as label,
        SUM(total) as revenue,
        COUNT(*) as orders
      FROM orders
      WHERE created_at >= v_date_from AND payment_status = 'paid'
      GROUP BY date_trunc('day', created_at), to_char(created_at, 'DD/MM')
      ORDER BY date_trunc('day', created_at) ASC
    ) t;
  END IF;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

-- 2. Alertas do Dashboard
CREATE OR REPLACE FUNCTION get_dashboard_alerts()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  v_low_stock json;
  v_pending_payments int;
  v_delayed_orders int;
BEGIN
  -- Estoque baixo
  SELECT json_agg(t) INTO v_low_stock
  FROM (
    SELECT id, name, stock, slug FROM products WHERE stock <= 5 AND is_active = true ORDER BY stock ASC LIMIT 10
  ) t;

  -- Pagamentos pendentes
  SELECT COUNT(*) INTO v_pending_payments
  FROM orders WHERE payment_status = 'pending' AND status != 'cancelled';

  -- Pedidos atrasados (pagos há mais de 3 dias e não enviados)
  SELECT COUNT(*) INTO v_delayed_orders
  FROM orders WHERE payment_status = 'paid' AND status IN ('paid', 'processing') AND created_at < CURRENT_DATE - INTERVAL '3 days';

  result := json_build_object(
    'low_stock', COALESCE(v_low_stock, '[]'::json),
    'pending_payments', v_pending_payments,
    'delayed_orders', v_delayed_orders
  );

  RETURN result;
END;
$$;
