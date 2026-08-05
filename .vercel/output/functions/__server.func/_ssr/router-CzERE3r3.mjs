import { Q as M } from "../_libs/tanstack__query-core.mjs";
import { Q as $ } from "../_libs/tanstack__react-query.mjs";
import {
  b as E,
  a as I,
  H as z,
  S as D,
  e as k,
  f as F,
  O as W,
  c as i,
  l as s,
  L as h,
  u as S,
} from "../_libs/tanstack__react-router.mjs";
import { j as e, r as j } from "../_libs/react.mjs";
import { c as L, p as q } from "../_libs/zustand.mjs";
import { p as y } from "./client-DbGX8m2J.mjs";
import { t as B, S as J } from "./payment.functions-DaljBhjR.mjs";
import { a as H } from "./server-DXgSSFBn.mjs";
import { T as U } from "../_libs/sonner.mjs";
import { c as G } from "./client.server-_0x--M5Y.mjs";
import { ag as K, G as Q, w as v, aa as V, z as C, _ as Y } from "../_libs/lucide-react.mjs";
import { o as X, n as Z, s as ee } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "./auth-middleware-Ia7fKZJE.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const te = "/assets/styles-DYlKifa1.css",
  b = (t) => `${t.productId}__${t.size ?? ""}__${t.color ?? ""}`,
  oe = L()(
    q(
      (t, a) => ({
        items: [],
        isOpen: !1,
        add: (o) =>
          t((n) => {
            const c = b(o);
            return n.items.find((r) => b(r) === c)
              ? {
                  items: n.items.map((r) =>
                    b(r) === c ? { ...r, quantity: r.quantity + o.quantity } : r,
                  ),
                }
              : { items: [...n.items, o] };
          }),
        remove: (o, n, c) =>
          t((r) => ({
            items: r.items.filter((m) => b(m) !== b({ productId: o, size: n, color: c })),
          })),
        setQty: (o, n, c, r) =>
          t((m) => ({
            items: m.items.map((p) =>
              b(p) === b({ productId: o, size: c, color: r })
                ? { ...p, quantity: Math.max(1, n) }
                : p,
            ),
          })),
        clear: () => t({ items: [] }),
        setOpen: (o) => t({ isOpen: o }),
        count: () => a().items.reduce((o, n) => o + n.quantity, 0),
        subtotal: () => a().items.reduce((o, n) => o + n.price * n.quantity, 0),
      }),
      { name: "nicoly-cart" },
    ),
  ),
  _ = H({ method: "GET" })
    .inputValidator((t) => t)
    .handler(B("bec8cd5a732eff302c89d7c75168a4ec0c29b6087b1e0f325a5d7b54cddfd027"));
