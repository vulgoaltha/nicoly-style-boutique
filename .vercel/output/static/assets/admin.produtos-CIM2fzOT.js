import { ad as h, D as e, O as f, ab as j, L as i, a1 as n, a6 as c } from "./index-C2UuTsl-.js";
import { u as p } from "./useQuery-tYhz7w83.js";
import { b as l } from "./format-W46puzMN.js";
import { O as m } from "./OptimizedImage-fk-J_3Yj.js";
import { P as N } from "./plus-CNmxyVSh.js";
import { S as x } from "./square-pen-CX39pK_k.js";
import { T as u } from "./trash-2-DsdEvVgJ.js";
import "./skeleton-0MS9dn16.js";
import "./image-off-Df7chaH8.js";
function $() {
  const a = h({ select: (d) => d.location.pathname });
  return a === "/admin/produtos" || a === "/admin/produtos/" ? e.jsx(v, {}) : e.jsx(f, {});
}
function v() {
  const a = j(),
    { data: t = [], isLoading: d } = p({
      queryKey: ["admin-products"],
      queryFn: async () => {
        const { data: s, error: r } = await n
          .from("products")
          .select("id,slug,name,price,sale_price,images,sku,stock,is_active")
          .order("created_at", { ascending: !1 });
        if (r) throw r;
        return s;
      },
    }),
    o = async (s) => {
      if (!confirm("Remover este produto?")) return;
      const { error: r } = await n.from("products").delete().eq("id", s);
      if (r) return c.error(r.message);
      (c.success("Produto removido"), a.invalidateQueries({ queryKey: ["admin-products"] }));
    };
  return e.jsxs("div", {
    children: [
      e.jsxs("div", {
        className: "flex items-center justify-between mb-6 md:mb-8 gap-4",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", { className: "font-display text-2xl md:text-3xl", children: "Produtos" }),
              e.jsxs("p", {
                className: "text-sm text-muted-foreground",
                children: [t.length, " cadastrados"],
              }),
            ],
          }),
          e.jsxs(i, {
            to: "/admin/produtos/novo",
            className:
              "inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2.5 md:px-4 text-xs tracking-editorial uppercase rounded-sm flex-shrink-0",
            children: [
              e.jsx(N, { className: "h-4 w-4" }),
              e.jsx("span", { className: "hidden sm:inline", children: "Novo produto" }),
              e.jsx("span", { className: "sm:hidden", children: "Novo" }),
            ],
          }),
        ],
      }),
      d
        ? e.jsx("div", {
            className: "p-10 text-center text-sm text-muted-foreground",
            children: "Carregando...",
          })
        : t.length === 0
          ? e.jsx("div", {
              className: "p-10 text-center text-sm text-muted-foreground",
              children: "Nenhum produto. Comece criando seu primeiro.",
            })
          : e.jsxs(e.Fragment, {
              children: [
                e.jsx("div", {
                  className: "md:hidden space-y-3",
                  children: t.map((s) =>
                    e.jsxs(
                      "div",
                      {
                        className: "flex gap-3 p-3 bg-background border border-border rounded-sm",
                        children: [
                          e.jsx("div", {
                            className:
                              "w-14 h-18 flex-shrink-0 bg-secondary rounded overflow-hidden",
                            style: { height: "4.5rem" },
                            children:
                              s.images[0] &&
                              e.jsx(m, {
                                src: s.images[0],
                                alt: "",
                                containerClassName: "h-full w-full",
                                className: "h-full w-full object-cover",
                              }),
                          }),
                          e.jsx("div", {
                            className: "flex-1 min-w-0 flex flex-col justify-between",
                            children: e.jsxs("div", {
                              children: [
                                e.jsx("div", {
                                  className: "font-medium text-sm truncate",
                                  children: s.name,
                                }),
                                e.jsx("div", {
                                  className: "text-xs text-muted-foreground",
                                  children: s.sku || "—",
                                }),
                                e.jsxs("div", {
                                  className: "flex items-center gap-2 mt-1 flex-wrap",
                                  children: [
                                    e.jsx("span", {
                                      className: "text-sm font-medium",
                                      children: l(s.sale_price ?? s.price),
                                    }),
                                    e.jsx("span", {
                                      className: `text-xs px-1.5 py-0.5 rounded ${s.is_active ? "bg-blush-soft text-blush-deep" : "bg-secondary text-muted-foreground"}`,
                                      children: s.is_active ? "Ativo" : "Inativo",
                                    }),
                                    e.jsxs("span", {
                                      className: `text-xs ${s.stock === 0 ? "text-destructive" : "text-muted-foreground"}`,
                                      children: ["Estoque: ", s.stock],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          e.jsxs("div", {
                            className: "flex flex-col gap-1 flex-shrink-0 justify-center",
                            children: [
                              e.jsx(i, {
                                to: "/admin/produtos/$id",
                                params: { id: s.id },
                                className:
                                  "flex h-9 w-9 items-center justify-center hover:bg-secondary rounded transition",
                                "aria-label": "Editar produto",
                                children: e.jsx(x, { className: "h-4 w-4" }),
                              }),
                              e.jsx("button", {
                                onClick: () => o(s.id),
                                className:
                                  "flex h-9 w-9 items-center justify-center hover:bg-secondary rounded text-destructive transition",
                                "aria-label": "Remover produto",
                                children: e.jsx(u, { className: "h-4 w-4" }),
                              }),
                            ],
                          }),
                        ],
                      },
                      s.id,
                    ),
                  ),
                }),
                e.jsx("div", {
                  className:
                    "hidden md:block bg-background border border-border rounded-sm overflow-hidden",
                  children: e.jsxs("table", {
                    className: "w-full text-sm",
                    children: [
                      e.jsx("thead", {
                        className:
                          "bg-secondary/50 text-xs tracking-editorial uppercase text-muted-foreground",
                        children: e.jsxs("tr", {
                          children: [
                            e.jsx("th", { className: "text-left p-3", children: "Produto" }),
                            e.jsx("th", { className: "text-left p-3", children: "Preço" }),
                            e.jsx("th", { className: "text-left p-3", children: "Estoque" }),
                            e.jsx("th", { className: "text-left p-3", children: "Status" }),
                            e.jsx("th", { className: "p-3" }),
                          ],
                        }),
                      }),
                      e.jsx("tbody", {
                        children: t.map((s) =>
                          e.jsxs(
                            "tr",
                            {
                              className:
                                "border-t border-border hover:bg-secondary/20 transition-colors",
                              children: [
                                e.jsx("td", {
                                  className: "p-3",
                                  children: e.jsxs("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "w-10 h-12 bg-secondary rounded overflow-hidden flex-shrink-0",
                                        children:
                                          s.images[0] &&
                                          e.jsx(m, {
                                            src: s.images[0],
                                            alt: "",
                                            containerClassName: "h-full w-full",
                                            className: "h-full w-full object-cover",
                                          }),
                                      }),
                                      e.jsxs("div", {
                                        children: [
                                          e.jsx("div", {
                                            className: "font-medium",
                                            children: s.name,
                                          }),
                                          e.jsx("div", {
                                            className: "text-xs text-muted-foreground",
                                            children: s.sku || "—",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                                e.jsx("td", {
                                  className: "p-3",
                                  children: l(s.sale_price ?? s.price),
                                }),
                                e.jsx("td", {
                                  className: `p-3 ${s.stock === 0 ? "text-destructive" : ""}`,
                                  children: s.stock,
                                }),
                                e.jsx("td", {
                                  className: "p-3",
                                  children: e.jsx("span", {
                                    className: `text-xs px-2 py-1 rounded ${s.is_active ? "bg-blush-soft text-blush-deep" : "bg-secondary text-muted-foreground"}`,
                                    children: s.is_active ? "Ativo" : "Inativo",
                                  }),
                                }),
                                e.jsx("td", {
                                  className: "p-3 text-right",
                                  children: e.jsxs("div", {
                                    className: "flex justify-end gap-1",
                                    children: [
                                      e.jsx(i, {
                                        to: "/admin/produtos/$id",
                                        params: { id: s.id },
                                        className: "p-2 hover:bg-secondary rounded",
                                        "aria-label": "Editar",
                                        children: e.jsx(x, { className: "h-4 w-4" }),
                                      }),
                                      e.jsx("button", {
                                        onClick: () => o(s.id),
                                        className:
                                          "p-2 hover:bg-secondary rounded text-destructive",
                                        "aria-label": "Remover",
                                        children: e.jsx(u, { className: "h-4 w-4" }),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            s.id,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
              ],
            }),
    ],
  });
}
export { $ as component };
