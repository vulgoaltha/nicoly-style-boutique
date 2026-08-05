import { AsyncLocalStorage as Ce } from "node:async_hooks";
import { H as Be, t as Je } from "../_libs/h3-v2.mjs";
import {
  k as Ge,
  M as We,
  N as Ee,
  q as Ye,
  r as Ke,
  H as L,
  c as Xe,
  A as j,
  C as Ze,
  L as B,
  n as Qe,
  P as et,
  O as tt,
  g as rt,
  f as nt,
  w as st,
  z as ie,
  G as Oe,
  j as ot,
  F as at,
  s as it,
  u as ct,
  E as Fe,
  J as ut,
} from "../_libs/tanstack__router-core.mjs";
import { i as lt, P as ce, s as ft } from "../_libs/seroval.mjs";
import { c as dt } from "../_libs/tanstack__history.mjs";
import { j as ke } from "../_libs/react.mjs";
import { r as pt, R as ht } from "../_libs/tanstack__react-router.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function mt(e) {
  return ke.jsx(ht, { router: e.router });
}
var yt = Ge(({ request: e, router: t, responseHeaders: r }) =>
    pt({ request: e, router: t, responseHeaders: r, children: ke.jsx(mt, { router: t }) }),
  ),
  X = Symbol.for("tanstack-start:event-storage"),
  Z = globalThis;
Z[X] || (Z[X] = new Ce());
var Te = Z[X];
function wt(e) {
  return typeof e.then == "function";
}
function ue(e) {
  const t = e;
  if (typeof t.getSetCookie == "function") return t.getSetCookie();
  const r = e.get("set-cookie");
  return r ? [r] : [];
}
function le(e, t) {
  if (e.ok) return;
  const r = ue(t.res.headers);
  if (r.length === 0) return;
  const n = ue(e.headers);
  e.headers.delete("set-cookie");
  for (const o of n) e.headers.append("set-cookie", o);
  for (const o of r) e.headers.append("set-cookie", o);
}
function gt(e, t) {
  return wt(e)
    ? e.then((r) => (r instanceof Response && le(r, t), r))
    : (e instanceof Response && le(e, t), e);
}
function vt(e) {
  return (t, r) => {
    let n;
    try {
      n = new Be(t);
    } catch (o) {
      if (o instanceof URIError)
        return new Response(null, { status: 400, statusText: "Bad Request" });
      throw o;
    }
    return Je(
      gt(
        Te.run({ h3Event: n }, () => e(t, r)),
        n,
      ),
      n,
    );
  };
}
function He() {
  const e = Te.getStore();
  if (!e)
    throw new Error(
      "No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.",
    );
  return e.h3Event;
}
function on() {
  return He().req;
}
function fe() {
  return He().res;
}
var St = { TSS_SHELL: "X-TSS_SHELL" };
async function xt(e) {
  const { tsrStartManifest: t } = await import("../_tanstack-start-manifest_v-S7KTgd_u.mjs"),
    r = t();
  let n = r.routes;
  n[tt];
  const o = {};
  for (const s in n) {
    const a = n[s],
      i = {};
    (a.preloads && a.preloads.length > 0 && (i.preloads = a.preloads),
      a.scripts && a.scripts.length > 0 && (i.scripts = a.scripts),
      a.css?.length && (i.css = a.css),
      (i.preloads || i.scripts || i.css) && (o[s] = i));
  }
  return {
    ...(r.scriptFormat ? { scriptFormat: r.scriptFormat } : {}),
    ...(r.inlineCss ? { inlineCss: r.inlineCss } : {}),
    routes: o,
  };
}
const bt = {
  "1bf69d3c1a6058a4a7765911aeb843fd7e1a6f19844c9e34d61c6081ea691d0e": {
    functionName: "mercadoPagoWebhook_createServerFn_handler",
    importer: () => import("./webhook.functions-C82xn_vj.mjs"),
  },
  "24845baa9707010499cb5fca2ef868bd1869348572dbde58367d6db3e114fa8f": {
    functionName: "createMelhorEnvioShipment_createServerFn_handler",
    importer: () => import("./melhorenvio.functions-lFRv6ZqB.mjs"),
  },
  "2cb2bf25ef7eb14883856fe11a435f51e26a27a5c8ef06d4e5367debee0b5352": {
    functionName: "calculateMelhorEnvioShipping_createServerFn_handler",
    importer: () => import("./melhorenvio.functions-lFRv6ZqB.mjs"),
  },
  "3d624754308a04384a32e50d428c9019c4bac362a542c73e345af95bfad2315e": {
    functionName: "processMercadoPagoPayment_createServerFn_handler",
    importer: () => import("./payment.functions-48pLE51T.mjs"),
  },
  "47aa3db2902e50554dab86c5c56caf482206ade4c565d183a3f30f7abc092f6e": {
    functionName: "updateOrderPaymentStatus_createServerFn_handler",
    importer: () => import("./payment.functions-48pLE51T.mjs"),
  },
  "66a7a583d7954e259db86e766c12221367dadb287ecd845cbfa1d00aeb190f5f": {
    functionName: "getPaymentStatus_createServerFn_handler",
    importer: () => import("./payment.functions-48pLE51T.mjs"),
  },
  "7f92d135aa3763ddd5bf6d4d9f84832b6b591cbaa35dcc4048b4b1beed8e7bf3": {
    functionName: "createOrder_createServerFn_handler",
    importer: () => import("./orders.functions-BepFxJqh.mjs"),
  },
  a6640d2650ecbc8ab0aea20c51673c9eb38e78d16be4211de43f7d9fca3e71cb: {
    functionName: "createPaymentPreference_createServerFn_handler",
    importer: () => import("./payment.functions-48pLE51T.mjs"),
  },
  bec8cd5a732eff302c89d7c75168a4ec0c29b6087b1e0f325a5d7b54cddfd027: {
    functionName: "checkAdminRole_createServerFn_handler",
    importer: () => import("./auth.functions-Cz_h8TaH.mjs"),
  },
  f56d0e1744b731038a3cdfabfc29f1d310cb7324ac7db44a506c6be0a2421074: {
    functionName: "calculateCorreiosShipping_createServerFn_handler",
    importer: () => import("./correios.functions-CrGblfto.mjs"),
  },
};
async function qe(e, t) {
  const r = bt[e];
  if (!r) throw new Error("Server function info not found for " + e);
  const n = r.module ?? (await r.importer());
  if (!n) throw new Error("Server function module not resolved for " + e);
  const o = n[r.functionName];
  if (!o) throw new Error("Server function module export not resolved for serverFn ID: " + e);
  return o;
}
var de = "__TSS_CONTEXT",
  pe = Symbol.for("TSS_SERVER_FUNCTION"),
  he = Symbol.for("TSS_SERVER_FUNCTION_FACTORY"),
  J = "x-tss-serialized",
  Rt = "x-tss-raw",
  Ct = "application/x-tss-framed",
  I = { JSON: 0, CHUNK: 1, END: 2, ERROR: 3 },
  me = 9,
  Et = `${Ct}; v=1`;
