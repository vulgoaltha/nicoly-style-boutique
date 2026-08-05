import {
  f as k,
  a8 as C,
  Q as o,
  a1 as S,
  G as q,
  D as e,
  L as h,
  S as z,
  a6 as l,
} from "./index-C2UuTsl-.js";
import { u as I } from "./useQuery-tYhz7w83.js";
import { b as d } from "./format-W46puzMN.js";
import { O as g } from "./OptimizedImage-fk-J_3Yj.js";
import { M as O } from "./minus-g-vitRhv.js";
import { P } from "./plus-CNmxyVSh.js";
import { H as E } from "./heart-jI1E_ZlV.js";
import { T as _ } from "./truck-_8doA-LZ.js";
import "./skeleton-0MS9dn16.js";
import "./image-off-Df7chaH8.js";
function H() {
  const { slug: m } = k.useParams(),
    f = C((a) => a.add),
    [x, u] = o.useState(1),
    [n, j] = o.useState(),
    [t, b] = o.useState(),
    [c, N] = o.useState(0),
    { data: s, isLoading: y } = I({
      queryKey: ["product", m],
      queryFn: async () => {
        const { data: a, error: r } = await S.from("products")
          .select("id,slug,name,price,sale_price,images,is_new,sku,stock,description,sizes,colors")
          .eq("slug", m)
          .eq("is_active", !0)
          .maybeSingle();
        if (r) throw r;
        if (!a) throw q();
        return a;
      },
    });
  if (y)
    return e.jsxs("div", {
      className: "container-editorial py-10 md:py-16 grid md:grid-cols-2 gap-8 md:gap-12",
      children: [
        e.jsx("div", { className: "aspect-[3/4] bg-secondary animate-pulse rounded-sm" }),
        e.jsxs("div", {
          className: "space-y-4",
          children: [
            e.jsx("div", { className: "h-8 bg-secondary animate-pulse rounded w-3/4" }),
            e.jsx("div", { className: "h-4 bg-secondary animate-pulse rounded w-1/3" }),
          ],
        }),
      ],
    });
  if (!s) return null;
  const i = s.sale_price ?? s.price,
    p = s.sale_price !== null && s.sale_price < s.price,
    v = () => {
      if (s.sizes.length && !n) {
        l.error("Escolha um tamanho");
        return;
      }
      if (s.colors.length && !t) {
        l.error("Escolha uma cor");
        return;
      }
      (f({
        productId: s.id,
        slug: s.slug,
        name: s.name,
        image: s.images[0] ?? "",
        price: i,
        size: n,
        color: t,
        quantity: x,
      }),
        l.success("Adicionado à sacola"));
    },
    w = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: s.name,
      image: s.images,
      description: s.description || `Compre ${s.name} na Nicoly Modas`,
      sku: s.sku || s.id,
      offers: {
        "@type": "Offer",
        url: window.location.href,
        priceCurrency: "BRL",
        price: i,
        itemCondition: "https://schema.org/NewCondition",
        availability: s.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    };
  return e.jsxs("div", {
    className: "container-editorial py-6 md:py-16",
    children: [
      e.jsx("script", { type: "application/ld+json", children: JSON.stringify(w) }),
      e.jsxs("nav", {
        className:
          "text-xs text-muted-foreground mb-5 tracking-editorial uppercase flex items-center gap-1 flex-wrap",
        children: [
          e.jsx(h, { to: "/", className: "hover:text-foreground", children: "Início" }),
          e.jsx("span", { children: "/" }),
          e.jsx(h, { to: "/loja", className: "hover:text-foreground", children: "Loja" }),
          e.jsx("span", { children: "/" }),
          e.jsx("span", { className: "text-foreground", children: s.name }),
        ],
      }),
      e.jsxs("div", {
        className: "grid md:grid-cols-2 gap-6 md:gap-12",
        children: [
          e.jsxs("div", {
            className: "space-y-3",
            children: [
              e.jsx("div", {
                className: "aspect-[3/4] bg-secondary rounded-sm overflow-hidden",
                children:
                  s.images[c] &&
                  e.jsx(g, {
                    src: s.images[c],
                    alt: s.name,
                    containerClassName: "h-full w-full",
                    className: "h-full w-full object-cover",
                  }),
              }),
              s.images.length > 1 &&
                e.jsx("div", {
                  className: "flex gap-2 overflow-x-auto scrollbar-hide pb-1",
                  children: s.images.map((a, r) =>
                    e.jsx(
                      "button",
                      {
                        onClick: () => N(r),
                        className: `flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 overflow-hidden rounded-sm border-2 transition ${r === c ? "border-blush" : "border-transparent"}`,
                        "aria-label": `Ver imagem ${r + 1}`,
                        children: e.jsx(g, {
                          src: a,
                          alt: "",
                          containerClassName: "h-full w-full",
                          className: "h-full w-full object-cover",
                        }),
                      },
                      r,
                    ),
                  ),
                }),
            ],
          }),
          e.jsxs("div", {
            className: "space-y-5",
            children: [
              e.jsxs("div", {
                children: [
                  e.jsx("h1", {
                    className: "font-display text-2xl sm:text-3xl md:text-4xl",
                    children: s.name,
                  }),
                  e.jsxs("div", {
                    className: "mt-3 flex items-baseline gap-3",
                    children: [
                      p &&
                        e.jsx("span", {
                          className: "text-muted-foreground line-through text-sm",
                          children: d(s.price),
                        }),
                      e.jsx("span", {
                        className: `text-2xl ${p ? "text-blush-deep" : ""}`,
                        children: d(i),
                      }),
                    ],
                  }),
                  e.jsxs("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children: ["ou 3x de ", d(i / 3), " sem juros"],
                  }),
                ],
              }),
              s.description &&
                e.jsx("p", {
                  className: "text-sm text-muted-foreground leading-relaxed",
                  children: s.description,
                }),
              s.colors.length > 0 &&
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "text-xs tracking-editorial uppercase mb-2",
                      children: [
                        "Cor",
                        " ",
                        t &&
                          e.jsxs("span", {
                            className: "text-muted-foreground normal-case tracking-normal",
                            children: ["— ", t],
                          }),
                      ],
                    }),
                    e.jsx("div", {
                      className: "flex flex-wrap gap-2",
                      children: s.colors.map((a) =>
                        e.jsx(
                          "button",
                          {
                            onClick: () => b(a),
                            className: `px-3 py-2 min-h-[44px] text-xs border rounded-sm transition ${t === a ? "border-foreground bg-secondary" : "border-border"}`,
                            children: a,
                          },
                          a,
                        ),
                      ),
                    }),
                  ],
                }),
              s.sizes.length > 0 &&
                e.jsxs("div", {
                  children: [
                    e.jsx("div", {
                      className: "text-xs tracking-editorial uppercase mb-2",
                      children: "Tamanho",
                    }),
                    e.jsx("div", {
                      className: "flex flex-wrap gap-2",
                      children: s.sizes.map((a) =>
                        e.jsx(
                          "button",
                          {
                            onClick: () => j(a),
                            className: `min-w-[44px] min-h-[44px] px-3 py-2 text-xs border rounded-sm transition ${n === a ? "border-foreground bg-secondary" : "border-border"}`,
                            children: a,
                          },
                          a,
                        ),
                      ),
                    }),
                  ],
                }),
              e.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center border border-border rounded-sm",
                    children: [
                      e.jsx("button", {
                        onClick: () => u((a) => Math.max(1, a - 1)),
                        className: "flex h-11 w-11 items-center justify-center",
                        "aria-label": "Diminuir quantidade",
                        children: e.jsx(O, { className: "h-3 w-3" }),
                      }),
                      e.jsx("span", { className: "w-8 text-center text-sm", children: x }),
                      e.jsx("button", {
                        onClick: () => u((a) => a + 1),
                        className: "flex h-11 w-11 items-center justify-center",
                        "aria-label": "Aumentar quantidade",
                        children: e.jsx(P, { className: "h-3 w-3" }),
                      }),
                    ],
                  }),
                  e.jsxs("button", {
                    onClick: v,
                    disabled: s.stock === 0,
                    className:
                      "flex-1 bg-primary text-primary-foreground px-6 h-11 text-xs tracking-editorial uppercase rounded-sm hover:bg-blush-deep transition disabled:opacity-40 inline-flex items-center justify-center gap-2",
                    children: [
                      e.jsx(z, { className: "h-4 w-4" }),
                      s.stock === 0 ? "Esgotado" : "Adicionar à sacola",
                    ],
                  }),
                  e.jsx("button", {
                    className:
                      "flex h-11 w-11 items-center justify-center border border-border rounded-sm hover:text-blush transition",
                    "aria-label": "Favoritar produto",
                    children: e.jsx(E, { className: "h-4 w-4" }),
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "border-t border-border pt-4 space-y-2 text-xs text-muted-foreground",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [e.jsx(_, { className: "h-3.5 w-3.5" }), " Envio para todo o Brasil"],
                  }),
                  s.sku && e.jsxs("div", { children: ["SKU: ", s.sku] }),
                  s.stock > 0 &&
                    s.stock < 5 &&
                    e.jsxs("div", {
                      className: "text-blush-deep",
                      children: ["Últimas ", s.stock, " unidades"],
                    }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { H as component };
