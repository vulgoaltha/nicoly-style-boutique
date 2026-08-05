import {
  Q as w,
  R as O,
  aa as A,
  h as T,
  a7 as k,
  a1 as I,
  D as d,
  a6 as E,
  t as q,
  N as B,
} from "./index-C2UuTsl-.js";
import { u as S } from "./useQuery-tYhz7w83.js";
import { b as L } from "./format-W46puzMN.js";
import { P as F, a as G } from "./PixDisplay-BCqe5nGK.js";
import { B as K } from "./bike-CzRH9cJY.js";
import { M as U } from "./message-circle-Dixxsnx2.js";
import "./credit-card-BMdPgreM.js";
import "./wallet-BienNB9s.js";
import "./check-C6tLogbj.js";
var g = {},
  C;
function $() {
  if (C) return g;
  ((C = 1), Object.defineProperty(g, "__esModule", { value: !0 }), (g.loadMercadoPago = void 0));
  const t = "https://sdk.mercadopago.com/js/v2",
    s = /^https:\/\/sdk\.mercadopago\.com\/js\/v2\/?(\?.*)?$/,
    a =
      "MercadoPago has already been initialized in your window, please remove the duplicate import",
    o = "MercadoPago.js not available",
    l = "Failed to load MercadoPago.js",
    r = () => {
      for (var i = document.querySelectorAll(`script[src^="${t}"`), e = 0; e < i.length; e++) {
        var c = i[e];
        if (s.test(c.src)) return c;
      }
      return null;
    },
    u = () => {
      const i = document.createElement("script");
      i.src = t;
      const e = document.head || document.body;
      if (!e)
        throw new Error(
          "Expected document.body or document.head not to be null. MercadoPago requires a <body> or a <head> element, please add on your project.",
        );
      return (e.appendChild(i), i);
    };
  let p = null;
  const m = () => (
    p !== null ||
      (p = new Promise((i, e) => {
        if (typeof window > "u") {
          i(null);
          return;
        }
        if (window.MercadoPago) {
          (console.warn(a), i(window.MercadoPago));
          return;
        }
        try {
          let c = r();
          (c ? console.warn(a) : c || (c = u()),
            c.addEventListener("load", () => {
              window.MercadoPago ? i(window.MercadoPago) : e(new Error(o));
            }),
            c.addEventListener("error", () => {
              e(new Error(l));
            }));
        } catch (c) {
          e(c);
          return;
        }
      })),
    p
  );
  return ((g.loadMercadoPago = m), g);
}
var X = $(),
  Y = function (t, s, a, o) {
    function l(r) {
      return r instanceof a
        ? r
        : new a(function (u) {
            u(r);
          });
    }
    return new (a || (a = Promise))(function (r, u) {
      function p(e) {
        try {
          i(o.next(e));
        } catch (c) {
          u(c);
        }
      }
      function m(e) {
        try {
          i(o.throw(e));
        } catch (c) {
          u(c);
        }
      }
      function i(e) {
        e.done ? r(e.value) : l(e.value).then(p, m);
      }
      i((o = o.apply(t, s || [])).next());
    });
  };
