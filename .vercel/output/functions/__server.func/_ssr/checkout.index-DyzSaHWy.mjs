import { r as b, j as e } from "../_libs/react.mjs";
import { d as ae, L as re, e as ie } from "../_libs/tanstack__react-router.mjs";
import { A as G } from "../_libs/tanstack__router-core.mjs";
import { t as D } from "../_libs/sonner.mjs";
import { u as oe, f as F } from "./router-CzERE3r3.mjs";
import { r as u } from "./format-W46puzMN.mjs";
import { t as Y } from "./payment.functions-DaljBhjR.mjs";
import { a as H } from "./server-DXgSSFBn.mjs";
import { p as ne } from "./auth-middleware-Ia7fKZJE.mjs";
import { d as le } from "./melhorenvio.functions-wu53r3N7.mjs";
import { a as ce } from "../_libs/tanstack__react-query.mjs";
import { p as de } from "./client-DbGX8m2J.mjs";
import "../_libs/seroval.mjs";
import {
  a8 as A,
  P as q,
  e as K,
  M as me,
  K as M,
  i as pe,
  l as xe,
} from "../_libs/lucide-react.mjs";
import { o as S, b as J, n as y, s as r } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zustand.mjs";
import "./client.server-_0x--M5Y.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function ue(h) {
  const f = ie();
  return b.useCallback(
    async (...v) => {
      try {
        const i = await h(...v);
        if (G(i)) throw i;
        return i;
      } catch (i) {
        if (G(i))
          return (
            (i.options._fromLocation = f.stores.location.get()),
            f.navigate(f.resolveRedirect(i).options)
          );
        throw i;
      }
    },
    [f, h],
  );
}
const he = S({
    productId: r().uuid(),
    slug: r().min(1).max(200),
    name: r().min(1).max(300),
    image: r().max(1e3).optional().default(""),
    price: y().nonnegative(),
    size: r().max(40).optional(),
    color: r().max(40).optional(),
    quantity: y().int().min(1).max(50),
  }),
  ge = S({
    customer_name: r().trim().min(2).max(120),
    customer_cpf: r().trim().min(11).max(14),
    customer_email: r().trim().email().max(200),
    customer_phone: r().trim().min(8).max(30),
    shipping_cep: r().trim().min(8).max(12),
    shipping_street: r().trim().min(2).max(200),
    shipping_number: r().trim().min(1).max(20),
    shipping_complement: r().trim().max(120).optional(),
    shipping_neighborhood: r().trim().min(2).max(120),
    shipping_city: r().trim().min(2).max(120),
    shipping_state: r().trim().min(2).max(2),
    notes: r().trim().max(500).optional(),
    shipping_cost: y().nonnegative().max(1e4).default(0),
    items: J(he).min(1).max(50),
  }),
  be = H({ method: "POST" })
    .middleware([ne])
    .inputValidator((h) => ge.parse(h))
    .handler(Y("7f92d135aa3763ddd5bf6d4d9f84832b6b591cbaa35dcc4048b4b1beed8e7bf3")),
  fe = S({
    destination_cep: r().trim().min(8).max(9),
    items: J(S({ id: r().optional(), name: r(), quantity: y().int().min(1), price: y() })),
  }),
  je = H({ method: "POST" })
    .inputValidator((h) => fe.parse(h))
    .handler(Y("f56d0e1744b731038a3cdfabfc29f1d310cb7324ac7db44a506c6be0a2421074"));