function Q(e) {
  return e !== "__proto__" && e !== "constructor" && e !== "prototype";
}
function k(e, t) {
  const r = Object.create(null);
  if (e) for (const n of Object.keys(e)) Q(n) && (r[n] = e[n]);
  if (t && typeof t == "object") for (const n of Object.keys(t)) Q(n) && (r[n] = t[n]);
  return r;
}
function P(e) {
  if (!e) return Object.create(null);
  const t = Object.create(null);
  for (const r of Object.keys(e)) Q(r) && (t[r] = e[r]);
  return t;
}
var ee = Symbol.for("tanstack-start:start-storage-context"),
  te = globalThis;
te[ee] || (te[ee] = new Ce());
var Me = te[ee];
async function ye(e, t) {
  return Me.run(e, t);
}
function _(e) {
  const t = Me.getStore();
  if (!t && e?.throwIfNotFound !== !1)
    throw new Error(
      "No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.",
    );
  return t;
}
var Ae = () => _().startOptions,
  Le = _,
  G = (e, t) => {
    const r = t || e || {};
    return (
      typeof r.method > "u" && (r.method = "GET"),
      Object.assign((n) => G(void 0, { ...r, ...n }), {
        options: r,
        middleware: (n) => {
          const o = [...(r.middleware || [])];
          n.map((a) => {
            he in a ? a.options.middleware && o.push(...a.options.middleware) : o.push(a);
          });
          const s = G(void 0, { ...r, middleware: o });
          return ((s[he] = !0), s);
        },
        inputValidator: (n) => G(void 0, { ...r, inputValidator: n }),
        handler: (...n) => {
          const [o, s] = n,
            a = { ...r, extractedFn: o, serverFn: s },
            i = [...(a.middleware || []), Ft(a)];
          return (
            (o.method = r.method),
            Object.assign(
              async (c) => {
                const u = await we(i, "client", {
                    ...o,
                    ...a,
                    data: c?.data,
                    headers: c?.headers,
                    signal: c?.signal,
                    fetch: c?.fetch,
                    context: P(),
                  }),
                  d = ut(u.error);
                if (d) throw d;
                if (u.error) throw u.error;
                return u.result;
              },
              {
                ...o,
                method: r.method,
                __executeServer: async (c) => {
                  const u = Le(),
                    d = u.contextAfterGlobalMiddlewares;
                  return await we(i, "server", {
                    ...o,
                    ...c,
                    serverFnMeta: o.serverFnMeta,
                    context: k(c.context, d),
                    request: u.request,
                  }).then((l) => ({ result: l.result, error: l.error, context: l.sendContext }));
                },
              },
            )
          );
        },
      })
    );
  };
async function we(e, t, r) {
  let n = N([...(Ae()?.functionMiddleware || []), ...e]);
  if (t === "server") {
    const s = Le({ throwIfNotFound: !1 });
    s?.executedRequestMiddlewares && (n = n.filter((a) => !s.executedRequestMiddlewares.has(a)));
  }
  const o = async (s) => {
    const a = n.shift();
    if (!a) return s;
    try {
      "inputValidator" in a.options &&
        a.options.inputValidator &&
        t === "server" &&
        (s.data = await Ot(a.options.inputValidator, s.data));
      let i;
      if (
        (t === "client"
          ? "client" in a.options && (i = a.options.client)
          : "server" in a.options && (i = a.options.server),
        i)
      ) {
        const c = await i({
          ...s,
          next: async (u = {}) => {
            const d = await o({
              ...s,
              ...u,
              context: k(s.context, u.context),
              sendContext: k(s.sendContext, u.sendContext),
              headers: Oe(s.headers, u.headers),
              _callSiteFetch: s._callSiteFetch,
              fetch: s._callSiteFetch ?? u.fetch ?? s.fetch,
              result: u.result !== void 0 ? u.result : u instanceof Response ? u : s.result,
              error: u.error ?? s.error,
            });
            if (d.error) throw d.error;
            return d;
          },
        });
        if (j(c)) return { ...s, error: c };
        if (c instanceof Response) return { ...s, result: c };
        if (!c)
          throw new Error(
            "User middleware returned undefined. You must call next() or return a result in your middlewares.",
          );
        return c;
      }
      return o(s);
    } catch (i) {
      return { ...s, error: i };
    }
  };
  return o({
    ...r,
    headers: r.headers || {},
    sendContext: r.sendContext || {},
    context: r.context || P(),
    _callSiteFetch: r.fetch,
  });
}
function N(e, t = 100) {
  const r = new Set(),
    n = [],
    o = (s, a) => {
      if (a > t)
        throw new Error(
          `Middleware nesting depth exceeded maximum of ${t}. Check for circular references.`,
        );
      s.forEach((i) => {
        (i.options.middleware && o(i.options.middleware, a + 1), r.has(i) || (r.add(i), n.push(i)));
      });
    };
  return (o(e, 0), n);
}
async function Ot(e, t) {
  if (e == null) return {};
  if ("~standard" in e) {
    const r = await e["~standard"].validate(t);
    if (r.issues) throw new Error(JSON.stringify(r.issues, void 0, 2));
    return r.value;
  }
  if ("parse" in e) return e.parse(t);
  if (typeof e == "function") return e(t);
  throw new Error("Invalid validator type!");
}
function Ft(e) {
  return {
    "~types": void 0,
    options: {
      inputValidator: e.inputValidator,
      client: async ({ next: t, sendContext: r, fetch: n, ...o }) => {
        const s = { ...o, context: r, fetch: n };
        return t(await e.extractedFn?.(s));
      },
      server: async ({ next: t, ...r }) => {
        const n = await e.serverFn?.(r);
        return t({ ...r, result: n });
      },
    },
  };
}
var A = (e, t) => {
    const r = { type: "request", ...(t || e) };
    return {
      options: r,
      middleware: (n) => A({}, Object.assign(r, { middleware: n })),
      inputValidator: (n) => A({}, Object.assign(r, { inputValidator: n })),
      client: (n) => A({}, Object.assign(r, { client: n })),
      server: (n) => A({}, Object.assign(r, { server: n })),
    };
  },
  kt = (e = {}) =>
    A().server(async (t) => {
      const r = t;
      return (e.filter && !(await e.filter(r))) || (await Ht(e, r)) ? t.next() : Lt(e, r);
    }),
  Tt = kt;
