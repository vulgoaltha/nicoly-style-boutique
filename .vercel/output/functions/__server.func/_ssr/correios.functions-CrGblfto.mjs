import { a as I } from "./createServerRpc-CE-5k1p5.mjs";
import { a as X } from "./server-DXgSSFBn.mjs";
import { c as j } from "./client.server-_0x--M5Y.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as x, b as L, n as $, s as p } from "../_libs/zod.mjs";
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
const H = x({
    destination_cep: p().trim().min(8).max(9),
    items: L(x({ id: p().optional(), name: p(), quantity: $().int().min(1), price: $() })),
  }),
  U = I(
    {
      id: "f56d0e1744b731038a3cdfabfc29f1d310cb7324ac7db44a506c6be0a2421074",
      name: "calculateCorreiosShipping",
      filename: "src/lib/correios.functions.ts",
    },
    (t) => B.__executeServer(t),
  ),
  B = X({ method: "POST" })
    .inputValidator((t) => H.parse(t))
    .handler(U, async ({ data: t }) => {
      const { data: n, error: S } = await j
        .from("site_settings")
        .select("value")
        .eq("key", "shipping_settings")
        .maybeSingle();
      if (S || !n?.value) throw new Error("Configurações de frete não encontradas.");
      const e = n.value,
        y = (e.store_cep || "04864-090").replace(/\D/g, ""),
        v = t.destination_cep.replace(/\D/g, ""),
        l = e.correios_codigo_pac || "04510",
        d = e.correios_codigo_sedex || "04016",
        P = e.correios_usuario || "",
        k = e.correios_senha || "",
        w = Number(e.default_package_weight ?? 0.3),
        M = Number(e.default_package_height ?? 4),
        V = Number(e.default_package_width ?? 20),
        N = Number(e.default_package_length ?? 25),
        u = t.items.reduce((o, c) => o + c.quantity, 0),
        D = Math.max(0.3, parseFloat((w * u).toFixed(2))),
        F = Math.max(2, M * Math.ceil(u / 2)),
        T = Math.max(11, V),
        A = Math.max(16, N),
        O = `${d},${l}`,
        z = `https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=${P}&sDsSenha=${k}&sCepOrigem=${y}&sCepDestino=${v}&nVlPeso=${D}&nCdFormato=1&nVlComprimento=${A}&nVlAltura=${F}&nVlLargura=${T}&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=${O}&StrRetorno=xml`;
      try {
        const o = await fetch(z, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        });
        if (!o.ok)
          return {
            success: !1,
            use_fallback: !0,
            message: "Servidor dos Correios temporariamente indisponível.",
          };
        const c = await o.text(),
          s = [],
          g = c.split("<cServico>");
        for (let i = 1; i < g.length; i++) {
          const a = g[i],
            h = a.match(/<Codigo>(.*?)<\/Codigo>/),
            f = a.match(/<Valor>(.*?)<\/Valor>/),
            _ = a.match(/<PrazoEntrega>(.*?)<\/PrazoEntrega>/),
            C = a.match(/<Erro>(.*?)<\/Erro>/),
            b = a.match(/<MsgErro>(.*?)<\/MsgErro>/),
            r = h ? h[1].trim() : "",
            E = f ? f[1].trim().replace(".", "").replace(",", ".") : "0",
            R = _ ? _[1].trim() : "0",
            m = C ? C[1].trim() : "0",
            G = b ? b[1].trim() : "";
          if ((m === "0" || m === "010" || m === "011") && parseFloat(E) > 0) {
            const W = parseFloat(E),
              q =
                r === d || r === "04016" || r === "04782" || r === "40010"
                  ? "SEDEX (Correios)"
                  : r === l || r === "04510" || r === "04669" || r === "41106"
                    ? "PAC (Correios)"
                    : `Correios (${r})`;
            s.push({ id: `correios_${r}`, name: q, price: W, days: `${R} dia(s) úteis`, code: r });
          }
        }
        return s.length > 0
          ? (s.sort((i, a) => i.price - a.price), { success: !0, use_fallback: !1, options: s })
          : {
              success: !1,
              use_fallback: !0,
              message: "Não foi possível obter cotação direta dos Correios para este CEP.",
            };
      } catch (o) {
        return (
          console.error("[CORREIOS API EXCEPTION]", o),
          {
            success: !1,
            use_fallback: !0,
            message: o.message || "Erro na conexão com os Correios.",
          }
        );
      }
    });
export { U as calculateCorreiosShipping_createServerFn_handler };
