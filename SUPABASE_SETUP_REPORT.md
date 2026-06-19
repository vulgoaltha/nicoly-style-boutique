# SUPABASE SETUP REPORT - Nicoly Modas

## Projeto
- **Project Ref:** zycwvatimjfbsfnjjvns
- **URL:** https://zycwvatimjfbsfnjjvns.supabase.co
- **Data:** 2026-01-10

## Arquivos Criados
| Arquivo | Linhas | Status |
|---------|--------|--------|
| supabase/config.toml | 2 | Criado |
| supabase/migrations/00000000000000_initial_schema.sql | 373 | Criado |
| supabase/seed/seed.sql | 31 | Criado |
| src/integrations/supabase/types.ts | 615+ | Atualizado |
| SUPABASE_SETUP_REPORT.md | - | Criado |

## 1. TABELAS CRIADAS (11 tabelas)
| # | Tabela | Descricao |
|---|--------|-----------|
| 1 | profiles | Perfis de usuarios (extende auth.users) |
| 2 | user_roles | Papeis de usuario (admin/user) |
| 3 | categories | Categorias de produtos |
| 4 | products | Catalogo de produtos |
| 5 | orders | Pedidos dos clientes |
| 6 | order_items | Itens de cada pedido |
| 7 | hero_banners | Banners do carousel principal |
| 8 | homepage_categories | Categorias exibidas na home |
| 9 | homepage_collections | Colecoes exibidas na home |
| 10 | customer_reviews | Avaliacoes de clientes |
| 11 | site_settings | Configuracoes gerais do site |

## 2. ENUMS CRIADOS
| Enum | Valores |
|------|---------|
| order_status | pending, processing, shipped, delivered, cancelled |
| payment_status | pending, approved, in_process, in_mediation, rejected, cancelled, refunded, charged_back |
| app_role | admin, user |

## 3. FUNCOES (RPCs) CRIADAS
| Funcao | Parametros | Retorno |
|--------|------------|---------|
| create_order_transaction | p_user_id UUID, p_order_data JSONB, p_items_data JSONB | JSONB |
| handle_new_user | NEW (trigger) | trigger |
| update_timestamp | NEW (trigger) | trigger |

## 4. TRIGGERS CRIADOS (9 triggers)
| Trigger | Tabela | Evento | Funcao |
|---------|--------|--------|--------|
| on_auth_user_created | auth.users | AFTER INSERT | handle_new_user() |
| update_profiles_updated_at | profiles | BEFORE UPDATE | update_timestamp() |
| update_categories_updated_at | categories | BEFORE UPDATE | update_timestamp() |
| update_products_updated_at | products | BEFORE UPDATE | update_timestamp() |
| update_orders_updated_at | orders | BEFORE UPDATE | update_timestamp() |
| update_hero_banners_updated_at | hero_banners | BEFORE UPDATE | update_timestamp() |
| update_homepage_categories_updated_at | homepage_categories | BEFORE UPDATE | update_timestamp() |
| update_homepage_collections_updated_at | homepage_collections | BEFORE UPDATE | update_timestamp() |
| update_site_settings_updated_at | site_settings | BEFORE UPDATE | update_timestamp() |

## 5. POLICIES RLS (25 policies)
| Tabela | Policy | Acao | Regra |
|--------|--------|------|-------|
| profiles | profiles_select_own | SELECT | Proprio usuario ou admin |
| profiles | profiles_update_own | UPDATE | Proprio usuario ou admin |
| user_roles | user_roles_admin_only | ALL | Apenas admin |
| categories | categories_select_public | SELECT | Publico |
| categories | categories_admin_modify | ALL | Apenas admin |
| products | products_select_public | SELECT | Publico |
| products | products_admin_modify | ALL | Apenas admin |
| orders | orders_select_own | SELECT | Proprio usuario ou admin |
| orders | orders_insert_own | INSERT | Usuario autenticado ou admin |
| orders | orders_update_own | UPDATE | Proprio usuario ou admin |
| orders | orders_admin_delete | DELETE | Apenas admin |
| order_items | order_items_select_own | SELECT | Proprios itens ou admin |
| order_items | order_items_insert_own | INSERT | Proprios itens ou admin |
| order_items | order_items_admin_all | ALL | Apenas admin |
| hero_banners | hero_banners_select_public | SELECT | Publico |
| hero_banners | hero_banners_admin_modify | ALL | Apenas admin |
| homepage_categories | homepage_categories_select_public | SELECT | Publico |
| homepage_categories | homepage_categories_admin_modify | ALL | Apenas admin |
| homepage_collections | homepage_collections_select_public | SELECT | Publico |
| homepage_collections | homepage_collections_admin_modify | ALL | Apenas admin |
| customer_reviews | customer_reviews_select_approved | SELECT | Aprovadas ou admin |
| customer_reviews | customer_reviews_insert_auth | INSERT | Usuario autenticado |
| customer_reviews | customer_reviews_admin_all | ALL | Apenas admin |
| site_settings | site_settings_select_public | SELECT | Publico |
| site_settings | site_settings_admin_modify | ALL | Apenas admin |

## 6. INDICES CRIADOS (19 indices)
| Indice | Tabela | Colunas |
|--------|--------|---------|
| orders_user_id_idx | orders | user_id |
| orders_status_idx | orders | status |
| orders_created_at_idx | orders | created_at DESC |
| orders_payment_status_idx | orders | payment_status |
| products_slug_idx | products | slug (Unique) |
| products_category_id_idx | products | category_id |
| products_active_featured_new_idx | products | is_active, is_featured, is_new |
| products_created_at_idx | products | created_at DESC |
| order_items_order_id_idx | order_items | order_id |
| order_items_product_id_idx | order_items | product_id |
| user_roles_user_id_idx | user_roles | user_id |
| user_roles_role_idx | user_roles | role |
| hero_banners_active_order_idx | hero_banners | active, order_position |
| homepage_categories_active_order_idx | homepage_categories | active, order_position |
| homepage_collections_active_order_idx | homepage_collections | active, order_position |
| customer_reviews_product_id_idx | customer_reviews | product_id |
| customer_reviews_approved_idx | customer_reviews | approved |
| customer_reviews_created_at_idx | customer_reviews | created_at DESC |
| categories_slug_unique | categories | slug (Unique) |

## 7. RELACIONAMENTOS (Foreign Keys)
| Tabela | Coluna | Referencia | Regra ON DELETE |
|--------|--------|------------|-----------------|
| profiles | id | auth.users(id) | CASCADE |
| user_roles | user_id | auth.users(id) | CASCADE |
| products | category_id | categories(id) | SET NULL |
| orders | user_id | auth.users(id) | SET NULL |
| order_items | order_id | orders(id) | CASCADE |
| order_items | product_id | products(id) | SET NULL |
| customer_reviews | order_id | orders(id) | SET NULL |
| customer_reviews | product_id | products(id) | SET NULL |