async function Ht(e, t) {
  const r = await qt(e, t);
  return r === !0 || (r === void 0 && e.allowRequestsWithoutOriginCheck === !0);
}
async function qt(e, t) {
  const r = t.request.headers.get("Sec-Fetch-Site");
  if (r !== null) return W(e.secFetchSite ?? "same-origin", r, t);
  const n = t.request.headers.get("Origin");
  if (n !== null) return e.origin ? W(e.origin, n, t) : n === new URL(t.request.url).origin;
  const o = t.request.headers.get("Referer");
  if (!(o === null || e.referer === !1)) {
    if (typeof e.referer == "function") return e.referer(o, t);
    if (e.origin) {
      const s = Mt(o);
      return s !== void 0 && W(e.origin, s, t);
    }
    return At(o, new URL(t.request.url).origin);
  }
}
async function W(e, t, r) {
  return typeof e == "function" ? e(t, r) : Array.isArray(e) ? e.includes(t) : t === e;
}
function Mt(e) {
  try {
    return new URL(e).origin;
  } catch {
    return;
  }
}
function At(e, t) {
  if (e === t) return !0;
  if (!e.startsWith(t)) return !1;
  if (e.length === t.length) return !0;
  const r = e.charCodeAt(t.length);
  return r === 47 || r === 63 || r === 35;
}
async function Lt(e, t) {
  return typeof e.failureResponse == "function"
    ? e.failureResponse(t)
    : (e.failureResponse?.clone() ?? new Response("Forbidden", { status: 403 }));
}
function Pt() {
  return [...(Ae()?.serializationAdapters?.map(at) ?? []), ...ot];
}
var Pe = new TextEncoder(),
  _t = new Uint8Array(0);
