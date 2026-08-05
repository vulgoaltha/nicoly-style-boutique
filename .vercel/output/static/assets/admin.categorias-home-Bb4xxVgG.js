import { ab as b, a1 as m, Q as x, D as e, a6 as u } from "./index-C2UuTsl-.js";
import { u as v } from "./useQuery-tYhz7w83.js";
import { I as f, a as j } from "./lucide-react-BOGG7bEa.js";
import { I as N } from "./ImageUploader-IIOT2Nak.js";
import { P as y } from "./plus-CNmxyVSh.js";
import { a as w, A as C, P as k } from "./pencil-vgQ1QePa.js";
import { T as S } from "./trash-2-DsdEvVgJ.js";
import "./arrow-left-UOBAiK13.js";
import "./users-8mZsxf7Z.js";
import "./external-link-BohY7CDT.js";
import "./bike-CzRH9cJY.js";
import "./calendar-ecnoNJh1.js";
import "./check-C6tLogbj.js";
import "./chevron-up-BrI3s4vh.js";
import "./wallet-BienNB9s.js";
import "./credit-card-BMdPgreM.js";
import "./circle-check-DBgmDpYy.js";
import "./heart-jI1E_ZlV.js";
import "./image-off-Df7chaH8.js";
import "./tags-DtvIZJ_B.js";
import "./layout-dashboard-5SKAG8I0.js";
import "./map-pin-BD_OBluq.js";
import "./message-circle-Dixxsnx2.js";
import "./message-square-Dyyo5YKB.js";
import "./minus-g-vitRhv.js";
import "./shield-check-DKkF66MN.js";
import "./package-DKlLxxot.js";
import "./square-pen-CX39pK_k.js";
import "./star-BuaHoUUy.js";
import "./triangle-alert-DvO-HZUW.js";
import "./truck-_8doA-LZ.js";
import "./upload-CH3K2uMF.js";
import "./user-x-D8a-mRBN.js";
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
function ne() {
  const i = b(),
    { data: n = [] } = v({
      queryKey: ["admin-hp-categories"],
      queryFn: async () => {
        const { data: a, error: o } = await m
          .from("homepage_categories")
          .select("*")
          .order("order_position");
        if (o) throw o;
        return a;
      },
    }),
    [p, r] = x.useState(null),
    t = async (a) => {
      if (!confirm("Remover esta categoria?")) return;
      const { error: o } = await m.from("homepage_categories").delete().eq("id", a);
      if (o) return u.error(o.message);
      (u.success("Categoria removida"), i.invalidateQueries({ queryKey: ["admin-hp-categories"] }));
    },
    d = async (a, o) => {
      (await m
        .from("homepage_categories")
        .update({ order_position: a.order_position + o })
        .eq("id", a.id),
        i.invalidateQueries({ queryKey: ["admin-hp-categories"] }),
        i.invalidateQueries({ queryKey: ["homepage-categories"] }));
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
                order_position: n.length,
                active: !0,
              }),
            className:
              "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-editorial uppercase rounded-sm",
            children: [e.jsx(y, { className: "h-4 w-4" }), " Nova categoria"],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "bg-background border border-border rounded-sm divide-y divide-border",
        children: [
          n.length === 0 &&
            e.jsx("div", {
              className: "p-8 text-sm text-muted-foreground text-center",
              children: "Sem categorias.",
            }),
          n.map((a) => {
            const o = a.icon && a.icon.startsWith("http"),
              l = f[a.icon] ?? j;
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
                        style: { backgroundColor: a.color },
                        children: o
                          ? e.jsx("img", {
                              src: a.icon,
                              alt: a.title,
                              className: "h-full w-full object-cover",
                            })
                          : e.jsx(l, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
                      }),
                      e.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [
                          e.jsxs("div", {
                            className: "font-medium truncate text-sm flex items-center gap-2",
                            children: [
                              a.title,
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
                              a.slug,
                              " · ",
                              a.active ? "ativa" : "inativa",
                              " · ordem ",
                              a.order_position,
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
                        onClick: () => d(a, -1),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(w, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => d(a, 1),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(C, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => r(a),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(k, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => t(a.id),
                        className: "p-2 hover:bg-secondary rounded-sm text-destructive",
                        children: e.jsx(S, { className: "h-4 w-4" }),
                      }),
                    ],
                  }),
                ],
              },
              a.id,
            );
          }),
        ],
      }),
      p &&
        e.jsx(P, {
          cat: p,
          onClose: () => r(null),
          onSaved: () => {
            (r(null),
              i.invalidateQueries({ queryKey: ["admin-hp-categories"] }),
              i.invalidateQueries({ queryKey: ["homepage-categories"] }));
          },
        }),
    ],
  });
}
function P({ cat: i, onClose: n, onSaved: p }) {
  const [r, t] = x.useState(i),
    [d, a] = x.useState(!1),
    o = async (s) => {
      if ((s.preventDefault(), !r.title || !r.slug))
        return u.error("Título e slug são obrigatórios");
      a(!0);
      const g = {
          title: r.title,
          icon: r.icon,
          color: r.color,
          slug: r.slug,
          order_position: r.order_position,
          active: r.active,
        },
        { error: h } = r.id
          ? await m.from("homepage_categories").update(g).eq("id", r.id)
          : await m.from("homepage_categories").insert(g);
      if ((a(!1), h)) return u.error(h.message);
      (u.success("Categoria salva com sucesso!"), p());
    },
    l = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background",
    c = "text-xs tracking-editorial uppercase mb-1.5 block font-medium";
  return e.jsx("div", {
    className: "fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4",
    onClick: n,
    children: e.jsxs("form", {
      onSubmit: o,
      onClick: (s) => s.stopPropagation(),
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
                e.jsx("label", { className: c, children: "Título *" }),
                e.jsx("input", {
                  className: l,
                  value: r.title,
                  onChange: (s) => t({ ...r, title: s.target.value }),
                  required: !0,
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: c, children: "Slug *" }),
                e.jsx("input", {
                  className: l,
                  placeholder: "vestidos",
                  value: r.slug,
                  onChange: (s) => t({ ...r, slug: s.target.value }),
                  required: !0,
                }),
              ],
            }),
            e.jsxs("div", {
              className: "col-span-2 space-y-2",
              children: [
                e.jsx("label", { className: c, children: "Ícone da Categoria" }),
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
                        e.jsx(N, {
                          value: r.icon && r.icon.startsWith("http") ? r.icon : "",
                          onChange: (s) => t({ ...r, icon: s }),
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
                          className: l,
                          value: r.icon && r.icon.startsWith("http") ? "" : r.icon,
                          onChange: (s) => t({ ...r, icon: s.target.value }),
                          children: [
                            e.jsx("option", {
                              value: "",
                              children: "(Usando Imagem/Ícone Personalizado...)",
                            }),
                            _.map((s) =>
                              e.jsx("option", { value: s.value, children: s.label }, s.value),
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
                e.jsx("label", { className: c, children: "Cor de fundo do círculo" }),
                e.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    e.jsx("input", {
                      type: "color",
                      className:
                        "w-12 h-10 border border-border rounded-sm bg-background cursor-pointer",
                      value: r.color,
                      onChange: (s) => t({ ...r, color: s.target.value }),
                    }),
                    e.jsx("input", {
                      type: "text",
                      className: l,
                      value: r.color,
                      onChange: (s) => t({ ...r, color: s.target.value }),
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: c, children: "Ordem" }),
                e.jsx("input", {
                  type: "number",
                  className: l,
                  value: r.order_position,
                  onChange: (s) => t({ ...r, order_position: parseInt(s.target.value || "0") }),
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
                  onChange: (s) => t({ ...r, active: s.target.checked }),
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
              disabled: d,
              className:
                "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
              children: d ? "Salvando..." : "Salvar Categoria",
            }),
            e.jsx("button", {
              type: "button",
              onClick: n,
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
export { ne as component };
