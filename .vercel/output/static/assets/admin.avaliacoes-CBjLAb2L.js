import { ab as k, Q as N, a1 as u, a6 as l, D as e, S as w, X as v } from "./index-C2UuTsl-.js";
import { u as C } from "./useQuery-tYhz7w83.js";
import { u as x } from "./useMutation-B92KXTbM.js";
import { M as q } from "./message-square-Dyyo5YKB.js";
import { M as A } from "./map-pin-BD_OBluq.js";
import { C as j } from "./check-C6tLogbj.js";
import { T as S } from "./trash-2-DsdEvVgJ.js";
import { S as _ } from "./star-BuaHoUUy.js";
function $({ rating: r }) {
  return e.jsx("div", {
    className: "flex gap-0.5",
    children: Array.from({ length: 5 }).map((o, n) =>
      e.jsx(
        _,
        {
          className: `h-3.5 w-3.5 ${n < r ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`,
        },
        n,
      ),
    ),
  });
}
function T() {
  const r = k(),
    [o, n] = N.useState("all"),
    { data: t = [], isLoading: d } = C({
      queryKey: ["admin-reviews"],
      queryFn: async () => {
        const { data: a, error: s } = await u
          .from("customer_reviews")
          .select("*, product:products(name, images)")
          .order("created_at", { ascending: !1 });
        if (s) throw s;
        return a;
      },
    }),
    m = x({
      mutationFn: async (a) => {
        const { error: s } = await u.from("customer_reviews").update({ approved: !0 }).eq("id", a);
        if (s) throw s;
      },
      onSuccess: () => {
        (l.success("Avaliação aprovada!"),
          r.invalidateQueries({ queryKey: ["admin-reviews"] }),
          r.invalidateQueries({ queryKey: ["public-reviews"] }));
      },
      onError: () => l.error("Erro ao aprovar avaliação."),
    }),
    i = x({
      mutationFn: async (a) => {
        const { error: s } = await u.from("customer_reviews").update({ approved: !1 }).eq("id", a);
        if (s) throw s;
      },
      onSuccess: () => {
        (l.success("Avaliação rejeitada."),
          r.invalidateQueries({ queryKey: ["admin-reviews"] }),
          r.invalidateQueries({ queryKey: ["public-reviews"] }));
      },
      onError: () => l.error("Erro ao rejeitar avaliação."),
    }),
    b = x({
      mutationFn: async (a) => {
        const { error: s } = await u.from("customer_reviews").delete().eq("id", a);
        if (s) throw s;
      },
      onSuccess: () => {
        (l.success("Avaliação excluída."),
          r.invalidateQueries({ queryKey: ["admin-reviews"] }),
          r.invalidateQueries({ queryKey: ["public-reviews"] }));
      },
      onError: () => l.error("Erro ao excluir avaliação."),
    }),
    g = t.filter((a) =>
      o === "approved" ? a.approved === !0 : o === "pending" ? a.approved === !1 : !0,
    ),
    f = t.filter((a) => a.approved).length,
    h = t.filter((a) => !a.approved).length,
    y = t.length ? (t.reduce((a, s) => a + s.rating, 0) / t.length).toFixed(1) : "—";
  return e.jsxs("div", {
    children: [
      e.jsxs("div", {
        className: "mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", { className: "font-display text-3xl", children: "Avaliações" }),
              e.jsxs("p", {
                className: "text-sm text-muted-foreground mt-0.5",
                children: [t.length, " avaliação", t.length !== 1 ? "ões" : "", " no total"],
              }),
            ],
          }),
          e.jsxs("div", {
            className: "flex gap-3 flex-wrap",
            children: [
              e.jsx(p, { label: "Aprovadas", value: f, color: "text-green-600" }),
              e.jsx(p, { label: "Pendentes", value: h, color: "text-amber-600" }),
              e.jsx(p, { label: "Nota média", value: y, color: "text-blush-deep" }),
            ],
          }),
        ],
      }),
      e.jsx("div", {
        className: "flex gap-2 mb-6 border-b border-border pb-1",
        children: ["all", "pending", "approved"].map((a) => {
          const s = {
            all: `Todas (${t.length})`,
            pending: `Pendentes (${h})`,
            approved: `Aprovadas (${f})`,
          };
          return e.jsx(
            "button",
            {
              onClick: () => n(a),
              className: `text-xs tracking-editorial uppercase px-3 py-1.5 rounded-sm transition ${o === a ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground"}`,
              children: s[a],
            },
            a,
          );
        }),
      }),
      d
        ? e.jsx("div", {
            className: "grid gap-4",
            children: [1, 2, 3].map((a) =>
              e.jsx("div", { className: "h-36 bg-secondary animate-pulse rounded-sm" }, a),
            ),
          })
        : g.length === 0
          ? e.jsxs("div", {
              className:
                "py-20 text-center text-sm text-muted-foreground flex flex-col items-center gap-3",
              children: [
                e.jsx(q, { className: "h-10 w-10 text-border" }),
                e.jsx("p", { children: "Nenhuma avaliação encontrada." }),
              ],
            })
          : e.jsx("div", {
              className: "grid gap-4",
              children: g.map((a) =>
                e.jsx(
                  E,
                  {
                    review: a,
                    onApprove: () => m.mutate(a.id),
                    onReject: () => i.mutate(a.id),
                    onDelete: () => b.mutate(a.id),
                    isLoading: m.isPending || i.isPending || b.isPending,
                  },
                  a.id,
                ),
              ),
            }),
    ],
  });
}
function p({ label: r, value: o, color: n }) {
  return e.jsxs("div", {
    className: "bg-background border border-border rounded-sm px-4 py-2 min-w-[90px] text-center",
    children: [
      e.jsx("p", { className: `text-xl font-semibold ${n}`, children: o }),
      e.jsx("p", {
        className: "text-[10px] text-muted-foreground uppercase tracking-wide",
        children: r,
      }),
    ],
  });
}
function E({ review: r, onApprove: o, onReject: n, onDelete: t, isLoading: d }) {
  const [m, i] = N.useState(!1);
  return e.jsxs("div", {
    className: `bg-background border rounded-sm p-5 flex flex-col sm:flex-row gap-4 transition ${r.approved ? "border-green-200 dark:border-green-900" : "border-border"}`,
    children: [
      e.jsx("div", {
        className: "flex-shrink-0",
        children: r.customer_photo
          ? e.jsx("img", {
              src: r.customer_photo,
              alt: r.customer_name,
              className: "w-11 h-11 rounded-full object-cover border border-border",
            })
          : e.jsx("div", {
              className:
                "w-11 h-11 rounded-full bg-blush-soft border border-blush/30 flex items-center justify-center text-blush font-display text-base font-semibold select-none",
              children: r.customer_name.charAt(0).toUpperCase(),
            }),
      }),
      e.jsxs("div", {
        className: "flex-1 min-w-0",
        children: [
          e.jsxs("div", {
            className: "flex flex-wrap items-start gap-x-3 gap-y-1 mb-2",
            children: [
              e.jsx("span", { className: "font-medium text-sm", children: r.customer_name }),
              e.jsx($, { rating: r.rating }),
              e.jsx("span", {
                className: `text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide ${r.approved ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"}`,
                children: r.approved ? "Aprovada" : "Pendente",
              }),
              e.jsx("span", {
                className: "text-[11px] text-muted-foreground ml-auto",
                children: new Date(r.created_at).toLocaleDateString("pt-BR"),
              }),
            ],
          }),
          e.jsxs("p", {
            className: "text-sm text-foreground/80 leading-relaxed italic mb-3",
            children: ['"', r.comment, '"'],
          }),
          e.jsxs("div", {
            className: "flex flex-wrap gap-2",
            children: [
              r.city &&
                e.jsxs("span", {
                  className:
                    "inline-flex items-center gap-1 text-[11px] text-muted-foreground border border-border rounded-sm px-2 py-0.5 bg-secondary/40",
                  children: [
                    e.jsx(A, { className: "h-2.5 w-2.5" }),
                    r.city,
                    r.state ? `, ${r.state}` : "",
                  ],
                }),
              r.product &&
                e.jsxs("span", {
                  className:
                    "inline-flex items-center gap-1 text-[11px] text-blush-deep border border-blush/30 rounded-sm px-2 py-0.5 bg-blush-soft",
                  children: [e.jsx(w, { className: "h-2.5 w-2.5" }), r.product.name],
                }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "flex sm:flex-col gap-2 flex-shrink-0 justify-end sm:justify-start",
        children: [
          r.approved
            ? e.jsx(c, {
                onClick: n,
                disabled: d,
                title: "Rejeitar",
                className:
                  "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400",
                children: e.jsx(v, { className: "h-3.5 w-3.5" }),
              })
            : e.jsx(c, {
                onClick: o,
                disabled: d,
                title: "Aprovar",
                className:
                  "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400",
                children: e.jsx(j, { className: "h-3.5 w-3.5" }),
              }),
          m
            ? e.jsxs("div", {
                className: "flex gap-1",
                children: [
                  e.jsx(c, {
                    onClick: t,
                    disabled: d,
                    title: "Confirmar exclusão",
                    className:
                      "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20",
                    children: e.jsx(j, { className: "h-3.5 w-3.5" }),
                  }),
                  e.jsx(c, {
                    onClick: () => i(!1),
                    disabled: d,
                    title: "Cancelar",
                    className: "hover:bg-secondary",
                    children: e.jsx(v, { className: "h-3.5 w-3.5" }),
                  }),
                ],
              })
            : e.jsx(c, {
                onClick: () => i(!0),
                disabled: d,
                title: "Excluir",
                className:
                  "hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive",
                children: e.jsx(S, { className: "h-3.5 w-3.5" }),
              }),
        ],
      }),
    ],
  });
}
function c({ children: r, onClick: o, disabled: n, title: t, className: d = "" }) {
  return e.jsx("button", {
    onClick: o,
    disabled: n,
    title: t,
    className: `w-8 h-8 rounded-sm border border-border flex items-center justify-center transition disabled:opacity-50 ${d}`,
    children: r,
  });
}
export { T as component };
