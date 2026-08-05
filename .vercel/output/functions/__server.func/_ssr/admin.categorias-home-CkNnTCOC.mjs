import { r as x, j as e } from "../_libs/react.mjs";
import { b, a as v } from "../_libs/tanstack__react-query.mjs";
import {
  T as f,
  ah as j,
  Z as N,
  c as y,
  A as w,
  S as C,
  a5 as k,
} from "../_libs/lucide-react.mjs";
import { t as m } from "../_libs/sonner.mjs";
import { p as u } from "./client-DbGX8m2J.mjs";
import { $ as S } from "./ImageUploader-rngdoTXs.mjs";
import "../_libs/browser-image-compression.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const _ = [
  { value: "Shirt", label: "👚 Camiseta" },
  { value: "ShoppingBag", label: "🛍️ Sacola de Compras" },
  { value: "Sparkles", label: "✨ Brilhos" },
  { value: "Crown", label: "👑 Coroa" },
  { value: "Heart", label: "❤️ Coração" },
  { value: "Gem", label: "💎 Joia" },
  { value: "Scissors", label: "✂️ Tesoura" },
  { value: "Footprints", label: "👣 Calçado" },
  { value: "Watch", label: "⌚ Relógio" },
  { value: "Glasses", label: "👓 Óculos" },
  { value: "Flower2", label: "🌸 Flor" },
  { value: "Star", label: "⭐ Estrela" },
  { value: "Sun", label: "☀️ Sol" },
  { value: "Palette", label: "🎨 Paleta de Cores" },
];
function V() {
  const l = b(),
    { data: c = [] } = v({
      queryKey: ["admin-hp-categories"],
      queryFn: async () => {
        const { data: s, error: o } = await u
          .from("homepage_categories")
          .select("*")
          .order("order_position");
        if (o) throw o;
        return s;
      },
    }),
    [p, r] = x.useState(null),
    t = async (s) => {
      if (!confirm("Remover esta categoria?")) return;
      const { error: o } = await u.from("homepage_categories").delete().eq("id", s);
      if (o) return m.error(o.message);
      (m.success("Categoria removida"), l.invalidateQueries({ queryKey: ["admin-hp-categories"] }));
    },
    n = async (s, o) => {
      (await u
        .from("homepage_categories")
        .update({ order_position: s.order_position + o })
        .eq("id", s.id),
        l.invalidateQueries({ queryKey: ["admin-hp-categories"] }),
        l.invalidateQueries({ queryKey: ["homepage-categories"] }));
    };
  return e.jsxs("div", {
    children: [
      e.jsxs("div", {
        className: "flex items-center justify-between mb-6",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", { className: "font-display text-3xl", children: "Categorias da home" }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Carrossel de categorias premium",
              }),
            ],
          }),
          e.jsxs("button", {
            onClick: () =>
              r({
                id: "",
                title: "",
                icon: "Shirt",
                color: "#f4d6d6",
                slug: "",
                order_position: c.length,
                active: !0,
              }),
            className:
              "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-editorial uppercase rounded-sm",
            children: [e.jsx(f, { className: "h-4 w-4" }), " Nova categoria"],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "bg-background border border-border rounded-sm divide-y divide-border",
        children: [
          c.length === 0 &&
            e.jsx("div", {
              className: "p-8 text-sm text-muted-foreground text-center",
              children: "Sem categorias.",
            }),
          c.map((s) => {
            const o = s.icon && s.icon.startsWith("http"),
              i = j[s.icon] ?? N;
            return e.jsxs(
              "div",
              {
                className: "p-4 flex flex-col sm:flex-row gap-4 sm:items-center",
                children: [
                  e.jsxs("div", {
                    className: "flex gap-4 items-center flex-1 min-w-0 w-full",
                    children: [
                      e.jsx("div", {
                        className:
                          "h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-border/40",
                        style: { backgroundColor: s.color },
                        children: o
                          ? e.jsx("img", {
                              src: s.icon,
                              alt: s.title,
                              className: "h-full w-full object-cover",
                            })
                          : e.jsx(i, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
                      }),
                      e.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [
                          e.jsxs("div", {
                            className: "font-medium truncate text-sm flex items-center gap-2",
                            children: [
                              s.title,
                              o &&
                                e.jsx("span", {
                                  className:
                                    "text-[10px] bg-secondary border border-border px-1.5 py-0.5 rounded text-muted-foreground",
                                  children: "Ícone Personalizado (PNG/JPG)",
                                }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "text-[10px] sm:text-xs text-muted-foreground truncate",
                            children: [
                              "slug: ",
                              s.slug,
                              " · ",
                              s.active ? "ativa" : "inativa",
                              " · ordem ",
                              s.order_position,
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "flex gap-1 sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-border sm:border-0 justify-end",
                    children: [
                      e.jsx("button", {
                        onClick: () => n(s, -1),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(y, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => n(s, 1),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(w, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => r(s),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(C, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => t(s.id),
                        className: "p-2 hover:bg-secondary rounded-sm text-destructive",
                        children: e.jsx(k, { className: "h-4 w-4" }),
                      }),
                    ],
                  }),
                ],
              },
              s.id,
            );
          }),
        ],
      }),
      p &&
        e.jsx(q, {
          cat: p,
          onClose: () => r(null),
          onSaved: () => {
            (r(null),
              l.invalidateQueries({ queryKey: ["admin-hp-categories"] }),
              l.invalidateQueries({ queryKey: ["homepage-categories"] }));
          },
        }),
    ],
  });
}
function q({ cat: l, onClose: c, onSaved: p }) {
  const [r, t] = x.useState(l),
    [n, s] = x.useState(!1),
    o = async (a) => {
      if ((a.preventDefault(), !r.title || !r.slug))
        return m.error("Título e slug são obrigatórios");
      s(!0);
      const g = {
          title: r.title,
          icon: r.icon,
          color: r.color,
          slug: r.slug,
          order_position: r.order_position,
          active: r.active,
        },
        { error: h } = r.id
          ? await u.from("homepage_categories").update(g).eq("id", r.id)
          : await u.from("homepage_categories").insert(g);
      if ((s(!1), h)) return m.error(h.message);
      (m.success("Categoria salva com sucesso!"), p());
    },
    i = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background",
    d = "text-xs tracking-editorial uppercase mb-1.5 block font-medium";
  return e.jsx("div", {
    className: "fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4",
    onClick: c,
    children: e.jsxs("form", {
      onSubmit: o,
      onClick: (a) => a.stopPropagation(),
      className:
        "bg-background rounded-sm max-w-lg w-full p-6 space-y-4 shadow-xl border border-border",
      children: [
        e.jsx("h2", {
          className: "font-display text-2xl",
          children: r.id ? "Editar categoria" : "Nova categoria",
        }),
        e.jsxs("div", {
          className: "grid grid-cols-2 gap-4",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: d, children: "Título *" }),
                e.jsx("input", {
                  className: i,
                  value: r.title,
                  onChange: (a) => t({ ...r, title: a.target.value }),
                  required: !0,
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: d, children: "Slug *" }),
                e.jsx("input", {
                  className: i,
                  placeholder: "vestidos",
                  value: r.slug,
                  onChange: (a) => t({ ...r, slug: a.target.value }),
                  required: !0,
                }),
              ],
            }),
            e.jsxs("div", {
              className: "col-span-2 space-y-2",
              children: [
                e.jsx("label", { className: d, children: "Ícone da Categoria" }),
                e.jsxs("div", {
                  className:
                    "flex flex-col sm:flex-row gap-4 items-start bg-secondary/10 p-3.5 rounded-md border border-border",
                  children: [
                    e.jsxs("div", {
                      className: "w-full sm:w-auto",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-[10px] uppercase font-medium text-muted-foreground mb-1.5 block",
                          children: "Fazer upload de Ícone (PNG ou JPG 100x100px)",
                        }),
                        e.jsx(S, {
                          value: r.icon && r.icon.startsWith("http") ? r.icon : "",
                          onChange: (a) => t({ ...r, icon: a }),
                          folder: "category_icons",
                          compact: !0,
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "w-full sm:flex-1 pt-1",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-[10px] uppercase font-medium text-muted-foreground mb-1.5 block",
                          children: "Ou escolher ícone padrão",
                        }),
                        e.jsxs("select", {
                          className: i,
                          value: r.icon && r.icon.startsWith("http") ? "" : r.icon,
                          onChange: (a) => t({ ...r, icon: a.target.value }),
                          children: [
                            e.jsx("option", {
                              value: "",
                              children: "(Usando Imagem/Ícone Personalizado...)",
                            }),
                            _.map((a) =>
                              e.jsx("option", { value: a.value, children: a.label }, a.value),
                            ),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: d, children: "Cor de fundo do círculo" }),
                e.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    e.jsx("input", {
                      type: "color",
                      className:
                        "w-12 h-10 border border-border rounded-sm bg-background cursor-pointer",
                      value: r.color,
                      onChange: (a) => t({ ...r, color: a.target.value }),
                    }),
                    e.jsx("input", {
                      type: "text",
                      className: i,
                      value: r.color,
                      onChange: (a) => t({ ...r, color: a.target.value }),
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: d, children: "Ordem" }),
                e.jsx("input", {
                  type: "number",
                  className: i,
                  value: r.order_position,
                  onChange: (a) => t({ ...r, order_position: parseInt(a.target.value || "0") }),
                }),
              ],
            }),
            e.jsxs("label", {
              className: "flex items-center gap-2 text-sm pt-2 col-span-2",
              children: [
                e.jsx("input", {
                  type: "checkbox",
                  className: "h-4 w-4 rounded border-gray-300",
                  checked: r.active,
                  onChange: (a) => t({ ...r, active: a.target.checked }),
                }),
                e.jsx("span", { children: "Categoria Ativa" }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "flex gap-3 pt-3 border-t border-border",
          children: [
            e.jsx("button", {
              disabled: n,
              className:
                "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
              children: n ? "Salvando..." : "Salvar Categoria",
            }),
            e.jsx("button", {
              type: "button",
              onClick: c,
              className:
                "border border-border px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm",
              children: "Cancelar",
            }),
          ],
        }),
      ],
    }),
  });
}
export { V as component };
