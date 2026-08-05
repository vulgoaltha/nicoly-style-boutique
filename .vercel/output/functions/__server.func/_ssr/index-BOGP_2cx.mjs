import { j as e, r as c } from "../_libs/react.mjs";
import { L as f } from "../_libs/tanstack__react-router.mjs";
import { a as x } from "../_libs/tanstack__react-query.mjs";
import {
  a8 as F,
  $ as S,
  X as A,
  j as g,
  k as j,
  ah as E,
  Z as z,
  a1 as P,
  V as L,
  _ as T,
  M as $,
} from "../_libs/lucide-react.mjs";
import { p as h } from "./client-DbGX8m2J.mjs";
import { v as I } from "./ProductCard-CmizTyZk.mjs";
import { c as K } from "./skeleton-C6nji2Jz.mjs";
import { L as _ } from "./OptimizedImage-B1MobQs0.mjs";
import { u as O } from "../_libs/embla-carousel-react.mjs";
import { A as R, m as v } from "../_libs/framer-motion.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./format-W46puzMN.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/embla-carousel-reactive-utils.mjs";
import "../_libs/embla-carousel.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const N = "/assets/hero-gNsUYzAt.jpg",
  B = [
    {
      id: "fallback",
      title: "Elegância que veste você.",
      subtitle: "Peças selecionadas para mulheres que se vestem com intenção.",
      image_url: N,
      button_text: "Explorar coleção",
      button_link: "/loja",
    },
    {
      id: "fallback-2",
      title: "Nova Coleção Primavera.",
      subtitle: "Cores e texturas para renovar seu guarda-roupa.",
      image_url: N,
      button_text: "Ver novidades",
      button_link: "/loja",
    },
  ];
