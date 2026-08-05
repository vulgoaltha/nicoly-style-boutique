import {
  ac as Z,
  Q as h,
  B as V,
  u as G,
  V as ee,
  r as Q,
  aa as se,
  a7 as ae,
  a8 as z,
  a1 as te,
  D as e,
  L as re,
  a6 as S,
} from "./index-C2UuTsl-.js";
import { b as x } from "./format-W46puzMN.js";
import { c as ne } from "./melhorenvio.functions-un3qPrrm.js";
import { u as ie } from "./useQuery-tYhz7w83.js";
import { T as E } from "./truck-_8doA-LZ.js";
import { P as $ } from "./package-DKlLxxot.js";
import { B as U } from "./bike-CzRH9cJY.js";
import { M as oe } from "./map-pin-BD_OBluq.js";
import { M as T } from "./message-square-Dyyo5YKB.js";
import { C as ce, a as le } from "./chevron-up-BrI3s4vh.js";
function de(f) {
  const g = Z();
  return h.useCallback(
    async (...v) => {
      try {
        const r = await f(...v);
        if (V(r)) throw r;
        return r;
      } catch (r) {
        if (V(r))
          return (
            (r.options._fromLocation = g.stores.location.get()),
            g.navigate(g.resolveRedirect(r).options)
          );
        throw r;
      }
    },
    [g, f],
  );
}
const me = G({ method: "POST" })
    .middleware([ee])
    .handler(Q("7f92d135aa3763ddd5bf6d4d9f84832b6b591cbaa35dcc4048b4b1beed8e7bf3")),
  pe = G({ method: "POST" }).handler(
    Q("f56d0e1744b731038a3cdfabfc29f1d310cb7324ac7db44a506c6be0a2421074"),
  );
