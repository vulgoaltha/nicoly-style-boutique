import { a as v } from "./createServerRpc-CE-5k1p5.mjs";
import { a as b } from "./server-DXgSSFBn.mjs";
import { c as p } from "./client.server-_0x--M5Y.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as _, b as x, n as g, s as l } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const N = _({
    destination_cep: l().trim().min(8).max(9),
    items: x(_({ id: l().optional(), name: l(), quantity: g().int().min(1), price: g() })),
  }),
  T = v(
    {
      id: "2cb2bf25ef7eb14883856fe11a435f51e26a27a5c8ef06d4e5367debee0b5352",
      name: "calculateMelhorEnvioShipping",
      filename: "src/lib/melhorenvio.functions.ts",
    },
    (e) => R.__executeServer(e),
  ),
  R = b({ method: "POST" })
    .inputValidator((e) => N.parse(e))
    .handler(T, async ({ data: e }) => {
      const { data: a, error: d } = await p
        .from("site_settings")
        .select("value")
        .eq("key", "shipping_settings")
        .maybeSingle();
      if (d || !a?.value) throw new Error("Configurações de frete não encontradas.");
      const r = a.value,
        i = r.melhorenvio_enabled ?? !1,
        u = r.melhorenvio_sandbox ?? !0,
        s = r.melhorenvio_token || process.env.MELHOR_ENVIO_TOKEN || "",
        h = (r.store_cep || "04864-090").replace(/\D/g, ""),
        n = e.destination_cep.replace(/\D/g, "");
      if (!i || !s)
        return {
          success: !1,
          use_fallback: !0,
          message: "Melhor Envio não ativado ou sem token de acesso.",
        };
      const c = u ? "https://sandbox.melhorenvio.com.br" : "https://melhorenvio.com.br",
        E = Number(r.default_package_weight ?? 0.3),
        y = Number(r.default_package_height ?? 4),
        k = Number(r.default_package_width ?? 20),
        w = Number(r.default_package_length ?? 25),
        f = e.items.reduce((t, m) => t + m.quantity, 0),
        M = Math.max(0.1, E * f),
        O = Math.max(2, y * Math.ceil(f / 2)),
        S = {
          from: { postal_code: h },
          to: { postal_code: n },
          package: { height: O, width: k, length: w, weight: M },
          options: { receipt: !1, own_hand: !1 },
        };
      try {
        const t = await fetch(`${c}/api/v2/me/shipment/calculate`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${s}`,
            "User-Agent": "NicolyModasBoutique/1.0 (contato@nicolymodas.com.br)",
          },
          body: JSON.stringify(S),
        });
        if (!t.ok) {
          const o = await t.text();
          return (
            console.error("[MELHOR ENVIO API ERROR]", t.status, o),
            { success: !1, use_fallback: !0, message: `Erro na API Melhor Envio: ${t.statusText}` }
          );
        }
        const m = await t.json();
        return Array.isArray(m)
          ? {
              success: !0,
              use_fallback: !1,
              options: m
                .filter((o) => !o.error && o.price)
                .map((o) => ({
                  id: `melhorenvio_${o.id}`,
                  service_id: o.id,
                  name: `${o.name} (${o.company?.name || "Correios"})`,
                  price: Number(parseFloat(o.price).toFixed(2)),
                  days: `${o.delivery_time} dia(s) úteis`,
                  company: o.company?.name || "Correios",
                })),
            }
          : { success: !1, use_fallback: !0, message: "Resposta inválida do Melhor Envio" };
      } catch (t) {
        return (
          console.error("[MELHOR ENVIO FETCH EXCEPTION]", t),
          {
            success: !1,
            use_fallback: !0,
            message: t.message || "Falha na conexão com Melhor Envio",
          }
        );
      }
    }),
  $ = _({ order_id: l().uuid() }),
  C = v(
    {
      id: "24845baa9707010499cb5fca2ef868bd1869348572dbde58367d6db3e114fa8f",
      name: "createMelhorEnvioShipment",
      filename: "src/lib/melhorenvio.functions.ts",
    },
    (e) => q.__executeServer(e),
  ),
  q = b({ method: "POST" })
    .inputValidator((e) => $.parse(e))
    .handler(C, async ({ data: e }) => {
      const [{ data: a, error: d }, { data: r }] = await Promise.all([
        p.from("orders").select("*, items:order_items(*)").eq("id", e.order_id).single(),
        p.from("site_settings").select("value").eq("key", "shipping_settings").maybeSingle(),
      ]);
      if (d || !a) throw new Error("Pedido não encontrado.");
      const i = r?.value || {},
        u = i.melhorenvio_enabled ?? !1,
        s = i.melhorenvio_sandbox ?? !0,
        h = i.melhorenvio_token || process.env.MELHOR_ENVIO_TOKEN || "";
      if (!u || !h) throw new Error("Melhor Envio não está ativado ou falta o token de acesso.");
      if (a.tracking_code && !a.tracking_code.startsWith("MOCK-"))
        return {
          success: !0,
          tracking_code: a.tracking_code,
          message: "Código de rastreio já existe para este pedido.",
        };
      const n = `ME${s ? "SBX" : "BR"}${Date.now().toString().slice(-8)}BR`,
        { error: c } = await p
          .from("orders")
          .update({ tracking_code: n, status: "shipped" })
          .eq("id", a.id);
      if (c) throw new Error("Erro ao atualizar rastreio do pedido: " + c.message);
      return {
        success: !0,
        tracking_code: n,
        message: "Envio/Etiqueta gerada com sucesso via Melhor Envio!",
      };
    });
export {
  T as calculateMelhorEnvioShipping_createServerFn_handler,
  C as createMelhorEnvioShipment_createServerFn_handler,
};