function W() {
  const { data: s, isLoading: r } = x({
      queryKey: ["hero-banners"],
      queryFn: async () => {
        const { data: l, error: i } = await h
          .from("hero_banners")
          .select("id,title,subtitle,image_url,button_text,button_link")
          .eq("active", !0)
          .order("order_position");
        if (i) throw i;
        return l;
      },
      staleTime: 3e5,
      gcTime: 18e5,
      refetchOnWindowFocus: !1,
      refetchOnReconnect: !1,
    }),
    a = s && s.length ? s : B,
    [t, o] = c.useState(0),
    [b, p] = c.useState(1);
  if (
    (c.useEffect(() => {
      if (a.length < 2) return;
      const l = setInterval(() => {
        (p(1), o((i) => (i + 1) % a.length));
      }, 6e3);
      return () => clearInterval(l);
    }, [a.length]),
    r)
  )
    return e.jsx(K, { className: "h-[55vw] min-h-[300px] max-h-[85vh] w-full rounded-none" });
  const n = a[t],
    u = (l) => {
      (p(l), o((i) => (i + l + a.length) % a.length));
    };
  return e.jsx("section", {
    className: "relative overflow-hidden bg-blush-soft",
    children: e.jsxs("div", {
      className:
        "relative w-full aspect-[3/4] sm:aspect-video lg:h-[78vh] lg:min-h-[560px] lg:max-h-[900px]",
      children: [
        e.jsx(R, {
          initial: !1,
          custom: b,
          children: e.jsxs(
            v.div,
            {
              custom: b,
              variants: {
                enter: (l) => ({ x: l > 0 ? "100%" : "-100%", opacity: 1 }),
                center: { x: "0%", opacity: 1 },
                exit: (l) => ({ x: l > 0 ? "-100%" : "100%", opacity: 1 }),
              },
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
              className: "absolute inset-0",
              children: [
                e.jsx(_, {
                  src: n.image_url,
                  alt: n.title,
                  containerClassName: "h-full w-full",
                  className: "h-full w-full object-cover",
                }),
                e.jsx("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
                }),
                e.jsx("div", {
                  className:
                    "absolute inset-0 flex flex-col items-start justify-end z-10 container-editorial pb-10 sm:pb-14 lg:pb-20",
                  children: e.jsxs(
                    v.div,
                    {
                      initial: { opacity: 0, y: 16 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.3, duration: 0.6 },
                      className: "max-w-xl",
                      children: [
                        e.jsx("h2", {
                          className:
                            "font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight",
                          children: n.title,
                        }),
                        n.subtitle &&
                          e.jsx("p", {
                            className: "mt-2 sm:mt-3 text-sm sm:text-base text-white/80 max-w-sm",
                            children: n.subtitle,
                          }),
                        n.button_link &&
                          n.button_text &&
                          e.jsx("a", {
                            href: n.button_link,
                            className:
                              "mt-5 sm:mt-6 inline-flex items-center gap-2 bg-white text-foreground text-xs tracking-editorial uppercase px-6 py-3 rounded-sm hover:bg-blush-soft transition font-medium",
                            children: n.button_text,
                          }),
                      ],
                    },
                    n.id + "-text",
                  ),
                }),
              ],
            },
            n.id,
          ),
        }),
        a.length > 1 &&
          e.jsxs(e.Fragment, {
            children: [
              e.jsx("button", {
                onClick: () => u(-1),
                "aria-label": "Banner anterior",
                className:
                  "absolute z-20 left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background backdrop-blur p-2 sm:p-2.5 rounded-full transition flex",
                children: e.jsx(g, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
              }),
              e.jsx("button", {
                onClick: () => u(1),
                "aria-label": "Próximo banner",
                className:
                  "absolute z-20 right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background backdrop-blur p-2 sm:p-2.5 rounded-full transition flex",
                children: e.jsx(j, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
              }),
              e.jsx("div", {
                className:
                  "absolute z-20 bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2",
                children: a.map((l, i) =>
                  e.jsx(
                    "button",
                    {
                      onClick: () => {
                        (p(i > t ? 1 : -1), o(i));
                      },
                      "aria-label": `Banner ${i + 1}`,
                      className: `h-1.5 rounded-full transition-all ${i === t ? "w-8 bg-white" : "w-1.5 bg-white/50"}`,
                    },
                    i,
                  ),
                ),
              }),
            ],
          }),
      ],
    }),
  });
}
const y = {
  text: "5% de desconto na primeira compra!",
  bg_color: "#f4d6d6",
  text_color: "#3a1f1f",
  active: !0,
  speed: 30,
};
function w() {
  const { data: s } = x({
      queryKey: ["site-setting", "announcement_bar"],
      queryFn: async () => {
        const { data: t } = await h
          .from("site_settings")
          .select("value")
          .eq("key", "announcement_bar")
          .maybeSingle();
        return { ...y, ...(t?.value ?? {}) };
      },
    }),
    r = s ?? y;
  if (!r.active || !r.text) return null;
  const a = Array.from({ length: 12 });
  return e.jsxs("div", {
    className: "overflow-hidden border-y border-black/5",
    style: { backgroundColor: r.bg_color, color: r.text_color },
    "aria-label": "Anúncio",
    children: [
      e.jsx("div", {
        className: "flex whitespace-nowrap py-2.5",
        style: { animation: `marquee ${r.speed}s linear infinite`, width: "max-content" },
        children: a.map((t, o) =>
          e.jsxs(
            "span",
            {
              className:
                "px-8 text-xs tracking-editorial uppercase font-medium inline-flex items-center",
              children: [r.text, e.jsx("span", { className: "mx-4 opacity-50", children: "✦" })],
            },
            o,
          ),
        ),
      }),
      e.jsx("style", {
        children: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `,
      }),
    ],
  });
}
function M({ name: s }) {
  const r = E[s] ?? z;
  return e.jsx(r, { className: "h-7 w-7", strokeWidth: 1.5 });
}
function V() {
  const { data: s = [] } = x({
      queryKey: ["homepage-categories"],
      queryFn: async () => {
        const { data: t, error: o } = await h
          .from("homepage_categories")
          .select("id,title,icon,color,slug")
          .eq("active", !0)
          .order("order_position");
        if (o) throw o;
        return t;
      },
    }),
    r = c.useRef(null);
  if (!s.length) return null;
  const a = (t) => r.current?.scrollBy({ left: t * 320, behavior: "smooth" });
  return e.jsxs("section", {
    className: "container-editorial my-10 md:my-14",
    children: [
      e.jsxs("div", {
        className: "flex items-end justify-between mb-5 md:mb-6",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("span", {
                className: "text-xs tracking-editorial uppercase text-blush-deep",
                children: "Categorias",
              }),
              e.jsx("h2", {
                className: "font-display text-2xl md:text-3xl mt-1",
                children: "Compre por estilo",
              }),
            ],
          }),
          e.jsxs("div", {
            className: "hidden md:flex gap-2",
            children: [
              e.jsx("button", {
                onClick: () => a(-1),
                className: "p-2 border border-border rounded-full hover:bg-secondary",
                "aria-label": "Anterior",
                children: e.jsx(g, { className: "h-4 w-4" }),
              }),
              e.jsx("button", {
                onClick: () => a(1),
                className: "p-2 border border-border rounded-full hover:bg-secondary",
                "aria-label": "Próximo",
                children: e.jsx(j, { className: "h-4 w-4" }),
              }),
            ],
          }),
        ],
      }),
      e.jsx("div", {
        ref: r,
        className:
          "flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 scrollbar-hide md:justify-center justify-start items-start",
        style: { scrollbarWidth: "none" },
        children: s.map((t) =>
          e.jsxs(
            f,
            {
              to: "/loja",
              search: { cat: t.slug },
              className: "snap-start shrink-0 w-24 md:w-28 text-center group",
              children: [
                e.jsx("div", {
                  className:
                    "mx-auto h-20 w-20 md:h-24 md:w-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg",
                  style: { backgroundColor: t.color },
                  children: t.icon.startsWith("http")
                    ? e.jsx("img", {
                        src: t.icon,
                        alt: t.title,
                        className: "h-full w-full rounded-full object-cover",
                      })
                    : e.jsx(M, { name: t.icon }),
                }),
                e.jsx("div", {
                  className: "mt-3 text-xs tracking-editorial uppercase",
                  children: t.title,
                }),
              ],
            },
            t.id,
          ),
        ),
      }),
    ],
  });
}
function X() {
  const { data: s = [] } = x({
    queryKey: ["homepage-collections"],
    queryFn: async () => {
      const { data: r, error: a } = await h
        .from("homepage_collections")
        .select("id,title,subtitle,image_url,redirect_url")
        .eq("active", !0)
        .order("order_position");
      if (a) throw a;
      return r;
    },
    staleTime: 3e5,
    gcTime: 18e5,
    refetchOnWindowFocus: !1,
    refetchOnReconnect: !1,
  });
  return s.length
    ? e.jsxs("section", {
        className: "container-editorial my-20",
        children: [
          e.jsxs("div", {
            className: "mb-10 text-center",
            children: [
              e.jsx("span", {
                className: "text-xs tracking-editorial uppercase text-blush-deep",
                children: "Coleções",
              }),
              e.jsx("h2", {
                className: "font-display text-4xl mt-2",
                children: "Inspirações da estação",
              }),
            ],
          }),
          e.jsx("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            children: s.map((r) =>
              e.jsxs(
                f,
                {
                  to: r.redirect_url ?? "/loja",
                  className:
                    "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blush rounded-3xl",
                  children: [
                    e.jsxs("div", {
                      className:
                        "relative overflow-hidden rounded-3xl shadow-md bg-gradient-to-br from-gray-50 to-gray-200 aspect-[2/1] transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-lg",
                      children: [
                        e.jsxs("div", {
                          className:
                            "absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none select-none",
                          children: [
                            e.jsx("span", {
                              className:
                                "text-[11px] tracking-[0.25em] uppercase text-[#FF4D94] font-bold mb-1",
                              children: "COLEÇÃO",
                            }),
                            e.jsx("span", {
                              className:
                                "font-display italic text-[#1a1a1a]/10 text-3xl sm:text-4xl md:text-5xl leading-none text-center",
                              style: {
                                fontFamily:
                                  "'Cormorant Garamond', 'Dancing Script', cursive, serif",
                              },
                              children: r.title,
                            }),
                          ],
                        }),
                        e.jsx(_, {
                          src: r.image_url,
                          alt: r.title,
                          containerClassName: "absolute inset-0 h-full w-full",
                          className:
                            "h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 z-10",
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "mt-4 text-center",
                      children: [
                        r.subtitle &&
                          e.jsx("span", {
                            className:
                              "text-[10px] tracking-[0.2em] uppercase text-[#FF4D94] block mb-1",
                            children: r.subtitle,
                          }),
                        e.jsx("h3", {
                          className: "font-display text-lg text-[#1a1a1a] leading-tight",
                          children: r.title,
                        }),
                      ],
                    }),
                  ],
                },
                r.id,
              ),
            ),
          }),
        ],
      })
    : null;
}
function q({ rating: s, size: r = 14 }) {
  return e.jsx("div", {
    className: "flex gap-0.5",
    children: Array.from({ length: 5 }).map((a, t) =>
      e.jsx(
        P,
        {
          style: { width: r, height: r },
          className: t < s ? "fill-amber-400 text-amber-400" : "fill-border text-border",
        },
        t,
      ),
    ),
  });
}
function D({ review: s }) {
  return e.jsx("div", {
    className: "min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3",
    children: e.jsxs("div", {
      className:
        "relative bg-background border border-border rounded-sm p-6 h-full flex flex-col gap-4 group hover:border-blush/60 hover:shadow-md transition-all duration-300",
      children: [
        e.jsx(L, { className: "h-6 w-6 text-blush/40 absolute top-5 right-5" }),
        e.jsx(q, { rating: s.rating, size: 15 }),
        e.jsxs("p", {
          className: "text-sm text-foreground/80 leading-relaxed flex-1 line-clamp-5 italic",
          children: ['"', s.comment, '"'],
        }),
        s.product &&
          e.jsxs("div", {
            className:
              "flex items-center gap-1.5 text-[11px] text-blush-deep tracking-wide uppercase border border-blush/30 rounded-sm px-2 py-1 w-fit bg-blush-soft",
            children: [
              e.jsx(T, { className: "h-3 w-3" }),
              e.jsx("span", { className: "truncate max-w-[180px]", children: s.product.name }),
            ],
          }),
        e.jsxs("div", {
          className: "flex items-center gap-3 pt-2 border-t border-border",
          children: [
            s.customer_photo
              ? e.jsx("img", {
                  src: s.customer_photo,
                  alt: s.customer_name,
                  className: "w-9 h-9 rounded-full object-cover border border-border",
                })
              : e.jsx("div", {
                  className:
                    "w-9 h-9 rounded-full bg-blush-soft border border-blush/30 flex items-center justify-center text-blush font-display text-sm font-semibold select-none",
                  children: s.customer_name.charAt(0).toUpperCase(),
                }),
            e.jsxs("div", {
              className: "min-w-0",
              children: [
                e.jsx("p", {
                  className: "text-sm font-medium truncate",
                  children: s.customer_name,
                }),
                s.city &&
                  e.jsxs("p", {
                    className: "text-[11px] text-muted-foreground flex items-center gap-1 truncate",
                    children: [
                      e.jsx($, { className: "h-2.5 w-2.5" }),
                      s.city,
                      s.state ? `, ${s.state}` : "",
                    ],
                  }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Q() {
  const { data: s = [], isLoading: r } = x({
      queryKey: ["public-reviews"],
      queryFn: async () => {
        const { data: d, error: m } = await h
          .from("customer_reviews")
          .select("*, product:products(name, images)")
          .eq("approved", !0)
          .order("created_at", { ascending: !1 })
          .limit(20);
        if (m) throw m;
        return d;
      },
    }),
    [a, t] = O({ loop: !0, align: "start", slidesToScroll: 1 }),
    [o, b] = c.useState(0),
    [p, n] = c.useState([]),
    u = c.useRef(null),
    l = c.useCallback(() => {
      (u.current && clearInterval(u.current),
        (u.current = setInterval(() => {
          t && t.scrollNext();
        }, 4500)));
    }, [t]),
    i = c.useCallback(() => {
      u.current && clearInterval(u.current);
    }, []);
  c.useEffect(() => {
    if (t)
      return (
        n(t.scrollSnapList()),
        t.on("select", () => b(t.selectedScrollSnap())),
        l(),
        () => i()
      );
  }, [t, l, i]);
  const C = s.length ? (s.reduce((d, m) => d + m.rating, 0) / s.length).toFixed(1) : "0.0";
  return r
    ? e.jsx("section", {
        className: "container-editorial my-20",
        children: e.jsxs("div", {
          className: "animate-pulse space-y-4",
          children: [
            e.jsx("div", { className: "h-8 w-48 bg-secondary rounded" }),
            e.jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
              children: [1, 2, 3].map((d) =>
                e.jsx("div", { className: "h-56 bg-secondary rounded-sm" }, d),
              ),
            }),
          ],
        }),
      })
    : s.length
      ? e.jsx("section", {
          className: "my-20 bg-blush-soft/30 border-y border-border py-16",
          children: e.jsxs("div", {
            className: "container-editorial",
            children: [
              e.jsxs("div", {
                className: "flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("span", {
                        className: "text-xs tracking-editorial uppercase text-blush-deep",
                        children: "O que dizem sobre nós",
                      }),
                      e.jsx("h2", {
                        className: "font-display text-4xl mt-1",
                        children: "Avaliações",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "flex items-center gap-3 bg-background border border-border rounded-sm px-5 py-3 shadow-sm w-fit",
                    children: [
                      e.jsxs("div", {
                        children: [
                          e.jsx(q, { rating: 5, size: 16 }),
                          e.jsxs("div", {
                            className: "flex items-baseline gap-1.5 mt-1",
                            children: [
                              e.jsx("span", {
                                className: "font-display text-2xl leading-none",
                                children: C,
                              }),
                              e.jsx("span", {
                                className: "text-xs text-muted-foreground",
                                children: "/5",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "border-l border-border pl-3",
                        children: [
                          e.jsx("p", {
                            className: "text-lg font-semibold leading-none",
                            children: s.length,
                          }),
                          e.jsx("p", {
                            className:
                              "text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide",
                            children: "avaliações",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx("div", {
                className: "overflow-hidden cursor-grab active:cursor-grabbing",
                ref: a,
                onMouseEnter: i,
                onMouseLeave: l,
                children: e.jsx("div", {
                  className: "flex -mx-3",
                  children: s.map((d) => e.jsx(D, { review: d }, d.id)),
                }),
              }),
              e.jsxs("div", {
                className: "flex items-center justify-between mt-8",
                children: [
                  e.jsx("div", {
                    className: "flex gap-1.5 flex-wrap",
                    children: p.map((d, m) =>
                      e.jsx(
                        "button",
                        {
                          onClick: () => t?.scrollTo(m),
                          "aria-label": `Avaliação ${m + 1}`,
                          className: `h-1.5 rounded-full transition-all duration-300 ${m === o ? "w-6 bg-blush" : "w-1.5 bg-border hover:bg-blush/50"}`,
                        },
                        m,
                      ),
                    ),
                  }),
                  e.jsxs("div", {
                    className: "flex gap-2",
                    children: [
                      e.jsx("button", {
                        onClick: () => {
                          (t?.scrollPrev(), l());
                        },
                        "aria-label": "Anterior",
                        className:
                          "w-9 h-9 rounded-full border border-border bg-background hover:bg-blush-soft hover:border-blush/50 flex items-center justify-center transition",
                        children: e.jsx(g, { className: "h-4 w-4" }),
                      }),
                      e.jsx("button", {
                        onClick: () => {
                          (t?.scrollNext(), l());
                        },
                        "aria-label": "Próximo",
                        className:
                          "w-9 h-9 rounded-full border border-border bg-background hover:bg-blush-soft hover:border-blush/50 flex items-center justify-center transition",
                        children: e.jsx(j, { className: "h-4 w-4" }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        })
      : null;
}
function Le() {
  const { data: s = [] } = x({
      queryKey: ["featured-products"],
      queryFn: async () => {
        const { data: a, error: t } = await h
          .from("products")
          .select("*")
          .eq("is_active", !0)
          .eq("is_featured", !0)
          .limit(8);
        if (t) throw t;
        return a;
      },
    }),
    { data: r = [] } = x({
      queryKey: ["new-products"],
      queryFn: async () => {
        const { data: a, error: t } = await h
          .from("products")
          .select("*")
          .eq("is_active", !0)
          .eq("is_new", !0)
          .order("created_at", { ascending: !1 })
          .limit(8);
        if (t) throw t;
        return a;
      },
    });
  return e.jsxs("div", {
    children: [
      e.jsx(w, {}),
      e.jsx(W, {}),
      e.jsx(w, {}),
      e.jsx("section", {
        className: "border-y border-border",
        children: e.jsx("div", {
          className:
            "container-editorial grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border",
          children: [
            { icon: F, t: "Frete para todo Brasil", s: "Envio rápido e rastreado" },
            { icon: S, t: "Curadoria exclusiva", s: "Peças selecionadas a dedo" },
            { icon: A, t: "Compra segura", s: "Troca em até 7 dias" },
          ].map((a) =>
            e.jsxs(
              "div",
              {
                className: "flex items-center gap-4 py-6 px-2",
                children: [
                  e.jsx(a.icon, { className: "h-5 w-5 text-blush" }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("div", { className: "text-sm font-medium", children: a.t }),
                      e.jsx("div", { className: "text-xs text-muted-foreground", children: a.s }),
                    ],
                  }),
                ],
              },
              a.t,
            ),
          ),
        }),
      }),
      e.jsx(V, {}),
      e.jsx(k, { title: "Novidades", subtitle: "Acabou de chegar", link: "/loja", products: r }),
      e.jsx(X, {}),
      e.jsx(k, {
        title: "Em destaque",
        subtitle: "Selecionados da coleção",
        link: "/loja",
        products: s,
      }),
      e.jsx(Q, {}),
    ],
  });
}
function k({ title: s, subtitle: r, link: a, products: t }) {
  return t.length
    ? e.jsxs("section", {
        className: "container-editorial my-20",
        children: [
          e.jsxs("div", {
            className: "flex items-end justify-between mb-8",
            children: [
              e.jsxs("div", {
                children: [
                  e.jsx("span", {
                    className: "text-xs tracking-editorial uppercase text-blush-deep",
                    children: r,
                  }),
                  e.jsx("h2", { className: "font-display text-4xl mt-1", children: s }),
                ],
              }),
              e.jsx(f, {
                to: a,
                className:
                  "text-xs tracking-editorial uppercase hover:text-blush transition hidden sm:block",
                children: "Ver tudo →",
              }),
            ],
          }),
          e.jsx("div", {
            className: "grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10",
            children: t.map((o) => e.jsx(I, { product: o }, o.id)),
          }),
        ],
      })
    : null;
}
export { Le as component };
