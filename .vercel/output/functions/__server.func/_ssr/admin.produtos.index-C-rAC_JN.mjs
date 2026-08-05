import { j as e } from "../_libs/react.mjs";
import { L as a } from "../_libs/tanstack__react-router.mjs";
import { b as n, a as l } from "../_libs/tanstack__react-query.mjs";
import { t as i } from "../_libs/sonner.mjs";
import { p as o } from "./client-DbGX8m2J.mjs";
import { r as x } from "./format-W46puzMN.mjs";
import { T as p, a0 as u, a5 as h } from "../_libs/lucide-react.mjs";
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
function M() {
  const d = n(),
    { data: t = [], isLoading: c } = l({
      queryKey: ["admin-products"],
      queryFn: async () => {
        const { data: s, error: r } = await o
          .from("products")
          .select("*")
          .order("created_at", { ascending: !1 });
        if (r) throw r;
        return s;
      },
    }),
    m = async (s) => {
      if (!confirm("Remover este produto?")) return;
      const { error: r } = await o.from("products").delete().eq("id", s);
      if (r) return i.error(r.message);
      (i.success("Produto removido"), d.invalidateQueries({ queryKey: ["admin-products"] }));
    };
  return e.jsxs("div", {
    children: [
      e.jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", { className: "font-display text-3xl", children: "Produtos" }),
              e.jsxs("p", {
                className: "text-sm text-muted-foreground",
                children: [t.length, " cadastrados"],
              }),
            ],
          }),
          e.jsxs(a, {
            to: "/admin/produtos/novo",
            className:
              "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-xs tracking-editorial uppercase rounded-sm",
            children: [e.jsx(p, { className: "h-4 w-4" }), " Novo produto"],
          }),
        ],
      }),
      e.jsx("div", {
        className: "bg-background border border-border rounded-sm overflow-x-auto",
        children: c
          ? e.jsx("div", {
              className: "p-10 text-center text-sm text-muted-foreground",
              children: "Carregando...",
            })
          : t.length === 0
            ? e.jsx("div", {
                className: "p-10 text-center text-sm text-muted-foreground",
                children: "Nenhum produto. Comece criando seu primeiro.",
              })
            : e.jsxs("table", {
                className: "w-full text-sm whitespace-nowrap",
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
                        e.jsx("th", { className: "p-3 w-[100px] text-right", children: "Ações" }),
                      ],
                    }),
                  }),
                  e.jsx("tbody", {
                    children: t.map((s) =>
                      e.jsxs(
                        "tr",
                        {
                          className:
                            "border-t border-border hover:bg-secondary/30 transition-colors",
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
                                      e.jsx("img", {
                                        src: s.images[0],
                                        alt: "",
                                        className: "h-full w-full object-cover",
                                      }),
                                  }),
                                  e.jsxs("div", {
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "font-medium text-sm whitespace-normal max-w-[200px] sm:max-w-xs line-clamp-2",
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
                              className: "p-3 text-sm",
                              children: x(s.sale_price ?? s.price),
                            }),
                            e.jsx("td", {
                              className: `p-3 text-sm ${s.stock === 0 ? "text-destructive" : ""}`,
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
                                className: "flex justify-end gap-2",
                                children: [
                                  e.jsx(a, {
                                    to: "/admin/produtos/$id",
                                    params: { id: s.id },
                                    className:
                                      "p-2 hover:bg-secondary rounded flex items-center justify-center transition",
                                    children: e.jsx(u, { className: "h-4 w-4" }),
                                  }),
                                  e.jsx("button", {
                                    onClick: () => m(s.id),
                                    className:
                                      "p-2 hover:bg-secondary rounded text-destructive flex items-center justify-center transition",
                                    children: e.jsx(h, { className: "h-4 w-4" }),
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
  });
}
export { M as component };
