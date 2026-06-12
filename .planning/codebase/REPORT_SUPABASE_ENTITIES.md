# Relatório de Entidades Supabase - Nicoly Modas

**Projeto:** Nicoly Modas - E-commerce de Moda Feminina  
**Repositório:** nicoly-style-boutique-main  
**Data de Geração:** 2025-01-10  
**Autor:** GSD Codebase Mapper  
**Versão:** 1.0

---

## 1. INTRODUÇÃO

Este relatório documenta todas as entidades Supabase utilizadas pelo projeto Nicoly Modas, incluindo tabelas, colunas, RPCs, políticas RLS, triggers, indexes e relacionamentos. O objetivo é fornecer um guia completo para reconstruir a infraestrutura de banco de dados do zero.

### Tecnologias Principais
- **Supabase** (PostgreSQL) - Banco de dados principal
- **Supabase Auth** - Autenticação de usuários
- **Supabase Storage** - Armazenamento de imagens
- **Supabase Realtime** - Atualizações em tempo real

---

## 2. TABELAS IDENTIFICADAS

| # | Tabela | Descrição | Referências |
|---|--------|-----------|-------------|
| 1 | `categories` | Categorias de produtos | - |
| 2 | `customer_reviews` | Avaliações de clientes | products, orders |
| 3 | `hero_banners` | Banners do carousel principal | - |
| 4 | `homepage_categories` | Categorias exibidas na home | - |
| 5 | `homepage_collections` | Coleções exibidas na home | - |
| 6 | `order_items` | Itens de cada pedido | orders, products |
| 7 | `orders` | Pedidos dos clientes | profiles |
| 8 | `products` | Catálogo de produtos | categories |
| 9 | `profiles` | Perfis dos usuários (extendido) | auth.users |
| 10 | `site_settings` | Configurações gerais do site | - |
| 11 | `user_roles` | Papéis de usuário (admin/user) | - |

### Tabelas do Sistema (Auth)
- `auth.users` - Usuários autenticados (gerenciada pelo Supabase Auth)
- `auth.identities` - Identidades de autenticação (gerenciada pelo Supabase Auth)

---

## 3. ESTRUTURA DETALHADA DE CADA TABELA

### 3.1 `categories`
Gerencia as categorias do catálogo de produtos.

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `name` | TEXT | Sim | - | Nome da categoria |
| `slug` | TEXT | Sim | - | Identificador URL-friendly |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |
| `updated_at` | TIMESTAMPTZ | Sim | `now()` | Data de atualização |

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/routes/loja.tsx` - Listagem de produtos por categoria
- `src/components/admin/ProductForm.tsx` - Formulário de produto
- `src/lib/types.ts` - Tipos da aplicação

---

### 3.2 `customer_reviews`
Armazena as avaliações dos clientes sobre os produtos.

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `order_id` | UUID | Não | NULL | ID do pedido (opcional) |
| `product_id` | UUID | Não | NULL | ID do produto avaliado (opcional) |
| `customer_name` | TEXT | Sim | - | Nome do cliente |
| `customer_photo` | TEXT | Não | NULL | URL da foto do cliente |
| `rating` | INTEGER | Sim | - | Nota (1-5) |
| `comment` | TEXT | Sim | - | Comentário do cliente |
| `city` | TEXT | Não | NULL | Cidade do cliente |
| `state` | TEXT | Não | NULL | Estado do cliente |
| `approved` | BOOLEAN | Sim | FALSE | Se a avaliação foi aprovada |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/lib/types.ts` - Tipos `CustomerReview`
- `src/routes/admin.avaliacoes.tsx` - Admin de avaliações
- `src/components/site/CustomerReviewsCarousel.tsx` - Exibição pública

---

