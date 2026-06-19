## Plano: Refinamentos Premium Nicoly Modas

Vou adicionar 5 novos blocos premium gerenciáveis pelo admin, sem tocar em checkout/auth/produtos existentes.

### Fase 1 — Banco de dados (1 migração única)

Criar 3 novas tabelas + 1 de config:

- `hero_banners` — title, subtitle, image_url, button_text, button_link, active, order_position
- `homepage_categories` — title, icon (nome lucide), color (hex), slug, order_position, active
- `homepage_collections` — title, subtitle, image_url, redirect_url, order_position, active
- `site_settings` — key/value (JSONB) para Instagram (@\_nicoly.modas) e outras configs

RLS: leitura pública das ativas; escrita só `admin` (mesmo padrão de `products`).

### Fase 2 — Frontend (home)

Criar componentes em `src/components/site/`:

- `HeroCarousel.tsx` — autoplay 4s, fade+slide, setas, dots, swipe (usar embla via `components/ui/carousel`). Fallback: hero atual se tabela vazia.
- `CategoriesCarousel.tsx` — carrossel horizontal com ícone Lucide dentro de círculo colorido, snap scroll, setas desktop, drag mobile.
- `CollectionCards.tsx` — grid 3/2/1 com hover zoom + overlay editorial.

Atualizar `src/routes/index.tsx`: substituir o hero estático e a seção Instagram pelo novo conteúdo dinâmico. Manter as seções "Novidades", "Em destaque", trust bar, banner editorial.

### Fase 3 — ProductCard hover 2ª imagem

Editar `src/components/site/ProductCard.tsx`:

- desktop: 2ª imagem aparece com fade no hover (preload via `<img>` oculto)
- mobile: dots indicadores se houver >1 imagem
- usa `product.images[1]` já existente — sem mudança no schema de produtos

### Fase 4 — Instagram clicável

- `Header.tsx` e `Footer.tsx`: ícone Instagram lendo `site_settings.instagram`
- Seção Instagram da home vira link clicável real

### Fase 5 — Admin (CRUD completo)

Novas rotas:

- `src/routes/admin.banners.tsx` + form
- `src/routes/admin.categorias-home.tsx` + form
- `src/routes/admin.colecoes.tsx` + form
- `src/routes/admin.configuracoes.tsx` (Instagram username/link/ativo)

Sidebar do admin (`admin.tsx`) ganha 4 novos itens. Uploads usam bucket `products` existente (já público) com preview e loading.

### Fase 6 — Polimento

- Skeletons, fade-in (motion), logs `[HeroCarousel]` etc.
- Sem mudanças em: checkout, login, products, orders, user_roles.

### Detalhes técnicos

- Queries via `supabase` client direto (mesmo padrão de `index.tsx` atual) — leituras públicas funcionam pela RLS.
- Ícones de categoria: armazenar nome (`Shirt`, `ShoppingBag` etc.) e renderizar via mapa Lucide.
- Uploads: helper inline reaproveitando padrão de `ProductForm.tsx`.
- Migração será aplicada primeiro; depois código.

Começo pela migração — peço aprovação dela e sigo com o código no mesmo turno.
