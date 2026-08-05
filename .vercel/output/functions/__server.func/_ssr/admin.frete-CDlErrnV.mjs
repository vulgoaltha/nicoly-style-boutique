import { r as u, j as e } from "../_libs/react.mjs";
import { b as C, a as k } from "../_libs/tanstack__react-query.mjs";
import { t as _ } from "../_libs/sonner.mjs";
import { p as v } from "./client-DbGX8m2J.mjs";
import { M as E, a8 as j, Y as w, O as P, e as S } from "../_libs/lucide-react.mjs";
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
const a =
    "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20",
  o = "text-xs tracking-editorial uppercase mb-1.5 block text-muted-foreground font-medium",
  d = "bg-background border border-border rounded-sm p-6 space-y-4";
function O() {
  return k({
    queryKey: ["site_settings", "shipping_settings"],
    queryFn: async () => {
      const { data: t, error: i } = await v
        .from("site_settings")
        .select("value")
        .eq("key", "shipping_settings")
        .maybeSingle();
      if (i) throw i;
      return t?.value || {};
    },
  });
}
function l({ title: t, description: i, children: p, icon: n }) {
  return e.jsxs("div", {
    className: "space-y-4",
    children: [
      e.jsxs("div", {
        className: "flex items-center gap-2",
        children: [
          n && e.jsx(n, { className: "h-5 w-5 text-muted-foreground" }),
          e.jsxs("div", {
            children: [
              e.jsx("h2", { className: "font-medium text-lg", children: t }),
              i && e.jsx("p", { className: "text-sm text-muted-foreground", children: i }),
            ],
          }),
        ],
      }),
      p,
    ],
  });
}
function J() {
  const t = C(),
    { data: i, isLoading: p } = O(),
    [n, x] = u.useState(!1),
    [s, h] = u.useState({
      store_cep: "04864-090",
      whatsapp_number: "5511994565923",
      motoboy_enabled: !0,
      motoboy_max_distance: 10,
      motoboy_base_price: 0,
      motoboy_price_per_km: 5,
      correios_api_enabled: !0,
      correios_codigo_sedex: "04016",
      correios_codigo_pac: "04510",
      correios_usuario: "",
      correios_senha: "",
      correios_pac_sp: 18.5,
      correios_pac_br: 38.5,
      correios_sedex_sp: 25.9,
      correios_sedex_br: 65.9,
      melhorenvio_enabled: !1,
      melhorenvio_sandbox: !0,
      melhorenvio_token: "",
      default_package_weight: 0.3,
      default_package_height: 4,
      default_package_width: 20,
      default_package_length: 25,
    });
  u.useEffect(() => {
    i && Object.keys(i).length > 0 && h((c) => ({ ...c, ...i }));
  }, [i]);
  const r = (c) => {
      const { name: m, value: g, type: b, checked: f } = c.target;
      h((y) => ({ ...y, [m]: b === "checkbox" ? f : b === "number" ? Number(g) : g }));
    },
    N = async (c) => {
      (c.preventDefault(), x(!0));
      const { error: m } = await v
        .from("site_settings")
        .upsert({ key: "shipping_settings", value: s });
      (x(!1),
        m
          ? _.error(m.message)
          : (_.success("Configurações de frete salvas com sucesso!"),
            t.invalidateQueries({ queryKey: ["site_settings", "shipping_settings"] })));
    };
  return p
    ? e.jsx("div", {
        className: "p-10 text-sm text-muted-foreground",
        children: "Carregando configurações...",
      })
    : e.jsxs("div", {
        className: "max-w-4xl space-y-10",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h1", {
                className: "font-display text-2xl md:text-3xl mb-1",
                children: "Frete e Envios",
              }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Configure a integração oficial dos Correios, Melhor Envio e Motoboy.",
              }),
            ],
          }),
          e.jsxs("form", {
            onSubmit: N,
            className: "space-y-8",
            children: [
              e.jsx(l, {
                title: "Dados de Origem (Sede/Loja)",
                description: "Usado para calcular o frete exato no servidor dos Correios.",
                icon: E,
                children: e.jsx("div", {
                  className: d,
                  children: e.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", { className: o, children: "CEP da Loja (Origem)" }),
                          e.jsx("input", {
                            name: "store_cep",
                            value: s.store_cep,
                            onChange: r,
                            className: a,
                            placeholder: "04864-090",
                            required: !0,
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", {
                            className: o,
                            children: "WhatsApp da Atendente (Motoboy)",
                          }),
                          e.jsx("input", {
                            name: "whatsapp_number",
                            value: s.whatsapp_number,
                            onChange: r,
                            className: a,
                            placeholder: "5511994565923",
                            required: !0,
                          }),
                          e.jsx("p", {
                            className: "text-xs text-muted-foreground mt-1",
                            children: "Com DDI e DDD (Ex: 5511994565923)",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              e.jsx(l, {
                title: "API Oficial dos Correios (Preço e Prazo)",
                description: "Cotação em tempo real diretamente dos servidores dos Correios.",
                icon: j,
                children: e.jsxs("div", {
                  className: d,
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center gap-2 mb-4 border-b border-border pb-4",
                      children: [
                        e.jsx("input", {
                          type: "checkbox",
                          name: "correios_api_enabled",
                          id: "correios_api_enabled",
                          checked: s.correios_api_enabled,
                          onChange: r,
                          className:
                            "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
                        }),
                        e.jsx("label", {
                          htmlFor: "correios_api_enabled",
                          className: "text-sm font-medium cursor-pointer",
                          children: "Habilitar Cotação Oficial dos Correios (PAC / SEDEX)",
                        }),
                      ],
                    }),
                    s.correios_api_enabled &&
                      e.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          e.jsxs("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                              e.jsxs("div", {
                                children: [
                                  e.jsx("label", {
                                    className: o,
                                    children: "Código do Serviço SEDEX",
                                  }),
                                  e.jsx("input", {
                                    name: "correios_codigo_sedex",
                                    value: s.correios_codigo_sedex,
                                    onChange: r,
                                    className: a,
                                    placeholder: "04016 (sem contrato) ou 04782",
                                  }),
                                  e.jsxs("p", {
                                    className: "text-xs text-muted-foreground mt-1",
                                    children: [
                                      "Padrão sem contrato: ",
                                      e.jsx("strong", { children: "04016" }),
                                    ],
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                children: [
                                  e.jsx("label", {
                                    className: o,
                                    children: "Código do Serviço PAC",
                                  }),
                                  e.jsx("input", {
                                    name: "correios_codigo_pac",
                                    value: s.correios_codigo_pac,
                                    onChange: r,
                                    className: a,
                                    placeholder: "04510 (sem contrato) ou 04669",
                                  }),
                                  e.jsxs("p", {
                                    className: "text-xs text-muted-foreground mt-1",
                                    children: [
                                      "Padrão sem contrato: ",
                                      e.jsx("strong", { children: "04510" }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "bg-secondary/20 p-4 rounded border border-border space-y-3",
                            children: [
                              e.jsxs("div", {
                                className:
                                  "flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-editorial",
                                children: [
                                  e.jsx(w, { className: "h-4 w-4 text-emerald-600" }),
                                  "Contrato Correios (Opcional)",
                                ],
                              }),
                              e.jsxs("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                children: [
                                  e.jsxs("div", {
                                    children: [
                                      e.jsx("label", {
                                        className: o,
                                        children: "Usuário / Código da Empresa",
                                      }),
                                      e.jsx("input", {
                                        name: "correios_usuario",
                                        value: s.correios_usuario,
                                        onChange: r,
                                        className: a,
                                        placeholder: "Opcional (apenas para contrato)",
                                      }),
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    children: [
                                      e.jsx("label", {
                                        className: o,
                                        children: "Senha / Cartão de Postagem",
                                      }),
                                      e.jsx("input", {
                                        type: "password",
                                        name: "correios_senha",
                                        value: s.correios_senha,
                                        onChange: r,
                                        className: a,
                                        placeholder: "Opcional (apenas para contrato)",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              }),
              e.jsx(l, {
                title: "Integração Melhor Envio (Opcional)",
                description: "Cotação alternativa e geração de etiquetas.",
                icon: P,
                children: e.jsxs("div", {
                  className: d,
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center gap-2 mb-4",
                      children: [
                        e.jsx("input", {
                          type: "checkbox",
                          name: "melhorenvio_enabled",
                          id: "melhorenvio_enabled",
                          checked: s.melhorenvio_enabled,
                          onChange: r,
                          className: "h-4 w-4 rounded border-gray-300",
                        }),
                        e.jsx("label", {
                          htmlFor: "melhorenvio_enabled",
                          className: "text-sm font-medium cursor-pointer",
                          children: "Habilitar Melhor Envio",
                        }),
                      ],
                    }),
                    s.melhorenvio_enabled &&
                      e.jsx("div", {
                        className: "space-y-4",
                        children: e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: o,
                              children: "Token de Acesso da API (Bearer Token)",
                            }),
                            e.jsx("input", {
                              type: "password",
                              name: "melhorenvio_token",
                              value: s.melhorenvio_token,
                              onChange: r,
                              className: a,
                              placeholder: "Cole seu token do Melhor Envio...",
                            }),
                          ],
                        }),
                      }),
                  ],
                }),
              }),
              e.jsx(l, {
                title: "Motoboy Próprio",
                description: "Configurações de entrega local via WhatsApp.",
                icon: S,
                children: e.jsx("div", {
                  className: d,
                  children: e.jsxs("div", {
                    className: "flex items-center gap-2 mb-4",
                    children: [
                      e.jsx("input", {
                        type: "checkbox",
                        name: "motoboy_enabled",
                        id: "motoboy_enabled",
                        checked: s.motoboy_enabled,
                        onChange: r,
                        className: "h-4 w-4 rounded border-gray-300",
                      }),
                      e.jsx("label", {
                        htmlFor: "motoboy_enabled",
                        className: "text-sm font-medium",
                        children: "Habilitar entrega via Motoboy (WhatsApp)",
                      }),
                    ],
                  }),
                }),
              }),
              e.jsx(l, {
                title: "Tabela de Frete Fixo Correios (Fallback)",
                description: "Usado caso a cotação em tempo real esteja inacessível.",
                icon: j,
                children: e.jsx("div", {
                  className: d,
                  children: e.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                      e.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          e.jsx("h3", {
                            className: "font-medium text-sm",
                            children: "Estado de Origem (Ex: SP)",
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("label", { className: o, children: "PAC (SP)" }),
                              e.jsx("input", {
                                type: "number",
                                step: "0.01",
                                name: "correios_pac_sp",
                                value: s.correios_pac_sp,
                                onChange: r,
                                className: a,
                                required: !0,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("label", { className: o, children: "SEDEX (SP)" }),
                              e.jsx("input", {
                                type: "number",
                                step: "0.01",
                                name: "correios_sedex_sp",
                                value: s.correios_sedex_sp,
                                onChange: r,
                                className: a,
                                required: !0,
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          e.jsx("h3", {
                            className: "font-medium text-sm",
                            children: "Outros Estados (Brasil)",
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("label", { className: o, children: "PAC (Outros Estados)" }),
                              e.jsx("input", {
                                type: "number",
                                step: "0.01",
                                name: "correios_pac_br",
                                value: s.correios_pac_br,
                                onChange: r,
                                className: a,
                                required: !0,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("label", { className: o, children: "SEDEX (Outros Estados)" }),
                              e.jsx("input", {
                                type: "number",
                                step: "0.01",
                                name: "correios_sedex_br",
                                value: s.correios_sedex_br,
                                onChange: r,
                                className: a,
                                required: !0,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              e.jsx("div", {
                className: "pt-4 flex justify-end",
                children: e.jsx("button", {
                  type: "submit",
                  disabled: n,
                  className:
                    "w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                  children: n ? "Salvando..." : "Salvar Configurações",
                }),
              }),
            ],
          }),
        ],
      });
}
export { J as component };