### 3.3 `hero_banners`
Banners para o carousel principal da página inicial.

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `title` | TEXT | Sim | - | Título do banner |
| `subtitle` | TEXT | Não | NULL | Subtítulo |
| `image_url` | TEXT | Sim | - | URL da imagem do banner |
| `button_text` | TEXT | Não | NULL | Texto do botão de ação |
| `button_link` | TEXT | Não | NULL | URL de destino do botão |
| `active` | BOOLEAN | Sim | TRUE | Se o banner está ativo |
| `order_position` | INTEGER | Sim | - | Ordem de exibição |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |
| `updated_at` | TIMESTAMPTZ | Sim | `now()` | Data de atualização |

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/routes/admin.banners.tsx` - Admin de banners
- `src/components/site/HeroCarousel.tsx` - Exibição pública

---

### 3.4 `homepage_categories`
Categorias exibidas na página inicial (carousel de ícones).

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `title` | TEXT | Sim | - | Título da categoria |
| `slug` | TEXT | Sim | - | Identificador URL-friendly |
| `icon` | TEXT | Sim | - | Nome do ícone (Lucide) |
| `color` | TEXT | Sim | - | Cor do círculo (hex) |
| `order_position` | INTEGER | Sim | - | Ordem de exibição |
| `active` | BOOLEAN | Sim | TRUE | Se está ativa |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |
| `updated_at` | TIMESTAMPTZ | Sim | `now()` | Data de atualização |

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/routes/admin.categorias-home.tsx` - Admin de categorias
- `src/components/site/CategoriesCarousel.tsx` - Exibição pública

---

### 3.5 `homepage_collections`
Coleções exibidas na seção "Inspirações da estação".

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `title` | TEXT | Sim | - | Título da coleção |
| `subtitle` | TEXT | Não | NULL | Subtítulo |
| `image_url` | TEXT | Sim | - | URL da imagem da coleção |
| `redirect_url` | TEXT | Não | NULL | URL de redirecionamento |
| `order_position` | INTEGER | Sim | - | Ordem de exibição |
| `active` | BOOLEAN | Sim | TRUE | Se está ativa |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |
| `updated_at` | TIMESTAMPTZ | Sim | `now()` | Data de atualização |

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/routes/admin.colecoes.tsx` - Admin de coleções
- `src/components/site/CollectionCards.tsx` - Exibição pública

---

### 3.6 `order_items`
Itens que compõem cada pedido.

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `order_id` | UUID | Sim | - | ID do pedido (FK → orders.id) |
| `product_id` | UUID | Não | NULL | ID do produto (FK → products.id) |
| `product_name` | TEXT | Sim | - | Nome do produto no momento do pedido |
| `product_slug` | TEXT | Sim | - | Slug do produto |
| `product_image` | TEXT | Não | NULL | URL da imagem do produto |
| `quantity` | INTEGER | Sim | - | Quantidade |
| `unit_price` | DECIMAL(10,2) | Sim | - | Preço unitário |
| `size` | TEXT | Não | NULL | Tamanho selecionado |
| `color` | TEXT | Não | NULL | Cor selecionada |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |

**FKs e Relacionamentos:**
- `order_id` → `orders.id` (ON DELETE CASCADE)
- `product_id` → `products.id` (ON DELETE SET NULL)

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/routes/pedido.$id.tsx` - Detalhes do pedido
- `src/routes/admin.pedidos.$id.tsx` - Admin de pedidos

---

### 3.7 `orders`
Tabela central de pedidos do e-commerce. Inclui campos para integração com Mercado Pago.

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `order_number` | TEXT | Sim | `gen_random_uuid()` | Número do pedido (ex: NM-0001) |
| `user_id` | UUID | Não | NULL | ID do usuário (FK → auth.users) |
| `customer_name` | TEXT | Sim | - | Nome do cliente |
| `customer_email` | TEXT | Sim | - | E-mail do cliente |
| `customer_phone` | TEXT | Sim | - | Telefone do cliente |
| `shipping_cep` | TEXT | Sim | - | CEP de entrega |
| `shipping_street` | TEXT | Sim | - | Rua de entrega |
| `shipping_number` | TEXT | Sim | - | Número de entrega |
| `shipping_complement` | TEXT | Não | NULL | Complemento de entrega |
| `shipping_neighborhood` | TEXT | Sim | - | Bairro de entrega |
| `shipping_city` | TEXT | Sim | - | Cidade de entrega |
| `shipping_state` | TEXT | Sim | - | Estado de entrega (UF) |
| `shipping_cost` | DECIMAL(10,2) | Não | 0.00 | Custo de frete |
| `subtotal` | DECIMAL(10,2) | Sim | - | Subtotal do pedido (soma dos itens) |
| `total` | DECIMAL(10,2) | Sim | - | Total do pedido |
| `status` | TEXT | Sim | `'pending'` | Status do pedido (ENUM order_status) |
| `payment_method` | TEXT | Não | NULL | Método de pagamento |
| `payment_status` | TEXT | Sim | `'pending'` | Status do pagamento (ENUM payment_status) |
| `notes` | TEXT | Não | NULL | Observações do cliente |
| `tracking_code` | TEXT | Não | NULL | Código de rastreio |
| `payment_gateway` | TEXT | Não | NULL | Gateway de pagamento (ex: mercadopago) |
| `payment_gateway_id` | TEXT | Não | NULL | ID da preferência/pagamento no gateway |
| `transaction_id` | TEXT | Não | NULL | ID da transação no gateway |
| `pix_code` | TEXT | Não | NULL | Código PIX (copia e cola) |
| `pix_qrcode` | TEXT | Não | NULL | QR Code PIX em base64 |
| `paid_at` | TIMESTAMPTZ | Não | NULL | Data/hora do pagamento |
| `webhook_payload` | JSONB | Não | NULL | Payload completo do webhook |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |
| `updated_at` | TIMESTAMPTZ | Sim | `now()` | Data de atualização |

