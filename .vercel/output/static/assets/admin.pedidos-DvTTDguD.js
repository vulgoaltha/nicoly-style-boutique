import {
  ad as E,
  D as e,
  O as T,
  ab as A,
  Q as x,
  L as g,
  a6 as j,
  a1 as N,
} from "./index-C2UuTsl-.js";
import { u as L } from "./useQuery-tYhz7w83.js";
import { u as O } from "./useMutation-B92KXTbM.js";
import { b as y } from "./format-W46puzMN.js";
import { E as F, A as v } from "./external-link-BohY7CDT.js";
import { T as w } from "./trash-2-DsdEvVgJ.js";
function U() {
  const i = E({ select: (c) => c.location.pathname });
  return i === "/admin/pedidos" || i === "/admin/pedidos/" ? e.jsx(q, {}) : e.jsx(T, {});
}
const k = {
    pending: "Pendente",
    paid: "Pago",
    processing: "Em separação",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  },
  D = {
    pending: "bg-secondary text-muted-foreground",
    paid: "bg-blush-soft text-blush-deep",
    processing: "bg-blush-soft text-blush-deep",
    shipped: "bg-blush-soft text-blush-deep",
    delivered: "bg-blush-soft text-blush-deep",
    cancelled: "bg-destructive/10 text-destructive",
  },
  P = [
    { key: "all", label: "Todos" },
    { key: "today", label: "Hoje" },
    { key: "7days", label: "7 dias" },
    { key: "month", label: "Mês" },
    { key: "year", label: "Ano" },
  ];
