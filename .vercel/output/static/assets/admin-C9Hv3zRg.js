import {
  a7 as u,
  aa as p,
  ad as b,
  Q as d,
  D as e,
  L as s,
  M as h,
  X as f,
  S as j,
  b as g,
  a1 as N,
  O as y,
} from "./index-C2UuTsl-.js";
import { L as v } from "./layout-dashboard-5SKAG8I0.js";
import { P as w } from "./package-DKlLxxot.js";
import { S as k } from "./star-BuaHoUUy.js";
import { I as S, M as C, T as L, L as A, S as M, a as O } from "./tags-DtvIZJ_B.js";
import { T as P } from "./truck-_8doA-LZ.js";
function V() {
  const { user: o, isAdmin: c, loading: t } = u(),
    n = p(),
    l = b({ select: (a) => a.location.pathname }),
    [i, r] = d.useState(!1);
  if (
    (d.useEffect(() => {
      !t && !o && n({ to: "/login" });
    }, [t, o, n]),
    t)
  )
    return e.jsx("div", {
      className: "p-10 text-sm text-muted-foreground",
      children: "Carregando...",
    });
  if (!o) return null;
  if (!c)
    return e.jsxs("div", {
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
        e.jsx(s, {
          to: "/",
          className: "mt-6 inline-block text-xs tracking-editorial uppercase underline",
          children: "Voltar à loja",
        }),
      ],
    });
  const m = [
    { to: "/admin", label: "Dashboard", icon: v, exact: !0 },
    { to: "/admin/produtos", label: "Produtos", icon: w },
    { to: "/admin/pedidos", label: "Pedidos", icon: j },
    { to: "/admin/avaliacoes", label: "Avaliações", icon: k },
    { to: "/admin/banners", label: "Banners", icon: S },
    { to: "/admin/anuncio", label: "Barra de anúncios", icon: C },
    { to: "/admin/categorias-home", label: "Categorias home", icon: L },
    { to: "/admin/colecoes", label: "Coleções", icon: A },
    { to: "/admin/frete", label: "Frete & Envios", icon: P },
    { to: "/admin/configuracoes", label: "Configurações", icon: M },
  ];
  return e.jsxs("div", {
    className: "min-h-screen flex flex-col md:flex-row bg-secondary/30",
    children: [
      e.jsxs("div", {
        className:
          "md:hidden flex items-center justify-between p-4 border-b border-border bg-background",
        children: [
          e.jsxs(s, {
            to: "/",
            className: "font-display text-xl",
            children: ["Nicoly ", e.jsx("span", { className: "text-blush", children: "Admin" })],
          }),
          e.jsx("button", { onClick: () => r(!0), children: e.jsx(h, { className: "h-6 w-6" }) }),
        ],
      }),
      e.jsxs("aside", {
        className: `${i ? "fixed inset-0 z-50 flex" : "hidden"} md:static md:flex md:w-60 border-r border-border bg-background flex-col`,
        children: [
          e.jsxs("div", {
            className: "p-6 border-b border-border flex justify-between items-center",
            children: [
              e.jsxs(s, {
                to: "/",
                className: "font-display text-xl",
                children: [
                  "Nicoly ",
                  e.jsx("span", { className: "text-blush", children: "Admin" }),
                ],
              }),
              i &&
                e.jsx("button", {
                  className: "md:hidden",
                  onClick: () => r(!1),
                  children: e.jsx(f, { className: "h-6 w-6" }),
                }),
            ],
          }),
          e.jsx("nav", {
            className: "flex-1 p-3 space-y-1 overflow-y-auto",
            children: m.map((a) => {
              const x = a.exact ? l === a.to : l.startsWith(a.to);
              return e.jsxs(
                s,
                {
                  to: a.to,
                  onClick: () => r(!1),
                  className: `flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition ${x ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`,
                  children: [e.jsx(a.icon, { className: "h-4 w-4" }), a.label],
                },
                a.to,
              );
            }),
          }),
          e.jsxs("div", {
            className: "p-3 border-t border-border space-y-1",
            children: [
              e.jsxs(s, {
                to: "/",
                className:
                  "flex items-center gap-3 px-3 py-2 rounded-sm text-sm hover:bg-secondary",
                children: [e.jsx(O, { className: "h-4 w-4" }), " Ver loja"],
              }),
              e.jsxs("button", {
                onClick: async () => {
                  (await N.auth.signOut(), n({ to: "/" }));
                },
                className:
                  "w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm hover:bg-secondary",
                children: [e.jsx(g, { className: "h-4 w-4" }), " Sair"],
              }),
            ],
          }),
        ],
      }),
      e.jsx("main", {
        className: "flex-1 p-4 md:p-10 w-full overflow-x-hidden",
        children: e.jsx(y, {}),
      }),
    ],
  });
}
export { V as component };