**ENUMS:**
- `order_status`: 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
- `payment_status`: 'pending', 'approved', 'in_process', 'in_mediation', 'rejected', 'cancelled', 'refunded', 'charged_back'

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/lib/types.ts` - Tipos `Order`
- `src/routes/checkout.tsx` - Checkout
- `src/routes/pedido.$id.tsx` - Detalhes do pedido
- `src/routes/admin.pedidos.$id.tsx` - Admin de pedidos
- `src/lib/payment.functions.ts` - Funções de pagamento
- `src/routes/api.mercadopago.webhook.ts` - Webhook Mercado Pago

---

### 3.8 `products`
Catálogo de produtos do e-commerce.

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `name` | TEXT | Sim | - | Nome do produto |
| `slug` | TEXT | Sim | - | Identificador URL-friendly |
| `description` | TEXT | Não | NULL | Descrição do produto |
| `price` | DECIMAL(10,2) | Sim | - | Preço original |
| `sale_price` | DECIMAL(10,2) | Não | NULL | Preço promocional |
| `sku` | TEXT | Não | NULL | Código SKU |
| `images` | TEXT[] | Não | `[]` | Array de URLs das imagens |
| `sizes` | TEXT[] | Não | `[]` | Array de tamanhos disponíveis |
| `colors` | TEXT[] | Não | `[]` | Array de cores disponíveis |
| `stock` | INTEGER | Sim | 0 | Quantidade em estoque |
| `category_id` | UUID | Não | NULL | ID da categoria (FK → categories.id) |
| `is_active` | BOOLEAN | Sim | TRUE | Se o produto está ativo |
| `is_featured` | BOOLEAN | Sim | FALSE | Se é destaque na home |
| `is_new` | BOOLEAN | Sim | TRUE | Se é novo/novelty |
| `is_on_sale` | BOOLEAN | Sim | FALSE | Se está em promoção |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |
| `updated_at` | TIMESTAMPTZ | Sim | `now()` | Data de atualização |

**FKs e Relacionamentos:**
- `category_id` → `categories.id` (ON DELETE SET NULL)

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/lib/types.ts` - Tipos `Product`
- `src/routes/produto.$slug.tsx` - Página do produto
- `src/routes/loja.tsx` - Listagem de produtos
- `src/routes/index.tsx` - Home
- `src/components/admin/ProductForm.tsx` - Admin de produtos
- `src/components/site/ProductCard.tsx` - Card de produto

---

### 3.9 `profiles`
Extende a tabela `auth.users` com informações adicionais do usuário.

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | - | ID do usuário (FK → auth.users.id) |
| `name` | TEXT | Sim | - | Nome do usuário |
| `cpf` | TEXT | Não | NULL | CPF do usuário |
| `phone` | TEXT | Não | NULL | Telefone do usuário |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |
| `updated_at` | TIMESTAMPTZ | Sim | `now()` | Data de atualização |

