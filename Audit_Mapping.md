# MAPEAMENTO COMPLETO - Nicoly Modas Frontend

## 1. TABELAS ENCONTRADAS

### profiles
- Origem (Arquivo): `src/routes/minha-conta.pedidos.tsx`, `src/hooks/use-auth.ts`
- Campos Usados: `id`, `name`, `cpf`, `phone`, `created_at`, `updated_at`
- Operacoes: SELECT
- Nota: Busca de perfil do usuário logado via `.eq("id", user!.id)`.

### orders
- Origem (Arquivo):
  - `src/routes/minha-conta.pedidos.tsx`
  - `src/routes/checkout.pagamento.$orderId.tsx`
  - `src/routes/pedido.$id.tsx`
  - `src/routes/admin.pedidos.tsx`
  - `src/routes/admin.pedidos.$id.tsx`
  - `src/lib/orders.functions.ts`
  - `src/lib/payment.functions.ts`
  - `src/lib/webhook.functions.ts`
  - `src/routes/api.mercadopago.webhook.ts`
  - `src/components/admin/dashboard/useDashboardRealtime.ts`
  - `src/lib/checkout.ts`
- Campos Usados: `id`, `order_number`, `status`, `total`, `created_at`, `updated_at`, `customer_name`, `customer_email`, `customer_phone`, `shipping_cep`, `shipping_street`, `shipping_number`, `shipping_complement`, `shipping_neighborhood`, `shipping_city`, `shipping_state`, `shipping_cost`, `notes`, `subtotal`, `payment_status`, `payment_gateway`, `payment_gateway_id`, `transaction_id`, `pix_code`, `pix_qrcode`, `paid_at`, `webhook_payload`, `payment_method`
- Operacoes: SELECT, INSERT, UPDATE, DELETE
- Nota:
  - `checkout.tsx` insere (INSERT) o pedido principal via server functions.
  - `payment.functions.ts` atualiza dados de pagamento (UPDATE) na tabela.
  - Webhook atualiza o status do pagamento e adiciona payload (UPDATE).

### order_items
- Origem (Arquivo):
  - `src/routes/pedido.$id.tsx`
  - `src/routes/admin.pedidos.$id.tsx`
  - `src/lib/orders.functions.ts`
- Campos Usados: `id`, `order_id`, `product_id`, `product_name`, `product_slug`, `product_image`, `quantity`, `unit_price`, `size`, `color`
- Operacoes: SELECT, INSERT
- Nota: Inseridos (INSERT) junto com o pedido via server function.

### products
- Origem (Arquivo):
  - `src/routes/produto.$slug.tsx`
  - `src/routes/admin.produtos.index.tsx`
  - `src/routes/admin.produtos.$id.tsx`
  - `src/components/admin/ProductForm.tsx`
  - `src/routes/loja.tsx`
  - `src/routes/index.tsx`
  - `src/components/site/CollectionCards.tsx`
  - `src/hooks/useProductPerformance.ts`
- Campos Usados: `id`, `name`, `slug`, `price`, `sale_price`, `stock`, `sku`, `description`, `sizes`, `colors`, `images`, `is_new`, `is_featured`, `is_on_sale`, `is_active`, `category_id`, `created_at`, `updated_at`
- Operacoes: SELECT, INSERT, UPDATE, DELETE
- Nota: O `ProductForm.tsx` trata o CRUD completo de produtos para o admin.

### categories
- Origem (Arquivo): `src/routes/loja.tsx`, `src/components/admin/ProductForm.tsx`, `src/routes/admin.categorias-home.tsx`
- Campos Usados: `id`, `name`, `slug`, `order_position`, `active`
- Operacoes: SELECT

### homepage_categories
- Origem (Arquivo):
  - `src/routes/admin.categorias-home.tsx`
  - `src/components/site/CategoriesCarousel.tsx`
- Campos Usados: `id`, `title`, `icon`, `color`, `slug`, `order_position`, `active`
- Operacoes: SELECT, INSERT, UPDATE, DELETE

### homepage_collections
- Origem (Arquivo):
  - `src/routes/admin.colecoes.tsx`
  - `src/components/site/CollectionCards.tsx`
- Campos Usados: `id`, `title`, `subtitle`, `image_url`, `redirect_url`, `order_position`, `active`
- Operacoes: SELECT, INSERT, UPDATE, DELETE

### hero_banners
- Origem (Arquivo):
  - `src/routes/admin.banners.tsx`
  - `src/components/site/HeroCarousel.tsx`
- Campos Usados: `id`, `title`, `subtitle`, `image_url`, `button_text`, `button_link`, `active`, `order_position`
- Operacoes: SELECT, INSERT, UPDATE, DELETE

