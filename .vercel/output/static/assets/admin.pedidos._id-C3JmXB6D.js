import { j as f, ab as j, Q as v, D as e, L as N, a6 as t, a1 as c } from "./index-C2UuTsl-.js";
import { u as y } from "./useQuery-tYhz7w83.js";
import { b as m } from "./format-W46puzMN.js";
import { a as _ } from "./melhorenvio.functions-un3qPrrm.js";
import { A as k } from "./arrow-left-UOBAiK13.js";
const w = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"],
  E = ["pending", "paid", "failed", "refunded"],
  p = {
    pending: "Pendente",
    paid: "Pago",
    processing: "Em separação",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
    failed: "Falhou",
    refunded: "Reembolsado",
  };
function D() {
  const { id: a } = f.useParams(),
    o = j(),
    { data: x, isLoading: g } = y({
      queryKey: ["admin-order", a],
      queryFn: async () => {
        const [{ data: r, error: d }, { data: h, error: u }] = await Promise.all([
          c.from("orders").select("*").eq("id", a).maybeSingle(),
          c.from("order_items").select("*").eq("order_id", a),
        ]);
        if (d) throw d;
        if (u) throw u;
        return { order: r, items: h ?? [] };
      },
    }),
    [i, n] = v.useState(!1),
    l = async (r) => {
      (n(!0), r.tracking_code && r.tracking_code.trim() !== "" && (r.status = "shipped"));
      const { error: d } = await c.from("orders").update(r).eq("id", a);
      if ((n(!1), d)) return t.error(d.message);
      (t.success("Pedido atualizado"),
        r.tracking_code &&
          r.tracking_code.trim() !== "" &&
          (t.success("E-mail de rastreio enviado para o cliente! (Mock)"),
          console.log(
            `[MOCK EMAIL] Para: ${s?.customer_email} - Seu pedido foi enviado! Código de Rastreio: ${r.tracking_code}`,
          )),
        o.invalidateQueries({ queryKey: ["admin-order", a] }),
        o.invalidateQueries({ queryKey: ["admin-orders"] }));
    };
  if (g)
    return e.jsx("div", { className: "text-sm text-muted-foreground", children: "Carregando..." });
  if (!x?.order) return e.jsx("div", { children: "Pedido não encontrado." });
  const { order: s, items: b } = x;
  return e.jsxs("div", {
    className: "max-w-4xl",
    children: [
      e.jsxs(N, {
        to: "/admin/pedidos",
        className:
          "inline-flex items-center gap-2 text-xs tracking-editorial uppercase text-muted-foreground mb-6 hover:text-foreground py-2",
        children: [e.jsx(k, { className: "h-3 w-3" }), " Pedidos"],
      }),
      e.jsxs("div", {
        className: "flex flex-col sm:flex-row sm:items-start justify-between mb-6 md:mb-8 gap-2",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", {
                className: "font-display text-2xl md:text-3xl",
                children: s.order_number,
              }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground",
                children: new Date(s.created_at || new Date()).toLocaleString("pt-BR"),
              }),
            ],
          }),
          e.jsx("div", {
            className: "sm:text-right",
            children: e.jsx("div", {
              className: "font-display text-2xl md:text-3xl",
              children: m(Number(s.total)),
            }),
          }),
        ],
      }),
      e.jsxs("div", {
        className: "grid md:grid-cols-2 gap-4 mb-6",
        children: [
          e.jsxs("div", {
            className: "border border-border rounded-sm p-5 bg-background",
            children: [
              e.jsx("label", {
                className: "block text-xs tracking-editorial uppercase text-muted-foreground mb-2",
                children: "Status do pedido",
              }),
              e.jsx("select", {
                disabled: i,
                value: s.status || "",
                onChange: (r) => l({ status: r.target.value }),
                className:
                  "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background disabled:opacity-50",
                children: w.map((r) => e.jsx("option", { value: r, children: p[r] }, r)),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "border border-border rounded-sm p-5 bg-background",
            children: [
              e.jsx("label", {
                className: "block text-xs tracking-editorial uppercase text-muted-foreground mb-2",
                children: "Status do pagamento",
              }),
              e.jsx("select", {
                disabled: i,
                value: s.payment_status || "",
                onChange: (r) => l({ payment_status: r.target.value }),
                className:
                  "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background disabled:opacity-50",
                children: E.map((r) => e.jsx("option", { value: r, children: p[r] }, r)),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "md:col-span-2 border border-border rounded-sm p-5 bg-background space-y-3",
            children: [
              e.jsxs("div", {
                className: "flex flex-wrap items-center justify-between gap-2",
                children: [
                  e.jsx("label", {
                    className: "block text-xs tracking-editorial uppercase text-muted-foreground",
                    children: "Código de rastreio",
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: async () => {
                      n(!0);
                      try {
                        const r = await _({ data: { order_id: a } });
                        r.success &&
                          (t.success(r.message),
                          o.invalidateQueries({ queryKey: ["admin-order", a] }),
                          o.invalidateQueries({ queryKey: ["admin-orders"] }));
                      } catch (r) {
                        t.error(r.message || "Erro ao gerar etiqueta no Melhor Envio.");
                      } finally {
                        n(!1);
                      }
                    },
                    disabled: i,
                    className:
                      "inline-flex items-center gap-1.5 text-xs bg-[#0080ff] hover:bg-[#0066cc] text-white px-3 py-1.5 rounded-sm font-medium transition-colors disabled:opacity-50",
                    children: "📦 Gerar Rastreio (Melhor Envio)",
                  }),
                ],
              }),
              e.jsx("input", {
                disabled: i,
                defaultValue: s.tracking_code ?? "",
                onBlur: (r) =>
                  r.target.value !== (s.tracking_code ?? "") &&
                  l({ tracking_code: r.target.value || null }),
                className:
                  "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background disabled:opacity-50 font-mono",
                placeholder: "Ex: ME12345678BR",
              }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "border border-border rounded-sm overflow-hidden mb-6 bg-background",
        children: [
          e.jsx("div", {
            className: "p-4 border-b border-border bg-secondary/30 font-display text-lg",
            children: "Itens",
          }),
          e.jsx("ul", {
            className: "divide-y divide-border",
            children: b.map((r) =>
              e.jsxs(
                "li",
                {
                  className: "p-4 flex gap-4 text-sm",
                  children: [
                    e.jsx("div", {
                      className: "w-14 h-16 bg-secondary rounded-sm overflow-hidden flex-shrink-0",
                      children:
                        r.product_image &&
                        e.jsx("img", {
                          src: r.product_image,
                          alt: "",
                          className: "h-full w-full object-cover",
                        }),
                    }),
                    e.jsxs("div", {
                      className: "flex-1 flex justify-between",
                      children: [
                        e.jsxs("div", {
                          children: [
                            e.jsx("div", { className: "font-medium", children: r.product_name }),
                            e.jsxs("div", {
                              className: "text-xs text-muted-foreground",
                              children: [
                                r.size &&
                                  e.jsxs(e.Fragment, { children: ["Tam: ", r.size, " · "] }),
                                r.color &&
                                  e.jsxs(e.Fragment, { children: ["Cor: ", r.color, " · "] }),
                                "Qtd: ",
                                r.quantity,
                              ],
                            }),
                          ],
                        }),
                        e.jsx("div", { children: m(Number(r.unit_price) * r.quantity) }),
                      ],
                    }),
                  ],
                },
                r.id,
              ),
            ),
          }),
        ],
      }),
      e.jsxs("div", {
        className: "border border-border rounded-sm p-5 bg-background mb-6 mt-6",
        children: [
          e.jsx("h3", {
            className: "text-xs tracking-editorial uppercase text-muted-foreground mb-3",
            children: "Informacoes de Pagamento",
          }),
          e.jsxs("div", {
            className: "grid sm:grid-cols-2 gap-3 text-sm",
            children: [
              e.jsxs("div", {
                children: [
                  e.jsx("span", { className: "text-muted-foreground", children: "Gateway:" }),
                  " ",
                  s.payment_gateway ?? "N/A",
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("span", { className: "text-muted-foreground", children: "Metodo:" }),
                  " ",
                  s.payment_method ?? "N/A",
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("span", {
                    className: "text-muted-foreground",
                    children: "Transaction ID:",
                  }),
                  " ",
                  e.jsx("span", {
                    className: "font-mono text-xs",
                    children: s.transaction_id ?? "N/A",
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("span", { className: "text-muted-foreground", children: "Gateway ID:" }),
                  " ",
                  e.jsx("span", {
                    className: "font-mono text-xs",
                    children: s.payment_gateway_id ?? "N/A",
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("span", { className: "text-muted-foreground", children: "Valor Pago:" }),
                  " ",
                  s.paid_at ? m(Number(s.total)) : "N/A",
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("span", {
                    className: "text-muted-foreground",
                    children: "Data do Pagamento:",
                  }),
                  " ",
                  s.paid_at ? new Date(s.paid_at).toLocaleString("pt-BR") : "N/A",
                ],
              }),
            ],
          }),
          s.pix_code &&
            e.jsxs("div", {
              className: "mt-3 pt-3 border-t border-border",
              children: [
                e.jsx("label", {
                  className:
                    "block text-xs tracking-editorial uppercase text-muted-foreground mb-2",
                  children: "Codigo PIX",
                }),
                e.jsx("div", {
                  className: "flex gap-2",
                  children: e.jsx("input", {
                    readOnly: !0,
                    value: s.pix_code,
                    className:
                      "flex-1 border border-border bg-background rounded-sm px-3 py-2 text-sm font-mono text-xs break-all",
                  }),
                }),
                s.pix_qrcode &&
                  e.jsx("div", {
                    className: "mt-2",
                    children: e.jsx("img", {
                      src: `data:image/png;base64,${s.pix_qrcode}`,
                      alt: "QR Code PIX",
                      className: "w-24 h-24 object-contain",
                    }),
                  }),
              ],
            }),
        ],
      }),
      e.jsxs("div", {
        className: "grid md:grid-cols-2 gap-4 text-sm",
        children: [
          e.jsxs("div", {
            className: "border border-border rounded-sm p-5 bg-background",
            children: [
              e.jsx("h3", {
                className: "text-xs tracking-editorial uppercase text-muted-foreground mb-2",
                children: "Cliente",
              }),
              e.jsx("div", { children: s.customer_name }),
              e.jsx("div", { className: "text-muted-foreground", children: s.customer_email }),
              e.jsx("div", { className: "text-muted-foreground", children: s.customer_phone }),
              s.customer_cpf &&
                e.jsxs("div", {
                  className: "text-muted-foreground font-mono mt-1 text-xs",
                  children: ["CPF: ", s.customer_cpf],
                }),
              s.customer_phone &&
                e.jsx("a", {
                  href: `https://wa.me/${s.customer_phone.replace(/\D/g, "")}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className:
                    "inline-flex items-center gap-1.5 mt-3 text-xs text-[#25D366] hover:underline",
                  children: "Falar com cliente no WhatsApp",
                }),
            ],
          }),
          e.jsxs("div", {
            className: "border border-border rounded-sm p-5 bg-background",
            children: [
              e.jsx("h3", {
                className: "text-xs tracking-editorial uppercase text-muted-foreground mb-2",
                children: "Entrega",
              }),
              e.jsxs("div", {
                children: [
                  s.shipping_street,
                  ", ",
                  s.shipping_number,
                  s.shipping_complement ? ` · ${s.shipping_complement}` : "",
                ],
              }),
              e.jsxs("div", {
                className: "text-muted-foreground",
                children: [s.shipping_neighborhood, " · ", s.shipping_city, "/", s.shipping_state],
              }),
              e.jsxs("div", {
                className: "text-muted-foreground",
                children: ["CEP ", s.shipping_cep],
              }),
            ],
          }),
          s.notes &&
            e.jsxs("div", {
              className: "md:col-span-2 border border-border rounded-sm p-5 bg-background",
              children: [
                e.jsx("h3", {
                  className: "text-xs tracking-editorial uppercase text-muted-foreground mb-2",
                  children: "Observacoes",
                }),
                e.jsx("p", { className: "whitespace-pre-wrap", children: s.notes }),
              ],
            }),
        ],
      }),
    ],
  });
}
export { D as component };