**FKs e Relacionamentos:**
- `id` → `auth.users.id` (ON DELETE CASCADE)

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/routes/minha-conta.pedidos.tsx` - Perfil do usuário
- `src/hooks/use-auth.ts` - Hook de autenticação

---

### 3.10 `site_settings`
Configurações dinâmicas do site (JSON key-value store).

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `key` | TEXT | Sim | - | Chave da configuração (PK) |
| `value` | JSONB | Sim | - | Valor da configuração (JSON) |
| `updated_at` | TIMESTAMPTZ | Sim | `now()` | Data de atualização |

**Chaves conhecidas:**
- `announcement_bar` - Configuração da barra de anúncios
- `instagram` - Configuração do Instagram
- `store_data` - Dados da loja
- `company_address` - Endereço da empresa
- `return_address` - Endereço de devolução
- `admin_account` - Conta administrativa
- `email_settings` - Configurações de e-mail (SMTP)
- `general_settings` - Configurações gerais
- `shipping_settings` - Configurações de frete
- `seo_settings` - Configurações de SEO

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/routes/admin.configuracoes.tsx` - Configurações
- `src/routes/admin.anuncio.tsx` - Barra de anúncios
- `src/components/site/AnnouncementMarquee.tsx` - Exibição de anúncios
- `src/hooks/use-site-settings.ts` - Hook de configurações

---

### 3.11 `user_roles`
Define os papéis (roles) dos usuários no sistema.

| Coluna | Tipo | Obrigatório | Default | Descrição |
|--------|------|-------------|---------|-----------|
| `id` | UUID | Sim | `gen_random_uuid()` | Identificador único |
| `user_id` | UUID | Sim | - | ID do usuário (FK → auth.users.id) |
| `role` | TEXT | Sim | - | Papel do usuário (ENUM app_role) |
| `created_at` | TIMESTAMPTZ | Sim | `now()` | Data de criação |

**ENUM:**
- `app_role`: 'admin', 'user'

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts` - Tipos TypeScript
- `src/hooks/use-auth.ts` - Verificação de admin
- `src/routes/admin.tsx` - Layout do admin

---

## 4. RPCs (FUNÇÕES DE BANCO)

Funções PostgreSQL chamadas via `supabase.rpc()`: não foram encontradas RPCs no código do projeto. A aplicação utiliza queries diretas via `supabase.from()`. Na configuração dos tipos Supabase (`src/integrations/supabase/types.ts`), há uma seção `Functions` que define as seguintes funções disponíveis:

### Funções Definidas nos Tipos

| Função | Argumentos | Retorno | Uso |
|--------|------------|---------|-----|
| `get_order_summary` | `user_id UUID` | JSON | Dashboard admin - resumo de pedidos |
| `get_sales_summary` | `period_start DATE, period_end DATE` | JSON | Dashboard admin - resumo de vendas |
| `get_customer_summary` | `user_id UUID` | JSON | Dashboard admin - resumo de cliente |
| `create_order` | `items JSONB, order_data JSONB` | JSON | Criação de pedido com itens |

**Arquivos:**
- `src/integrations/supabase/types.ts` - Definição dos tipos das funções

---

## 5. POLICIES RLS (ROW LEVEL SECURITY)

As seguintes políticas RLS são necessárias com base no uso do código:

### 5.1 `products`
- ✅ **SELECT**: Público (visível na loja)
- ✅ **INSERT/UPDATE/DELETE**: Apenas usuários com role `admin`

### 5.2 `orders`
- ✅ **SELECT**: Usuário autenticado (apenas seus próprios pedidos) ou admin
- ✅ **INSERT**: Usuário autenticado ou admin
- ✅ **UPDATE**: Usuário autenticado (apenas seus próprios pedidos) ou admin
- ✅ **DELETE**: Apenas admin

### 5.3 `order_items`
- ✅ **SELECT**: Usuário autenticado (pedidos próprios) ou admin
- ✅ **INSERT**: Usuário autenticado (próprios pedidos) ou admin
- ✅ **UPDATE/DELETE**: Apenas admin

### 5.4 `profiles`
- ✅ **SELECT**: Próprio usuário ou admin
- ✅ **INSERT/UPDATE/DELETE**: Próprio usuário ou admin

### 5.5 `user_roles`
- ✅ **SELECT**: Apenas admin
- ✅ **INSERT/UPDATE/DELETE**: Apenas admin

### 5.6 `categories`
- ✅ **SELECT**: Público
- ✅ **INSERT/UPDATE/DELETE**: Apenas admin

### 5.7 `hero_banners`
- ✅ **SELECT**: Público
- ✅ **INSERT/UPDATE/DELETE**: Apenas admin

### 5.8 `homepage_categories`
- ✅ **SELECT**: Público
- ✅ **INSERT/UPDATE/DELETE**: Apenas admin

### 5.9 `homepage_collections`
- ✅ **SELECT**: Público
- ✅ **INSERT/UPDATE/DELETE**: Apenas admin

### 5.10 `site_settings`
- ✅ **SELECT**: Público
- ✅ **INSERT/UPDATE/DELETE**: Apenas admin

### 5.11 `customer_reviews`
- ✅ **SELECT**: Aprovadas são públicas; pendentes apenas admin
- ✅ **INSERT**: Usuário autenticado
- ✅ **UPDATE/DELETE**: Apenas admin

---

## 6. TRIGGERS

Os seguintes triggers são necessários:

### 6.1 `on_auth_user_created`
- **Tabela alvo:** `auth.users`
- **Ação:** Insere registro em `profiles` quando novo usuário é criado
- **Função:** Copia `name`, `email`, `cpf`, `phone` dos metadados do usuário

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, cpf, phone, created_at, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'cpf',
    new.raw_user_meta_data->>'phone',
    NOW(),
    NOW()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 6.2 `update_timestamp`
- **Tabelas:** Todas as tabelas com `updated_at`
- **Ação:** Atualiza `updated_at` em cada UPDATE

```sql
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 7. INDEXES CONHECIDOS