class x {
  static getInstance() {
    return Y(this, void 0, void 0, function* () {
      if (this.publicKey)
        return (
          this.loadedInstanceMercadoPago ||
            (yield X.loadMercadoPago(), (this.loadedInstanceMercadoPago = !0)),
          this.instanceMercadoPago ||
            (this.instanceMercadoPago = new window.MercadoPago(this.publicKey, this.options)),
          this.instanceMercadoPago
        );
      console.error("Expected the PUBLIC_KEY to render the MercadoPago SDK React");
    });
  }
}
x.publicKey = null;
x.options = {};
x.instanceMercadoPago = void 0;
x.loadedInstanceMercadoPago = !1;
function H(t, s) {
  return (
    Object.keys(t).length === Object.keys(s).length &&
    Object.keys(t).every((o) => Object.prototype.hasOwnProperty.call(s, o) && t[o] === s[o])
  );
}
const z = (t, s) => {
  const a = Object.assign(Object.assign({}, s), { frontEndStack: "react" }),
    o = !H(x.options, a);
  (t !== x.publicKey || o) &&
    ((x.publicKey = t), (x.options = a), (x.instanceMercadoPago = void 0));
};
var V = function (t, s, a, o) {
  function l(r) {
    return r instanceof a
      ? r
      : new a(function (u) {
          u(r);
        });
  }
  return new (a || (a = Promise))(function (r, u) {
    function p(e) {
      try {
        i(o.next(e));
      } catch (c) {
        u(c);
      }
    }
    function m(e) {
      try {
        i(o.throw(e));
      } catch (c) {
        u(c);
      }
    }
    function i(e) {
      e.done ? r(e.value) : l(e.value).then(p, m);
    }
    i((o = o.apply(t, s || [])).next());
  });
};
const J = () => V(void 0, void 0, void 0, function* () {}),
  Q = () => {},
  W = (t) => {
    console.error(t);
  },
  Z = (t) => {
    console.log(t);
  },
  ee = () => {
    console.log("onClickEditShippingData default implementation");
  },
  ne = () => {
    console.log("onClickEditShippingData default implementation");
  },
  te = (t) => {
    console.log(t);
  },
  oe = (t) => {
    console.log(t);
  };
var ae = function (t, s, a, o) {
  function l(r) {
    return r instanceof a
      ? r
      : new a(function (u) {
          u(r);
        });
  }
  return new (a || (a = Promise))(function (r, u) {
    function p(e) {
      try {
        i(o.next(e));
      } catch (c) {
        u(c);
      }
    }
    function m(e) {
      try {
        i(o.throw(e));
      } catch (c) {
        u(c);
      }
    }
    function i(e) {
      e.done ? r(e.value) : l(e.value).then(p, m);
    }
    i((o = o.apply(t, s || [])).next());
  });
};
const ie = ({ settings: t, name: s, containerId: a, controller: o }) =>
    ae(void 0, void 0, void 0, function* () {
      const l = yield x.getInstance(),
        r = l?.bricks();
      window[o] = yield r?.create(s, a, t);
    }),
  re = 200,
  ce = ({
    onReady: t = Q,
    onError: s = W,
    onSubmit: a = J,
    onBinChange: o = Z,
    onClickEditShippingData: l = ee,
    onClickEditBillingData: r = ne,
    onRenderNextStep: u = te,
    onRenderPreviousStep: p = oe,
    initialization: m,
    customization: i,
    locale: e,
    id: c = "paymentBrick_container",
  }) => (
    w.useEffect(() => {
      const _ = {
          settings: {
            initialization: m,
            customization: i,
            locale: e,
            callbacks: {
              onReady: t,
              onError: s,
              onSubmit: a,
              onBinChange: o,
              onClickEditShippingData: l,
              onClickEditBillingData: r,
              onRenderNextStep: u,
              onRenderPreviousStep: p,
            },
          },
          name: "payment",
          containerId: c,
          controller: "paymentBrickController",
        },
        b = setTimeout(() => {
          ie(_);
        }, re);
      return () => {
        var n;
        (clearTimeout(b),
          (n = window.paymentBrickController) === null || n === void 0 || n.unmount());
      };
    }, [m, i, t, s, a, o]),
    O.createElement("div", { id: c })
  );