### customer_reviews
- Origem (Arquivo):
  - `src/routes/admin.avaliacoes.tsx`
  - `src/components/site/CustomerReviewsCarousel.tsx`
- Campos Usados: `id`, `order_id`, `product_id`, `customer_name`, `customer_photo`, `rating`, `comment`, `city`, `state`, `approved`, `created_at`
- Operacoes: SELECT, INSERT, UPDATE, DELETE
- Nota: Usa FK para `products` (`review.product.name`, `review.product.images`) via join.

### user_roles
- Origem (Arquivo): `src/hooks/use-auth.ts`
- Campos Usados: `user_id`, `role`
- Operacoes: SELECT
- Nota: Verificacão de permissão de admin: `.eq("user_id", ...).eq("role", "admin")`.

### promo_banners
- Origem (Arquivo): `src/routes/admin.anuncio.tsx`
- Campos Usados: `id`, `title`, `message`, `active`, `link_url`
- Operacoes: SELECT, INSERT, UPDATE, DELETE

### site_settings
- Origem (Arquivo):
  - `src/routes/admin.configuracoes.tsx`
  - `src/hooks/use-site-settings.ts`
  - `src/components/site/AnnouncementMarquee.tsx`
- Campos Usados: `key`, `value`
- Operacoes: SELECT, INSERT (Upsert)

---

## 2. RPCs / Functions Encontradas

| Nome | Arquivos | Parametros | Retorno |
|---|---|---|---|
| `create_order_transaction` | `src/lib/orders.functions.ts` | `p_user_id`, `p_order_data`, `p_items_data` | `id`, `order_number` |
| `get_executive_financial_metrics` | `src/hooks/useDashboardData.ts` | - | Financial metrics object |
| `get_order_funnel` | `src/hooks/useDashboardData.ts` | - | Order funnel object |
| `get_customer_insights` | `src/hooks/useDashboardData.ts` | - | Customer insights object |
| `get_product_performance` | `src/hooks/useDashboardData.ts` | `p_interval` (today/week/month) | Array of product performance objects |
| `get_sales_chart_data` | `src/hooks/useDashboardData.ts` | `p_interval` (today/week/month) | Sales chart data object |
| `get_dashboard_alerts` | `src/hooks/useDashboardData.ts` | - | Alerts object (low_stock, pending_payments, delayed_orders) |

---

## 3. Buckets Storage

| Nome | Arquivos | Operacao |
|---|---|---|
| `products` (bucket) | `src/components/admin/ProductForm.tsx`, `src/lib/upload.ts` | UPLOAD, GET_PUBLIC_URL |

---

## 4. Auth Metodos

| Metodo | Arquivo | Uso |
|---|---|---|
| `supabase.auth.signUp` | `src/routes/login.tsx` | Cadastro de novo usuário |
| `supabase.auth.signInWithPassword` | `src/routes/login.tsx` | Login com email/senha |
| `supabase.auth.signOut` | `src/routes/minha-conta.pedidos.tsx`, `src/routes/admin.tsx` | Logout do usuário |
| `supabase.auth.onAuthStateChange` | `src/hooks/use-auth.ts` | Listener de mudança de estado de autenticação |
| `supabase.auth.getSession` | `src/hooks/use-auth.ts` | Recupera sessão ativa ao montar componente |
| `supabase.auth.resetPasswordForEmail` | `src/routes/recuperar-senha.tsx` | Solicita email de recuperação de senha |
| `supabase.auth.updateUser` | `src/routes/atualizar-senha.tsx` | Atualiza senha do usuário logado |
| `supabase.auth.exchangeCodeForSession` | `src/routes/auth.callback.tsx` | Troca code por sessão após email de confirmação |

---

## 5. Relacionamentos Identificados

| Entidade Principal | Entidade Relacionada | Tipo de Relacao | Campo Chave Estrangeira | Origem |
|---|---|---|---|---|
| `orders` | `profiles` | N:1 | `user_id` -> `profiles.id` | `src/lib/orders.functions.ts` (indirect), `src/hooks/use-auth.ts` |
| `orders` | `order_items` | 1:N | `id` -> `order_items.order_id` | `src/routes/pedido.$id.tsx`, `src/routes/admin.pedidos.$id.tsx` |
| `orders` | `products` | N:1 (via `order_items`) | `order_items.product_id` -> `products.id` | `src/routes/pedido.$id.tsx` (product info in items) |
| `products` | `categories` | N:1 | `category_id` -> `categories.id` | `src/routes/loja.tsx`, `src/components/admin/ProductForm.tsx` |
| `customer_reviews` | `products` | N:1 | `product_id` -> `products.id` | `src/routes/admin.avaliacoes.tsx`, `src/components/site/CustomerReviewsCarousel.tsx` |
| `customer_reviews` | `orders` | N:1 | `order_id` -> `orders.id` | `src/lib/types.ts` |
| `profiles` | `users` (Supabase Auth) | 1:1 | `id` -> `users.id` | `src/integrations/supabase/types.ts` |
| `user_roles` | `users` (Supabase Auth) | N:1 | `user_id` -> `users.id` | `src/hooks/use-auth.ts` |

