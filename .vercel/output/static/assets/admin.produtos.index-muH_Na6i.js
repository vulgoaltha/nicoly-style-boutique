import { ab as l, D as e, L as a, a1 as d, a6 as o } from "./index-C2UuTsl-.js";
import { u as m } from "./useQuery-tYhz7w83.js";
import { b as x } from "./format-W46puzMN.js";
import { P as u } from "./plus-CNmxyVSh.js";
import { S as h } from "./square-pen-CX39pK_k.js";
import { T as p } from "./trash-2-DsdEvVgJ.js";
function y() {
  const i = l(),
    { data: r = [], isLoading: c } = m({
      queryKey: ["admin-products"],
      queryFn: async () => {
        const { data: s, error: t } = await d
          .from("products")
          .select("*")
          .order("created_at", { ascending: !1 });
        if (t) throw t;
        return s;
      },
    }),
    n = async (s) => {
      if (!confirm("Remover este produto?")) return;
      const { error: t } = await d.from("products").delete().eq("id", s);
      if (t) return o.error(t.message);
      (o.success("Produto removido"), i.invalidateQueries({ queryKey: ["admin-products"] }));
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
                children: [r.length, " cadastrados"],
              }),
            ],
          }),
          e.jsxs(a, {
            to: "/admin/produtos/novo",
            className:
              "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-xs tracking-editorial uppercase rounded-sm",
            children: [e.jsx(u, { className: "h-4 w-4" }), " Novo produto"],
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
          : r.length === 0
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
                    children: r.map((s) =>
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
                                    children: e.jsx(h, { className: "h-4 w-4" }),
                                  }),
                                  e.jsx("button", {
                                    onClick: () => n(s.id),
                                    className:
                                      "p-2 hover:bg-secondary rounded text-destructive flex items-center justify-center transition",
                                    children: e.jsx(p, { className: "h-4 w-4" }),
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
export { y as component };
