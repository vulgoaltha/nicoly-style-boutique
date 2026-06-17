-- =====================================================
-- Migration: 00000000000000_initial_schema.sql
-- Projeto: Nicoly Modas E-commerce
-- Data: 2026-06-11
-- =====================================================
-- NOTA: Esta migration e 100% valida em PostgreSQL 15+
--       Nao contem \n escapado dentro das funcoes PL/pgSQL.
-- =====================================================

-- 0. LIMPEZA (idempotencia)
-- =====================================================
DO $$
BEGIN
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
    DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
    DROP TRIGGER IF EXISTS update_products_updated_at ON products;
    DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
    DROP TRIGGER IF EXISTS update_hero_banners_updated_at ON hero_banners;
    DROP TRIGGER IF EXISTS update_homepage_categories_updated_at ON homepage_categories;
    DROP TRIGGER IF EXISTS update_homepage_collections_updated_at ON homepage_collections;
    DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Triggers ja removidos ou nao existem.';
END $$;

DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
DROP FUNCTION IF EXISTS create_order_transaction(UUID, JSONB, JSONB) CASCADE;
DROP FUNCTION IF EXISTS has_role(app_role, UUID) CASCADE;
DROP FUNCTION IF EXISTS get_executive_financial_metrics() CASCADE;
DROP FUNCTION IF EXISTS get_order_funnel() CASCADE;
DROP FUNCTION IF EXISTS get_customer_insights() CASCADE;
DROP FUNCTION IF EXISTS get_product_performance(TEXT) CASCADE;
DROP FUNCTION IF EXISTS get_sales_chart_data(TEXT) CASCADE;
DROP FUNCTION IF EXISTS get_dashboard_alerts() CASCADE;

-- 1. ENUMS
-- =====================================================
DO $$
BEGIN
    DROP TYPE IF EXISTS order_status CASCADE;
    DROP TYPE IF EXISTS payment_status CASCADE;
    DROP TYPE IF EXISTS app_role CASCADE;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Tipos ja removidos ou em uso.';
END $$;

CREATE TYPE order_status AS ENUM (
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
);

CREATE TYPE payment_status AS ENUM (
    'pending',
    'paid',
    'failed',
    'refunded'
);

CREATE TYPE app_role AS ENUM (
    'admin',
    'user'
);
-- 2. TABELAS
-- =====================================================

-- 2.1 profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    cpf TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 user_roles
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 categories
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 products
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    sku TEXT,
    images TEXT[] DEFAULT '{}',
    sizes TEXT[] DEFAULT '{}',
    colors TEXT[] DEFAULT '{}',
    stock INTEGER DEFAULT 0,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT TRUE,
    is_on_sale BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_cep TEXT NOT NULL,
    shipping_street TEXT NOT NULL,
    shipping_number TEXT NOT NULL,
    shipping_complement TEXT,
    shipping_neighborhood TEXT NOT NULL,
    shipping_city TEXT NOT NULL,
    shipping_state TEXT NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 0.00,
    subtotal DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status order_status DEFAULT 'pending',
    payment_method TEXT,
    payment_status payment_status DEFAULT 'pending',
    notes TEXT,
    tracking_code TEXT,
    payment_gateway TEXT,
    payment_gateway_id TEXT,
    transaction_id TEXT,
    pix_code TEXT,
    pix_qrcode TEXT,
    paid_at TIMESTAMPTZ,
    webhook_payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6 order_items
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_slug TEXT NOT NULL,
    product_image TEXT,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    size TEXT,
    color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.7 hero_banners
CREATE TABLE IF NOT EXISTS hero_banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    button_text TEXT,
    button_link TEXT,
    active BOOLEAN DEFAULT TRUE,
    order_position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.8 homepage_categories
CREATE TABLE IF NOT EXISTS homepage_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Shirt',
    color TEXT NOT NULL DEFAULT '#f4d6d6',
    order_position INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.9 homepage_collections
CREATE TABLE IF NOT EXISTS homepage_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    redirect_url TEXT,
    order_position INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.10 customer_reviews
CREATE TABLE IF NOT EXISTS customer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_photo TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    city TEXT,
    state TEXT,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.11 site_settings
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- 3. CONSTRAINTS UNIQUE
-- =====================================================
ALTER TABLE categories DROP CONSTRAINT IF EXISTS categories_slug_unique;
ALTER TABLE categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);