---

## 6. Colunas / Campos por Tabela (Detalhamento)

### Tabela: `profiles`
- `id` (uuid) - PK
- `name` (text)
- `cpf` (text)
- `phone` (text)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### Tabela: `orders`
- `id` (uuid) - PK
- `order_number` (text)
- `status` (enum: order_status)
- `total` (numeric)
- `subtotal` (numeric)
- `shipping_cost` (numeric)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)
- `customer_name` (text)
- `customer_email` (text)
- `customer_phone` (text)
- `shipping_cep` (text)
- `shipping_street` (text)
- `shipping_number` (text)
- `shipping_complement` (text)
- `shipping_neighborhood` (text)
- `shipping_city` (text)
- `shipping_state` (text)
- `notes` (text)
- `user_id` (uuid) - FK para `profiles.id` (nullable/guest orders)
- `payment_status` (enum: payment_status)
- `payment_gateway` (text)
- `payment_gateway_id` (text)
- `transaction_id` (text)
- `pix_code` (text)
- `pix_qrcode` (text)
- `paid_at` (timestamptz)
- `webhook_payload` (jsonb)
- `payment_method` (text)

### Tabela: `order_items`
- `id` (uuid) - PK
- `order_id` (uuid) - FK para `orders.id`
- `product_id` (uuid) - FK para `products.id`
- `product_name` (text)
- `product_slug` (text)
- `product_image` (text)
- `quantity` (bigint)
- `unit_price` (numeric)
- `size` (text)
- `color` (text)
- `created_at` (timestamptz)

### Tabela: `products`
- `id` (uuid) - PK
- `name` (text)
- `slug` (text)
- `description` (text)
- `price` (numeric)
- `sale_price` (numeric)
- `stock` (bigint)
- `sku` (text)
- `sizes` (text[])
- `colors` (text[])
- `images` (text[])
- `is_new` (boolean)
- `is_featured` (boolean)
- `is_on_sale` (boolean)
- `is_active` (boolean)
- `category_id` (uuid) - FK para `categories.id`
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### Tabela: `categories`
- `id` (uuid) - PK
- `name` (text)
- `slug` (text)
- `order_position` (bigint)
- `active` (boolean)

### Tabela: `homepage_categories`
- `id` (uuid) - PK
- `title` (text)
- `icon` (text)
- `color` (text)
- `slug` (text)
- `order_position` (bigint)
- `active` (boolean)

### Tabela: `homepage_collections`
- `id` (uuid) - PK
- `title` (text)
- `subtitle` (text)
- `image_url` (text)
- `redirect_url` (text)
- `order_position` (bigint)
- `active` (boolean)

### Tabela: `hero_banners`
- `id` (uuid) - PK
- `title` (text)
- `subtitle` (text)
- `image_url` (text)
- `button_text` (text)
- `button_link` (text)
- `active` (boolean)
- `order_position` (bigint)

### Tabela: `customer_reviews`
- `id` (uuid) - PK
- `order_id` (uuid) - FK para `orders.id`
- `product_id` (uuid) - FK para `products.id`
- `customer_name` (text)
- `customer_photo` (text)
- `rating` (bigint)
- `comment` (text)
- `city` (text)
- `state` (text)
- `approved` (boolean)
- `created_at` (timestamptz)

### Tabela: `site_settings`
- `key` (text) - PK
- `value` (jsonb)

### Tabela: `user_roles`
- `id` (uuid) - PK
- `user_id` (uuid) - FK para `users.id`
- `role` (text)
- `created_at` (timestamptz)

---

## 7. Enumerations (Enums) utilizadas no Supabase
- `app_role`: `admin`, `user`
- `order_status`: `pending`, `paid`, `processing`, `shipped`, `delivered`, `cancelled`
- `payment_status`: `pending`, `paid`, `failed`, `refunded`

---

## 8. Observacoes Importantes
- Todas as queries que exigem autenticacão de admin usam o hook `useAuth()` e verificam a tabela `user_roles`.
- Upload de imagens é feito via componente `ImageUploader` (usando `supabase.storage.from("products")`).
- O sistema de pagamentos atualiza a tabela `orders` após interacao com a API do Mercado Pago.
- O middleware `requireSupabaseAuth` é usado em server functions para proteger as rotas de backend que processam pedidos e pagamentos (`checkouts` e `payments`).