function $(e, t, r) {
  const n = new Uint8Array(me + r.length);
  return (
    (n[0] = e),
    (n[1] = (t >>> 24) & 255),
    (n[2] = (t >>> 16) & 255),
    (n[3] = (t >>> 8) & 255),
    (n[4] = t & 255),
    (n[5] = (r.length >>> 24) & 255),
    (n[6] = (r.length >>> 16) & 255),
    (n[7] = (r.length >>> 8) & 255),
    (n[8] = r.length & 255),
    n.set(r, me),
    n
  );
}
function Nt(e) {
  return $(I.JSON, 0, Pe.encode(e));
}
function jt(e, t) {
  return $(I.CHUNK, e, t);
}
function It(e) {
  return $(I.END, e, _t);
}
function $t(e, t) {
  const r = t instanceof Error ? t.message : String(t ?? "Unknown error");
  return $(I.ERROR, e, Pe.encode(r));
}
function Dt(e, t, r) {
  let n,
    o = !1;
  const s = [],
    a = (l) => {
      if (o) return !1;
      try {
        return (n.enqueue(l), !0);
      } catch {
        return !1;
      }
    },
    i = (l) => {
      if (!o) {
        o = !0;
        try {
          n.error(l);
        } catch {}
        for (const f of s) f.cancel().catch(() => {});
      }
    };
  async function c(l, f) {
    const p = f.getReader();
    s.push(p);
    try {
      for (; !o; ) {
        const { done: h, value: v } = await p.read();
        if (h) {
          a(It(l));
          return;
        }
        if (!a(jt(l, v))) return;
      }
    } catch (h) {
      a($t(l, h));
    } finally {
      p.releaseLock();
    }
  }
  async function u() {
    const l = e.getReader();
    s.push(l);
    try {
      for (; !o; ) {
        const { done: f, value: p } = await l.read();
        if (f || !a(Nt(p))) return;
      }
    } catch (f) {
      throw (i(f), f);
    } finally {
      l.releaseLock();
    }
  }
  async function d() {
    if (!r) return [];
    const l = [],
      f = r.getReader();
    s.push(f);
    try {
      for (; !o; ) {
        const { done: p, value: h } = await f.read();
        if (p) break;
        l.push(c(h.id, h.stream));
      }
    } finally {
      f.releaseLock();
    }
    return l;
  }
  return new ReadableStream({
    async start(l) {
      n = l;
      const f = [u()];
      for (const [p, h] of t) f.push(c(p, h));
      r && f.push(d());
      try {
        const p = (await Promise.all(f)).find(Array.isArray);
        if ((p && p.length > 0 && (await Promise.all(p)), !o))
          try {
            n.close();
          } catch {}
      } catch {}
    },
    cancel() {
      o = !0;
      for (const l of s) l.cancel().catch(() => {});
      s.length = 0;
    },
  });
}
var q = void 0,
  Ut = ["multipart/form-data", "application/x-www-form-urlencoded"],
  zt = 1e6,
  Vt = async ({ request: e, context: t, serverFnId: r }) => {
    const n = e.method.toUpperCase(),
      o = new URL(e.url),
      s = await qe(r);
    if (s.method && n !== s.method)
      return new Response(`expected ${s.method} method. Got ${n}`, {
        status: 405,
        headers: { Allow: s.method },
      });
    const a = e.headers.get("x-tsr-serverFn") === "true";
    q || (q = Pt());
    const i = e.headers.get("Content-Type");
    function c(u) {
      return ce(u, { plugins: q });
    }
    return await (async () => {
      try {
        let u = function (f) {
            let p;
            const h = fe();
            if (f !== void 0) {
              const v = new Map();
              let R = !0,
                m,
                b;
              const w = [],
                x = [
                  nt((g, y) => {
                    if (R) {
                      v.set(g, y);
                      return;
                    }
                    if (m) {
                      m.write({ id: g, stream: y }).catch(() => {});
                      return;
                    }
                    w.push({ id: g, stream: y });
                  }),
                  ...(q || []),
                ];
              let E = !1;
              const S = {
                onParse: (g) => {
                  p = g;
                },
                onDone: () => {
                  E = !0;
                },
                onError: (g) => {
                  throw g;
                },
              };
              if (
                (lt(f, {
                  refs: new Map(),
                  plugins: x,
                  onParse(g) {
                    S.onParse(g);
                  },
                  onDone() {
                    S.onDone();
                  },
                  onError: (g) => {
                    S.onError(g);
                  },
                }),
                (R = !1),
                E && v.size === 0)
              )
                return new Response(p ? JSON.stringify(p) : void 0, {
                  status: h.status,
                  statusText: h.statusText,
                  headers: { "Content-Type": "application/json", [J]: "true" },
                });
              const { readable: D, writable: U } = new TransformStream();
              ((b = D), (m = U.getWriter()));
              for (const g of w) m.write(g).catch(() => {});
              w.length = 0;
              const z = Dt(
                new ReadableStream({
                  start(g) {
                    ((S.onParse = (y) => {
                      g.enqueue(
                        JSON.stringify(y) +
                          `
`,
                      );
                    }),
                      (S.onDone = () => {
                        try {
                          g.close();
                        } catch {}
                        m?.close()
                          .catch(() => {})
                          .finally(() => {
                            m = void 0;
                          });
                      }),
                      (S.onError = (y) => {
                        (g.error(y),
                          m
                            ?.abort(y)
                            .catch(() => {})
                            .finally(() => {
                              m = void 0;
                            }));
                      }),
                      p !== void 0 && S.onParse(p),
                      E && S.onDone());
                  },
                  cancel() {
                    (m?.abort().catch(() => {}), (m = void 0));
                  },
                }),
                v,
                b,
              );
              return new Response(z, {
                status: h.status,
                statusText: h.statusText,
                headers: { "Content-Type": Et, [J]: "true" },
              });
            }
            return new Response(void 0, { status: h.status, statusText: h.statusText });
          },
          d = await (async () => {
            if (Ut.some((h) => i && i.includes(h))) {
              n === "GET" && st();
              const h = await e.formData(),
                v = h.get(de);
              h.delete(de);
              const R = { context: t, data: h, method: n };
              if (typeof v == "string")
                try {
                  const m = ce(JSON.parse(v), { plugins: q });
                  typeof m == "object" && m && (R.context = k(m, t));
                } catch {}
              return await s(R);
            }
            if (n === "GET") {
              const h = o.searchParams.get("payload");
              if (h && h.length > zt) throw new Error("Payload too large");
              const v = h ? c(JSON.parse(h)) : {};
              return ((v.context = k(v.context, t)), (v.method = n), await s(v));
            }
            let f;
            i?.includes("application/json") && (f = await e.json());
            const p = f ? c(f) : {};
            return ((p.context = k(p.context, t)), (p.method = n), await s(p));
          })();
        const l = d.result || d.error;
        return (
          ie(d) && (d = ge(d)),
          a ? (l instanceof Response ? (j(l) || l.headers.set(Rt, "true"), l) : u(d)) : l
        );
      } catch (u) {
        if (u instanceof Response) return u;
        if (ie(u)) return ge(u);
        (console.info(),
          console.info("Server Fn Error!"),
          console.info(),
          console.error(u),
          console.info());
        const d = JSON.stringify(await Promise.resolve(ft(u, { refs: new Map(), plugins: q }))),
          l = fe();
        return new Response(d, {
          status: l.status ?? 500,
          statusText: l.statusText,
          headers: { "Content-Type": "application/json", [J]: "true" },
        });
      }
    })();
  };
function ge(e) {
  const { headers: t, ...r } = e;
  return new Response(JSON.stringify(r), {
    status: 404,
    headers: { "Content-Type": "application/json", ...(t || {}) },
  });
}
var Bt = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/,
  Jt = new Set(["fetch", "font", "image", "script", "style", "track"]);
