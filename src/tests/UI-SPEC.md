# UI Design Contract: Product Showcase Enhancement

## Phase Overview

**Phase Number:** 06
**Phase Name:** Product Showcase Enhancement
**Objective:** Melhorar a vitrine de produtos para aumentar conversão com visual premium e interações refinadas.

**Referências:** Zara, Renner, Dafiti, Amaro (ecommerce premium brasileiro).

---

## Scope

- Tela de listagem de produtos (vitrine/loja)
- Componente `ProductCard`
- Componente `OptimizedImage`

---

## Design Decisions

### Typography

- **Card title:** `Cormorant Garamond`, tamanho `14-16px`, peso `400`, letter-spacing `-0.01em`, line-clamp `2` (no máximo 2 linhas)
- **Price:** `Inter`, tamanho `14px`, peso `500` (bold), cor `blush-deep` somente quando há desconto
- **Original price:** `Inter`, tamanho `12px`, peso `400`, linha-through, cor `muted-foreground`
- **Badges:** `Inter`, tamanho `10px`, peso `500`, tracking-editorial `0.18em` (não utilizar outro peso)

### Colors

- **Badge NOVO:** `bg-background/90` com `backdrop-blur-sm`, texto `foreground` (#1a1a1a), fonte `Inter 10px uppecase`
- **Badge PROMO:** `bg-blush` (#d98a8a), texto `text-accent-foreground` (assumir branco), fonte `Inter 10px uppecase`
- **Background card:** `bg-secondary` (oklch 0.94 0.025 20) — nunca branco absoluto

### Spacing

- **Grid gap:** `gap-4` (16px em desktop)
- **Card aspect ratio:** `aspect-[3/4]` (padronizado)
- **Badges position:** `top-3 left-3` (espaçamento fixo 12px das bordas)
- **Image hover scale:** `1.03` (3% de aumento, não utilizar outro valor)

### Iconography

- Sem ícones nos cards (apenas texto para badges e preço)

---

## Layout & Flow

```
Mobile (< 640px):
  Grid: 2 colunas, gap-4
  Aspect ratio: 3/4
  Imagem hover: DESATIVADO (touch não tem hover)
  Zoom: NÃO APLICÁVEL

Tablet (640px - 1024px):
  Grid: 2-3 colunas, gap-4
  Imagem hover: ATIVO se hover disponível

Desktop (> 1024px):
  Grid: 3-4 colunas, gap-4
  Imagem hover: ATIVO
  Zoom completo
```

---

## Interactions

| Elemento             | Gesture/Trigger       | Response                                             | Timing | Easing                       |
| -------------------- | --------------------- | ---------------------------------------------------- | ------ | ---------------------------- |
| Card link            | Click/tap             | Navega para página de produto                        | 0ms    | —                            |
| Imagem               | Hover (desktop mouse) | Troca para imagem hover                              | 200ms  | cubic-bezier(0.4, 0, 0.2, 1) |
| Imagem               | Hover (desktop mouse) | Zoom suave (scale 1.03)                              | 200ms  | cubic-bezier(0.4, 0, 0.2, 1) |
| Imagem               | Touch tap             | Sem overlay, sem zoom (toggle de visualização única) | 0ms    | —                            |
| Badges               | —                     | Nenhum efeito (estado absoluto, não são interativos) | 0ms    | —                            |
| Skeleton             | Carregamento          | Exibe `bg-muted/20` com animação `animate-pulse`     | 1500ms | —                            |
| Imagem               | Load complete         | Fade in da imagem real                               | 300ms  | ease-out                     |
| Carrossel miniaturas | Scroll horizontal     | Scroll suave com `snap-x`                            | 300ms  | —                            |

### Hover States

- **Imagem:** `scale-[1.03]`, transição `transition-transform duration-200`
- **Link:** Sem underlining, cursor pointer
- **Card:** Nenhuma borda adicional, apenas zoom da imagem

---

## Responsiveness

```
Mobile First:
  - 2 colunas em grid
  - Badges: flutuantes (position: absolute, top/left: 12px)
  - Imagem: prioridade eager para as primeiras 4 produtos, demais: lazy
  - Touch: hover completamente desativado, zoom desativado

Desktop (>= 1024px):
  - 4 colunas
  - Badges: mesma posição absoluta
  - Hover completo com zoom 1.03 e troca de imagem
  - Imagem hover aplicada se images.length > 1
```

---

## Accessibility

- Skeletons: `aria-label="Carregando produtos..."` no container
- Badges: `aria-label="Novo produto"` ou `aria-label="Produto em promoção"`
- Imagens: `alt={product.name}` obrigatório (nunca deixar em branco)
- Contraste de texto no badge PROMO: garantir `text-accent-foreground` seja branco para contraste com blush (#d98a8a) [verificar se atinge WCAG AA para texto pequeno]
- Evitar `autoFocus` ou animações automáticas que podem causar desorientação
- Focus states: outline `2px solid` com `ring-blush` (para teclado/tab navigation)

---

## Animations

| Animation      | Trigger                         | Duration          | Easing                       | Properties             |
| -------------- | ------------------------------- | ----------------- | ---------------------------- | ---------------------- |
| Image zoom in  | Mouse enter card                | 200ms             | cubic-bezier(0.4, 0, 0.2, 1) | transform: scale(1.03) |
| Image zoom out | Mouse leave card                | 200ms             | cubic-bezier(0.4, 0, 0.2, 1) | transform: scale(1)    |
| Image switch   | Hover com segunda imagem        | 200ms             |                              | opacity: 0 → 1         |
| Skeleton pulse | Component mount + loading state | 1500ms (infinite) | ease-in-out                  | opacity pulse          |
| Image fade-in  | onLoad event                    | 300ms             | ease-out                     | opacity: 0 → 1         |

---

## Assets

| Asset             | Placement                          | Format   | Size        | Notes             |
| ----------------- | ---------------------------------- | -------- | ----------- | ----------------- |
| `placeholder.svg` | Fallback quando imagem não carrega | SVG      | 1200x1600px | Cor cinza neutro  |
| `bg-muted/20`     | Skeleton background                | CSS      | —           | oklch equivalente |
| Product images    | Container aspect-[3/4]             | WebP/JPG | 800x1067px  | 3:4 aspect ratio  |

---

## Dependencies

- `lucide-react` (para ícones, caso sejam necessários em estado vazio)
- `framer-motion` (opcional, caso seja necessário animar listas)
- Tailwind CSS (já no projeto)

---

## References

- Zara: minimalista, pouca informação nas miniaturas
- Renner: hover suave, badges discretos
- Dafiti: grid flexível, informação essencial
- Amaro: fotos com fundo limpo, foco no produto

---

_UI Spec Version: 1.0_
_Last Updated: 2026-06-09_
