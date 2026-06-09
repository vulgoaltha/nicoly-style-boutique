-- Migration for Performance Indices Otimizações de Banco de Dados Nicoly Modas

-- 1. Tabela products
CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products (active);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products (category_id);

-- 2. Tabela orders
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders (customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- 3. Tabela order_items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items (product_id);

-- 4. Tabela customer_reviews
CREATE INDEX IF NOT EXISTS idx_customer_reviews_product_id ON customer_reviews (product_id);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_active ON customer_reviews (active);

-- 5. Tabela profiles
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles (id);