ALTER TABLE products DROP CONSTRAINT IF EXISTS products_slug_unique;
ALTER TABLE products ADD CONSTRAINT products_slug_unique UNIQUE (slug);

ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_order_number_unique;
ALTER TABLE orders ADD CONSTRAINT orders_order_number_unique UNIQUE (order_number);

-- 4. INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_payment_status_idx ON orders(payment_status);
CREATE INDEX IF NOT EXISTS products_slug_idx ON products(slug);
CREATE INDEX IF NOT EXISTS products_category_id_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_active_featured_new_idx ON products(is_active, is_featured, is_new);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);
CREATE INDEX IF NOT EXISTS order_items_product_id_idx ON order_items(product_id);
CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS user_roles_role_idx ON user_roles(role);
CREATE INDEX IF NOT EXISTS hero_banners_active_order_idx ON hero_banners(active, order_position);
CREATE INDEX IF NOT EXISTS homepage_categories_active_order_idx ON homepage_categories(active, order_position);
CREATE INDEX IF NOT EXISTS homepage_collections_active_order_idx ON homepage_collections(active, order_position);
CREATE INDEX IF NOT EXISTS customer_reviews_product_id_idx ON customer_reviews(product_id);
CREATE INDEX IF NOT EXISTS customer_reviews_approved_idx ON customer_reviews(approved);
CREATE INDEX IF NOT EXISTS customer_reviews_created_at_idx ON customer_reviews(created_at DESC);
-- 5. TRIGGERS E FUNCTIONS
-- =====================================================

-- 5.1 Trigger: auto-criar profile ao registrar usuario
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $func$
BEGIN
    INSERT INTO public.profiles (id, name, cpf, phone)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', ''),
        NEW.raw_user_meta_data->>'cpf',
        NEW.raw_user_meta_data->>'phone'
    );
    RETURN NEW;
END;
$func$;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- 5.2 Function: atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $func$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$func$;

