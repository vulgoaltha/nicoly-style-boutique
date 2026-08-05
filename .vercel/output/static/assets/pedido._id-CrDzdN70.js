import { g as j, a1 as c, D as e, L as d } from "./index-C2UuTsl-.js";
import { u as b } from "./useQuery-tYhz7w83.js";
import { b as t } from "./format-W46puzMN.js";
import { P as g, a as f } from "./PixDisplay-BCqe5nGK.js";
import { C as N } from "./circle-check-DBgmDpYy.js";
import "./credit-card-BMdPgreM.js";
import "./wallet-BienNB9s.js";
import "./check-C6tLogbj.js";
const _ = {
  pending: "Pendente",
  paid: "Pago",
  processing: "Em separacao",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};
function E() {
  const { id: a } = j.useParams(),
    {
      data: i,
      isLoading: l,
      error: m,
    } = b({
      queryKey: ["order", a],
      queryFn: async () => {
        const [{ data: r, error: n }, { data: h, error: o }] = await Promise.all([
          c.from("orders").select("*").eq("id", a).maybeSingle(),
          c.from("order_items").select("*").eq("order_id", a),
        ]);
        if (n) throw n;
        if (o) throw o;
        return { order: r, items: h ?? [] };
      },
    });
  if (l)
    return e.jsx("div", {
      className: "container-editorial py-20 text-center text-sm text-muted-foreground",
      children: "Carregando...",
    });
  if (m || !i?.order)
    return e.jsxs("div", {
      className: "container-editorial py-24 text-center",
      children: [
        e.jsx("h1", { className: "font-display text-3xl", children: "Pedido nao encontrado" }),
        e.jsx(d, {
          to: "/",
          className: "mt-6 inline-block text-xs tracking-editorial uppercase underline",
          children: "Voltar a loja",
        }),
      ],
    });
  const { order: s, items: x } = i,
    p = s.payment_status ?? "unknown",
    u =
      s.payment_method === "pix"
        ? "pix"
        : s.payment_method === "credit_card"
          ? "credit_card"
          : s.payment_method === "debit_card"
            ? "debit_card"
            : s.payment_method === "mercado_pago_balance"
              ? "mercado_pago_balance"
              : "unknown";
  return e.jsxs("div", {
    className:
      "container-editorial overflow-x-hidden md:overflow-x-auto py-10 md:py-16 max-w-3xl mx-auto px-4",
    children: [
      e.jsxs("div", {
        className: "text-center mb-10",
        children: [
          e.jsx(N, { className: "h-12 w-12 mx-auto text-blush" }),
          e.jsx("h1", { className: "font-display text-4xl mt-4", children: "Pedido confirmado" }),
          e.jsxs("p", {
            className: "text-sm text-muted-foreground mt-2",
            children: [
              "Numero ",
              e.jsx("span", { className: "font-medium text-foreground", children: s.order_number }),
              " · Status:",
              " ",
              _[s.status || ""] ?? s.status,
            ],
          }),
        ],
      }),
      e.jsx("div", {
        className: "mb-6",
        children: e.jsx(g, {
          status: p,
          method: u,
          transactionId: s.transaction_id,
          paidAt: s.paid_at,
        }),
      }),
      s.pix_code &&
        s.payment_status === "pending" &&
        e.jsx("div", {
          className: "mb-6",
          children: e.jsx(f, {
            qrCodeBase64: s.pix_qrcode,
            pixCode: s.pix_code,
            expirationDate: new Date(Date.now() + 1800 * 1e3).toISOString(),
          }),
        }),
      e.jsxs("div", {
        className: "border border-border rounded-sm overflow-hidden",
        children: [
          e.jsx("div", {
            className: "p-6 bg-secondary/30 border-b border-border",
            children: e.jsx("h2", { className: "font-display text-xl", children: "Itens" }),
          }),
          e.jsx("ul", {
            className: "divide-y divide-border",
            children: x.map((r) =>
              e.jsxs(
                "li",
                {
                  className: "p-4 flex gap-4",
                  children: [
                    e.jsx("div", {
                      className: "w-16 h-20 bg-secondary rounded-sm overflow-hidden flex-shrink-0",
                      children:
                        r.product_image &&
                        e.jsx("img", {
                          src: r.product_image,
                          alt: r.product_name,
                          className: "h-full w-full object-cover",
                        }),
                    }),
                    e.jsxs("div", {
                      className: "flex-1 flex justify-between text-sm",
                      children: [
                        e.jsxs("div", {
                          children: [
                            e.jsx("div", { className: "font-medium", children: r.product_name }),
                            e.jsxs("div", {
                              className: "text-xs text-muted-foreground mt-1",
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
                        e.jsx("div", {
                          className: "font-medium",
                          children: t(Number(r.unit_price) * r.quantity),
                        }),
                      ],
                    }),
                  ],
                },
                r.id,
              ),
            ),
          }),
          e.jsxs("div", {
            className: "p-6 border-t border-border space-y-1 text-sm",
            children: [
              e.jsxs("div", {
                className: "flex justify-between",
                children: [
                  e.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  e.jsx("span", { children: t(Number(s.subtotal)) }),
                ],
              }),
              e.jsxs("div", {
                className: "flex justify-between",
                children: [
                  e.jsx("span", { className: "text-muted-foreground", children: "Frete" }),
                  e.jsx("span", { children: t(Number(s.shipping_cost)) }),
                ],
              }),
              e.jsxs("div", {
                className:
                  "flex justify-between font-medium pt-2 border-t border-border mt-2 text-base",
                children: [
                  e.jsx("span", { children: "Total" }),
                  e.jsx("span", { children: t(Number(s.total)) }),
                ],
              }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "grid sm:grid-cols-2 gap-6 mt-6 text-sm",
        children: [
          e.jsxs("div", {
            className: "border border-border rounded-sm p-5",
            children: [
              e.jsx("h3", {
                className: "text-xs tracking-editorial uppercase text-muted-foreground mb-2",
                children: "Cliente",
              }),
              e.jsx("div", { children: s.customer_name }),
              e.jsx("div", { className: "text-muted-foreground", children: s.customer_email }),
              e.jsx("div", { className: "text-muted-foreground", children: s.customer_phone }),
            ],
          }),
          e.jsxs("div", {
            className: "border border-border rounded-sm p-5",
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
              s.tracking_code &&
                e.jsxs("div", {
                  className: "mt-4 pt-4 border-t border-border",
                  children: [
                    e.jsx("h4", {
                      className: "text-xs tracking-editorial uppercase text-muted-foreground mb-1",
                      children: "Código de Rastreio",
                    }),
                    e.jsx("div", {
                      className: "font-mono text-sm font-medium",
                      children: s.tracking_code,
                    }),
                    e.jsx("a", {
                      href: "https://rastreamento.correios.com.br/app/index.php",
                      target: "_blank",
                      rel: "noreferrer",
                      className: "text-xs text-blush underline mt-1 inline-block",
                      children: "Acompanhar no site dos Correios",
                    }),
                  ],
                }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "flex gap-3 mt-8 justify-center",
        children: [
          e.jsx(d, {
            to: "/minha-conta/pedidos",
            className: "text-xs tracking-editorial uppercase underline",
            children: "Meus pedidos",
          }),
          e.jsx("span", { className: "text-muted-foreground", children: "·" }),
          e.jsx(d, {
            to: "/loja",
            className: "text-xs tracking-editorial uppercase underline",
            children: "Continuar comprando",
          }),
        ],
      }),
    ],
  });
}
export { E as component };
