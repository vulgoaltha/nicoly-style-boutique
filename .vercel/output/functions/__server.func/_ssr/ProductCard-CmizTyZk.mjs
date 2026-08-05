import { r as u, j as e } from "../_libs/react.mjs";
import { L as d } from "../_libs/tanstack__react-router.mjs";
import { r as n } from "./format-W46puzMN.mjs";
import { L as c } from "./OptimizedImage-B1MobQs0.mjs";
function b({ product: s }) {
  const r = s.images ?? [],
    o = r[0],
    a = r[1],
    m = s.sale_price ?? s.price,
    l = s.sale_price !== null && s.sale_price < s.price,
    [t, i] = u.useState(!1);
  return e.jsxs(d, {
    to: "/produto/$slug",
    params: { slug: s.slug },
    className: "group block",
    onMouseEnter: () => i(!0),
    onMouseLeave: () => i(!1),
    children: [
      e.jsxs("div", {
        className: "relative aspect-[3/4] overflow-hidden rounded-sm",
        children: [
          o
            ? e.jsxs(e.Fragment, {
                children: [
                  e.jsx(c, {
                    src: o,
                    alt: s.name,
                    className: `absolute inset-0 h-full w-full object-cover transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${t ? "scale-[1.03]" : "scale-100"} ${a && t ? "opacity-0" : "opacity-100"}`,
                    containerClassName: "absolute inset-0 w-full h-full",
                  }),
                  a &&
                    e.jsx(c, {
                      src: a,
                      alt: s.name,
                      className: `absolute inset-0 h-full w-full object-cover transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${t ? "opacity-100 scale-[1.03]" : "opacity-0 scale-100"}`,
                      containerClassName: "absolute inset-0 w-full h-full",
                      loading: "lazy",
                    }),
                ],
              })
            : e.jsx("div", {
                className: "flex h-full items-center justify-center text-muted-foreground text-xs",
                children: "Sem imagem",
              }),
          e.jsxs("div", {
            className: "absolute top-3 left-3 flex flex-col gap-1 z-10",
            children: [
              s.is_new &&
                e.jsx("span", {
                  className:
                    "bg-background/90 backdrop-blur-sm text-foreground text-[10px] uppercase tracking-editorial px-2 py-1 rounded-sm font-medium",
                  "aria-label": "Novo produto",
                  children: "Novo",
                }),
              l &&
                e.jsx("span", {
                  className:
                    "bg-blush text-accent-foreground text-[10px] uppercase tracking-editorial px-2 py-1 rounded-sm font-medium",
                  "aria-label": "Produto em promoção",
                  children: "Promo",
                }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "mt-3 space-y-1",
        children: [
          e.jsx("h3", {
            className: "text-sm font-medium leading-tight line-clamp-2 font-display",
            children: s.name,
          }),
          e.jsxs("div", {
            className: "flex items-baseline gap-2 text-sm",
            children: [
              l &&
                e.jsx("span", {
                  className: "text-muted-foreground line-through text-xs",
                  children: n(s.price),
                }),
              e.jsx("span", {
                className: l ? "text-blush-deep font-medium" : "font-medium",
                children: n(m),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { b as v };