function H(e, t) {
  return t === void 0 ? e : Bt.test(t) ? `${e}=${t}` : `${e}=${JSON.stringify(t)}`;
}
function _e(e) {
  const t = [`<${e.href}>`, H("rel", e.rel)];
  return (
    e.as && t.push(H("as", e.as)),
    e.crossOrigin !== void 0 && t.push(H("crossorigin", e.crossOrigin || void 0)),
    e.type && t.push(H("type", e.type)),
    e.integrity && t.push(H("integrity", e.integrity)),
    e.referrerPolicy && t.push(H("referrerpolicy", e.referrerPolicy)),
    e.fetchPriority && t.push(H("fetchpriority", e.fetchPriority)),
    t.join("; ")
  );
}
function F(e, t, r) {
  const n = e?.[t] ?? (r ? e?.[r] : void 0);
  return typeof n == "string" ? n : void 0;
}
function Gt(e) {
  const t = F(e, "as");
  return t && Jt.has(t) ? t : void 0;
}
function Wt(e, t) {
  const r = F(t, "crossOrigin", "crossorigin"),
    n = F(t, "type"),
    o = F(t, "integrity"),
    s = F(t, "referrerPolicy", "referrerpolicy"),
    a = F(t, "fetchPriority", "fetchpriority");
  (r !== void 0 && (e.crossOrigin = r),
    n && (e.type = n),
    o && (e.integrity = o),
    s && (e.referrerPolicy = s),
    a && (e.fetchPriority = a));
}
function Yt(e) {
  const t = F(e, "href"),
    r = F(e, "rel");
  if (!t || !r) return;
  const n = r.split(/\s+/);
  let o, s;
  if (n.includes("modulepreload")) ((o = "modulepreload"), (s = "script"));
  else if (n.includes("stylesheet")) ((o = "preload"), (s = "style"));
  else if (n.includes("preload")) {
    if (((s = Gt(e)), !s)) return;
    o = "preload";
  } else
    n.includes("preconnect")
      ? ((o = "preconnect"), (s = void 0))
      : n.includes("dns-prefetch") && ((o = "dns-prefetch"), (s = void 0));
  if (!o) return;
  const a = { href: t, rel: o };
  return (s && (a.as = s), Wt(a, e), a);
}
function Kt(e, t) {
  const r = [];
  for (const n of t) {
    const o = e.routes[n.id];
    if (o) {
      for (const s of o.preloads ?? []) {
        const a = it(e, s),
          i = { href: a.href, rel: a.rel, as: "script" };
        (a.crossOrigin !== void 0 && (i.crossOrigin = a.crossOrigin), r.push(i));
      }
      for (const s of o.css ?? []) {
        const a = ct(s);
        if (e.inlineCss?.styles[a] !== void 0) continue;
        const i = Ee(s),
          c = { href: a, rel: "preload", as: "style" };
        (i.crossOrigin !== void 0 && (c.crossOrigin = i.crossOrigin), r.push(c));
      }
    }
  }
  return r;
}
function Xt(e) {
  const t = [];
  for (const r of e) {
    const n = r.links;
    if (Array.isArray(n))
      for (const o of n) {
        const s = Yt(o);
        s && t.push(s);
      }
  }
  return t;
}
function Zt(e) {
  const t = [],
    r = [];
  for (const n of e.hints) {
    const o = _e(n);
    e.sentLinks.has(o) || (e.sentLinks.add(o), e.sentHints.push(n), t.push(n), r.push(o));
  }
  if (!(!t.length && e.phase !== "dynamic"))
    return {
      phase: e.phase,
      hints: t,
      links: r,
      allHints: e.sentHints.slice(),
      allLinks: Array.from(e.sentLinks),
    };
}
function Qt(e) {
  for (const t of e.hints) {
    const r = _e(t);
    e.sentLinks.has(r) ||
      (e.sentLinks.add(r), e.entries.push({ phase: e.phase, hint: t, link: r }));
  }
}
function er(e) {
  if (!e.filter) return e.entries.map((t) => t.link);
  try {
    const t = [];
    for (const r of e.entries) e.filter(r) && t.push(r.link);
    return t;
  } catch (t) {
    return (console.error("Error filtering response Link headers:", t), []);
  }
}
function tr(e, t, r) {
  try {
    const n = r(t);
    n &&
      Promise.resolve(n).catch((o) => {
        console.error(`Error sending ${e} early hints:`, o);
      });
  } catch (n) {
    console.error(`Error sending ${e} early hints:`, n);
  }
}
function rr(e) {
  if (typeof e == "object") return e.filter;
}
function nr(e) {
  for (const t of er(e)) e.responseHeaders.append("Link", t);
}
function sr(e) {
  for (let t = 0; t < e.event.hints.length; t++)
    e.entries.push({ phase: e.phase, hint: e.event.hints[t], link: e.event.links[t] });
}
function ve(e) {
  const t = e.onEarlyHints
    ? Zt({ phase: e.phase, hints: e.hints, sentLinks: e.sentLinks, sentHints: e.sentHints })
    : void 0;
  if ((t && tr(e.phase, t, e.onEarlyHints), !!e.responseLinkHeaderEntries)) {
    if (t) {
      sr({ phase: e.phase, event: t, entries: e.responseLinkHeaderEntries });
      return;
    }
    Qt({
      phase: e.phase,
      hints: e.hints,
      sentLinks: e.sentLinks,
      entries: e.responseLinkHeaderEntries,
    });
  }
}
function or(e) {
  if (!e?.onEarlyHints && !e?.responseLinkHeader) return;
  const t = new Set(),
    r = e.onEarlyHints ? new Array() : void 0,
    n = e.responseLinkHeader ? new Array() : void 0,
    o = rr(e.responseLinkHeader);
  return {
    collectStatic: ({ manifest: s, matchedRoutes: a }) => {
      a?.length &&
        ve({
          phase: "static",
          hints: Kt(s, a),
          sentLinks: t,
          sentHints: r,
          onEarlyHints: e.onEarlyHints,
          responseLinkHeaderEntries: n,
        });
    },
    collectDynamic: (s) => {
      ve({
        phase: "dynamic",
        hints: Xt(s),
        sentLinks: t,
        sentHints: r,
        onEarlyHints: e.onEarlyHints,
        responseLinkHeaderEntries: n,
      });
    },
    appendResponseHeaders: (s) => {
      n?.length && nr({ responseHeaders: s, entries: n, filter: o });
    },
  };
}
function re(e) {
  return typeof e == "string" ? { href: e } : e;
}
function ar(e) {
  return e
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\a ")
    .replace(/\r/g, "\\d ")
    .replace(/\f/g, "\\c ");
}
async function ir(e) {
  const { strings: t, urls: r } = e.template;
  if (t.length !== r.length + 1)
    throw new Error(`TanStack Start inlineCss template for ${e.stylesheetHref} is invalid`);
  let n = t[0];
  for (let o = 0; o < r.length; o++) {
    const s = re(
      await e.transformFn({ kind: "css-url", url: r[o], stylesheetHref: e.stylesheetHref }),
    );
    n += ar(s.href) + t[o + 1];
  }
  return n;
}
async function cr(e, t) {
  const r = {},
    n = await Promise.all(
      Object.entries(e.styles).map(async ([o, s]) => {
        const a = e.templates?.[o];
        return [o, a ? await ir({ stylesheetHref: o, template: a, transformFn: t }) : s];
      }),
    );
  for (const [o, s] of n) r[o] = s;
  return { styles: r, ...(e.templates ? { templates: e.templates } : {}) };
}
function ur(e, t) {
  if (e) return typeof e == "string" ? e : e[t];
}
function lr(e) {
  return "prefix" in e;
}
function fr(e) {
  if (typeof e == "string") {
    const t = e;
    return { type: "transform", transformFn: ({ url: r }) => ({ href: `${t}${r}` }), cache: !0 };
  }
  if (typeof e == "function") return { type: "transform", transformFn: e, cache: !0 };
  if (lr(e)) {
    const { prefix: t, crossOrigin: r } = e;
    return {
      type: "transform",
      transformFn: ({ url: n, kind: o }) => {
        const s = `${t}${n}`;
        if (o === "css-url") return { href: s };
        const a = ur(r, o);
        return a ? { href: s, crossOrigin: a } : { href: s };
      },
      cache: !0,
    };
  }
  return "createTransform" in e && e.createTransform
    ? { type: "createTransform", createTransform: e.createTransform, cache: e.cache !== !1 }
    : {
        type: "transform",
        transformFn:
          typeof e.transform == "string"
            ? ({ url: t }) => ({ href: `${e.transform}${t}` })
            : e.transform,
        cache: e.cache !== !1,
      };
}
function Se(e, t) {
  if (typeof e == "string") return t.crossOrigin ? t : t.href;
  const r = { ...e, href: t.href };
  return (t.crossOrigin ? (r.crossOrigin = t.crossOrigin) : delete r.crossOrigin, r);
}
async function dr(e, t, r) {
  const n = structuredClone(e),
    o = r?.inlineCss !== !1,
    s = new Map(),
    a = (i) => {
      const c = s.get(i);
      if (c) return c;
      const u = Promise.resolve(t({ url: i, kind: "script" })).then(re);
      return (s.set(i, u), u);
    };
  o ? n.inlineCss && (n.inlineCss = await cr(n.inlineCss, t)) : delete n.inlineCss;
  for (const i of Object.values(n.routes))
    if (
      (i.preloads?.length &&
        (i.preloads = await Promise.all(
          i.preloads.map(async (c) => {
            const u = await a(We(c).href);
            return Se(c, { href: u.href, crossOrigin: u.crossOrigin });
          }),
        )),
      i.css?.length &&
        !n.inlineCss &&
        (i.css = await Promise.all(
          i.css.map(async (c) => {
            const u = re(await t({ url: Ee(c).href, kind: "stylesheet" }));
            return Se(c, { href: u.href, crossOrigin: u.crossOrigin });
          }),
        )),
      i.scripts?.length)
    )
      for (const c of i.scripts) {
        const u = c.attrs?.src;
        if (typeof u != "string") continue;
        const d = await a(u);
        ((c.attrs = { ...c.attrs, src: d.href }),
          d.crossOrigin ? (c.attrs.crossOrigin = d.crossOrigin) : delete c.attrs.crossOrigin);
      }
  return n;
}
function pr(e, t) {
  return {
    ...(e.scriptFormat ? { scriptFormat: e.scriptFormat } : {}),
    ...(t?.inlineCss !== !1 && e.inlineCss ? { inlineCss: structuredClone(e.inlineCss) } : {}),
    routes: { ...e.routes },
  };
}
function hr(e) {
  if (typeof e != "function") return e ?? !0;
}
async function mr(e) {
  return e.requestInlineCss !== void 0
    ? e.requestInlineCss
    : typeof e.handlerInlineCss == "function"
      ? await e.handlerInlineCss({ request: e.request })
      : (e.handlerInlineCss ?? !0);
}
function yr(e) {
  let t;
  return () => (
    t ||
      (t = e().catch((r) => {
        throw ((t = void 0), r);
      })),
    t
  );
}
function wr(e, t) {
  const r = e !== void 0 ? fr(e) : void 0,
    n = r ? r.cache : !0,
    o = !!e && typeof e == "object" && "warmup" in e && e.warmup === !0;
  let s;
  const a = () => {
    s = void 0;
  };
  return {
    cache: n,
    warmup: o,
    clearCachedCreateTransform: a,
    getTransformFn: async (i) => {
      if (r)
        return r.type !== "createTransform"
          ? r.transformFn
          : n
            ? (s ||
                (s = Promise.resolve(r.createTransform(i)).catch((c) => {
                  throw (a(), c);
                })),
              s)
            : r.createTransform(i);
    },
  };
}
function gr(e) {
  const t = new Map(),
    r = wr(e.transformAssets),
    n = hr(e.inlineCss),
    o = async (a) => {
      const i = await r.getTransformFn({ warmup: !1, request: a.request }),
        c = await mr({
          request: a.request,
          handlerInlineCss: e.inlineCss,
          requestInlineCss: a.requestInlineCss,
        });
      return { getBaseManifest: a.getBaseManifest, transformFn: i, cache: r.cache, inlineCss: c };
    },
    s = async (a, i) => Sr({ ...(await o(a)), finalManifestCache: i });
  return {
    warmup: ({ getBaseManifest: a }) =>
      xr({
        enabled: r.warmup,
        handlerDefaultInlineCss: n,
        cache: r.cache,
        finalManifestCache: t,
        getBaseManifest: a,
        getTransformFn: () => r.getTransformFn({ warmup: !0 }),
        onError: r.clearCachedCreateTransform,
      }),
    resolveCached: (a) => s(a, t),
    resolveUncached: (a) => s(a, void 0),
  };
}
function Ne(e) {
  return e ? "inline-css" : "linked-css";
}
function vr(e, t, r) {
  const n = r.catch((o) => {
    throw (e.get(t) === n && e.delete(t), o);
  });
  return (e.set(t, n), n);
}
function je(e, t, r) {
  return e.get(t) || vr(e, t, Promise.resolve().then(r));
}
async function Ie(e) {
  return e.transformFn
    ? await dr(e.base, e.transformFn, { inlineCss: e.inlineCss })
    : pr(e.base, { inlineCss: e.inlineCss });
}
async function Sr(e) {
  const t = async () =>
    Ie({ base: await e.getBaseManifest(), transformFn: e.transformFn, inlineCss: e.inlineCss });
  return e.finalManifestCache && (!e.transformFn || e.cache)
    ? je(e.finalManifestCache, Ne(e.inlineCss), t)
    : t();
}
function xr(e) {
  if (!e.enabled || e.handlerDefaultInlineCss === void 0 || !e.cache) return;
  const t = e.handlerDefaultInlineCss,
    r = je(e.finalManifestCache, Ne(t), async () => {
      const [n, o] = await Promise.all([e.getBaseManifest(), e.getTransformFn()]);
      return Ie({ base: n, transformFn: o, inlineCss: t });
    });
  return (e.onError && r.catch(e.onError), r);
}
var br = rt({
  key: "$TSS/serverfn",
  test: (e) => (typeof e != "function" || !(pe in e) ? !1 : !!e[pe]),
  toSerializable: ({ serverFnMeta: e }) => ({ functionId: e.id }),
  fromSerializable:
    ({ functionId: e }) =>
    async (t, r) =>
      (await (await qe(e))(t ?? {}, r)).result,
});
function Rr(e) {
  return Oe(
    { "Content-Type": "text/html; charset=utf-8" },
    ...e.router.stores.matches.get().map((t) => t.headers),
  );
}
var Y,
  Cr = Tt({ filter: (e) => e.handlerType === "serverFn" }),
  Er = yr(() => xt()),
  Or = () => Er(),
  xe = Or,
  Fr = or;