function _e() {
  const f = se(),
    { user: g, loading: v } = ae(),
    r = z((s) => s.items),
    _ = z((s) => s.subtotal()),
    X = z((s) => s.clear),
    K = de(me),
    [d, M] = h.useState("correios"),
    [C, F] = h.useState(!1),
    [Y, R] = h.useState(!1),
    [D, H] = h.useState(!1),
    { data: W } = ie({
      queryKey: ["site_settings", "shipping_settings"],
      queryFn: async () => {
        const { data: s, error: i } = await te
          .from("site_settings")
          .select("value")
          .eq("key", "shipping_settings")
          .maybeSingle();
        if (i) throw i;
        return s?.value || {};
      },
    }),
    [A, q] = h.useState([]),
    [y, w] = h.useState(""),
    [a, O] = h.useState({
      customer_name: "",
      customer_cpf: "",
      customer_email: "",
      customer_phone: "",
      shipping_cep: "",
      shipping_street: "",
      shipping_number: "",
      shipping_complement: "",
      shipping_neighborhood: "",
      shipping_city: "",
      shipping_state: "",
      notes: "",
    });
  h.useEffect(() => {
    !v && !g && f({ to: "/login" });
  }, [v, g, f]);
  const J = async (s) => {
      const i = s.replace(/\D/g, "");
      if ((O((n) => ({ ...n, shipping_cep: s })), i.length === 8)) {
        R(!0);
        try {
          const n = await fetch(`https://brasilapi.com.br/api/cep/v2/${i}`);
          if (!n.ok) throw new Error("CEP não encontrado");
          const b = await n.json();
          O((t) => ({
            ...t,
            shipping_street: b.street || t.shipping_street,
            shipping_neighborhood: b.neighborhood || t.shipping_neighborhood,
            shipping_city: b.city || t.shipping_city,
            shipping_state: b.state || t.shipping_state,
          }));
          const j = await pe({
            data: {
              destination_cep: i,
              items: r.map((t) => ({
                id: t.productId,
                name: t.name,
                quantity: t.quantity,
                price: t.price,
              })),
            },
          });
          if (j.success && j.options && j.options.length > 0) {
            const t = j.options.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              days: p.days,
              icon: p.name.toLowerCase().includes("sedex") ? E : $,
            }));
            (q(t), w(t[0].id));
            return;
          }
          const N = await ne({
            data: {
              destination_cep: i,
              items: r.map((t) => ({
                id: t.productId,
                name: t.name,
                quantity: t.quantity,
                price: t.price,
              })),
            },
          });
          if (N.success && N.options && N.options.length > 0) {
            const t = N.options.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              days: p.days,
              icon: p.name.toLowerCase().includes("sedex") ? E : $,
            }));
            (q(t), w(t[0].id));
            return;
          }
          const l = W || {},
            k = b.state === "SP",
            I = [
              {
                id: "sedex",
                name: "SEDEX (Correios)",
                price: Number(k ? (l.correios_sedex_sp ?? 25.9) : (l.correios_sedex_br ?? 65.9)),
                days: k ? "Até 3 dias úteis" : "Até 7 dias úteis",
                icon: E,
              },
              {
                id: "pac",
                name: "PAC (Correios)",
                price: Number(k ? (l.correios_pac_sp ?? 18.5) : (l.correios_pac_br ?? 38.5)),
                days: k ? "Até 6 dias úteis" : "Até 12 dias úteis",
                icon: $,
              },
            ];
          (q(I), I.length > 0 && w(I[0].id));
        } catch {
          S.error("Não foi possível calcular o frete para este CEP.");
        } finally {
          R(!1);
        }
      }
    },
    u = d === "correios" ? A.find((s) => s.id === y) : null,
    L = _ + (u?.price || 0);
  if (!g) return null;
  if (!r.length)
    return e.jsxs("div", {
      className: "container-editorial py-24 text-center",
      children: [
        e.jsx("h1", { className: "font-display text-3xl", children: "Sua sacola está vazia" }),
        e.jsx(re, {
          to: "/loja",
          className: "mt-6 inline-block text-xs tracking-editorial uppercase underline",
          children: "Ver coleção",
        }),
      ],
    });
  const m = (s) => (i) => O((n) => ({ ...n, [s]: i.target.value })),
    B = async (s) => {
      if ((s.preventDefault(), d === "correios" && !u)) {
        S.error("Por favor, digite um CEP válido e selecione o tipo de frete dos Correios.");
        return;
      }
      F(!0);
      try {
        const i = await K({
          data: {
            ...a,
            shipping_cost: u?.price || 0,
            notes: a.notes
              ? a.notes +
                `
[MÉTODO DE ENVIO: ${u?.name || "Correios"}]`
              : `[MÉTODO DE ENVIO: ${u?.name || "Correios"}]`,
            items: r.map((n) => ({
              productId: n.productId,
              slug: n.slug,
              name: n.name,
              image: n.image,
              price: n.price,
              size: n.size,
              color: n.color,
              quantity: n.quantity,
            })),
          },
        });
        (X(),
          S.success("Pedido criado com sucesso!"),
          f({ to: "/checkout/pagamento/$orderId", params: { orderId: i.id } }));
      } catch (i) {
        S.error(i instanceof Error ? i.message : "Erro ao criar pedido");
      } finally {
        F(!1);
      }
    },
    P = () => {
      const n = ((W || {}).whatsapp_number || "5511994565923").replace(/\D/g, ""),
        b = r.map(
          (l) =>
            `• ${l.quantity}x ${l.name}${l.size ? ` (Tam: ${l.size})` : ""}${l.color ? ` (Cor: ${l.color})` : ""} - ${x(l.price * l.quantity)}`,
        ).join(`
`),
        j =
          `*SOLICITAÇÃO DE ENTREGA VIA MOTOBOY*

*Cliente:* ${a.customer_name || "Não informado"}
*Telefone:* ${a.customer_phone || "Não informado"}
` +
          (a.shipping_street
            ? `*Endereço:* ${a.shipping_street}, ${a.shipping_number} - ${a.shipping_city}/${a.shipping_state}
`
            : "") +
          `
*ITENS DA SACOLA:*
${b}

*Subtotal:* ${x(_)}

Olá! Gostaria de combinar o valor do frete e o horário da entrega via Motoboy.`,
        N = `https://wa.me/${n}?text=${encodeURIComponent(j)}`;
      window.open(N, "_blank");
    },
    o =
      "w-full border border-border bg-background rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-blush transition-colors",
    c = "block text-xs tracking-editorial uppercase text-muted-foreground mb-1.5";
  return e.jsxs("div", {
    className: "container-editorial py-8 md:py-16",
    children: [
      e.jsx("h1", {
        className: "font-display text-3xl md:text-4xl mb-6 md:mb-8",
        children: "Finalizar compra",
      }),
      e.jsxs("form", {
        onSubmit: B,
        className: "grid md:grid-cols-3 gap-6 md:gap-10",
        children: [
          e.jsxs("div", {
            className: "md:col-span-2 space-y-8",
            children: [
              e.jsxs("section", {
                className: "space-y-4",
                children: [
                  e.jsx("h2", {
                    className: "font-display text-xl md:text-2xl",
                    children: "Dados do cliente",
                  }),
                  e.jsxs("div", {
                    className: "grid sm:grid-cols-2 gap-4",
                    children: [
                      e.jsxs("div", {
                        className: "sm:col-span-2",
                        children: [
                          e.jsx("label", { className: c, children: "Nome completo" }),
                          e.jsx("input", {
                            required: !0,
                            value: a.customer_name,
                            onChange: m("customer_name"),
                            className: o,
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", { className: c, children: "E-mail" }),
                          e.jsx("input", {
                            required: !0,
                            type: "email",
                            value: a.customer_email,
                            onChange: m("customer_email"),
                            className: o,
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", { className: c, children: "CPF" }),
                          e.jsx("input", {
                            required: !0,
                            value: a.customer_cpf,
                            onChange: m("customer_cpf"),
                            className: o,
                            placeholder: "000.000.000-00",
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "sm:col-span-2",
                        children: [
                          e.jsx("label", { className: c, children: "Telefone / WhatsApp" }),
                          e.jsx("input", {
                            required: !0,
                            value: a.customer_phone,
                            onChange: m("customer_phone"),
                            className: o,
                            placeholder: "(11) 99999-9999",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("section", {
                className: "space-y-4",
                children: [
                  e.jsxs("h2", {
                    className: "font-display text-xl md:text-2xl flex items-center gap-2",
                    children: [
                      e.jsx(E, { className: "h-5 w-5 text-blush flex-shrink-0" }),
                      " Forma de Entrega",
                    ],
                  }),
                  e.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                    children: [
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => M("correios"),
                        className: `p-4 rounded-md border text-left transition-all flex flex-col justify-between gap-3 ${d === "correios" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/40 bg-background"}`,
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              e.jsx("div", {
                                className: `p-2.5 rounded-full ${d === "correios" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`,
                                children: e.jsx($, { className: "h-5 w-5" }),
                              }),
                              e.jsxs("div", {
                                children: [
                                  e.jsx("div", {
                                    className: "font-medium text-sm",
                                    children: "Entrega via Correios",
                                  }),
                                  e.jsx("div", {
                                    className: "text-xs text-muted-foreground",
                                    children: "PAC e SEDEX (Oficial)",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsx("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "Digite seu CEP para calcular a taxa de frete automaticamente e pagar pelo site.",
                          }),
                        ],
                      }),
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => M("motoboy"),
                        className: `p-4 rounded-md border text-left transition-all flex flex-col justify-between gap-3 ${d === "motoboy" ? "border-[#25D366] bg-[#25D366]/5 ring-2 ring-[#25D366]/20" : "border-border hover:border-[#25D366]/40 bg-background"}`,
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              e.jsx("div", {
                                className: `p-2.5 rounded-full ${d === "motoboy" ? "bg-[#25D366] text-white" : "bg-secondary text-muted-foreground"}`,
                                children: e.jsx(U, { className: "h-5 w-5" }),
                              }),
                              e.jsxs("div", {
                                children: [
                                  e.jsx("div", {
                                    className: "font-medium text-sm",
                                    children: "Entrega via Motoboy",
                                  }),
                                  e.jsx("div", {
                                    className: "text-xs text-[#25D366] font-medium",
                                    children: "WhatsApp Direto",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsx("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "Fale diretamente com nossa atendente no WhatsApp para combinar taxa e entrega.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              d === "correios"
                ? e.jsxs(e.Fragment, {
                    children: [
                      e.jsxs("section", {
                        className: "space-y-4",
                        children: [
                          e.jsxs("h3", {
                            className: "font-display text-lg md:text-xl flex items-center gap-2",
                            children: [
                              e.jsx(oe, { className: "h-5 w-5 text-blush flex-shrink-0" }),
                              " Endereço de entrega",
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "grid grid-cols-2 sm:grid-cols-6 gap-4 bg-secondary/20 p-4 sm:p-5 rounded-md border border-border",
                            children: [
                              e.jsxs("div", {
                                className: "col-span-2 sm:col-span-2",
                                children: [
                                  e.jsx("label", { className: c, children: "CEP" }),
                                  e.jsx("input", {
                                    required: !0,
                                    value: a.shipping_cep,
                                    onChange: (s) => J(s.target.value),
                                    className: o,
                                    placeholder: "00000-000",
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-2 sm:col-span-4",
                                children: [
                                  e.jsx("label", { className: c, children: "Rua" }),
                                  e.jsx("input", {
                                    required: !0,
                                    value: a.shipping_street,
                                    onChange: m("shipping_street"),
                                    className: o,
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-1 sm:col-span-2",
                                children: [
                                  e.jsx("label", { className: c, children: "Número" }),
                                  e.jsx("input", {
                                    required: !0,
                                    value: a.shipping_number,
                                    onChange: m("shipping_number"),
                                    className: o,
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-1 sm:col-span-4",
                                children: [
                                  e.jsx("label", { className: c, children: "Complemento" }),
                                  e.jsx("input", {
                                    value: a.shipping_complement,
                                    onChange: m("shipping_complement"),
                                    className: o,
                                    placeholder: "Apto, Bloco (opcional)",
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-2 sm:col-span-3",
                                children: [
                                  e.jsx("label", { className: c, children: "Bairro" }),
                                  e.jsx("input", {
                                    required: !0,
                                    value: a.shipping_neighborhood,
                                    onChange: m("shipping_neighborhood"),
                                    className: o,
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-1 sm:col-span-2",
                                children: [
                                  e.jsx("label", { className: c, children: "Cidade" }),
                                  e.jsx("input", {
                                    required: !0,
                                    value: a.shipping_city,
                                    onChange: m("shipping_city"),
                                    className: o,
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-1 sm:col-span-1",
                                children: [
                                  e.jsx("label", { className: c, children: "UF" }),
                                  e.jsx("input", {
                                    required: !0,
                                    maxLength: 2,
                                    value: a.shipping_state,
                                    onChange: m("shipping_state"),
                                    className: `${o} uppercase`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("section", {
                        className: "space-y-4",
                        children: [
                          e.jsx("h3", {
                            className: "font-display text-lg md:text-xl",
                            children: "Opções de Frete dos Correios",
                          }),
                          Y
                            ? e.jsx("div", {
                                className:
                                  "p-8 border border-border border-dashed rounded-md text-center text-sm text-muted-foreground animate-pulse",
                                children: "Calculando preço e prazo oficial dos Correios...",
                              })
                            : A.length > 0
                              ? e.jsx("div", {
                                  className: "grid gap-3",
                                  children: A.map((s) =>
                                    e.jsxs(
                                      "label",
                                      {
                                        className: `flex items-center gap-4 p-4 rounded-md border cursor-pointer transition-colors ${y === s.id ? "border-blush bg-blush/5" : "border-border hover:border-blush/50"}`,
                                        children: [
                                          e.jsx("input", {
                                            type: "radio",
                                            name: "shipping_method",
                                            value: s.id,
                                            checked: y === s.id,
                                            onChange: () => w(s.id),
                                            className: "text-blush focus:ring-blush flex-shrink-0",
                                          }),
                                          e.jsxs("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                              e.jsxs("div", {
                                                className:
                                                  "flex items-center justify-between gap-2",
                                                children: [
                                                  e.jsxs("div", {
                                                    className:
                                                      "flex items-center gap-2 font-medium text-sm min-w-0",
                                                    children: [
                                                      e.jsx(s.icon, {
                                                        className:
                                                          "h-4 w-4 text-muted-foreground flex-shrink-0",
                                                      }),
                                                      e.jsx("span", {
                                                        className: "truncate",
                                                        children: s.name,
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsx("span", {
                                                    className: "font-bold text-sm flex-shrink-0",
                                                    children: x(s.price),
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "text-xs text-muted-foreground mt-1",
                                                children: ["Prazo estimado: ", s.days],
                                              }),
                                            ],
                                          }),
                                        ],
                                      },
                                      s.id,
                                    ),
                                  ),
                                })
                              : e.jsx("div", {
                                  className:
                                    "p-8 border border-border border-dashed rounded-md text-center text-sm text-muted-foreground bg-secondary/10",
                                  children:
                                    "Digite um CEP válido para calcular o valor do frete dos Correios.",
                                }),
                          e.jsxs("div", {
                            className: "pt-2",
                            children: [
                              e.jsx("label", {
                                className: c,
                                children: "Observações do pedido (opcional)",
                              }),
                              e.jsx("textarea", {
                                rows: 3,
                                value: a.notes,
                                onChange: m("notes"),
                                className: o,
                                placeholder: "Instruções de entrega, referências, etc.",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : e.jsxs("section", {
                    className: "space-y-6 bg-[#25D366]/5 border border-[#25D366]/30 p-6 rounded-md",
                    children: [
                      e.jsxs("div", {
                        className: "flex items-start gap-4",
                        children: [
                          e.jsx("div", {
                            className: "p-3 bg-[#25D366] text-white rounded-full flex-shrink-0",
                            children: e.jsx(U, { className: "h-6 w-6" }),
                          }),
                          e.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              e.jsx("h3", {
                                className: "font-display text-xl font-medium",
                                children: "Entrega por Motoboy",
                              }),
                              e.jsx("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "Ao escolher entrega via Motoboy, o valor do frete e o horário da entrega são combinados diretamente com a atendente da loja via WhatsApp.",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "space-y-3 border-t border-[#25D366]/20 pt-4",
                        children: [
                          e.jsx("label", {
                            className: c,
                            children: "Endereço ou Bairro para entrega (opcional)",
                          }),
                          e.jsx("input", {
                            value: a.shipping_street,
                            onChange: m("shipping_street"),
                            className: o,
                            placeholder: "Ex: Rua Exemplo, 123 - Bairro Central",
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "pt-2 flex flex-col sm:flex-row items-center gap-3",
                        children: e.jsxs("button", {
                          type: "button",
                          onClick: P,
                          className:
                            "w-full sm:w-auto flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-4 rounded-sm flex items-center justify-center gap-3 text-sm transition-all shadow-sm",
                          children: [
                            e.jsx(T, { className: "h-5 w-5" }),
                            "Conversar com Atendente no WhatsApp",
                          ],
                        }),
                      }),
                    ],
                  }),
            ],
          }),
          e.jsx("div", {
            className: "hidden md:block",
            children: e.jsxs("aside", {
              className:
                "space-y-4 border border-border p-6 rounded-sm h-fit bg-secondary/30 sticky top-24 shadow-sm",
              children: [
                e.jsx("h2", { className: "font-display text-xl", children: "Resumo do pedido" }),
                e.jsx("ul", {
                  className: "space-y-3 text-sm max-h-48 overflow-y-auto pr-2 scrollbar-hide",
                  children: r.map((s) =>
                    e.jsxs(
                      "li",
                      {
                        className: "flex justify-between gap-2",
                        children: [
                          e.jsxs("span", {
                            className: "text-muted-foreground truncate flex-1",
                            children: [
                              s.quantity,
                              "× ",
                              s.name,
                              s.size &&
                                e.jsxs("span", { className: "text-xs", children: [" · ", s.size] }),
                            ],
                          }),
                          e.jsx("span", {
                            className: "shrink-0",
                            children: x(s.price * s.quantity),
                          }),
                        ],
                      },
                      `${s.productId}_${s.size}_${s.color}`,
                    ),
                  ),
                }),
                e.jsxs("div", {
                  className: "border-t border-border pt-4 space-y-2 text-sm",
                  children: [
                    e.jsxs("div", {
                      className: "flex justify-between",
                      children: [
                        e.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                        e.jsx("span", { children: x(_) }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex justify-between items-center",
                      children: [
                        e.jsx("span", { className: "text-muted-foreground", children: "Frete" }),
                        d === "motoboy"
                          ? e.jsx("span", {
                              className: "text-xs text-[#25D366] font-medium",
                              children: "Combinar no WhatsApp",
                            })
                          : u
                            ? e.jsxs("span", {
                                className: "font-medium text-emerald-600",
                                children: ["+ ", x(u.price)],
                              })
                            : e.jsx("span", {
                                className: "text-xs text-muted-foreground",
                                children: "A calcular",
                              }),
                      ],
                    }),
                    e.jsxs("div", {
                      className:
                        "flex justify-between font-bold pt-3 border-t border-border mt-2 text-base",
                      children: [
                        e.jsx("span", { children: "Total" }),
                        e.jsx("span", { children: x(L) }),
                      ],
                    }),
                  ],
                }),
                d === "correios"
                  ? e.jsx("button", {
                      type: "submit",
                      disabled: C || !y,
                      className:
                        "w-full bg-primary text-primary-foreground py-3.5 mt-2 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-60 transition-opacity",
                      children: C ? "Processando..." : "Ir para pagamento",
                    })
                  : e.jsxs("button", {
                      type: "button",
                      onClick: P,
                      className:
                        "w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 mt-2 text-xs tracking-editorial uppercase rounded-sm transition-opacity flex items-center justify-center gap-2 font-medium",
                      children: [e.jsx(T, { className: "h-4 w-4" }), "Finalizar no WhatsApp"],
                    }),
                e.jsx("p", {
                  className: "text-xs text-muted-foreground text-center mt-4",
                  children:
                    d === "correios"
                      ? "O pagamento será processado com segurança via Mercado Pago."
                      : "A entrega e o pagamento serão combinados diretamente pelo WhatsApp.",
                }),
              ],
            }),
          }),
        ],
      }),
      e.jsxs("div", {
        className:
          "md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border pb-safe",
        children: [
          D &&
            e.jsxs("div", {
              className: "px-4 pt-4 pb-2 border-b border-border bg-background",
              children: [
                e.jsx("ul", {
                  className: "space-y-2 text-sm max-h-36 overflow-y-auto scrollbar-hide mb-3",
                  children: r.map((s) =>
                    e.jsxs(
                      "li",
                      {
                        className: "flex justify-between gap-2",
                        children: [
                          e.jsxs("span", {
                            className: "text-muted-foreground truncate flex-1",
                            children: [
                              s.quantity,
                              "× ",
                              s.name,
                              s.size &&
                                e.jsxs("span", { className: "text-xs", children: [" · ", s.size] }),
                            ],
                          }),
                          e.jsx("span", {
                            className: "shrink-0 text-xs",
                            children: x(s.price * s.quantity),
                          }),
                        ],
                      },
                      `${s.productId}_${s.size}_${s.color}`,
                    ),
                  ),
                }),
                e.jsxs("div", {
                  className: "flex justify-between text-xs text-muted-foreground mb-1",
                  children: [
                    e.jsx("span", { children: "Subtotal" }),
                    e.jsx("span", { children: x(_) }),
                  ],
                }),
                e.jsxs("div", {
                  className: "flex justify-between text-xs text-muted-foreground",
                  children: [
                    e.jsx("span", { children: "Frete" }),
                    e.jsx("span", {
                      children:
                        d === "motoboy" ? "Combinar no WhatsApp" : u ? x(u.price) : "A calcular",
                    }),
                  ],
                }),
              ],
            }),
          e.jsxs("div", {
            className: "flex items-center gap-3 px-4 py-3",
            children: [
              e.jsxs("button", {
                type: "button",
                onClick: () => H((s) => !s),
                className: "flex-1 flex items-center gap-1 min-w-0",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsxs("div", {
                        className: "text-xs text-muted-foreground text-left",
                        children: [
                          D ? "Ocultar resumo" : "Ver resumo",
                          " (",
                          r.length,
                          " ",
                          r.length === 1 ? "item" : "itens",
                          ")",
                        ],
                      }),
                      e.jsx("div", {
                        className: "font-display text-lg font-medium",
                        children: x(L),
                      }),
                    ],
                  }),
                  D
                    ? e.jsx(ce, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
                    : e.jsx(le, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                ],
              }),
              d === "correios"
                ? e.jsx("button", {
                    form: "checkout-form",
                    type: "submit",
                    disabled: C || !y,
                    onClick: B,
                    className:
                      "flex-shrink-0 bg-primary text-primary-foreground px-5 py-3 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-60 transition-opacity",
                    children: C ? "..." : "Pagar",
                  })
                : e.jsxs("button", {
                    type: "button",
                    onClick: P,
                    className:
                      "flex-shrink-0 bg-[#25D366] text-[#ffffff] px-4 py-3 text-xs tracking-editorial uppercase rounded-sm flex items-center gap-1 font-medium",
                    children: [e.jsx(T, { className: "h-4 w-4" }), "WhatsApp"],
                  }),
            ],
          }),
        ],
      }),
      e.jsx("div", { className: "md:hidden h-28" }),
    ],
  });
}
export { _e as component };