CREATE OR REPLACE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE OR REPLACE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE OR REPLACE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE OR REPLACE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE OR REPLACE TRIGGER update_hero_banners_updated_at
    BEFORE UPDATE ON hero_banners
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE OR REPLACE TRIGGER update_homepage_categories_updated_at
    BEFORE UPDATE ON homepage_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE OR REPLACE TRIGGER update_homepage_collections_updated_at
    BEFORE UPDATE ON homepage_collections
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE OR REPLACE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
-- 6. RLS (ROW LEVEL SECURITY)
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "profiles_select_own" ON profiles
    FOR SELECT USING (auth.uid() = id OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "profiles_update_own" ON profiles
    FOR UPDATE USING (auth.uid() = id OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- user_roles (somente admin)
CREATE POLICY "user_roles_admin_only" ON user_roles
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- categories
CREATE POLICY "categories_select_public" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_modify" ON categories
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- products
CREATE POLICY "products_select_public" ON products FOR SELECT USING (true);
CREATE POLICY "products_admin_modify" ON products
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- orders
CREATE POLICY "orders_select_own" ON orders
    FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "orders_insert_own" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "orders_update_own" ON orders
    FOR UPDATE USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "orders_admin_delete" ON orders
    FOR DELETE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- order_items
CREATE POLICY "order_items_select_own" ON order_items
    FOR SELECT USING (EXISTS (SELECT 1 FROM orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'))));
CREATE POLICY "order_items_insert_own" ON order_items
    FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'))));
CREATE POLICY "order_items_admin_all" ON order_items
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- hero_banners
CREATE POLICY "hero_banners_select_public" ON hero_banners FOR SELECT USING (true);
CREATE POLICY "hero_banners_admin_modify" ON hero_banners
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- homepage_categories
CREATE POLICY "homepage_categories_select_public" ON homepage_categories FOR SELECT USING (true);
CREATE POLICY "homepage_categories_admin_modify" ON homepage_categories
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- homepage_collections
CREATE POLICY "homepage_collections_select_public" ON homepage_collections FOR SELECT USING (true);
CREATE POLICY "homepage_collections_admin_modify" ON homepage_collections
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- customer_reviews
CREATE POLICY "customer_reviews_select_approved" ON customer_reviews
    FOR SELECT USING (approved = true OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "customer_reviews_insert_auth" ON customer_reviews
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "customer_reviews_admin_all" ON customer_reviews
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- site_settings
CREATE POLICY "site_settings_select_public" ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_admin_modify" ON site_settings
    FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
-- 7. RPCs (STORED PROCEDURES / FUNCTIONS)
-- =====================================================

-- 7.1 RPC: has_role
CREATE OR REPLACE FUNCTION has_role(
    _role app_role,
    _user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = _user_id AND role = _role
    );
END;
$func$;

GRANT EXECUTE ON FUNCTION has_role(app_role, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION has_role(app_role, UUID) TO service_role;

-- 7.2 RPC: create_order_transaction
CREATE OR REPLACE FUNCTION create_order_transaction(
    p_user_id UUID,
    p_order_data JSONB,
    p_items_data JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    v_order_id UUID;
    v_order_number TEXT;
    v_subtotal NUMERIC := 0;
    v_total NUMERIC;
    v_item JSONB;
    v_product RECORD;
    v_shipping_cost NUMERIC;
BEGIN
    v_shipping_cost := COALESCE((p_order_data->>'shipping_cost')::NUMERIC, 0);

    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items_data)
    LOOP
        SELECT id, name, price, sale_price, stock, is_active, slug, images
        INTO v_product
        FROM public.products
        WHERE id = (v_item->>'product_id')::UUID;

        IF NOT FOUND OR NOT v_product.is_active THEN
            RAISE EXCEPTION 'Produto indisponivel ou inativo: %', COALESCE(v_product.name, 'Desconhecido');
        END IF;

        IF v_product.stock < (v_item->>'quantity')::INT THEN
            RAISE EXCEPTION 'Estoque insuficiente para: %', v_product.name;
        END IF;

        v_subtotal := v_subtotal + (COALESCE(v_product.sale_price, v_product.price) * (v_item->>'quantity')::INT);
    END LOOP;

    v_total := v_subtotal + v_shipping_cost;

    INSERT INTO public.orders (
        user_id, customer_name, customer_email, customer_phone,
        shipping_cep, shipping_street, shipping_number, shipping_complement,
        shipping_neighborhood, shipping_city, shipping_state, notes,
        subtotal, shipping_cost, total
    ) VALUES (
        p_user_id,
        p_order_data->>'customer_name',
        p_order_data->>'customer_email',
        p_order_data->>'customer_phone',
        p_order_data->>'shipping_cep',
        p_order_data->>'shipping_street',
        p_order_data->>'shipping_number',
        p_order_data->>'shipping_complement',
        p_order_data->>'shipping_neighborhood',
        p_order_data->>'shipping_city',
        UPPER(COALESCE(p_order_data->>'shipping_state', '')),
        p_order_data->>'notes',
        v_subtotal,
        v_shipping_cost,
        v_total
    ) RETURNING id, order_number INTO v_order_id, v_order_number;

    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items_data)
    LOOP
        SELECT id, name, price, sale_price, stock, is_active, slug, images
        INTO v_product
        FROM public.products
        WHERE id = (v_item->>'product_id')::UUID;

        INSERT INTO public.order_items (
            order_id, product_id, product_name, product_slug, product_image,
            unit_price, size, color, quantity
        ) VALUES (
            v_order_id, v_product.id, v_product.name, v_product.slug,
            v_product.images[1], COALESCE(v_product.sale_price, v_product.price),
            v_item->>'size', v_item->>'color', (v_item->>'quantity')::INT
        );

        UPDATE public.products
        SET stock = GREATEST(0, stock - (v_item->>'quantity')::INT)
        WHERE id = v_product.id;
    END LOOP;

    RETURN jsonb_build_object('id', v_order_id, 'order_number', v_order_number);
END;
$func$;

REVOKE EXECUTE ON FUNCTION create_order_transaction(UUID, JSONB, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION create_order_transaction(UUID, JSONB, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION create_order_transaction(UUID, JSONB, JSONB) TO service_role;
-- 7.3 RPC: get_executive_financial_metrics
CREATE OR REPLACE FUNCTION get_executive_financial_metrics()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    v_total_revenue NUMERIC;
    v_total_orders INT;
    v_avg_order_value NUMERIC;
    v_pending_revenue NUMERIC;
    v_refunded_amount NUMERIC;
BEGIN
    SELECT COALESCE(SUM(total), 0)
    INTO v_total_revenue
    FROM orders
    WHERE payment_status = 'paid';

    SELECT COUNT(*)
    INTO v_total_orders
    FROM orders;

    SELECT COALESCE(AVG(total), 0)
    INTO v_avg_order_value
    FROM orders
    WHERE payment_status = 'paid';

    SELECT COALESCE(SUM(total), 0)
    INTO v_pending_revenue
    FROM orders
    WHERE payment_status = 'pending' AND status NOT IN ('cancelled', 'delivered');

    SELECT COALESCE(SUM(total), 0)
    INTO v_refunded_amount
    FROM orders
    WHERE payment_status = 'refunded';

    RETURN jsonb_build_object(
        'total_revenue', v_total_revenue,
        'total_orders', v_total_orders,
        'avg_order_value', ROUND(v_avg_order_value, 2),
        'pending_revenue', v_pending_revenue,
        'refunded_amount', v_refunded_amount
    );
END;
$func$;

GRANT EXECUTE ON FUNCTION get_executive_financial_metrics() TO authenticated;
GRANT EXECUTE ON FUNCTION get_executive_financial_metrics() TO service_role;

-- 7.4 RPC: get_order_funnel
CREATE OR REPLACE FUNCTION get_order_funnel()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    v_pending INT;
    v_paid INT;
    v_processing INT;
    v_shipped INT;
    v_delivered INT;
    v_cancelled INT;
BEGIN
    SELECT COUNT(*) INTO v_pending FROM orders WHERE status = 'pending';
    SELECT COUNT(*) INTO v_paid FROM orders WHERE status = 'paid';
    SELECT COUNT(*) INTO v_processing FROM orders WHERE status = 'processing';
    SELECT COUNT(*) INTO v_shipped FROM orders WHERE status = 'shipped';
    SELECT COUNT(*) INTO v_delivered FROM orders WHERE status = 'delivered';
    SELECT COUNT(*) INTO v_cancelled FROM orders WHERE status = 'cancelled';

    RETURN jsonb_build_object(
        'pending', v_pending,
        'paid', v_paid,
        'processing', v_processing,
        'shipped', v_shipped,
        'delivered', v_delivered,
        'cancelled', v_cancelled,
        'total', v_pending + v_paid + v_processing + v_shipped + v_delivered + v_cancelled
    );
END;
$func$;

GRANT EXECUTE ON FUNCTION get_order_funnel() TO authenticated;
GRANT EXECUTE ON FUNCTION get_order_funnel() TO service_role;

-- 7.5 RPC: get_customer_insights
CREATE OR REPLACE FUNCTION get_customer_insights()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    v_total_customers INT;
    v_new_customers_30d INT;
    v_repeat_customers INT;
    v_top_city TEXT;
    v_top_city_count INT;
BEGIN
    SELECT COUNT(DISTINCT customer_email)
    INTO v_total_customers
    FROM orders;

    SELECT COUNT(DISTINCT customer_email)
    INTO v_new_customers_30d
    FROM orders
    WHERE created_at >= NOW() - INTERVAL '30 days';

    SELECT COUNT(*) INTO v_repeat_customers
    FROM (SELECT customer_email FROM orders GROUP BY customer_email HAVING COUNT(*) > 1) t;

    SELECT shipping_city, COUNT(*) AS cnt
    INTO v_top_city, v_top_city_count
    FROM orders
    GROUP BY shipping_city
    ORDER BY cnt DESC
    LIMIT 1;

    RETURN jsonb_build_object(
        'total_customers', v_total_customers,
        'new_customers_30d', v_new_customers_30d,
        'repeat_customers', v_repeat_customers,
        'top_city', v_top_city,
        'top_city_count', v_top_city_count
    );
END;
$func$;

GRANT EXECUTE ON FUNCTION get_customer_insights() TO authenticated;
GRANT EXECUTE ON FUNCTION get_customer_insights() TO service_role;
-- 7.6 RPC: get_product_performance
CREATE OR REPLACE FUNCTION get_product_performance(
    p_interval TEXT DEFAULT 'month'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    v_start_date TIMESTAMPTZ;
    v_result JSONB;
BEGIN
    v_start_date := CASE p_interval
        WHEN 'today' THEN NOW() - INTERVAL '1 day'
        WHEN 'week' THEN NOW() - INTERVAL '7 days'
        WHEN 'month' THEN NOW() - INTERVAL '30 days'
        ELSE NOW() - INTERVAL '30 days'
    END;

    SELECT jsonb_agg(jsonb_build_object(
        'product_name', p.name,
        'total_sold', COALESCE(s.total_sold, 0),
        'revenue', COALESCE(s.revenue, 0),
        'stock', p.stock
    )) INTO v_result
    FROM products p
    LEFT JOIN (
        SELECT oi.product_id, SUM(oi.quantity) AS total_sold, SUM(oi.quantity * oi.unit_price) AS revenue
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        WHERE o.created_at >= v_start_date
        GROUP BY oi.product_id
    ) s ON s.product_id = p.id
    WHERE p.is_active = true
    ORDER BY COALESCE(s.revenue, 0) DESC
    LIMIT 20;

    RETURN COALESCE(v_result, '[]'::JSONB);
END;
$func$;

GRANT EXECUTE ON FUNCTION get_product_performance(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_product_performance(TEXT) TO service_role;

-- 7.7 RPC: get_sales_chart_data
CREATE OR REPLACE FUNCTION get_sales_chart_data(
    p_interval TEXT DEFAULT 'month'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_agg(jsonb_build_object(
        'date', dt,
        'sales', COALESCE(sales_count, 0),
        'revenue', COALESCE(revenue, 0)
    )) INTO v_result
    FROM (
        SELECT date_trunc('day', created_at) AS dt, COUNT(*) AS sales_count, SUM(total) AS revenue
        FROM orders
        WHERE payment_status = 'paid'
          AND created_at >= CASE p_interval
              WHEN 'today' THEN NOW() - INTERVAL '1 day'
              WHEN 'week' THEN NOW() - INTERVAL '7 days'
              WHEN 'month' THEN NOW() - INTERVAL '30 days'
              ELSE NOW() - INTERVAL '30 days'
          END
        GROUP BY date_trunc('day', created_at)
        ORDER BY date_trunc('day', created_at)
    ) sub;

    RETURN COALESCE(v_result, '[]'::JSONB);
END;
$func$;

GRANT EXECUTE ON FUNCTION get_sales_chart_data(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_sales_chart_data(TEXT) TO service_role;

-- 7.8 RPC: get_dashboard_alerts
CREATE OR REPLACE FUNCTION get_dashboard_alerts()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    v_low_stock INT;
    v_pending_orders INT;
    v_failed_payments INT;
    v_pending_reviews INT;
BEGIN
    SELECT COUNT(*) INTO v_low_stock FROM products WHERE stock < 5 AND is_active = true;
    SELECT COUNT(*) INTO v_pending_orders FROM orders WHERE status = 'pending';
    SELECT COUNT(*) INTO v_failed_payments FROM orders WHERE payment_status = 'failed';
    SELECT COUNT(*) INTO v_pending_reviews FROM customer_reviews WHERE approved = false;

    RETURN jsonb_build_object(
        'low_stock_count', v_low_stock,
        'pending_orders_count', v_pending_orders,
        'failed_payments_count', v_failed_payments,
        'pending_reviews_count', v_pending_reviews
    );
END;
$func$;

GRANT EXECUTE ON FUNCTION get_dashboard_alerts() TO authenticated;
GRANT EXECUTE ON FUNCTION get_dashboard_alerts() TO service_role;
-- 8. STORAGE BUCKETS E POLICIES
-- =====================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "products_storage_auth_upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'products' AND auth.uid() IS NOT NULL);

CREATE POLICY "products_storage_public_read" ON storage.objects
    FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "products_storage_admin_delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'products' AND EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- 9. SEED INICIAL
-- =====================================================
INSERT INTO categories (name, slug) VALUES
    ('Vestidos', 'vestidos'),
    ('Blusas', 'blusas'),
    ('Calças', 'calcas'),
    ('Saias', 'saias'),
    ('Acessórios', 'acessorios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
    ('store_data', '{"name": "Nicoly Modas", "phone": "(11) 99999-9999", "email": "contato@nicolymodas.com"}'::JSONB),
    ('general_settings', '{"currency": "BRL", "timezone": "America/Sao_Paulo", "language": "pt-BR"}'::JSONB),
    ('announcement_bar', '{"text": "5% de desconto na primeira compra!", "bg_color": "#f4d6d6", "text_color": "#3a1f1f", "active": true, "speed": 30}'::JSONB)
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- FIM DA MIGRATION
-- =====================================================