function xe() {
  const t = A(),
    { orderId: s } = T.useParams(),
    { user: a, loading: o } = k(),
    [l, r] = w.useState(null),
    [u, p] = w.useState(null),
    [m, i] = w.useState("pending"),
    [e, c] = w.useState("unknown"),
    [_, b] = w.useState(null),
    {
      data: n,
      isLoading: R,
      isError: D,
      error: v,
    } = S({
      queryKey: ["order", s],
      queryFn: async () => {
        console.log("FETCHING ORDER ID", s);
        const { data: h, error: f } = await I.from("orders").select("*").eq("id", s).maybeSingle();
        if (f) throw (console.error("SUPABASE ERROR", f), f);
        return (console.log("ORDER DATA RETRIEVED", h), h);
      },
      enabled: !!s,
    });
  w.useEffect(() => {
    !o && !a && t({ to: "/login" });
  }, [o, a, t]);
  const { data: M } = S({
    queryKey: ["site_settings", "shipping_settings"],
    queryFn: async () => {
      const { data: h, error: f } = await I.from("site_settings")
        .select("value")
        .eq("key", "shipping_settings")
        .maybeSingle();
      if (f) throw f;
      return h?.value || {};
    },
  });
  (w.useEffect(() => {
    if (!n) return;
    (console.log("INIT PAYMENT EFFECT TRIGGERED WITH ORDER", n.id),
      (async () => {
        try {
          if (n.payment_gateway_id)
            (console.log("ORDER ALREADY HAS PREFERENCE ID", n.payment_gateway_id),
              r(n.payment_gateway_id));
          else {
            console.log("CREATING PREFERENCE...");
            const f = await q({
              data: {
                orderId: n.id,
                items: [
                  { id: n.id, title: `Pedido ${n.order_number}`, unit_price: n.total, quantity: 1 },
                ],
                payer: { name: n.customer_name, email: n.customer_email },
                externalReference: n.id,
              },
            });
            (console.log("PREFERENCE CREATED", f.preferenceId), r(f.preferenceId));
          }
        } catch (f) {
          (console.error("INIT PAYMENT CATCH BLOCK ERROR:", f),
            E.error(f instanceof Error ? f.message : "Erro ao inicializar pagamento."));
        }
      })(),
      n.payment_status && n.payment_status !== "pending" && i(n.payment_status),
      n.payment_method && n.payment_method !== "unknown" && c(n.payment_method),
      n.pix_code &&
        n.pix_qrcode &&
        !_ &&
        b({
          qrCode: n.pix_qrcode,
          code: n.pix_code,
          expiration: new Date(Date.now() + 864e5).toISOString(),
        }));
  }, [n]),
    w.useEffect(() => {
      const h = "APP_USR-fa16c49d-0f37-413c-a8cc-256f60ae9222";
      (console.log("MP PUBLIC KEY", "LOADED"), z(h, { locale: "pt-BR" }));
    }, []));
  const j = async (h) => {
      try {
        E.success("Processando pagamento...");
        const f = h.formData || h,
          y = await B({ data: { orderId: s, formData: f } });
        if (y.status === "approved" || y.status === "in_process" || y.status === "pending")
          if (
            (i(y.status === "approved" ? "paid" : "pending"),
            c(y.payment_method_id || "unknown"),
            y.payment_method_id === "pix" && y.point_of_interaction?.transaction_data)
          ) {
            const P = y.point_of_interaction.transaction_data;
            (b({ qrCode: P.qr_code_base64, code: P.qr_code, expiration: P.date_of_expiration }),
              E.success("PIX gerado com sucesso!"));
          } else y.status === "approved" && E.success("Pagamento aprovado!");
        else (E.error("Pagamento nao aprovado. Status: " + y.status), i("failed"));
      } catch (f) {
        console.error("Payment error:", f);
        const y = f instanceof Error ? f.message : JSON.stringify(f);
        (p(y), E.error(`Erro no frontend/backend: ${y}`));
      }
    },
    N = (h) => {
      (console.error("Payment error object:", h),
        p(JSON.stringify(h, Object.getOwnPropertyNames(h), 2)),
        E.error("Erro ao processar pagamento. Tente novamente."));
    };
  return (
    console.log("CURRENT STATE -> isLoading:", R, "isError:", D, "order:", !!n, "error:", v),
    R
      ? d.jsx("div", {
          className: "container-editorial py-20 text-center text-sm text-muted-foreground",
          children: "Carregando...",
        })
      : D || !n
        ? d.jsxs("div", {
            className: "container-editorial py-20 text-center text-sm text-red-500",
            children: [
              "Erro ao carregar o pedido. Verifique os logs no console.",
              d.jsx("br", {}),
              v ? String(v) : "Pedido nao encontrado ou nao existe.",
            ],
          })
        : d.jsxs("div", {
            className: "container-editorial py-10 md:py-16",
            children: [
              d.jsx("h1", {
                className: "font-display text-3xl mb-2",
                children: "Pagamento do Pedido",
              }),
              d.jsxs("p", {
                className: "text-sm text-muted-foreground mb-8",
                children: ["Pedido ", n.order_number, " - Total: ", L(Number(n.total))],
              }),
              d.jsxs("div", {
                className: "grid md:grid-cols-2 gap-8",
                children: [
                  d.jsxs("div", {
                    className: "space-y-6",
                    children: [
                      d.jsx(F, {
                        status: m,
                        method: e,
                        transactionId: n.transaction_id,
                        paidAt: n.paid_at,
                      }),
                      n.notes?.includes("Motoboy Próprio") &&
                        d.jsxs("div", {
                          className: "p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-md",
                          children: [
                            d.jsxs("h3", {
                              className:
                                "font-display text-lg mb-2 flex items-center gap-2 text-[#128C7E]",
                              children: [
                                d.jsx(K, { className: "h-5 w-5" }),
                                " Entrega via Motoboy",
                              ],
                            }),
                            d.jsx("p", {
                              className: "text-sm text-muted-foreground mb-4",
                              children:
                                "Como você escolheu a entrega via motoboy, por favor, clique no botão abaixo para combinar o horário de entrega pelo WhatsApp.",
                            }),
                            d.jsxs("a", {
                              href: `https://wa.me/${M?.whatsapp_number || "5511994565923"}?text=${encodeURIComponent(`Olá! Fiz o pedido #${n.order_number} no site e escolhi a entrega via Motoboy Próprio. Gostaria de combinar o horário de entrega.`)}`,
                              target: "_blank",
                              rel: "noreferrer",
                              className:
                                "inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-sm text-sm font-medium hover:bg-[#128C7E] transition-colors",
                              children: [d.jsx(U, { className: "h-4 w-4" }), " Combinar Entrega"],
                            }),
                          ],
                        }),
                      _ &&
                        d.jsx("div", {
                          className: "mt-2",
                          children: d.jsx(G, {
                            qrCodeBase64: _.qrCode,
                            pixCode: _.code,
                            expirationDate: _.expiration,
                            onExpire: () => E.error("Codigo PIX expirado."),
                          }),
                        }),
                    ],
                  }),
                  !_ &&
                    (m === "pending" || m === "failed") &&
                    d.jsxs("div", {
                      className: "border border-border rounded-sm p-6 bg-secondary/20",
                      children: [
                        d.jsx("h2", {
                          className: "font-display text-xl mb-4",
                          children: "Escolha a forma de pagamento",
                        }),
                        l
                          ? d.jsxs(d.Fragment, {
                              children: [
                                u &&
                                  d.jsxs("div", {
                                    className:
                                      "bg-red-100 text-red-900 p-4 rounded-md mb-4 whitespace-pre-wrap font-mono text-xs overflow-auto",
                                    children: [
                                      d.jsx("strong", { children: "Erro Mercado Pago:" }),
                                      d.jsx("br", {}),
                                      u,
                                    ],
                                  }),
                                d.jsx(ce, {
                                  initialization: {
                                    amount: Number(n?.total ?? 0),
                                    preferenceId: l,
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
                                  onSubmit: j,
                                  onError: N,
                                }),
                              ],
                            })
                          : d.jsx("div", {
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
export { xe as component };
