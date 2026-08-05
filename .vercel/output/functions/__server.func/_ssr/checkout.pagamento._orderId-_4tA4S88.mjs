import { r as s, j as o } from "../_libs/react.mjs";
import { d as D } from "../_libs/tanstack__react-router.mjs";
import { a as P } from "../_libs/tanstack__react-query.mjs";
import { i as S, P as T } from "../_libs/mercadopago__sdk-react.mjs";
import { t as i } from "../_libs/sonner.mjs";
import { p as j } from "./client-DbGX8m2J.mjs";
import { c as A, u as q } from "./router-CzERE3r3.mjs";
import { r as O } from "./format-W46puzMN.mjs";
import { O as F, A as M } from "./PixDisplay-ITjio8rx.mjs";
import { h as k, y as $ } from "./payment.functions-DaljBhjR.mjs";
import "../_libs/seroval.mjs";
import { e as B, J as L } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
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
import "../_libs/mercadopago__sdk-js.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zustand.mjs";
import "./server-DXgSSFBn.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./client.server-_0x--M5Y.mjs";
import "../_libs/zod.mjs";
import "./auth-middleware-Ia7fKZJE.mjs";
function Te() {
  const u = D(),
    { orderId: d } = A.useParams(),
    { user: g, loading: x } = q(),
    [f, E] = s.useState(null),
    [y, h] = s.useState(null),
    [m, c] = s.useState("pending"),
    [C, _] = s.useState("unknown"),
    [n, b] = s.useState(null),
    {
      data: e,
      isLoading: N,
      isError: R,
      error: p,
    } = P({
      queryKey: ["order", d],
      queryFn: async () => {
        console.log("FETCHING ORDER ID", d);
        const { data: r, error: t } = await j.from("orders").select("*").eq("id", d).maybeSingle();
        if (t) throw (console.error("SUPABASE ERROR", t), t);
        return (console.log("ORDER DATA RETRIEVED", r), r);
      },
      enabled: !!d,
    });
  s.useEffect(() => {
    !x && !g && u({ to: "/login" });
  }, [x, g, u]);
  const { data: v } = P({
    queryKey: ["site_settings", "shipping_settings"],
    queryFn: async () => {
      const { data: r, error: t } = await j
        .from("site_settings")
        .select("value")
        .eq("key", "shipping_settings")
        .maybeSingle();
      if (t) throw t;
      return r?.value || {};
    },
  });
  (s.useEffect(() => {
    e &&
      (console.log("INIT PAYMENT EFFECT TRIGGERED WITH ORDER", e.id),
      (async () => {
        try {
          if (e.payment_gateway_id)
            (console.log("ORDER ALREADY HAS PREFERENCE ID", e.payment_gateway_id),
              E(e.payment_gateway_id));
          else {
            console.log("CREATING PREFERENCE...");
            const r = await k({
              data: {
                orderId: e.id,
                items: [
                  { id: e.id, title: `Pedido ${e.order_number}`, unit_price: e.total, quantity: 1 },
                ],
                payer: { name: e.customer_name, email: e.customer_email },
                externalReference: e.id,
              },
            });
            (console.log("PREFERENCE CREATED", r.preferenceId), E(r.preferenceId));
          }
        } catch (r) {
          (console.error("INIT PAYMENT CATCH BLOCK ERROR:", r),
            i.error(r instanceof Error ? r.message : "Erro ao inicializar pagamento."));
        }
      })(),
      e.payment_status && e.payment_status !== "pending" && c(e.payment_status),
      e.payment_method && e.payment_method !== "unknown" && _(e.payment_method),
      e.pix_code &&
        e.pix_qrcode &&
        !n &&
        b({
          qrCode: e.pix_qrcode,
          code: e.pix_code,
          expiration: new Date(Date.now() + 864e5).toISOString(),
        }));
  }, [e]),
    s.useEffect(() => {
      (console.log("MP PUBLIC KEY", "LOADED"),
        S("APP_USR-fa16c49d-0f37-413c-a8cc-256f60ae9222", { locale: "pt-BR" }));
    }, []));
  const w = async (r) => {
      try {
        i.success("Processando pagamento...");
        const t = r.formData || r,
          a = await $({ data: { orderId: d, formData: t } });
        if (a.status === "approved" || a.status === "in_process" || a.status === "pending")
          if (
            (c(a.status === "approved" ? "paid" : "pending"),
            _(a.payment_method_id || "unknown"),
            a.payment_method_id === "pix" && a.point_of_interaction?.transaction_data)
          ) {
            const l = a.point_of_interaction.transaction_data;
            (b({ qrCode: l.qr_code_base64, code: l.qr_code, expiration: l.date_of_expiration }),
              i.success("PIX gerado com sucesso!"));
          } else a.status === "approved" && i.success("Pagamento aprovado!");
        else (i.error("Pagamento nao aprovado. Status: " + a.status), c("failed"));
      } catch (t) {
        console.error("Payment error:", t);
        const a = t instanceof Error ? t.message : JSON.stringify(t);
        (h(a), i.error(`Erro no frontend/backend: ${a}`));
      }
    },
    I = (r) => {
      (console.error("Payment error object:", r),
        h(JSON.stringify(r, Object.getOwnPropertyNames(r), 2)),
        i.error("Erro ao processar pagamento. Tente novamente."));
    };
  return (
    console.log("CURRENT STATE -> isLoading:", N, "isError:", R, "order:", !!e, "error:", p),
    N
      ? o.jsx("div", {
          className: "container-editorial py-20 text-center text-sm text-muted-foreground",
          children: "Carregando...",
        })
      : R || !e
        ? o.jsxs("div", {
            className: "container-editorial py-20 text-center text-sm text-red-500",
            children: [
              "Erro ao carregar o pedido. Verifique os logs no console.",
              o.jsx("br", {}),
              p ? String(p) : "Pedido nao encontrado ou nao existe.",
            ],
          })
        : o.jsxs("div", {
            className: "container-editorial py-10 md:py-16",
            children: [
              o.jsx("h1", {
                className: "font-display text-3xl mb-2",
                children: "Pagamento do Pedido",
              }),
              o.jsxs("p", {
                className: "text-sm text-muted-foreground mb-8",
                children: ["Pedido ", e.order_number, " - Total: ", O(Number(e.total))],
              }),
              o.jsxs("div", {
                className: "grid md:grid-cols-2 gap-8",
                children: [
                  o.jsxs("div", {
                    className: "space-y-6",
                    children: [
                      o.jsx(F, {
                        status: m,
                        method: C,
                        transactionId: e.transaction_id,
                        paidAt: e.paid_at,
                      }),
                      e.notes?.includes("Motoboy Próprio") &&
                        o.jsxs("div", {
                          className: "p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-md",
                          children: [
                            o.jsxs("h3", {
                              className:
                                "font-display text-lg mb-2 flex items-center gap-2 text-[#128C7E]",
                              children: [
                                o.jsx(B, { className: "h-5 w-5" }),
                                " Entrega via Motoboy",
                              ],
                            }),
                            o.jsx("p", {
                              className: "text-sm text-muted-foreground mb-4",
                              children:
                                "Como você escolheu a entrega via motoboy, por favor, clique no botão abaixo para combinar o horário de entrega pelo WhatsApp.",
                            }),
                            o.jsxs("a", {
                              href: `https://wa.me/${v?.whatsapp_number || "5511994565923"}?text=${encodeURIComponent(`Olá! Fiz o pedido #${e.order_number} no site e escolhi a entrega via Motoboy Próprio. Gostaria de combinar o horário de entrega.`)}`,
                              target: "_blank",
                              rel: "noreferrer",
                              className:
                                "inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-sm text-sm font-medium hover:bg-[#128C7E] transition-colors",
                              children: [o.jsx(L, { className: "h-4 w-4" }), " Combinar Entrega"],
                            }),
                          ],
                        }),
                      n &&
                        o.jsx("div", {
                          className: "mt-2",
                          children: o.jsx(M, {
                            qrCodeBase64: n.qrCode,
                            pixCode: n.code,
                            expirationDate: n.expiration,
                            onExpire: () => i.error("Codigo PIX expirado."),
                          }),
                        }),
                    ],
                  }),
                  !n &&
                    (m === "pending" || m === "failed") &&
                    o.jsxs("div", {
                      className: "border border-border rounded-sm p-6 bg-secondary/20",
                      children: [
                        o.jsx("h2", {
                          className: "font-display text-xl mb-4",
                          children: "Escolha a forma de pagamento",
                        }),
                        f
                          ? o.jsxs(o.Fragment, {
                              children: [
                                y &&
                                  o.jsxs("div", {
                                    className:
                                      "bg-red-100 text-red-900 p-4 rounded-md mb-4 whitespace-pre-wrap font-mono text-xs overflow-auto",
                                    children: [
                                      o.jsx("strong", { children: "Erro Mercado Pago:" }),
                                      o.jsx("br", {}),
                                      y,
                                    ],
                                  }),
                                o.jsx(T, {
                                  initialization: {
                                    amount: Number(e?.total ?? 0),
                                    preferenceId: f,
                                  },
                                  customization: {
                                    visual: { style: { theme: "default" } },
                                    paymentMethods: {
                                      creditCard: "all",
                                      debitCard: "all",
                                      ticket: "all",
                                      bankTransfer: "all",
                                      mercadoPago: "all",
                                    },
                                  },
                                  onSubmit: w,
                                  onError: I,
                                }),
                              ],
                            })
                          : o.jsx("div", {
                              className: "text-sm text-muted-foreground",
                              children: "Carregando opcoes de pagamento...",
                            }),
                      ],
                    }),
                ],
              }),
            ],
          })
  );
}
export { Te as component };