Os seguintes indexes são necessários para performance:

### 7.1 `orders`
- `orders_user_id_idx` ON `orders(user_id)`
- `orders_status_idx` ON `orders(status)`
- `orders_created_at_idx` ON `orders(created_at DESC)`
- `orders_order_number_idx` ON `orders(order_number)` - Unique
- `orders_payment_status_idx` ON `orders(payment_status)`

### 7.2 `products`
- `products_slug_idx` ON `products(slug)` - Unique
- `products_category_id_idx` ON `products(category_id)`
- `products_is_active_featured_new_idx` (composto) - Para filtros na home
- `products_created_at_idx` ON `products(created_at DESC)`

### 7.3 `order_items`
- `order_items_order_id_idx` ON `order_items(order_id)`
- `order_items_product_id_idx` ON `order_items(product_id)`

### 7.4 `profiles`
- `profiles_id_idx` ON `profiles(id)` - Primary key

### 7.5 `user_roles`
- `user_roles_user_id_idx` ON `user_roles(user_id)`
- `user_roles_role_idx` ON `user_roles(role)`

### 7.6 `categories`
- `categories_slug_idx` ON `categories(slug)` - Unique

### 7.7 `hero_banners`
- `hero_banners_active_order_idx` (composto) ON `hero_banners(active, order_position)`

### 7.8 `homepage_categories`
- `homepage_categories_slug_idx` ON `homepage_categories(slug)` - Unique
- `homepage_categories_active_order_idx` (composto)

### 7.9 `homepage_collections`
- `homepage_collections_active_order_idx` (composto)

### 7.10 `customer_reviews`
- `customer_reviews_product_id_idx` ON `customer_reviews(product_id)`
- `customer_reviews_approved_idx` ON `customer_reviews(approved)`
- `customer_reviews_created_at_idx` ON `customer_reviews(created_at DESC)`

### 7.11 `site_settings`
- `site_settings_key_idx` ON `site_settings(key)` - Primary key

---

## 8. TABELAS DE AUTENTICAÇÃO (Supabase Auth)

### 8.1 `auth.users` (Sistema)
Gerenciada pelo Supabase Auth. Campos utilizados pelas aplicações:

| Campo | Descrição |
|-------|-----------|
| `id` | UUID do usuário |
| `email` | E-mail do usuário |
| `confirmed_at` | Data de confirmação do e-mail |
| `last_sign_in_at` | Último login |
| `created_at` | Data de criação |
| `updated_at` | Data de atualização |
| `raw_user_meta_data` | Metadados: `name`, `cpf`, `phone` |

