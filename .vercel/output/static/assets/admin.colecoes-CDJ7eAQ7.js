import { ab as b, a1 as d, Q as p, D as e, a6 as u } from "./index-C2UuTsl-.js";
import { u as v } from "./useQuery-tYhz7w83.js";
import { I as j } from "./ImageUploader-IIOT2Nak.js";
import { P as f } from "./plus-CNmxyVSh.js";
import { a as y, A as N, P as _ } from "./pencil-vgQ1QePa.js";
import { T as w } from "./trash-2-DsdEvVgJ.js";
import "./upload-CH3K2uMF.js";
function I() {
  const l = b(),
    { data: o = [], refetch: x } = v({
      queryKey: ["admin-collections"],
      queryFn: async () => {
        const { data: r, error: a } = await d
          .from("homepage_collections")
          .select("*")
          .order("order_position");
        if (a) throw a;
        return r;
      },
    }),
    [s, i] = p.useState(null),
    m = async (r) => {
      if (!confirm("Excluir coleção?")) return;
      const { error: a } = await d.from("homepage_collections").delete().eq("id", r);
      if (a) return u.error(a.message);
      (x(), l.invalidateQueries({ queryKey: ["homepage-collections"] }));
    },
    n = async (r, a) => {
      (await d
        .from("homepage_collections")
        .update({ order_position: r.order_position + a })
        .eq("id", r.id),
        l.invalidateQueries({ queryKey: ["admin-collections"] }),
        l.invalidateQueries({ queryKey: ["homepage-collections"] }));
    };
  return e.jsxs("div", {
    children: [
      e.jsxs("div", {
        className: "flex items-center justify-between mb-6",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", { className: "font-display text-3xl", children: "Coleções" }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Cards premium da home",
              }),
            ],
          }),
          e.jsxs("button", {
            onClick: () =>
              i({
                id: "",
                title: "",
                subtitle: "",
                image_url: "",
                redirect_url: "/loja",
                order_position: o.length,
                active: !0,
              }),
            className:
              "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-editorial uppercase rounded-sm",
            children: [e.jsx(f, { className: "h-4 w-4" }), " Nova coleção"],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "bg-background border border-border rounded-sm divide-y divide-border",
        children: [
          o.length === 0 &&
            e.jsx("div", {
              className: "p-8 text-sm text-muted-foreground text-center",
              children: "Sem coleções.",
            }),
          o.map((r) =>
            e.jsxs(
              "div",
              {
                className: "p-4 flex flex-col sm:flex-row gap-4 sm:items-center",
                children: [
                  e.jsxs("div", {
                    className: "flex gap-4 items-center flex-1 min-w-0 w-full",
                    children: [
                      e.jsx("img", {
                        src: r.image_url,
                        alt: "",
                        className: "w-20 h-20 object-cover rounded-sm bg-secondary shrink-0",
                      }),
                      e.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [
                          e.jsx("div", {
                            className: "font-medium truncate text-sm",
                            children: r.title,
                          }),
                          e.jsxs("div", {
                            className: "text-xs text-muted-foreground truncate",
                            children: [r.subtitle, " · ", r.redirect_url],
                          }),
                          e.jsxs("div", {
                            className: "text-[10px] mt-1 tracking-editorial uppercase",
                            children: [
                              r.active
                                ? e.jsx("span", { className: "text-green-700", children: "Ativa" })
                                : e.jsx("span", {
                                    className: "text-muted-foreground",
                                    children: "Inativa",
                                  }),
                              " ",
                              "· ordem ",
                              r.order_position,
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
                        onClick: () => n(r, -1),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(y, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => n(r, 1),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(N, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => i(r),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(_, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => m(r.id),
                        className: "p-2 hover:bg-secondary rounded-sm text-destructive",
                        children: e.jsx(w, { className: "h-4 w-4" }),
                      }),
                    ],
                  }),
                ],
              },
              r.id,
            ),
          ),
        ],
      }),
      s &&
        e.jsx(k, {
          item: s,
          onClose: () => i(null),
          onSaved: () => {
            (i(null),
              l.invalidateQueries({ queryKey: ["admin-collections"] }),
              l.invalidateQueries({ queryKey: ["homepage-collections"] }));
          },
        }),
    ],
  });
}
function k({ item: l, onClose: o, onSaved: x }) {
  const [s, i] = p.useState(l),
    [m, n] = p.useState(!1),
    r = async (t) => {
      if ((t.preventDefault(), !s.title || !s.image_url))
        return u.error("Título e imagem são obrigatórios");
      n(!0);
      const h = {
          title: s.title,
          subtitle: s.subtitle || null,
          image_url: s.image_url,
          redirect_url: s.redirect_url || null,
          order_position: s.order_position,
          active: s.active,
        },
        { error: g } = s.id
          ? await d.from("homepage_collections").update(h).eq("id", s.id)
          : await d.from("homepage_collections").insert(h);
      if ((n(!1), g)) return u.error(g.message);
      (u.success("Salvo"), x());
    },
    a = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background",
    c = "text-xs tracking-editorial uppercase mb-1.5 block";
  return e.jsx("div", {
    className:
      "fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto",
    onClick: o,
    children: e.jsxs("form", {
      onSubmit: r,
      onClick: (t) => t.stopPropagation(),
      className: "bg-background rounded-sm max-w-2xl w-full p-6 space-y-4 my-8",
      children: [
        e.jsx("h2", {
          className: "font-display text-2xl",
          children: s.id ? "Editar coleção" : "Nova coleção",
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", { className: c, children: "Imagem *" }),
            e.jsx(j, {
              value: s.image_url,
              onChange: (t) => i({ ...s, image_url: t }),
              folder: "collections",
            }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", { className: c, children: "Título *" }),
            e.jsx("input", {
              className: a,
              value: s.title,
              onChange: (t) => i({ ...s, title: t.target.value }),
              required: !0,
            }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", { className: c, children: "Subtítulo" }),
            e.jsx("input", {
              className: a,
              value: s.subtitle ?? "",
              onChange: (t) => i({ ...s, subtitle: t.target.value }),
            }),
          ],
        }),
        e.jsxs("div", {
          className: "grid grid-cols-2 gap-4",
          children: [
            e.jsxs("div", {
              className: "col-span-2",
              children: [
                e.jsx("label", { className: c, children: "Link de redirecionamento" }),
                e.jsx("input", {
                  className: a,
                  placeholder: "/loja?cat=vestidos",
                  value: s.redirect_url ?? "",
                  onChange: (t) => i({ ...s, redirect_url: t.target.value }),
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: c, children: "Ordem" }),
                e.jsx("input", {
                  type: "number",
                  className: a,
                  value: s.order_position,
                  onChange: (t) => i({ ...s, order_position: parseInt(t.target.value || "0") }),
                }),
              ],
            }),
            e.jsxs("label", {
              className: "flex items-end gap-2 text-sm pb-2",
              children: [
                e.jsx("input", {
                  type: "checkbox",
                  checked: s.active,
                  onChange: (t) => i({ ...s, active: t.target.checked }),
                }),
                "Ativa",
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "flex gap-3 pt-2",
          children: [
            e.jsx("button", {
              disabled: m,
              className:
                "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
              children: m ? "Salvando..." : "Salvar",
            }),
            e.jsx("button", {
              type: "button",
              onClick: o,
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
export { I as component };