function ae() {
  const [t, a] = j.useState(null),
    [o, n] = j.useState(null),
    [c, r] = j.useState(!1),
    [m, p] = j.useState(!0);
  return (
    j.useEffect(() => {
      const { data: u } = y.auth.onAuthStateChange((d, f) => {
        (a(f),
          n(f?.user ?? null),
          f?.user
            ? setTimeout(() => {
                _({ data: f.user.id })
                  .then((g) => {
                    (console.log(
                      "DEBUG AUTH onAuthStateChange: valor final de isAdmin =",
                      g.isAdmin,
                    ),
                      r(g.isAdmin));
                  })
                  .catch(() => r(!1));
              }, 0)
            : r(!1));
      });
      return (
        y.auth.getSession().then(({ data: d }) => {
          (a(d.session),
            n(d.session?.user ?? null),
            p(!1),
            d.session?.user &&
              _({ data: d.session.user.id })
                .then((f) => {
                  (console.log("DEBUG AUTH: valor final de isAdmin =", f.isAdmin), r(f.isAdmin));
                })
                .catch(() => r(!1)));
        }),
        () => u.subscription.unsubscribe()
      );
    }, []),
    { session: t, user: o, isAdmin: c, loading: m }
  );
}
const P = [
  { to: "/", label: "Início" },
  { to: "/loja", label: "Loja" },
  { to: "/loja?cat=vestidos", label: "Vestidos" },
  { to: "/loja?cat=blusas", label: "Blusas" },
  { to: "/loja?cat=conjuntos", label: "Conjuntos" },
];
function ne() {
  const t = oe((d) => d.count()),
    { user: a, isAdmin: o } = ae(),
    n = S({ from: "__root__" }),
    c = n?.storeData || {},
    r = n?.instagram || null,
    m = c?.store_name || "Nicoly Modas",
    [p, u] = j.useState(!1);
  return e.jsxs("header", {
    className: "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md",
    children: [
      e.jsxs("div", {
        className:
          "container-editorial relative flex h-14 items-center justify-between gap-2 md:h-20",
        children: [
          e.jsx("button", {
            className: "relative z-10 -ml-1 flex h-11 w-11 items-center justify-center md:hidden",
            onClick: () => u((d) => !d),
            "aria-label": p ? "Fechar menu" : "Abrir menu",
            children: p ? e.jsx(K, { className: "h-5 w-5" }) : e.jsx(Q, { className: "h-5 w-5" }),
          }),
          e.jsx(h, {
            to: "/",
            className:
              "absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-tight md:static md:left-auto md:translate-x-0 md:text-3xl",
            children: m,
          }),
          e.jsx("nav", {
            className: "hidden md:flex items-center gap-8 text-sm",
            children: P.map((d) =>
              e.jsx(
                h,
                {
                  to: d.to,
                  className:
                    "tracking-editorial uppercase text-xs text-muted-foreground hover:text-foreground transition-colors",
                  children: d.label,
                },
                d.to,
              ),
            ),
          }),
          e.jsxs("div", {
            className: "relative z-10 flex items-center gap-0.5",
            children: [
              r?.active &&
                e.jsx("a", {
                  href: r.url,
                  target: "_blank",
                  rel: "noreferrer",
                  "aria-label": "Instagram",
                  className:
                    "hidden md:inline-flex h-11 w-11 items-center justify-center hover:text-blush transition",
                  title: `@${r.username}`,
                  children: e.jsx(v, { className: "h-5 w-5" }),
                }),
              o &&
                e.jsx(h, {
                  to: "/admin",
                  className:
                    "hidden md:inline-flex h-9 items-center text-xs tracking-editorial uppercase border border-border px-3 rounded hover:bg-secondary transition",
                  children: "Admin",
                }),
              e.jsx(h, {
                to: a ? "/minha-conta/pedidos" : "/login",
                className: "flex h-11 w-11 items-center justify-center hover:text-blush transition",
                "aria-label": a ? "Meus pedidos" : "Entrar",
                title: a ? "Meus pedidos" : "Entrar",
                children: e.jsx(V, { className: "h-5 w-5" }),
              }),
              a &&
                e.jsx("button", {
                  onClick: async () => {
                    (await y.auth.signOut(), (window.location.href = "/login"));
                  },
                  className:
                    "hidden md:flex h-11 w-11 items-center justify-center hover:text-blush transition",
                  "aria-label": "Sair",
                  title: "Sair",
                  children: e.jsx(C, { className: "h-5 w-5" }),
                }),
              e.jsxs(h, {
                to: "/carrinho",
                className:
                  "relative flex h-11 w-11 items-center justify-center hover:text-blush transition",
                "aria-label": "Sacola",
                children: [
                  e.jsx(Y, { className: "h-5 w-5" }),
                  t > 0 &&
                    e.jsx("span", {
                      className:
                        "absolute top-1.5 right-1 bg-blush text-accent-foreground text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center leading-none",
                      children: t,
                    }),
                ],
              }),
            ],
          }),
        ],
      }),
      p &&
        e.jsx("nav", {
          className: "md:hidden border-t border-border bg-background",
          children: e.jsxs("div", {
            className: "container-editorial py-2 flex flex-col",
            children: [
              P.map((d) =>
                e.jsx(
                  h,
                  {
                    to: d.to,
                    onClick: () => u(!1),
                    className:
                      "flex items-center py-3.5 text-sm border-b border-border/40 last:border-0",
                    children: d.label,
                  },
                  d.to,
                ),
              ),
              r?.active &&
                e.jsxs("a", {
                  href: r.url,
                  target: "_blank",
                  rel: "noreferrer",
                  onClick: () => u(!1),
                  className: "flex items-center gap-2 py-3.5 text-sm border-b border-border/40",
                  children: [e.jsx(v, { className: "h-4 w-4" }), " @", r.username],
                }),
              o &&
                e.jsx(h, {
                  to: "/admin",
                  onClick: () => u(!1),
                  className: "flex items-center py-3.5 text-sm border-b border-border/40",
                  children: "Painel Admin",
                }),
              a &&
                e.jsxs("button", {
                  onClick: async () => {
                    (u(!1), await y.auth.signOut(), (window.location.href = "/login"));
                  },
                  className: "flex items-center gap-2 py-3.5 text-sm text-muted-foreground",
                  children: [e.jsx(C, { className: "h-4 w-4" }), " Sair"],
                }),
            ],
          }),
        }),
    ],
  });
}
function re() {
  const t = S({ from: "__root__" }),
    a = t?.storeData || {},
    o = t?.seoSettings || {},
    n = t?.instagram || null,
    c = a?.store_name || "Nicoly Modas",
    r =
      o?.site_description ||
      a?.store_description ||
      "Moda feminina premium para mulheres que se vestem com intenção.";
  return e.jsxs("footer", {
    className: "mt-16 md:mt-24 border-t border-border bg-secondary/40",
    children: [
      e.jsxs("div", {
        className: "container-editorial py-10 md:py-14 grid grid-cols-2 gap-8 md:grid-cols-4",
        children: [
          e.jsxs("div", {
            className: "col-span-2 md:col-span-1",
            children: [
              e.jsx("div", { className: "font-display text-2xl", children: c }),
              e.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-xs", children: r }),
              n?.active &&
                e.jsxs("a", {
                  href: n.url,
                  target: "_blank",
                  rel: "noreferrer",
                  className:
                    "mt-4 inline-flex items-center gap-2 text-sm hover:text-blush transition",
                  children: [e.jsx(v, { className: "h-4 w-4" }), " @", n.username],
                }),
            ],
          }),
          e.jsxs("div", {
            children: [
              e.jsx("h4", {
                className: "text-xs tracking-editorial uppercase mb-4",
                children: "Loja",
              }),
              e.jsxs("ul", {
                className: "space-y-3 text-sm text-muted-foreground",
                children: [
                  e.jsx("li", {
                    children: e.jsx(h, {
                      to: "/loja",
                      className: "hover:text-foreground transition-colors",
                      children: "Todos os produtos",
                    }),
                  }),
                  e.jsx("li", {
                    children: e.jsx(h, {
                      to: "/loja",
                      search: { cat: "vestidos" },
                      className: "hover:text-foreground transition-colors",
                      children: "Vestidos",
                    }),
                  }),
                  e.jsx("li", {
                    children: e.jsx(h, {
                      to: "/loja",
                      search: { cat: "blusas" },
                      className: "hover:text-foreground transition-colors",
                      children: "Blusas",
                    }),
                  }),
                  e.jsx("li", {
                    children: e.jsx(h, {
                      to: "/loja",
                      search: { cat: "conjuntos" },
                      className: "hover:text-foreground transition-colors",
                      children: "Conjuntos",
                    }),
                  }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            children: [
              e.jsx("h4", {
                className: "text-xs tracking-editorial uppercase mb-4",
                children: "Atendimento",
              }),
              e.jsxs("ul", {
                className: "space-y-3 text-sm text-muted-foreground",
                children: [
                  e.jsx("li", { children: "Trocas e devoluções" }),
                  e.jsx("li", { children: "Política de privacidade" }),
                  e.jsx("li", { children: "Fale conosco" }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            className: "col-span-2 md:col-span-1",
            children: [
              e.jsx("h4", {
                className: "text-xs tracking-editorial uppercase mb-4",
                children: "Newsletter",
              }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground mb-3",
                children: "Lançamentos e promoções exclusivas.",
              }),
              e.jsxs("form", {
                className: "flex flex-col gap-2 sm:flex-row",
                children: [
                  e.jsx("input", {
                    type: "email",
                    placeholder: "Seu e-mail",
                    className:
                      "flex-1 bg-background border border-border rounded px-3 py-2.5 text-sm min-w-0",
                  }),
                  e.jsx("button", {
                    type: "submit",
                    className:
                      "bg-primary text-primary-foreground text-xs tracking-editorial uppercase px-5 py-2.5 rounded whitespace-nowrap hover:opacity-90 transition",
                    children: "Assinar",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "border-t border-border py-5 text-center text-xs text-muted-foreground",
        children: ["© ", new Date().getFullYear(), " ", c, ". Todos os direitos reservados."],
      }),
    ],
  });
}
const se = ({ ...t }) =>
  e.jsx(U, {
    className: "toaster group",
    toastOptions: {
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      },
    },
    ...t,
  });
function ie() {
  const t = "5511994565923",
    a = encodeURIComponent("Olá! Gostaria de tirar uma dúvida."),
    o = `https://wa.me/${t}?text=${a}`;
  return e.jsx("a", {
    href: o,
    target: "_blank",
    rel: "noopener noreferrer",
    className:
      "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/50",
    "aria-label": "Fale conosco no WhatsApp",
    children: e.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "28",
      height: "28",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      stroke: "none",
      children: e.jsx("path", {
        d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z",
      }),
    }),
  });
}
function ce() {
  return e.jsx("div", {
    className: "flex min-h-[60vh] items-center justify-center px-4",
    children: e.jsxs("div", {
      className: "max-w-md text-center",
      children: [
        e.jsx("h1", { className: "font-display text-7xl", children: "404" }),
        e.jsx("p", {
          className: "mt-2 text-sm text-muted-foreground",
          children: "Página não encontrada.",
        }),
        e.jsx(h, {
          to: "/",
          className:
            "mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-xs tracking-editorial uppercase text-primary-foreground",
          children: "Voltar à loja",
        }),
      ],
    }),
  });
}
function de({ error: t, reset: a }) {
  console.error(t);
  const o = k();
  return e.jsx("div", {
    className: "flex min-h-[60vh] items-center justify-center px-4",
    children: e.jsxs("div", {
      className: "max-w-md text-center",
      children: [
        e.jsx("h1", { className: "font-display text-2xl", children: "Algo deu errado" }),
        e.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t.message }),
        e.jsx("button", {
          onClick: () => {
            (o.invalidate(), a());
          },
          className:
            "mt-6 rounded-sm bg-primary px-5 py-2.5 text-xs tracking-editorial uppercase text-primary-foreground",
          children: "Tentar novamente",
        }),
      ],
    }),
  });
}
const l = I()({
  loader: async () => {
    try {
      const { data: t } = await y
          .from("site_settings")
          .select("key, value")
          .in("key", ["seo_settings", "store_data", "instagram"]),
        a = { seoSettings: {}, storeData: {}, instagram: null };
      return (
        t?.forEach((o) => {
          (o.key === "seo_settings" && (a.seoSettings = o.value),
            o.key === "store_data" && (a.storeData = o.value),
            o.key === "instagram" && (a.instagram = o.value));
        }),
        a
      );
    } catch {
      return { seoSettings: {}, storeData: {}, instagram: null };
    }
  },
  head: ({ loaderData: t }) => {
    const a = t?.seoSettings || {},
      o = t?.storeData || {},
      n = o.store_name || "Nicoly Modas",
      c =
        a.site_description ||
        o.store_description ||
        "Vestidos, blusas e conjuntos selecionados. Estilo feminino, elegante e atemporal.";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: a.site_title || `${n} — Moda Feminina Premium` },
        { name: "description", content: c },
        { name: "keywords", content: a.site_keywords || "moda, feminina, boutique, vestidos" },
        { property: "og:title", content: a.site_title || n },
        { property: "og:description", content: c },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "icon", href: o.store_favicon_url || "/favicon.ico" },
        { rel: "stylesheet", href: te },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
        },
      ],
      scripts: a.google_analytics_id
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${a.google_analytics_id}`,
              async: !0,
            },
            {
              children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${a.google_analytics_id}');
          `,
            },
          ]
        : [],
    };
  },
  shellComponent: le,
  component: me,
  notFoundComponent: ce,
  errorComponent: de,
});
function le({ children: t }) {
  return e.jsxs("html", {
    lang: "pt-BR",
    children: [
      e.jsx("head", { children: e.jsx(z, {}) }),
      e.jsxs("body", { children: [t, e.jsx(D, {})] }),
    ],
  });
}
function me() {
  const { queryClient: t } = l.useRouteContext(),
    a = k(),
    o = F({ select: (n) => n.location.pathname }).startsWith("/admin");
  return (
    j.useEffect(() => {
      const { data: n } = y.auth.onAuthStateChange(() => {
        (a.invalidate(), t.invalidateQueries());
      });
      return () => n.subscription.unsubscribe();
    }, [a, t]),
    e.jsxs($, {
      client: t,
      children: [
        !o && e.jsx(ne, {}),
        e.jsx("main", { className: "min-h-[60vh]", children: e.jsx(W, {}) }),
        !o && e.jsx(re, {}),
        !o && e.jsx(ie, {}),
        e.jsx(se, {}),
      ],
    })
  );
}
const pe = () => import("./recuperar-senha-DNeeqcbJ.mjs"),
  ue = i("/recuperar-senha")({ component: s(pe, "component") }),
  he = () => import("./loja-rcz3FYWg.mjs"),
  ge = X({ cat: ee().optional(), page: Z().optional().catch(1) }),
  xe = i("/loja")({
    validateSearch: ge,
    component: s(he, "component"),
    head: () => ({
      meta: [
        { title: "Loja — Nicoly Modas" },
        {
          name: "description",
          content: "Catálogo completo Nicoly Modas: vestidos, blusas, saias, conjuntos e mais.",
        },
      ],
    }),
  }),
  fe = () => import("./login-CFhg-kDP.mjs"),
  be = i("/login")({ component: s(fe, "component") }),
  je = () => import("./checkout-DJw5qSEb.mjs"),
  ye = i("/checkout")({ component: s(je, "component") }),
  we = () => import("./carrinho-CJpjoWPg.mjs"),
  ve = i("/carrinho")({ component: s(we, "component") }),
  Ne = () => import("./atualizar-senha-B1kHIpZH.mjs"),
  Re = i("/atualizar-senha")({ component: s(Ne, "component") }),
  Ce = () => import("./admin-B7qlzLxs.mjs"),
  _e = i("/admin")({ component: s(Ce, "component") }),
  Pe = () => import("./index-BOGP_2cx.mjs"),
  ke = i("/")({ component: s(Pe, "component") }),
  Se = () => import("./checkout.index-DyzSaHWy.mjs"),
  Ae = i("/checkout/")({ component: s(Se, "component") }),
  Oe = () => import("./admin.index-CBG15FrO.mjs").then((t) => t.d),
  Te = i("/admin/")({ component: s(Oe, "component") }),
  Me = () => import("./produto._slug-kJIsTuvZ.mjs"),
  $e = i("/produto/$slug")({
    component: s(Me, "component"),
    head: ({ params: t }) => ({
      meta: [
        { title: "Produto — Nicoly Modas" },
        {
          name: "description",
          content: "Compre este produto incrível na Nicoly Modas. Moda feminina premium.",
        },
      ],
    }),
  }),
  Ee = () => import("./pedido._id-CFPWdCGE.mjs"),
  Ie = i("/pedido/$id")({ component: s(Ee, "component") }),
  ze = () => import("./minha-conta.pedidos-ZCvfv_Lj.mjs"),
  De = i("/minha-conta/pedidos")({ component: s(ze, "component") }),
  Fe = () => import("./auth.callback-hpwGsYSN.mjs"),
  We = i("/auth/callback")({ component: s(Fe, "component") }),
  Le = () => import("./admin.produtos-Lsg6F1Uw.mjs"),
  qe = i("/admin/produtos")({ component: s(Le, "component") }),
  Be = () => import("./admin.pedidos-C_uSxr9X.mjs"),
  Je = i("/admin/pedidos")({ component: s(Be, "component") }),
  He = () => import("./admin.frete-CDlErrnV.mjs"),
  Ue = i("/admin/frete")({ component: s(He, "component") }),
  Ge = () => import("./admin.configuracoes-DYIz59EU.mjs"),
  Ke = i("/admin/configuracoes")({ component: s(Ge, "component") }),
  Qe = () => import("./admin.colecoes-dhs4ErQ6.mjs"),
  Ve = i("/admin/colecoes")({ component: s(Qe, "component") }),
  Ye = () => import("./admin.categorias-home-CkNnTCOC.mjs"),
  Xe = i("/admin/categorias-home")({ component: s(Ye, "component") }),
  Ze = () => import("./admin.banners-Gth41GfL.mjs"),
  et = i("/admin/banners")({ component: s(Ze, "component") }),
  tt = () => import("./admin.avaliacoes-Yjt3JLDj.mjs"),
  ot = i("/admin/avaliacoes")({ component: s(tt, "component") }),
  at = () => import("./admin.anuncio-Du0G-Iux.mjs"),
  nt = i("/admin/anuncio")({ component: s(at, "component") }),
  rt = () => import("./admin.produtos.index-C-rAC_JN.mjs"),
  st = i("/admin/produtos/")({ component: s(rt, "component") }),
  it = () => import("./checkout.pagamento._orderId-_4tA4S88.mjs"),
  ct = i("/checkout/pagamento/$orderId")({ component: s(it, "component") });
async function dt(t, a, o) {
  try {
    if (!a || !o) return !1;
    const n = new TextEncoder(),
      c = await crypto.subtle.importKey("raw", n.encode(o), { name: "HMAC", hash: "SHA-256" }, !1, [
        "sign",
      ]),
      r = await crypto.subtle.sign("HMAC", c, n.encode(t)),
      m = lt(r);
    return a.length !== m.length ? !1 : mt(a, m);
  } catch (n) {
    return (console.error("Erro ao verificar assinatura do webhook:", n), !1);
  }
}
function lt(t) {
  const a = new Uint8Array(t);
  return Array.from(a)
    .map((o) => o.toString(16).padStart(2, "0"))
    .join("");
}
function mt(t, a) {
  let o = 0;
  const n = Math.max(t.length, a.length);
  for (let c = 0; c < n; c++) o |= (t.charCodeAt(c) || 0) ^ (a.charCodeAt(c) || 0);
  return o === 0;
}
const pt = i("/api/mercadopago/webhook")({
    loader: async (t) => {
      const a = t.request,
        o = process.env.MP_WEBHOOK_SECRET;
      if (a.method !== "POST")
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
          status: 405,
          headers: { "Content-Type": "application/json" },
        });
      if (!o)
        return (
          console.error("[Webhook MP] MP_WEBHOOK_SECRET não configurado"),
          new Response(JSON.stringify({ error: "Webhook secret não configurado" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      const n = a.headers.get("x-signature"),
        c = await a.text();
      if (
        (console.log("[Webhook MP] Recebido:", {
          action: JSON.parse(c || "{}").action,
          signature: n ? "presente" : "ausente",
        }),
        !n || !(await dt(c, n, o)))
      )
        return (
          console.warn("[Webhook MP] Assinatura inválida recebida"),
          new Response(JSON.stringify({ error: "Assinatura inválida" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          })
        );
      try {
        const r = JSON.parse(c);
        if (r.action !== "payment.created" && r.action !== "payment.updated")
          return new Response(JSON.stringify({ message: "Evento ignorado" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        const m = r.data?.id;
        if (!m)
          return new Response(JSON.stringify({ error: "ID do pagamento não encontrado" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        const p = process.env.MP_ACCESS_TOKEN;
        if (!p) throw new Error("MP_ACCESS_TOKEN não configurado");
        const u = await fetch(`https://api.mercadopago.com/v1/payments/${m}`, {
          headers: { Authorization: `Bearer ${p}`, "Content-Type": "application/json" },
        });
        if (!u.ok) {
          const T = await u.text();
          throw new Error(`Erro ao consultar pagamento: ${u.status} - ${T}`);
        }
        const d = await u.json(),
          f = d.external_reference;
        if (!f)
          return new Response(JSON.stringify({ error: "external_reference não encontrado" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        const { data: g, error: R } = await G.from("orders")
          .select("id, payment_status, transaction_id, status")
          .eq("id", f)
          .maybeSingle();
        if (R) throw R;
        if (!g)
          return new Response(JSON.stringify({ error: "Pedido não encontrado" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        if (
          g.transaction_id &&
          g.transaction_id === String(d.id) &&
          g.payment_status === J(d.status)
        )
          return (
            console.log(`[Webhook MP] Pagamento ${d.id} já processado (idempotente)`),
            new Response(
              JSON.stringify({
                success: !0,
                message: "Pagamento já processado (idempotente)",
                orderId: g.id,
              }),
              { status: 200, headers: { "Content-Type": "application/json" } },
            )
          );
        const { processPaymentUpdate: O } = await import("./webhook.functions-TX6PVBUO.mjs"),
          oo = await O(d, g.id);
        return (
          console.log(`[Webhook MP] Pedido ${g.id} atualizado: ${d.status}`),
          new Response(
            JSON.stringify({
              success: !0,
              message: `Pagamento ${d.status} processado.`,
              orderId: g.id,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          )
        );
      } catch (r) {
        return (
          console.error("[Webhook MP] Erro:", r),
          new Response(JSON.stringify({ error: "Erro interno no servidor" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      }
    },
  }),
  ut = () => import("./admin.produtos.novo-Bw0MxNnl.mjs"),
  ht = i("/admin/produtos/novo")({ component: s(ut, "component") }),
  gt = () => import("./admin.produtos._id-D8El9jaI.mjs"),
  xt = i("/admin/produtos/$id")({ component: s(gt, "component") }),
  ft = () => import("./admin.pedidos._id-CZCHZcEP.mjs"),
  bt = () => import("./admin.pedidos._id-CekZD7EA.mjs"),
  jt = i("/admin/pedidos/$id")({
    component: s(bt, "component"),
    errorComponent: s(ft, "errorComponent"),
  }),
  yt = ue.update({ id: "/recuperar-senha", path: "/recuperar-senha", getParentRoute: () => l }),
  wt = xe.update({ id: "/loja", path: "/loja", getParentRoute: () => l }),
  vt = be.update({ id: "/login", path: "/login", getParentRoute: () => l }),
  N = ye.update({ id: "/checkout", path: "/checkout", getParentRoute: () => l }),
  Nt = ve.update({ id: "/carrinho", path: "/carrinho", getParentRoute: () => l }),
  Rt = Re.update({ id: "/atualizar-senha", path: "/atualizar-senha", getParentRoute: () => l }),
  x = _e.update({ id: "/admin", path: "/admin", getParentRoute: () => l }),
  Ct = ke.update({ id: "/", path: "/", getParentRoute: () => l }),
  _t = Ae.update({ id: "/", path: "/", getParentRoute: () => N }),
  Pt = Te.update({ id: "/", path: "/", getParentRoute: () => x }),
  kt = $e.update({ id: "/produto/$slug", path: "/produto/$slug", getParentRoute: () => l }),
  St = Ie.update({ id: "/pedido/$id", path: "/pedido/$id", getParentRoute: () => l }),
  At = De.update({
    id: "/minha-conta/pedidos",
    path: "/minha-conta/pedidos",
    getParentRoute: () => l,
  }),
  Ot = We.update({ id: "/auth/callback", path: "/auth/callback", getParentRoute: () => l }),
  w = qe.update({ id: "/produtos", path: "/produtos", getParentRoute: () => x }),
  A = Je.update({ id: "/pedidos", path: "/pedidos", getParentRoute: () => x }),
  Tt = Ue.update({ id: "/frete", path: "/frete", getParentRoute: () => x }),
  Mt = Ke.update({ id: "/configuracoes", path: "/configuracoes", getParentRoute: () => x }),
  $t = Ve.update({ id: "/colecoes", path: "/colecoes", getParentRoute: () => x }),
  Et = Xe.update({ id: "/categorias-home", path: "/categorias-home", getParentRoute: () => x }),
  It = et.update({ id: "/banners", path: "/banners", getParentRoute: () => x }),
  zt = ot.update({ id: "/avaliacoes", path: "/avaliacoes", getParentRoute: () => x }),
  Dt = nt.update({ id: "/anuncio", path: "/anuncio", getParentRoute: () => x }),
  Ft = st.update({ id: "/", path: "/", getParentRoute: () => w }),
  Wt = ct.update({
    id: "/pagamento/$orderId",
    path: "/pagamento/$orderId",
    getParentRoute: () => N,
  }),
  Lt = pt.update({
    id: "/api/mercadopago/webhook",
    path: "/api/mercadopago/webhook",
    getParentRoute: () => l,
  }),
  qt = ht.update({ id: "/novo", path: "/novo", getParentRoute: () => w }),
  Bt = xt.update({ id: "/$id", path: "/$id", getParentRoute: () => w }),
  Jt = jt.update({ id: "/$id", path: "/$id", getParentRoute: () => A }),
  Ht = { AdminPedidosIdRoute: Jt },
  Ut = A._addFileChildren(Ht),
  Gt = { AdminProdutosIdRoute: Bt, AdminProdutosNovoRoute: qt, AdminProdutosIndexRoute: Ft },
  Kt = w._addFileChildren(Gt),
  Qt = {
    AdminAnuncioRoute: Dt,
    AdminAvaliacoesRoute: zt,
    AdminBannersRoute: It,
    AdminCategoriasHomeRoute: Et,
    AdminColecoesRoute: $t,
    AdminConfiguracoesRoute: Mt,
    AdminFreteRoute: Tt,
    AdminPedidosRoute: Ut,
    AdminProdutosRoute: Kt,
    AdminIndexRoute: Pt,
  },
  Vt = x._addFileChildren(Qt),
  Yt = { CheckoutIndexRoute: _t, CheckoutPagamentoOrderIdRoute: Wt },
  Xt = N._addFileChildren(Yt),
  Zt = {
    IndexRoute: Ct,
    AdminRoute: Vt,
    AtualizarSenhaRoute: Rt,
    CarrinhoRoute: Nt,
    CheckoutRoute: Xt,
    LoginRoute: vt,
    LojaRoute: wt,
    RecuperarSenhaRoute: yt,
    AuthCallbackRoute: Ot,
    MinhaContaPedidosRoute: At,
    PedidoIdRoute: St,
    ProdutoSlugRoute: kt,
    ApiMercadopagoWebhookRoute: Lt,
  },
  eo = l._addFileChildren(Zt)._addFileTypes(),
  to = () => {
    const t = new M({
      defaultOptions: {
        queries: { staleTime: 3e5, gcTime: 18e5, refetchOnWindowFocus: !1, refetchOnReconnect: !1 },
      },
    });
    return E({
      routeTree: eo,
      context: { queryClient: t },
      scrollRestoration: !0,
      defaultPreloadStaleTime: 0,
    });
  },
  Bo = Object.freeze(
    Object.defineProperty({ __proto__: null, getRouter: to }, Symbol.toStringTag, {
      value: "Module",
    }),
  );
export { xe as R, $e as a, Ie as b, ct as c, xt as d, jt as e, oe as f, Bo as r, ae as u, dt as v };