**Fluxo de criação de usuário:**
1. Usuário preenche cadastro em `src/routes/login.tsx`
2. Supabase Auth cria o usuário
3. Trigger `on_auth_user_created` cria perfil em `profiles`
4. Após confirmação de e-mail, usuário pode fazer login

### 8.2 `profiles` (Aplicação)
Tabela customizada que extende `auth.users`: (veja seção 3.9)

**Arquivos relacionados:**
- `src/integrations/supabase/types.ts`
- `src/hooks/use-auth.ts`
- `src/routes/login.tsx`
- `src/routes/minha-conta.pedidos.tsx`

### 8.3 `user_roles` (Aplicação)
Tabela para controle de acesso: (veja seção 3.11)

**Verificação de admin em `use-auth.ts`:**
```typescript
supabase
  .from("user_roles")
  .select("role")
  .eq("user_id", userId)
  .eq("role", "admin")
  .maybeSingle()
```

---

## 9. TABELAS DE PAGAMENTO

### 9.1 `orders` (Campos de Pagamento)
Já documentada na seção 3.7, inclui os seguintes campos de pagamento:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `payment_method` | TEXT | Método: pix, credit_card, debit_card, mercado_pago_balance |
| `payment_status` | TEXT | ENUM payment_status |
| `payment_gateway` | TEXT | Gateway: mercadopago |
| `payment_gateway_id` | TEXT | ID da preferência no Mercado Pago |
| `transaction_id` | TEXT | ID da transação no gateway |
| `pix_code` | TEXT | Código PIX (copia e cola) |
| `pix_qrcode` | TEXT | QR Code PIX em base64 |
| `paid_at` | TIMESTAMPTZ | Data/hora do pagamento confirmado |
| `webhook_payload` | JSONB | Payload completo do webhook |

### 9.2 Integração com Mercado Pago

**Configuração:**
- `MP_ACCESS_TOKEN` - Token de acesso da API Mercado Pago
- `MP_WEBHOOK_SECRET` - Segredo para validação de webhook
- `VITE_MP_PUBLIC_KEY` - Chave pública para SDK do frontend

**Fluxo de Pagamento:**
1. Usuário finaliza checkout → cria pedido em `orders`
2. Sistema cria preferência no Mercado Pago
3. Usuário é redirecionado para pagamento
4. Mercado Pago envia webhook para `/api/mercadopago/webhook`
5. Webhook atualiza `orders` com status do pagamento

**Arquivos relacionados:**
- `src/routes/checkout.pagamento.$orderId.tsx` - Página de pagamento
- `src/lib/payment.functions.ts` - Funções de pagamento
- `src/lib/payment.types.ts` - Tipos de pagamento
- `src/routes/api.mercadopago.webhook.ts` - Webhook handler
- `src/lib/webhook.functions.ts` - Processamento de webhook

---

## 10. RELACIONAMENTOS

```
auth.users (id)
    │
    ├── 1:1 ── profiles (id)
    │
    ├── 1:N ── orders (user_id)
    │       │
    │       └── N:1 ── order_items (order_id)
    │
    └── 1:N ── user_roles (user_id)

products (id)
    │
    └── 1:N ── order_items (product_id)
    │
    └── N:1 ── categories (category_id)
    │
    └── 1:N ── customer_reviews (product_id)

orders (id)
    │
    └── 1:N ── order_items (order_id)
    │
    └── 1:N ── customer_reviews (order_id)
```

---

## 11. STORAGE BUCKETS

### 11.1 `products`
- **Finalidade:** Armazenar imagens de produtos
- **Caminhos:**
  - `products/` - Imagens do catálogo
  - `banners/` - Banners do site
  - `collections/` - Imagens das coleções
- **Políticas (necessárias):**
  - SELECT: Público
  - INSERT: Apenas admin
  - DELETE: Apenas admin

**Arquivos relacionados:**
- `src/lib/upload.ts` - Função de upload
- `src/components/admin/ImageUploader.tsx` - Componente de upload

---

## 12. REALTIME

O projeto utiliza Supabase Realtime para atualizações em tempo real no dashboard administrativo.

### Canais:
- `dashboard-realtime` - Canal para notificações do dashboard

**Arquivos:**
- `src/hooks/useDashboardRealtime.ts`

