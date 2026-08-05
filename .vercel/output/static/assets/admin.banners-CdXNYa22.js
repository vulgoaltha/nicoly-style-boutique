import { ab as g, a1 as m, Q as p, D as e, a6 as d } from "./index-C2UuTsl-.js";
import { u as v } from "./useQuery-tYhz7w83.js";
import { I as j } from "./ImageUploader-IIOT2Nak.js";
import { P as f } from "./plus-CNmxyVSh.js";
import { a as N, A as y, P as _ } from "./pencil-vgQ1QePa.js";
import { T as k } from "./trash-2-DsdEvVgJ.js";
import "./upload-CH3K2uMF.js";
function K() {
  const o = g(),
    { data: l = [], refetch: x } = v({
      queryKey: ["admin-banners"],
      queryFn: async () => {
        const { data: r, error: a } = await m
          .from("hero_banners")
          .select("*")
          .order("order_position");
        if (a) throw a;
        return r;
      },
    }),
    [s, n] = p.useState(null),
    u = async (r) => {
      if (!confirm("Excluir banner?")) return;
      const { error: a } = await m.from("hero_banners").delete().eq("id", r);
      if (a) return d.error(a.message);
      (d.success("Excluído"), x());
    },
    c = async (r, a) => {
      const { error: i } = await m
        .from("hero_banners")
        .update({ order_position: r.order_position + a })
        .eq("id", r.id);
      if (i) return d.error(i.message);
      (o.invalidateQueries({ queryKey: ["admin-banners"] }),
        o.invalidateQueries({ queryKey: ["hero-banners"] }));
    };
  return e.jsxs("div", {
    children: [
      e.jsxs("div", {
        className: "flex items-center justify-between mb-6",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", { className: "font-display text-3xl", children: "Banners da home" }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Hero carousel premium da vitrine",
              }),
            ],
          }),
          e.jsxs("button", {
            onClick: () =>
              n({
                id: "",
                title: "",
                subtitle: "",
                image_url: "",
                button_text: "Comprar",
                button_link: "/loja",
                active: !0,
                order_position: l.length,
              }),
            className:
              "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-editorial uppercase rounded-sm",
            children: [e.jsx(f, { className: "h-4 w-4" }), " Novo banner"],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "bg-background border border-border rounded-sm divide-y divide-border",
        children: [
          l.length === 0 &&
            e.jsx("div", {
              className: "p-8 text-sm text-muted-foreground text-center",
              children: "Nenhum banner cadastrado. Crie o primeiro.",
            }),
          l.map((r) =>
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
                        className:
                          "w-24 h-14 sm:w-28 sm:h-16 object-cover rounded-sm bg-secondary shrink-0",
                      }),
                      e.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [
                          e.jsx("div", {
                            className: "font-medium truncate text-sm",
                            children: r.title,
                          }),
                          e.jsx("div", {
                            className: "text-xs text-muted-foreground truncate",
                            children: r.subtitle,
                          }),
                          e.jsxs("div", {
                            className: "text-[10px] mt-1 tracking-editorial uppercase",
                            children: [
                              r.active
                                ? e.jsx("span", { className: "text-green-700", children: "Ativo" })
                                : e.jsx("span", {
                                    className: "text-muted-foreground",
                                    children: "Inativo",
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
                        onClick: () => c(r, -1),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(N, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => c(r, 1),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(y, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => n(r),
                        className: "p-2 hover:bg-secondary rounded-sm",
                        children: e.jsx(_, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => u(r.id),
                        className: "p-2 hover:bg-secondary rounded-sm text-destructive",
                        children: e.jsx(k, { className: "h-4 w-4" }),
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
        e.jsx(w, {
          banner: s,
          onClose: () => n(null),
          onSaved: () => {
            (n(null),
              o.invalidateQueries({ queryKey: ["admin-banners"] }),
              o.invalidateQueries({ queryKey: ["hero-banners"] }));
          },
        }),
    ],
  });
}
function w({ banner: o, onClose: l, onSaved: x }) {
  const [s, n] = p.useState(o),
    [u, c] = p.useState(!1),
    r = async (t) => {
      if ((t.preventDefault(), !s.title || !s.image_url))
        return d.error("Título e imagem são obrigatórios");
      c(!0);
      const b = {
          title: s.title,
          subtitle: s.subtitle || null,
          image_url: s.image_url,
          button_text: s.button_text || null,
          button_link: s.button_link || null,
          active: s.active,
          order_position: s.order_position,
        },
        { error: h } = s.id
          ? await m.from("hero_banners").update(b).eq("id", s.id)
          : await m.from("hero_banners").insert(b);
      if ((c(!1), h)) return d.error(h.message);
      (d.success("Salvo"), x());
    },
    a = "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background",
    i = "text-xs tracking-editorial uppercase mb-1.5 block";
  return e.jsx("div", {
    className:
      "fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto",
    onClick: l,
    children: e.jsxs("form", {
      onSubmit: r,
      onClick: (t) => t.stopPropagation(),
      className: "bg-background rounded-sm max-w-2xl w-full p-6 space-y-4 my-8",
      children: [
        e.jsx("h2", {
          className: "font-display text-2xl",
          children: s.id ? "Editar banner" : "Novo banner",
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", { className: i, children: "Imagem *" }),
            e.jsx(j, {
              value: s.image_url,
              onChange: (t) => n({ ...s, image_url: t }),
              folder: "banners",
            }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", { className: i, children: "Título *" }),
            e.jsx("input", {
              className: a,
              value: s.title,
              onChange: (t) => n({ ...s, title: t.target.value }),
              required: !0,
            }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", { className: i, children: "Subtítulo" }),
            e.jsx("textarea", {
              className: a,
              rows: 2,
              value: s.subtitle ?? "",
              onChange: (t) => n({ ...s, subtitle: t.target.value }),
            }),
          ],
        }),
        e.jsxs("div", {
          className: "grid grid-cols-2 gap-4",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: i, children: "Texto do botão" }),
                e.jsx("input", {
                  className: a,
                  value: s.button_text ?? "",
                  onChange: (t) => n({ ...s, button_text: t.target.value }),
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: i, children: "Link do botão" }),
                e.jsx("input", {
                  className: a,
                  placeholder: "/loja",
                  value: s.button_link ?? "",
                  onChange: (t) => n({ ...s, button_link: t.target.value }),
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", { className: i, children: "Ordem" }),
                e.jsx("input", {
                  type: "number",
                  className: a,
                  value: s.order_position,
                  onChange: (t) => n({ ...s, order_position: parseInt(t.target.value || "0") }),
                }),
              ],
            }),
            e.jsxs("label", {
              className: "flex items-end gap-2 text-sm pb-2",
              children: [
                e.jsx("input", {
                  type: "checkbox",
                  checked: s.active,
                  onChange: (t) => n({ ...s, active: t.target.checked }),
                }),
                "Ativo",
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "flex gap-3 pt-2",
          children: [
            e.jsx("button", {
              disabled: u,
              className:
                "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
              children: u ? "Salvando..." : "Salvar",
            }),
            e.jsx("button", {
              type: "button",
              onClick: l,
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
export { K as component };
