import { a8 as r, D as e, S as i, L as a, X as x } from "./index-C2UuTsl-.js";
import { b as t } from "./format-W46puzMN.js";
import { M as m } from "./minus-g-vitRhv.js";
import { P as u } from "./plus-CNmxyVSh.js";
function b() {
  const d = r((s) => s.items),
    o = r((s) => s.remove),
    n = r((s) => s.setQty),
    l = r((s) => s.subtotal());
  return d.length
    ? e.jsxs("div", {
        className: "container-editorial py-8 md:py-16",
        children: [
          e.jsx("h1", {
            className: "font-display text-3xl md:text-4xl mb-6 md:mb-8",
            children: "Sua sacola",
          }),
          e.jsxs("div", {
            className: "grid md:grid-cols-3 gap-6 md:gap-10",
            children: [
              e.jsx("div", {
                className: "md:col-span-2 space-y-3 md:space-y-4",
                children: d.map((s) => {
                  const c = `${s.productId}_${s.size ?? ""}_${s.color ?? ""}`;
                  return e.jsxs(
                    "div",
                    {
                      className: "flex gap-3 sm:gap-4 border border-border p-3 sm:p-4 rounded-sm",
                      children: [
                        e.jsx("div", {
                          className:
                            "w-20 h-28 sm:w-24 sm:h-32 bg-secondary rounded-sm overflow-hidden flex-shrink-0",
                          children:
                            s.image &&
                            e.jsx("img", {
                              src: s.image,
                              alt: s.name,
                              className: "h-full w-full object-cover",
                            }),
                        }),
                        e.jsxs("div", {
                          className: "flex-1 min-w-0 flex flex-col justify-between",
                          children: [
                            e.jsxs("div", {
                              className: "flex justify-between gap-2",
                              children: [
                                e.jsxs("div", {
                                  className: "min-w-0",
                                  children: [
                                    e.jsx(a, {
                                      to: "/produto/$slug",
                                      params: { slug: s.slug },
                                      className:
                                        "font-medium hover:text-blush text-sm block truncate",
                                      children: s.name,
                                    }),
                                    e.jsxs("div", {
                                      className:
                                        "text-xs text-muted-foreground mt-1 flex gap-2 flex-wrap",
                                      children: [
                                        s.size && e.jsxs("span", { children: ["Tam: ", s.size] }),
                                        s.color && e.jsxs("span", { children: ["Cor: ", s.color] }),
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsx("button", {
                                  onClick: () => o(s.productId, s.size, s.color),
                                  className:
                                    "flex-shrink-0 flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground rounded",
                                  "aria-label": "Remover item",
                                  children: e.jsx(x, { className: "h-4 w-4" }),
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "flex items-end justify-between mt-2 gap-2",
                              children: [
                                e.jsxs("div", {
                                  className:
                                    "flex items-center border border-border rounded-sm text-sm",
                                  children: [
                                    e.jsx("button", {
                                      onClick: () =>
                                        n(s.productId, s.quantity - 1, s.size, s.color),
                                      className: "flex h-9 w-9 items-center justify-center",
                                      "aria-label": "Diminuir quantidade",
                                      children: e.jsx(m, { className: "h-3 w-3" }),
                                    }),
                                    e.jsx("span", {
                                      className: "w-8 text-center text-sm",
                                      children: s.quantity,
                                    }),
                                    e.jsx("button", {
                                      onClick: () =>
                                        n(s.productId, s.quantity + 1, s.size, s.color),
                                      className: "flex h-9 w-9 items-center justify-center",
                                      "aria-label": "Aumentar quantidade",
                                      children: e.jsx(u, { className: "h-3 w-3" }),
                                    }),
                                  ],
                                }),
                                e.jsx("div", {
                                  className: "font-medium text-sm",
                                  children: t(s.price * s.quantity),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    c,
                  );
                }),
              }),
              e.jsxs("div", {
                className:
                  "hidden md:block space-y-4 border border-border p-6 rounded-sm h-fit bg-secondary/30",
                children: [
                  e.jsx("h2", { className: "font-display text-xl", children: "Resumo" }),
                  e.jsxs("div", {
                    className: "flex justify-between text-sm",
                    children: [
                      e.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                      e.jsx("span", { children: t(l) }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "flex justify-between text-sm",
                    children: [
                      e.jsx("span", { className: "text-muted-foreground", children: "Frete" }),
                      e.jsx("span", {
                        className: "text-muted-foreground",
                        children: "Calculado no checkout",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "border-t border-border pt-4 flex justify-between font-medium",
                    children: [
                      e.jsx("span", { children: "Total" }),
                      e.jsx("span", { children: t(l) }),
                    ],
                  }),
                  e.jsx(a, {
                    to: "/checkout",
                    className:
                      "block text-center w-full bg-primary text-primary-foreground py-3.5 text-xs tracking-editorial uppercase rounded-sm hover:opacity-90 transition",
                    children: "Finalizar compra",
                  }),
                  e.jsx("p", {
                    className: "text-xs text-muted-foreground text-center",
                    children: "Pagamento seguro via Mercado Pago.",
                  }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            className:
              "md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border px-4 py-3 flex items-center gap-3 pb-safe",
            children: [
              e.jsxs("div", {
                className: "flex-1 min-w-0",
                children: [
                  e.jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "Subtotal",
                  }),
                  e.jsx("div", { className: "font-display text-lg font-medium", children: t(l) }),
                ],
              }),
              e.jsx(a, {
                to: "/checkout",
                className:
                  "flex-shrink-0 bg-primary text-primary-foreground px-6 py-3 text-xs tracking-editorial uppercase rounded-sm hover:opacity-90 transition",
                children: "Finalizar compra",
              }),
            ],
          }),
          e.jsx("div", { className: "md:hidden h-24" }),
        ],
      })
    : e.jsxs("div", {
        className: "container-editorial py-24 text-center",
        children: [
          e.jsx(i, { className: "h-12 w-12 mx-auto text-muted-foreground" }),
          e.jsx("h1", {
            className: "font-display text-3xl mt-4",
            children: "Sua sacola está vazia",
          }),
          e.jsx("p", {
            className: "text-muted-foreground mt-2 text-sm",
            children: "Explore nossa coleção e encontre seu próximo look.",
          }),
          e.jsx(a, {
            to: "/loja",
            className:
              "mt-6 inline-flex items-center bg-primary text-primary-foreground px-6 py-3 text-xs tracking-editorial uppercase rounded-sm",
            children: "Ir para a loja",
          }),
        ],
      });
}
export { b as component };
