import { r as m, j as e } from "../_libs/react.mjs";
import { d as p, f as x, L as a, O as u } from "../_libs/tanstack__react-router.mjs";
import { u as h } from "./router-CzERE3r3.mjs";
import { p as b } from "./client-DbGX8m2J.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import {
  G as f,
  ag as j,
  x as g,
  P as N,
  _ as y,
  a1 as v,
  I as w,
  F as k,
  a3 as C,
  L as S,
  a8 as L,
  W as A,
  a2 as P,
  z as E,
} from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zustand.mjs";
import "./payment.functions-DaljBhjR.mjs";
import "./server-DXgSSFBn.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-Ia7fKZJE.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "./client.server-_0x--M5Y.mjs";
function fe() {
  const { user: o, isAdmin: d, loading: r } = h(),
    t = p(),
    n = x({ select: (s) => s.location.pathname }),
    [l, i] = m.useState(!1);
  return (
    m.useEffect(() => {
      !r && !o && t({ to: "/login" });
    }, [r, o, t]),
    r
      ? e.jsx("div", { className: "p-10 text-sm text-muted-foreground", children: "Carregando..." })
      : o
        ? d
          ? e.jsxs("div", {
              className: "min-h-screen flex flex-col md:flex-row bg-secondary/30",
              children: [
                e.jsxs("div", {
                  className:
                    "md:hidden flex items-center justify-between p-4 border-b border-border bg-background",
                  children: [
                    e.jsxs(a, {
                      to: "/",
                      className: "font-display text-xl",
                      children: [
                        "Nicoly ",
                        e.jsx("span", { className: "text-blush", children: "Admin" }),
                      ],
                    }),
                    e.jsx("button", {
                      onClick: () => i(!0),
                      children: e.jsx(f, { className: "h-6 w-6" }),
                    }),
                  ],
                }),
                e.jsxs("aside", {
                  className: `${l ? "fixed inset-0 z-50 flex" : "hidden"} md:static md:flex md:w-60 border-r border-border bg-background flex-col`,
                  children: [
                    e.jsxs("div", {
                      className: "p-6 border-b border-border flex justify-between items-center",
                      children: [
                        e.jsxs(a, {
                          to: "/",
                          className: "font-display text-xl",
                          children: [
                            "Nicoly ",
                            e.jsx("span", { className: "text-blush", children: "Admin" }),
                          ],
                        }),
                        l &&
                          e.jsx("button", {
                            className: "md:hidden",
                            onClick: () => i(!1),
                            children: e.jsx(j, { className: "h-6 w-6" }),
                          }),
                      ],
                    }),
                    e.jsx("nav", {
                      className: "flex-1 p-3 space-y-1 overflow-y-auto",
                      children: [
                        { to: "/admin", label: "Dashboard", icon: g, exact: !0 },
                        { to: "/admin/produtos", label: "Produtos", icon: N },
                        { to: "/admin/pedidos", label: "Pedidos", icon: y },
                        { to: "/admin/avaliacoes", label: "Avaliações", icon: v },
                        { to: "/admin/banners", label: "Banners", icon: w },
                        { to: "/admin/anuncio", label: "Barra de anúncios", icon: k },
                        { to: "/admin/categorias-home", label: "Categorias home", icon: C },
                        { to: "/admin/colecoes", label: "Coleções", icon: S },
                        { to: "/admin/frete", label: "Frete & Envios", icon: L },
                        { to: "/admin/configuracoes", label: "Configurações", icon: A },
                      ].map((s) => {
                        const c = s.exact ? n === s.to : n.startsWith(s.to);
                        return e.jsxs(
                          a,
                          {
                            to: s.to,
                            onClick: () => i(!1),
                            className: `flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition ${c ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`,
                            children: [e.jsx(s.icon, { className: "h-4 w-4" }), s.label],
                          },
                          s.to,
                        );
                      }),
                    }),
                    e.jsxs("div", {
                      className: "p-3 border-t border-border space-y-1",
                      children: [
                        e.jsxs(a, {
                          to: "/",
                          className:
                            "flex items-center gap-3 px-3 py-2 rounded-sm text-sm hover:bg-secondary",
                          children: [e.jsx(P, { className: "h-4 w-4" }), " Ver loja"],
                        }),
                        e.jsxs("button", {
                          onClick: async () => {
                            (await b.auth.signOut(), t({ to: "/" }));
                          },
                          className:
                            "w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm hover:bg-secondary",
                          children: [e.jsx(E, { className: "h-4 w-4" }), " Sair"],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsx("main", {
                  className: "flex-1 p-4 md:p-10 w-full overflow-x-hidden",
                  children: e.jsx(u, {}),
                }),
              ],
            })
          : e.jsxs("div", {
              className: "p-10 max-w-md mx-auto text-center",
              children: [
                e.jsx("h1", { className: "font-display text-2xl", children: "Acesso restrito" }),
                e.jsxs("p", {
                  className: "text-sm text-muted-foreground mt-2",
                  children: [
                    "Sua conta não tem permissão de administrador. Peça para o dono da loja adicionar o papel",
                    " ",
                    e.jsx("code", { children: "admin" }),
                    " ao seu usuário no painel da Lovable Cloud (tabela",
                    " ",
                    e.jsx("code", { children: "user_roles" }),
                    ", com seu user id e role = admin).",
                  ],
                }),
                e.jsx(a, {
                  to: "/",
                  className: "mt-6 inline-block text-xs tracking-editorial uppercase underline",
                  children: "Voltar à loja",
                }),
              ],
            })
        : null
  );
}
export { fe as component };
