import { r as o, j as e } from "../_libs/react.mjs";
import { L as h } from "../_libs/tanstack__react-router.mjs";
import { I as k } from "../_libs/tanstack__router-core.mjs";
import { a as C } from "../_libs/tanstack__react-query.mjs";
import { t as c } from "../_libs/sonner.mjs";
import { p as S } from "./client-DbGX8m2J.mjs";
import { a as q, f as _ } from "./router-CzERE3r3.mjs";
import { r as d } from "./format-W46puzMN.mjs";
import { L as g } from "./OptimizedImage-B1MobQs0.mjs";
import "../_libs/seroval.mjs";
import { N as $, T as E, _ as L, H as z, a8 as I } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zustand.mjs";
import "./payment.functions-DaljBhjR.mjs";
import "./server-DXgSSFBn.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-Ia7fKZJE.mjs";
import "../_libs/zod.mjs";
import "./client.server-_0x--M5Y.mjs";
import "./skeleton-C6nji2Jz.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function Ce() {
  const { slug: m } = q.useParams(),
    f = _((r) => r.add),
    [p, x] = o.useState(1),
    [n, j] = o.useState(),
    [t, b] = o.useState(),
    [l, N] = o.useState(0),
    { data: s, isLoading: v } = C({
      queryKey: ["product", m],
      queryFn: async () => {
        const { data: r, error: a } = await S.from("products")
          .select("id,slug,name,price,sale_price,images,is_new,sku,stock,description,sizes,colors")
          .eq("slug", m)
          .eq("is_active", !0)
          .maybeSingle();
        if (a) throw a;
        if (!r) throw k();
        return r;
      },
    });
  if (v)
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
    u = s.sale_price !== null && s.sale_price < s.price,
    y = () => {
      if (s.sizes.length && !n) {
        c.error("Escolha um tamanho");
        return;
      }
      if (s.colors.length && !t) {
        c.error("Escolha uma cor");
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
        quantity: p,
      }),
        c.success("Adicionado à sacola"));
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
                  s.images[l] &&
                  e.jsx(g, {
                    src: s.images[l],
                    alt: s.name,
                    containerClassName: "h-full w-full",
                    className: "h-full w-full object-cover",
                  }),
              }),
              s.images.length > 1 &&
                e.jsx("div", {
                  className: "flex gap-2 overflow-x-auto scrollbar-hide pb-1",
                  children: s.images.map((r, a) =>
                    e.jsx(
                      "button",
                      {
                        onClick: () => N(a),
                        className: `flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 overflow-hidden rounded-sm border-2 transition ${a === l ? "border-blush" : "border-transparent"}`,
                        "aria-label": `Ver imagem ${a + 1}`,
                        children: e.jsx(g, {
                          src: r,
                          alt: "",
                          containerClassName: "h-full w-full",
                          className: "h-full w-full object-cover",
                        }),
                      },
                      a,
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
                      u &&
                        e.jsx("span", {
                          className: "text-muted-foreground line-through text-sm",
                          children: d(s.price),
                        }),
                      e.jsx("span", {
                        className: `text-2xl ${u ? "text-blush-deep" : ""}`,
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
                      children: s.colors.map((r) =>
                        e.jsx(
                          "button",
                          {
                            onClick: () => b(r),
                            className: `px-3 py-2 min-h-[44px] text-xs border rounded-sm transition ${t === r ? "border-foreground bg-secondary" : "border-border"}`,
                            children: r,
                          },
                          r,
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
                      children: s.sizes.map((r) =>
                        e.jsx(
                          "button",
                          {
                            onClick: () => j(r),
                            className: `min-w-[44px] min-h-[44px] px-3 py-2 text-xs border rounded-sm transition ${n === r ? "border-foreground bg-secondary" : "border-border"}`,
                            children: r,
                          },
                          r,
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
                        onClick: () => x((r) => Math.max(1, r - 1)),
                        className: "flex h-11 w-11 items-center justify-center",
                        "aria-label": "Diminuir quantidade",
                        children: e.jsx($, { className: "h-3 w-3" }),
                      }),
                      e.jsx("span", { className: "w-8 text-center text-sm", children: p }),
                      e.jsx("button", {
                        onClick: () => x((r) => r + 1),
                        className: "flex h-11 w-11 items-center justify-center",
                        "aria-label": "Aumentar quantidade",
                        children: e.jsx(E, { className: "h-3 w-3" }),
                      }),
                    ],
                  }),
                  e.jsxs("button", {
                    onClick: y,
                    disabled: s.stock === 0,
                    className:
                      "flex-1 bg-primary text-primary-foreground px-6 h-11 text-xs tracking-editorial uppercase rounded-sm hover:bg-blush-deep transition disabled:opacity-40 inline-flex items-center justify-center gap-2",
                    children: [
                      e.jsx(L, { className: "h-4 w-4" }),
                      s.stock === 0 ? "Esgotado" : "Adicionar à sacola",
                    ],
                  }),
                  e.jsx("button", {
                    className:
                      "flex h-11 w-11 items-center justify-center border border-border rounded-sm hover:text-blush transition",
                    "aria-label": "Favoritar produto",
                    children: e.jsx(z, { className: "h-4 w-4" }),
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "border-t border-border pt-4 space-y-2 text-xs text-muted-foreground",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [e.jsx(I, { className: "h-3.5 w-3.5" }), " Envio para todo o Brasil"],
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
export { Ce as component };