function q() {
  const i = A(),
    [a, c] = x.useState("all"),
    [n, _] = x.useState("created_at"),
    [m, h] = x.useState(!1),
    { data: p = [], isLoading: S } = L({
      queryKey: ["admin-orders"],
      queryFn: async () => {
        const { data: t, error: s } = await N.from("orders").select(
          "id, order_number, customer_name, customer_email, status, payment_status, total, created_at",
        );
        if (s) throw s;
        return t;
      },
    }),
    u = O({
      mutationFn: async (t) => {
        const { error: s } = await N.from("orders").delete().eq("id", t);
        if (s) throw s;
      },
      onSuccess: () => {
        (j.success("Pedido excluído com sucesso"),
          i.invalidateQueries({ queryKey: ["admin-orders"] }));
      },
      onError: (t) => {
        j.error("Erro ao excluir: " + t.message);
      },
    }),
    b = (t, s) => {
      (s.preventDefault(),
        s.stopPropagation(),
        confirm("Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.") &&
          u.mutate(t));
    },
    f = (t) => {
      n === t ? h(!m) : (_(t), h(!1));
    },
    o = new Date(),
    l = [
      ...p.filter((t) => {
        if (a === "all") return !0;
        const s = new Date(t.created_at || new Date());
        if (a === "today") return s.toDateString() === o.toDateString();
        if (a === "7days") {
          const r = new Date(o.getTime() - 6048e5);
          return s >= r;
        }
        return a === "month"
          ? s.getMonth() === o.getMonth() && s.getFullYear() === o.getFullYear()
          : a === "year"
            ? s.getFullYear() === o.getFullYear()
            : !0;
      }),
    ].sort((t, s) => {
      let r = t[n],
        d = s[n];
      return (
        n === "created_at"
          ? ((r = new Date(r || "").getTime()), (d = new Date(d || "").getTime()))
          : n === "total" && ((r = Number(r)), (d = Number(d))),
        r < d ? (m ? -1 : 1) : r > d ? (m ? 1 : -1) : 0
      );
    }),
    C = (t) =>
      `px-3 py-1.5 text-xs rounded-full border transition-colors flex-shrink-0 ${a === t ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-secondary/50 border-border"}`;
  return e.jsxs("div", {
    children: [
      e.jsxs("div", {
        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", { className: "font-display text-2xl md:text-3xl", children: "Pedidos" }),
              e.jsxs("p", {
                className: "text-sm text-muted-foreground",
                children: [l.length, " pedidos encontrados"],
              }),
            ],
          }),
          e.jsx("div", {
            className: "flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide",
            children: P.map((t) =>
              e.jsx(
                "button",
                { onClick: () => c(t.key), className: C(t.key), children: t.label },
                t.key,
              ),
            ),
          }),
        ],
      }),
      S
        ? e.jsx("div", {
            className: "p-10 text-center text-sm text-muted-foreground",
            children: "Carregando...",
          })
        : p.length === 0
          ? e.jsx("div", {
              className: "p-10 text-center text-sm text-muted-foreground",
              children: "Nenhum pedido ainda.",
            })
          : l.length === 0
            ? e.jsx("div", {
                className: "p-10 text-center text-sm text-muted-foreground",
                children: "Nenhum pedido encontrado para o filtro selecionado.",
              })
            : e.jsxs(e.Fragment, {
                children: [
                  e.jsx("div", {
                    className: "md:hidden space-y-3",
                    children: l.map((t) =>
                      e.jsxs(
                        "div",
                        {
                          className: "bg-background border border-border rounded-sm p-4 space-y-3",
                          children: [
                            e.jsxs("div", {
                              className: "flex items-start justify-between gap-2",
                              children: [
                                e.jsxs(g, {
                                  to: "/admin/pedidos/$id",
                                  params: { id: t.id },
                                  className:
                                    "font-medium text-sm hover:text-blush flex items-center gap-1",
                                  children: [
                                    t.order_number,
                                    e.jsx(F, { className: "h-3 w-3 opacity-50" }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    e.jsx("span", {
                                      className: `text-xs px-2 py-0.5 rounded ${D[t.status || ""] ?? "bg-secondary"}`,
                                      children: k[t.status || ""] ?? t.status,
                                    }),
                                    e.jsx("button", {
                                      onClick: (s) => b(t.id, s),
                                      disabled: u.isPending,
                                      className:
                                        "flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-50",
                                      "aria-label": "Excluir pedido",
                                      children: e.jsx(w, { className: "h-4 w-4" }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              children: [
                                e.jsx("div", {
                                  className: "text-sm font-medium",
                                  children: t.customer_name,
                                }),
                                e.jsx("div", {
                                  className: "text-xs text-muted-foreground truncate",
                                  children: t.customer_email,
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className:
                                "flex justify-between text-sm pt-1 border-t border-border/50",
                              children: [
                                e.jsx("span", {
                                  className: "text-muted-foreground text-xs",
                                  children: new Date(t.created_at || new Date()).toLocaleDateString(
                                    "pt-BR",
                                  ),
                                }),
                                e.jsx("span", {
                                  className: "font-bold",
                                  children: y(Number(t.total)),
                                }),
                              ],
                            }),
                          ],
                        },
                        t.id,
                      ),
                    ),
                  }),
                  e.jsx("div", {
                    className:
                      "hidden md:block bg-background border border-border rounded-sm overflow-x-auto",
                    children: e.jsxs("table", {
                      className: "w-full text-sm whitespace-nowrap",
                      children: [
                        e.jsx("thead", {
                          className:
                            "bg-secondary/50 text-xs tracking-editorial uppercase text-muted-foreground",
                          children: e.jsxs("tr", {
                            children: [
                              e.jsx("th", { className: "text-left p-3", children: "Pedido" }),
                              e.jsx("th", { className: "text-left p-3", children: "Cliente" }),
                              e.jsx("th", {
                                className:
                                  "text-left p-3 cursor-pointer hover:bg-secondary/80 transition-colors",
                                onClick: () => f("created_at"),
                                children: e.jsxs("div", {
                                  className: "flex items-center gap-1",
                                  children: ["Data ", e.jsx(v, { className: "h-3 w-3" })],
                                }),
                              }),
                              e.jsx("th", {
                                className:
                                  "text-left p-3 cursor-pointer hover:bg-secondary/80 transition-colors",
                                onClick: () => f("total"),
                                children: e.jsxs("div", {
                                  className: "flex items-center gap-1",
                                  children: ["Total ", e.jsx(v, { className: "h-3 w-3" })],
                                }),
                              }),
                              e.jsx("th", { className: "text-left p-3", children: "Status" }),
                              e.jsx("th", { className: "text-right p-3", children: "Ações" }),
                            ],
                          }),
                        }),
                        e.jsx("tbody", {
                          children: l.map((t) =>
                            e.jsxs(
                              "tr",
                              {
                                className:
                                  "border-t border-border hover:bg-secondary/30 transition-colors",
                                children: [
                                  e.jsx("td", {
                                    className: "p-3",
                                    children: e.jsx(g, {
                                      to: "/admin/pedidos/$id",
                                      params: { id: t.id },
                                      className: "font-medium hover:text-blush text-sm",
                                      children: t.order_number,
                                    }),
                                  }),
                                  e.jsxs("td", {
                                    className: "p-3",
                                    children: [
                                      e.jsx("div", {
                                        className: "text-sm",
                                        children: t.customer_name,
                                      }),
                                      e.jsx("div", {
                                        className: "text-xs text-muted-foreground",
                                        children: t.customer_email,
                                      }),
                                    ],
                                  }),
                                  e.jsx("td", {
                                    className: "p-3 text-sm",
                                    children: new Date(
                                      t.created_at || new Date(),
                                    ).toLocaleDateString("pt-BR"),
                                  }),
                                  e.jsx("td", {
                                    className: "p-3 text-sm font-medium",
                                    children: y(Number(t.total)),
                                  }),
                                  e.jsx("td", {
                                    className: "p-3",
                                    children: e.jsx("span", {
                                      className: `text-xs px-2 py-1 rounded ${D[t.status || ""] ?? "bg-secondary"}`,
                                      children: k[t.status || ""] ?? t.status,
                                    }),
                                  }),
                                  e.jsx("td", {
                                    className: "p-3 text-right",
                                    children: e.jsx("button", {
                                      onClick: (s) => b(t.id, s),
                                      disabled: u.isPending,
                                      className:
                                        "p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-50",
                                      title: "Excluir pedido",
                                      children: e.jsx(w, { className: "h-4 w-4" }),
                                    }),
                                  }),
                                ],
                              },
                              t.id,
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
export { U as component };
