-- =====================================================
-- Seed: seed.sql
-- Dados iniciais para teste/desenvolvimento
-- =====================================================

-- Categorias
INSERT INTO categories (name, slug) VALUES
  ('Vestidos', 'vestidos'),
  ('Blusas', 'blusas'),
  ('Calças', 'calcas'),
  ('Saias', 'saias'),
  ('Acessórios', 'acessorios');

-- Produtos (exemplo)
INSERT INTO products (name, slug, description, price, sale_price, stock, sizes, colors, images, is_active, is_new, is_featured, is_on_sale) VALUES
  ('Vestido Floral Verão', 'vestido-floral-verao', 'Vestido leve com estampa floral ideal para o verão.', 129.90, 99.90, 15, ARRAY['P','M','G'], ARRAY['R蔡色','Azul'], ARRAY['https://placehold.co/800x800?text=Vestido+Floral'], true, true, true, true),
  ('Blusa de Seda', 'blusa-de-seda', 'Blusa elegante de seda pura.', 89.90, null, 20, ARRAY['P','M','G'], ARRAY['Preto','Branco'], ARRAY['https://placehold.co/800x800?text=Blusa+Seda'], true, true, false, false),
  ('Calça Jeans Skinny', 'calca-jeans-skinny', 'Calça jeans com modelagem skinny moderna.', 149.90, null, 10, ARRAY['P','M','G'], ARRAY['Azul'], ARRAY['https://placehold.co/800x800?text=Calca+Jeans'], true, false, false, false);

-- Homepage Categories
INSERT INTO homepage_categories (title, slug, icon, color, order_position, active) VALUES
  ('Vestidos', 'vestidos', 'Dress', '#FF69B4', 1, true),
  ('Blusas', 'blusas', 'Shirt', '#87CEEB', 2, true),
  ('Calças', 'calcas', 'Pants', '#90EE90', 3, true),
  ('Saias', 'saias', 'Skirt', '#DDA0DD', 4, true),
  ('Acessórios', 'acessorios', 'Bag', '#F0E68C', 5, true);

-- Hero Banners
INSERT INTO hero_banners (title, subtitle, image_url, button_text, button_link, active, order_position) VALUES
  ('Nova Coleção Outono', 'Descubra as tendências da estação', 'https://placehold.co/1920x600?text=Nova+Colecao', 'Ver Agora', '/loja', true, 1),
  ('Frete Grátis', 'Em compras acima de R$ 200,00', 'https://placehold.co/1920x600?text=Frete+Gratis', 'Aproveitar', '/loja', true, 2);

-- Site Settings
INSERT INTO site_settings (key, value) VALUES
  ('store_data', '{"name": "Nicoly Modas", "phone": "(11) 99999-9999", "email": "contato@nicolymodas.com"}'::jsonb),
  ('general_settings', '{"currency": "BRL", "language": "pt-BR"}'::jsonb);
