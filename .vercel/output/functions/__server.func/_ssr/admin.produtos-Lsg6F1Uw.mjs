import { j as e } from "../_libs/react.mjs";
import { f as u, O as h, L as i } from "../_libs/tanstack__react-router.mjs";
import { b as f, a as j } from "../_libs/tanstack__react-query.mjs";
import { t as o } from "../_libs/sonner.mjs";
import { p as l } from "./client-DbGX8m2J.mjs";
import { r as n } from "./format-W46puzMN.mjs";
import { L as c } from "./OptimizedImage-B1MobQs0.mjs";
import { T as N, a0 as m, a5 as x } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
import "./skeleton-C6nji2Jz.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function ee() {
  const a = u({ select: (r) => r.location.pathname });
  return a === "/admin/produtos" || a === "/admin/produtos/" ? e.jsx(v, {}) : e.jsx(h, {});
}
function v() {
  const a = f(),
    { data: r = [], isLoading: p } = j({
      queryKey: ["admin-products"],
      queryFn: async () => {
        const { data: s, error: t } = await l
          .from("products")
          .select("id,slug,name,price,sale_price,images,sku,stock,is_active")
          .order("created_at", { ascending: !1 });
        if (t) throw t;
        return s;
      },
    }),
    d = async (s) => {
      if (!confirm("Remover este produto?")) return;
      const { error: t } = await l.from("products").delete().eq("id", s);
      if (t) return o.error(t.message);
      (o.success("Produto removido"), a.invalidateQueries({ queryKey: ["admin-products"] }));
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
                children: [r.length, " cadastrados"],
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
      p
        ? e.jsx("div", {
            className: "p-10 text-center text-sm text-muted-foreground",
            children: "Carregando...",
          })
        : r.length === 0
          ? e.jsx("div", {
              className: "p-10 text-center text-sm text-muted-foreground",
              children: "Nenhum produto. Comece criando seu primeiro.",
            })
          : e.jsxs(e.Fragment, {
              children: [
                e.jsx("div", {
                  className: "md:hidden space-y-3",
                  children: r.map((s) =>
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
                              e.jsx(c, {
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
                                      children: n(s.sale_price ?? s.price),
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
                                children: e.jsx(m, { className: "h-4 w-4" }),
                              }),
                              e.jsx("button", {
                                onClick: () => d(s.id),
                                className:
                                  "flex h-9 w-9 items-center justify-center hover:bg-secondary rounded text-destructive transition",
                                "aria-label": "Remover produto",
                                children: e.jsx(x, { className: "h-4 w-4" }),
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
                        children: r.map((s) =>
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
                                          e.jsx(c, {
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
                                  children: n(s.sale_price ?? s.price),
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
                                        children: e.jsx(m, { className: "h-4 w-4" }),
                                      }),
                                      e.jsx("button", {
                                        onClick: () => d(s.id),
                                        className:
                                          "p-2 hover:bg-secondary rounded text-destructive",
                                        "aria-label": "Remover",
                                        children: e.jsx(x, { className: "h-4 w-4" }),
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
export { ee as component };
