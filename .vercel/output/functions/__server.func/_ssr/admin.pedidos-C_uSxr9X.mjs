import { j as e, r as x } from "../_libs/react.mjs";
import { f as C, O as P, L as g } from "../_libs/tanstack__react-router.mjs";
import { b as T, a as F, u as L } from "../_libs/tanstack__react-query.mjs";
import { p as f } from "./client-DbGX8m2J.mjs";
import { r as j } from "./format-W46puzMN.mjs";
import { t as N } from "../_libs/sonner.mjs";
import { E as q, a5 as y, d as v } from "../_libs/lucide-react.mjs";
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
function ue() {
  const n = C({ select: (r) => r.location.pathname });
  return n === "/admin/pedidos" || n === "/admin/pedidos/" ? e.jsx($, {}) : e.jsx(P, {});
}
const w = {
    pending: "Pendente",
    paid: "Pago",
    processing: "Em separação",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  },
  k = {
    pending: "bg-secondary text-muted-foreground",
    paid: "bg-blush-soft text-blush-deep",
    processing: "bg-blush-soft text-blush-deep",
    shipped: "bg-blush-soft text-blush-deep",
    delivered: "bg-blush-soft text-blush-deep",
    cancelled: "bg-destructive/10 text-destructive",
  },
  M = [
    { key: "all", label: "Todos" },
    { key: "today", label: "Hoje" },
    { key: "7days", label: "7 dias" },
    { key: "month", label: "Mês" },
    { key: "year", label: "Ano" },
  ];
function $() {
  const n = T(),
    [r, _] = x.useState("all"),
    [d, D] = x.useState("created_at"),
    [c, u] = x.useState(!1),
    { data: p = [], isLoading: E } = F({
      queryKey: ["admin-orders"],
      queryFn: async () => {
        const { data: t, error: s } = await f
          .from("orders")
          .select(
            "id, order_number, customer_name, customer_email, status, payment_status, total, created_at",
          );
        if (s) throw s;
        return t;
      },
    }),
    m = L({
      mutationFn: async (t) => {
        const { error: s } = await f.from("orders").delete().eq("id", t);
        if (s) throw s;
      },
      onSuccess: () => {
        (N.success("Pedido excluído com sucesso"),
          n.invalidateQueries({ queryKey: ["admin-orders"] }));
      },
      onError: (t) => {
        N.error("Erro ao excluir: " + t.message);
      },
    }),
    h = (t, s) => {
      (s.preventDefault(),
        s.stopPropagation(),
        confirm("Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.") &&
          m.mutate(t));
    },
    b = (t) => {
      d === t ? u(!c) : (D(t), u(!1));
    },
    i = new Date(),
    l = [
      ...p.filter((t) => {
        if (r === "all") return !0;
        const s = new Date(t.created_at || new Date());
        if (r === "today") return s.toDateString() === i.toDateString();
        if (r === "7days") {
          const a = new Date(i.getTime() - 6048e5);
          return s >= a;
        }
        return r === "month"
          ? s.getMonth() === i.getMonth() && s.getFullYear() === i.getFullYear()
          : r === "year"
            ? s.getFullYear() === i.getFullYear()
            : !0;
      }),
    ].sort((t, s) => {
      let a = t[d],
        o = s[d];
      return (
        d === "created_at"
          ? ((a = new Date(a || "").getTime()), (o = new Date(o || "").getTime()))
          : d === "total" && ((a = Number(a)), (o = Number(o))),
        a < o ? (c ? -1 : 1) : a > o ? (c ? 1 : -1) : 0
      );
    }),
    S = (t) =>
      `px-3 py-1.5 text-xs rounded-full border transition-colors flex-shrink-0 ${r === t ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-secondary/50 border-border"}`;
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
            children: M.map((t) =>
              e.jsx(
                "button",
                { onClick: () => _(t.key), className: S(t.key), children: t.label },
                t.key,
              ),
            ),
          }),
        ],
      }),
      E
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
                                    e.jsx(q, { className: "h-3 w-3 opacity-50" }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    e.jsx("span", {
                                      className: `text-xs px-2 py-0.5 rounded ${k[t.status || ""] ?? "bg-secondary"}`,
                                      children: w[t.status || ""] ?? t.status,
                                    }),
                                    e.jsx("button", {
                                      onClick: (s) => h(t.id, s),
                                      disabled: m.isPending,
                                      className:
                                        "flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-50",
                                      "aria-label": "Excluir pedido",
                                      children: e.jsx(y, { className: "h-4 w-4" }),
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
                                  children: j(Number(t.total)),
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
                                onClick: () => b("created_at"),
                                children: e.jsxs("div", {
                                  className: "flex items-center gap-1",
                                  children: ["Data ", e.jsx(v, { className: "h-3 w-3" })],
                                }),
                              }),
                              e.jsx("th", {
                                className:
                                  "text-left p-3 cursor-pointer hover:bg-secondary/80 transition-colors",
                                onClick: () => b("total"),
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
                                    children: j(Number(t.total)),
                                  }),
                                  e.jsx("td", {
                                    className: "p-3",
                                    children: e.jsx("span", {
                                      className: `text-xs px-2 py-1 rounded ${k[t.status || ""] ?? "bg-secondary"}`,
                                      children: w[t.status || ""] ?? t.status,
                                    }),
                                  }),
                                  e.jsx("td", {
                                    className: "p-3 text-right",
                                    children: e.jsx("button", {
                                      onClick: (s) => h(t.id, s),
                                      disabled: m.isPending,
                                      className:
                                        "p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-50",
                                      title: "Excluir pedido",
                                      children: e.jsx(y, { className: "h-4 w-4" }),
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
export { ue as component };