async function kr() {
  const [e, t, r] = await Promise.all([
    import("./router-CzERE3r3.mjs").then((n) => n.r),
    import("./start-C95ANQ-1.mjs"),
    import("./empty-plugin-adapters-C3Q1xu4u.mjs"),
  ]);
  return { routerEntry: e, startEntry: t, pluginAdapters: r };
}
function Tr() {
  return (Y || (Y = kr()), Y);
}
var Hr = "/",
  K = "/_serverFn/",
  be = process.env.TSS_PRERENDERING === "true",
  qr = process.env.TSS_SHELL === "true",
  Mr = "Internal Server Error",
  Ar = "Internal Server Error";
function oe() {
  throw new Error(Mr);
}
function Lr() {
  throw new Error(Ar);
}
function $e(e) {
  return e instanceof Response || j(e);
}
function Pr(e) {
  return Fe(e) || $e(e) ? { response: e } : e;
}
async function ne(e, t) {
  let r = -1,
    n;
  const o = (c) => {
      if (Fe(c)) {
        (c.serverSsrCleanup === "stream" && (n = c), (t.response = c.response));
        return;
      }
      t.response = c;
    },
    s = async (c) => {
      const u = n;
      if (!u) return;
      n = void 0;
      const d = t.response;
      ((d === u.response ||
        (d instanceof Response && u.response.body !== null && d.body === u.response.body)) &&
        (t.response = void 0),
        await u.dispose(c));
    },
    a = async () => {
      const c = t.response;
      return (
        c || oe(),
        n
          ? c === n.response
            ? n
            : n.response.body !== null && c.body === n.response.body
              ? { ...n, response: c }
              : (await s("middleware response replaced"), c)
          : c
      );
    },
    i = async (c) => {
      if (c) {
        c.context && (t.context = k(t.context, c.context));
        for (const f of Object.keys(c))
          f === "response" ? o(c.response) : f !== "context" && (t[f] = c[f]);
      }
      r++;
      const u = e[r];
      if (!u) return t;
      let d;
      try {
        d = await u({ ...t, next: i });
      } catch (f) {
        if ($e(f)) return (o(f), t);
        throw (await s("middleware error"), f);
      }
      const l = Pr(d);
      return (
        l &&
          (l.response !== void 0 && o(l.response),
          l.context && (t.context = k(t.context, l.context))),
        t
      );
    };
  return (await i(), { ctx: t, response: await a() });
}
function Re(e, t = !1) {
  return t
    ? e
    : async (r) => {
        const n = await e({ ...r, next: Lr });
        return (n || oe(), n);
      };
}
function _r(e) {
  const t = typeof e == "function" ? {} : e,
    r = typeof e == "function" ? e : e.handler,
    n = gr({ ...t }),
    o = n.resolveCached;
  return (
    n.warmup({ getBaseManifest: () => xe() }),
    vt(async (s, a) => {
      let i = null,
        c = !1;
      try {
        const { url: u, handledProtocolRelativeURL: d } = Ye(s.url),
          l = u.pathname + u.search + u.hash,
          f = Ke(s);
        if (d) return Response.redirect(u, 308);
        const p = await Tr(),
          h = !!p.startEntry.startInstance,
          v = (await p.startEntry.startInstance?.getOptions()) || {},
          { hasPluginAdapters: R, pluginSerializationAdapters: m } = p.pluginAdapters,
          b = [...(v.serializationAdapters || []), ...(R ? m : []), br],
          w = { ...v, requestMiddleware: h ? v.requestMiddleware : [Cr], serializationAdapters: b },
          x = w.requestMiddleware ? N(w.requestMiddleware) : [],
          E = new Set(x),
          S = async () => {
            if (i) return i;
            i = await p.routerEntry.getRouter();
            let y = qr;
            be && !y && (y = s.headers.get(St.TSS_SHELL) === "true");
            const C = dt({ initialEntries: [l] });
            return (
              i.update({
                history: C,
                isShell: y,
                isPrerendering: be,
                origin: i.options.origin ?? f,
                defaultSsr: w.defaultSsr,
                serializationAdapters: [
                  ...w.serializationAdapters,
                  ...(i.options.serializationAdapters || []),
                ],
                basepath: Hr,
              }),
              i
            );
          };
        if (K && u.pathname.startsWith(K)) {
          const y = u.pathname.slice(K.length).split("/")[0];
          if (!y) throw new Error("Invalid server action param for serverFnId");
          const C = async ({ context: T }) =>
              ye(
                {
                  getRouter: S,
                  startOptions: w,
                  contextAfterGlobalMiddlewares: T,
                  request: s,
                  executedRequestMiddlewares: E,
                  handlerType: "serverFn",
                },
                () => Vt({ request: s, context: a?.context, serverFnId: y }),
              ),
            { response: V } = await ne([...x.map((T) => T.options.server), C], {
              request: s,
              pathname: u.pathname,
              handlerType: "serverFn",
              context: P(a?.context),
            }),
            M = await se(V, s, S);
          return ((c = M.serverSsrCleanup === "stream"), M.response);
        }
        const D = async (y, C) => {
            const V = (s.headers.get("Accept") || "*/*").split(",");
            if (!["*/*", "text/html"].some((ze) => V.some((Ve) => Ve.trim().startsWith(ze))))
              return L(
                Response.json({ error: "Only HTML requests are supported here" }, { status: 500 }),
              );
            const M = await o({
                request: s,
                requestInlineCss: a?.inlineCss,
                getBaseManifest: () => xe(C),
              }),
              T = Fr({ onEarlyHints: a?.onEarlyHints, responseLinkHeader: a?.responseLinkHeader });
            T?.collectStatic({ manifest: M, matchedRoutes: C });
            const O = await S();
            if (
              (Xe({
                router: O,
                manifest: M,
                getRequestAssets: () => _({ throwIfNotFound: !1 })?.requestAssets,
              }),
              O.update({ additionalContext: { serverContext: y } }),
              await O.load(),
              O.state.redirect)
            )
              return L(O.state.redirect);
            T?.collectDynamic(O.stores.matches.get());
            const Ue = _({ throwIfNotFound: !1 });
            await O.serverSsr.dehydrate({ requestAssets: Ue?.requestAssets });
            const ae = Rr({ router: O });
            return (
              T?.appendResponseHeaders(ae),
              L(await r({ request: s, router: O, responseHeaders: ae }))
            );
          },
          U = async ({ context: y }) =>
            ye(
              {
                getRouter: S,
                startOptions: w,
                contextAfterGlobalMiddlewares: y,
                request: s,
                executedRequestMiddlewares: E,
                handlerType: "router",
              },
              async () => {
                try {
                  return await Nr({
                    getRouter: S,
                    request: s,
                    url: u,
                    executeRouter: D,
                    context: y,
                    executedRequestMiddlewares: E,
                  });
                } catch (C) {
                  if (C instanceof Response) return C;
                  throw C;
                }
              },
            ),
          { response: z } = await ne([...x.map((y) => y.options.server), U], {
            request: s,
            pathname: u.pathname,
            handlerType: "router",
            context: P(a?.context),
          }),
          g = await se(z, s, S);
        return ((c = g.serverSsrCleanup === "stream"), g.response);
      } finally {
        (i?.serverSsr && !c && i.serverSsr.cleanup(), (i = null));
      }
    })
  );
}
async function se(e, t, r) {
  const n = L(e);
  if (!j(n.response)) return n;
  if (Ze(n.response))
    return t.headers.get("x-tsr-serverFn") === "true"
      ? B(
          n,
          Response.json(
            { ...n.response.options, isSerializedRedirect: !0 },
            { headers: n.response.headers },
          ),
          "redirect response replaced",
        )
      : n;
  const o = n.response.options;
  if (o.to && typeof o.to == "string" && !o.to.startsWith("/"))
    throw new Error(
      `Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(o)}`,
    );
  if (["params", "search", "hash"].some((a) => typeof o[a] == "function"))
    throw new Error(
      `Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(
        o,
      )
        .filter((a) => typeof o[a] == "function")
        .map((a) => `"${a}"`)
        .join(", ")}`,
    );
  const s = (await r()).resolveRedirect(n.response);
  return t.headers.get("x-tsr-serverFn") === "true"
    ? B(
        n,
        Response.json(
          { ...n.response.options, isSerializedRedirect: !0 },
          { headers: n.response.headers },
        ),
        "redirect response replaced",
      )
    : B(n, s, "redirect response replaced");
}
async function Nr({
  getRouter: e,
  request: t,
  url: r,
  executeRouter: n,
  context: o,
  executedRequestMiddlewares: s,
}) {
  const a = await e(),
    i = Qe(a.rewrite, r).pathname,
    { matchedRoutes: c, foundRoute: u, routeParams: d } = a.getMatchedRoutes(i),
    l = u && d["**"] === void 0,
    f = [];
  for (const m of c) {
    const b = m.options.server?.middleware;
    if (b) {
      const w = N(b);
      for (const x of w) s.has(x) || f.push(x.options.server);
    }
  }
  const p = u?.options.server;
  let h = !1;
  if (p?.handlers && l) {
    const m =
        typeof p.handlers == "function" ? p.handlers({ createHandlers: (x) => x }) : p.handlers,
      b = t.method.toUpperCase(),
      w = b === "HEAD" ? (m.HEAD ?? m.GET ?? m.ANY) : (m[b] ?? m.ANY);
    if (((h = b === "HEAD" && w !== void 0 && !m.HEAD), w)) {
      const x = !!u.options.component;
      if (typeof w == "function") f.push(Re(w, x));
      else {
        if (w.middleware?.length) {
          const E = N(w.middleware);
          for (const S of E) f.push(S.options.server);
        }
        w.handler && f.push(Re(w.handler, x));
      }
    }
  }
  f.push((m) => n(m.context, c));
  const { ctx: v, response: R } = await ne(f, {
    request: t,
    context: o,
    params: d,
    pathname: i,
    handlerType: "router",
  });
  return h ? (v.response || oe(), et(await se(R, t, e), "HEAD body stripped")) : L(R);
}
var jr = _r(yt);
function De(e) {
  return {
    async fetch(...t) {
      return await e.fetch(...t);
    },
  };
}
var Ir = De({ fetch: jr });
const an = Object.freeze(
  Object.defineProperty(
    { __proto__: null, createServerEntry: De, default: Ir },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
export { pe as T, G as a, qe as b, A as c, on as g, an as s };