---

## 13. ENV VARS NECESSÁRIAS

```bash
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Mercado Pago
MP_ACCESS_TOKEN=
MP_WEBHOOK_SECRET=
VITE_MP_PUBLIC_KEY=

# Site
VITE_SITE_URL=
```

---

## 14. SQL DE CRIAÇÃO SIMPLIFICADO

```sql
-- Criar enums
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'approved', 'in_process', 'in_mediation', 'rejected', 'cancelled', 'refunded', 'charged湘西charged_back');
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- Criar tabela profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    cpf TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela user_roles
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
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

-- Criar tabela orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid(),
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

-- Criar tabela order_items
CREATE TABLE order_items (
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

-- Criar tabela hero_banners
CREATE TABLE hero_banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    button_text TEXT,
    button_link TEXT,
    active BOOLEAN DEFAULT TRUE,
    order_position INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela homepage_categories
CREATE TABLE homepage_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    order_position INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela homepage_collections
CREATE TABLE homepage_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    redirect_url TEXT,
    order_position INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela customer_reviews
CREATE TABLE customer_reviews (
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

-- Criar tabela site_settings
CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 15. MAPEAMENTO DE ARQUIVOS POR TABELA

### `categories`
- `src/integrations/supabase/types.ts` - Tipos
- `src/routes/loja.tsx` - Listagem
- `src/components/admin/ProductForm.tsx` - Seleção

### `customer_reviews`
- `src/integrations/supabase/types.ts` - Tipos
- `src/lib/types.ts` - Tipos TypeScript
- `src/components/site/CustomerReviewsCarousel.tsx` - Exibição pública
- `src/routes/admin.avaliacoes.tsx` - Admin

### `hero_banners`
- `src/integrations/supabase/types.ts` - Tipos
- `src/components/site/HeroCarousel.tsx` - Exibição
- `src/routes/admin.banners.tsx` - Admin

### `homepage_categories`
- `src/integrations/supabase/types.ts` - Tipos
- `src/components/site/CategoriesCarousel.tsx` - Exibição
- `src/routes/admin.categorias-home.tsx` - Admin

### `homepage_collections`
- `src/integrations/supabase/types.ts` - Tipos
- `src/components/site/CollectionCards.tsx` - Exibição
- `src/routes/admin.colecoes.tsx` - Admin

### `order_items`
- `src/integrations/supabase/types.ts` - Tipos
- `src/routes/pedido.$id.tsx` - Detalhes
- `src/routes/admin.pedidos.$id.tsx` - Admin

### `orders`
- `src/integrations/supabase/types.ts` - Tipos
- `src/lib/types.ts` - Tipos TypeScript
- `src/routes/checkout.tsx` - Checkout
- `src/routes/pedido.$id.tsx` - Detalhes
- `src/routes/minha-conta.pedidos.tsx` - Meus pedidos
- `src/routes/admin.pedidos.tsx` - Admin
- `src/lib/payment.functions.ts` - Pagamento
- `src/routes/api.mercadopago.webhook.ts` - Webhook

### `products`
- `src/integrations/supabase/types.ts` - Tipos
- `src/lib/types.ts` - Tipos TypeScript
- `src/routes/index.tsx` - Home
- `src/routes/loja.tsx` - Loja
- `src/routes/produto.$slug.tsx` - Produto
- `src/routes/admin.produtos.tsx` - Admin
- `src/components/site/ProductCard.tsx` - Card

### `profiles`
- `src/integrations/supabase/types.ts` - Tipos
- `src/routes/minha-conta.pedidos.tsx` - Perfil
- `src/hooks/use-auth.ts` - Autenticação

### `site_settings`
- `src/integrations/supabase/types.ts` - Tipos
- `src/routes/admin.configuracoes.tsx` - Configurações
- `src/components/site/AnnouncementMarquee.tsx` - Anúncios
- `src/hooks/use-site-settings.ts` - Hook

### `user_roles`
- `src/integrations/supabase/types.ts` - Tipos
- `src/hooks/use-auth.ts` - Verificação de admin
- `src/routes/admin.tsx` - Acesso ao admin

---

*Relatório gerado em: 2025-01-10*
*Ferramenta: GSD Codebase Mapper*