function ls() {
  const h = ae(),
    { user: f, loading: v } = oe(),
    i = F((s) => s.items),
    _ = F((s) => s.subtotal()),
    Q = F((s) => s.clear),
    Z = ue(be),
    [m, R] = b.useState("correios"),
    [w, L] = b.useState(!1),
    [ee, V] = b.useState(!1),
    [P, se] = b.useState(!1),
    { data: B } = ce({
      queryKey: ["site_settings", "shipping_settings"],
      queryFn: async () => {
        const { data: s, error: n } = await de
          .from("site_settings")
          .select("value")
          .eq("key", "shipping_settings")
          .maybeSingle();
        if (n) throw n;
        return s?.value || {};
      },
    }),
    [O, I] = b.useState([]),
    [N, C] = b.useState(""),
    [t, z] = b.useState({
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
  b.useEffect(() => {
    !v && !f && h({ to: "/login" });
  }, [v, f, h]);
  const te = async (s) => {
      const n = s.replace(/\D/g, "");
      if ((z((o) => ({ ...o, shipping_cep: s })), n.length === 8)) {
        V(!0);
        try {
          const o = await fetch(`https://brasilapi.com.br/api/cep/v2/${n}`);
          if (!o.ok) throw new Error("CEP não encontrado");
          const j = await o.json();
          z((a) => ({
            ...a,
            shipping_street: j.street || a.shipping_street,
            shipping_neighborhood: j.neighborhood || a.shipping_neighborhood,
            shipping_city: j.city || a.shipping_city,
            shipping_state: j.state || a.shipping_state,
          }));
          const d = await je({
            data: {
              destination_cep: n,
              items: i.map((a) => ({
                id: a.productId,
                name: a.name,
                quantity: a.quantity,
                price: a.price,
              })),
            },
          });
          if (d.success && d.options && d.options.length > 0) {
            const a = d.options.map((x) => ({
              id: x.id,
              name: x.name,
              price: x.price,
              days: x.days,
              icon: x.name.toLowerCase().includes("sedex") ? A : q,
            }));
            (I(a), C(a[0].id));
            return;
          }
          const k = await le({
            data: {
              destination_cep: n,
              items: i.map((a) => ({
                id: a.productId,
                name: a.name,
                quantity: a.quantity,
                price: a.price,
              })),
            },
          });
          if (k.success && k.options && k.options.length > 0) {
            const a = k.options.map((x) => ({
              id: x.id,
              name: x.name,
              price: x.price,
              days: x.days,
              icon: x.name.toLowerCase().includes("sedex") ? A : q,
            }));
            (I(a), C(a[0].id));
            return;
          }
          const $ = B || {},
            E = j.state === "SP",
            W = [
              {
                id: "sedex",
                name: "SEDEX (Correios)",
                price: Number(E ? ($.correios_sedex_sp ?? 25.9) : ($.correios_sedex_br ?? 65.9)),
                days: E ? "Até 3 dias úteis" : "Até 7 dias úteis",
                icon: A,
              },
              {
                id: "pac",
                name: "PAC (Correios)",
                price: Number(E ? ($.correios_pac_sp ?? 18.5) : ($.correios_pac_br ?? 38.5)),
                days: E ? "Até 6 dias úteis" : "Até 12 dias úteis",
                icon: q,
              },
            ];
          (I(W), W.length > 0 && C(W[0].id));
        } catch {
          D.error("Não foi possível calcular o frete para este CEP.");
        } finally {
          V(!1);
        }
      }
    },
    g = m === "correios" ? O.find((s) => s.id === N) : null,
    U = _ + (g?.price || 0);
  if (!f) return null;
  if (!i.length)
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
  const p = (s) => (n) => z((o) => ({ ...o, [s]: n.target.value })),
    X = async (s) => {
      if ((s.preventDefault(), m === "correios" && !g)) {
        D.error("Por favor, digite um CEP válido e selecione o tipo de frete dos Correios.");
        return;
      }
      L(!0);
      try {
        const n = await Z({
          data: {
            ...t,
            shipping_cost: g?.price || 0,
            notes: t.notes
              ? t.notes +
                `
[MÉTODO DE ENVIO: ${g?.name || "Correios"}]`
              : `[MÉTODO DE ENVIO: ${g?.name || "Correios"}]`,
            items: i.map((o) => ({
              productId: o.productId,
              slug: o.slug,
              name: o.name,
              image: o.image,
              price: o.price,
              size: o.size,
              color: o.color,
              quantity: o.quantity,
            })),
          },
        });
        (Q(),
          D.success("Pedido criado com sucesso!"),
          h({ to: "/checkout/pagamento/$orderId", params: { orderId: n.id } }));
      } catch (n) {
        D.error(n instanceof Error ? n.message : "Erro ao criar pedido");
      } finally {
        L(!1);
      }
    },
    T = () => {
      const s = ((B || {}).whatsapp_number || "5511994565923").replace(/\D/g, ""),
        n = i.map(
          (d) =>
            `• ${d.quantity}x ${d.name}${d.size ? ` (Tam: ${d.size})` : ""}${d.color ? ` (Cor: ${d.color})` : ""} - ${u(d.price * d.quantity)}`,
        ).join(`
`),
        o =
          `*SOLICITAÇÃO DE ENTREGA VIA MOTOBOY*

*Cliente:* ${t.customer_name || "Não informado"}
*Telefone:* ${t.customer_phone || "Não informado"}
` +
          (t.shipping_street
            ? `*Endereço:* ${t.shipping_street}, ${t.shipping_number} - ${t.shipping_city}/${t.shipping_state}
`
            : "") +
          `
*ITENS DA SACOLA:*
${n}

*Subtotal:* ${u(_)}

Olá! Gostaria de combinar o valor do frete e o horário da entrega via Motoboy.`,
        j = `https://wa.me/${s}?text=${encodeURIComponent(o)}`;
      window.open(j, "_blank");
    },
    l =
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
        onSubmit: X,
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
                            value: t.customer_name,
                            onChange: p("customer_name"),
                            className: l,
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", { className: c, children: "E-mail" }),
                          e.jsx("input", {
                            required: !0,
                            type: "email",
                            value: t.customer_email,
                            onChange: p("customer_email"),
                            className: l,
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", { className: c, children: "CPF" }),
                          e.jsx("input", {
                            required: !0,
                            value: t.customer_cpf,
                            onChange: p("customer_cpf"),
                            className: l,
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
                            value: t.customer_phone,
                            onChange: p("customer_phone"),
                            className: l,
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
                      e.jsx(A, { className: "h-5 w-5 text-blush flex-shrink-0" }),
                      " Forma de Entrega",
                    ],
                  }),
                  e.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                    children: [
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => R("correios"),
                        className: `p-4 rounded-md border text-left transition-all flex flex-col justify-between gap-3 ${m === "correios" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/40 bg-background"}`,
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              e.jsx("div", {
                                className: `p-2.5 rounded-full ${m === "correios" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`,
                                children: e.jsx(q, { className: "h-5 w-5" }),
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
                        onClick: () => R("motoboy"),
                        className: `p-4 rounded-md border text-left transition-all flex flex-col justify-between gap-3 ${m === "motoboy" ? "border-[#25D366] bg-[#25D366]/5 ring-2 ring-[#25D366]/20" : "border-border hover:border-[#25D366]/40 bg-background"}`,
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              e.jsx("div", {
                                className: `p-2.5 rounded-full ${m === "motoboy" ? "bg-[#25D366] text-white" : "bg-secondary text-muted-foreground"}`,
                                children: e.jsx(K, { className: "h-5 w-5" }),
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
              m === "correios"
                ? e.jsxs(e.Fragment, {
                    children: [
                      e.jsxs("section", {
                        className: "space-y-4",
                        children: [
                          e.jsxs("h3", {
                            className: "font-display text-lg md:text-xl flex items-center gap-2",
                            children: [
                              e.jsx(me, { className: "h-5 w-5 text-blush flex-shrink-0" }),
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
                                    value: t.shipping_cep,
                                    onChange: (s) => te(s.target.value),
                                    className: l,
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
                                    value: t.shipping_street,
                                    onChange: p("shipping_street"),
                                    className: l,
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-1 sm:col-span-2",
                                children: [
                                  e.jsx("label", { className: c, children: "Número" }),
                                  e.jsx("input", {
                                    required: !0,
                                    value: t.shipping_number,
                                    onChange: p("shipping_number"),
                                    className: l,
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-1 sm:col-span-4",
                                children: [
                                  e.jsx("label", { className: c, children: "Complemento" }),
                                  e.jsx("input", {
                                    value: t.shipping_complement,
                                    onChange: p("shipping_complement"),
                                    className: l,
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
                                    value: t.shipping_neighborhood,
                                    onChange: p("shipping_neighborhood"),
                                    className: l,
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "col-span-1 sm:col-span-2",
                                children: [
                                  e.jsx("label", { className: c, children: "Cidade" }),
                                  e.jsx("input", {
                                    required: !0,
                                    value: t.shipping_city,
                                    onChange: p("shipping_city"),
                                    className: l,
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
                                    value: t.shipping_state,
                                    onChange: p("shipping_state"),
                                    className: `${l} uppercase`,
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
                          ee
                            ? e.jsx("div", {
                                className:
                                  "p-8 border border-border border-dashed rounded-md text-center text-sm text-muted-foreground animate-pulse",
                                children: "Calculando preço e prazo oficial dos Correios...",
                              })
                            : O.length > 0
                              ? e.jsx("div", {
                                  className: "grid gap-3",
                                  children: O.map((s) =>
                                    e.jsxs(
                                      "label",
                                      {
                                        className: `flex items-center gap-4 p-4 rounded-md border cursor-pointer transition-colors ${N === s.id ? "border-blush bg-blush/5" : "border-border hover:border-blush/50"}`,
                                        children: [
                                          e.jsx("input", {
                                            type: "radio",
                                            name: "shipping_method",
                                            value: s.id,
                                            checked: N === s.id,
                                            onChange: () => C(s.id),
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
                                                    children: u(s.price),
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
                                value: t.notes,
                                onChange: p("notes"),
                                className: l,
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
                            children: e.jsx(K, { className: "h-6 w-6" }),
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
                            value: t.shipping_street,
                            onChange: p("shipping_street"),
                            className: l,
                            placeholder: "Ex: Rua Exemplo, 123 - Bairro Central",
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "pt-2 flex flex-col sm:flex-row items-center gap-3",
                        children: e.jsxs("button", {
                          type: "button",
                          onClick: T,
                          className:
                            "w-full sm:w-auto flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-4 rounded-sm flex items-center justify-center gap-3 text-sm transition-all shadow-sm",
                          children: [
                            e.jsx(M, { className: "h-5 w-5" }),
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
                  children: i.map((s) =>
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
                            children: u(s.price * s.quantity),
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
                        e.jsx("span", { children: u(_) }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex justify-between items-center",
                      children: [
                        e.jsx("span", { className: "text-muted-foreground", children: "Frete" }),
                        m === "motoboy"
                          ? e.jsx("span", {
                              className: "text-xs text-[#25D366] font-medium",
                              children: "Combinar no WhatsApp",
                            })
                          : g
                            ? e.jsxs("span", {
                                className: "font-medium text-emerald-600",
                                children: ["+ ", u(g.price)],
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
                        e.jsx("span", { children: u(U) }),
                      ],
                    }),
                  ],
                }),
                m === "correios"
                  ? e.jsx("button", {
                      type: "submit",
                      disabled: w || !N,
                      className:
                        "w-full bg-primary text-primary-foreground py-3.5 mt-2 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-60 transition-opacity",
                      children: w ? "Processando..." : "Ir para pagamento",
                    })
                  : e.jsxs("button", {
                      type: "button",
                      onClick: T,
                      className:
                        "w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 mt-2 text-xs tracking-editorial uppercase rounded-sm transition-opacity flex items-center justify-center gap-2 font-medium",
                      children: [e.jsx(M, { className: "h-4 w-4" }), "Finalizar no WhatsApp"],
                    }),
                e.jsx("p", {
                  className: "text-xs text-muted-foreground text-center mt-4",
                  children:
                    m === "correios"
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
          P &&
            e.jsxs("div", {
              className: "px-4 pt-4 pb-2 border-b border-border bg-background",
              children: [
                e.jsx("ul", {
                  className: "space-y-2 text-sm max-h-36 overflow-y-auto scrollbar-hide mb-3",
                  children: i.map((s) =>
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
                            children: u(s.price * s.quantity),
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
                    e.jsx("span", { children: u(_) }),
                  ],
                }),
                e.jsxs("div", {
                  className: "flex justify-between text-xs text-muted-foreground",
                  children: [
                    e.jsx("span", { children: "Frete" }),
                    e.jsx("span", {
                      children:
                        m === "motoboy" ? "Combinar no WhatsApp" : g ? u(g.price) : "A calcular",
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
                onClick: () => se((s) => !s),
                className: "flex-1 flex items-center gap-1 min-w-0",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsxs("div", {
                        className: "text-xs text-muted-foreground text-left",
                        children: [
                          P ? "Ocultar resumo" : "Ver resumo",
                          " (",
                          i.length,
                          " ",
                          i.length === 1 ? "item" : "itens",
                          ")",
                        ],
                      }),
                      e.jsx("div", {
                        className: "font-display text-lg font-medium",
                        children: u(U),
                      }),
                    ],
                  }),
                  P
                    ? e.jsx(pe, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
                    : e.jsx(xe, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                ],
              }),
              m === "correios"
                ? e.jsx("button", {
                    form: "checkout-form",
                    type: "submit",
                    disabled: w || !N,
                    onClick: X,
                    className:
                      "flex-shrink-0 bg-primary text-primary-foreground px-5 py-3 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-60 transition-opacity",
                    children: w ? "..." : "Pagar",
                  })
                : e.jsxs("button", {
                    type: "button",
                    onClick: T,
                    className:
                      "flex-shrink-0 bg-[#25D366] text-[#ffffff] px-4 py-3 text-xs tracking-editorial uppercase rounded-sm flex items-center gap-1 font-medium",
                    children: [e.jsx(M, { className: "h-4 w-4" }), "WhatsApp"],
                  }),
            ],
          }),
        ],
      }),
      e.jsx("div", { className: "md:hidden h-28" }),
    ],
  });
}
export { ls as component };
