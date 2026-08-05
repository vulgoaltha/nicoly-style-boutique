const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/FinancialTab-4CcGsacR.js",
      "assets/index-C2UuTsl-.js",
      "assets/select-BD0ajSz0.js",
      "assets/skeleton-0MS9dn16.js",
      "assets/chevron-up-BrI3s4vh.js",
      "assets/check-C6tLogbj.js",
      "assets/calendar-ecnoNJh1.js",
      "assets/users-8mZsxf7Z.js",
      "assets/useQuery-tYhz7w83.js",
      "assets/credit-card-BMdPgreM.js",
      "assets/package-DKlLxxot.js",
      "assets/truck-_8doA-LZ.js",
      "assets/layout-dashboard-5SKAG8I0.js",
      "assets/CustomersTab-CuKv5es5.js",
      "assets/user-x-D8a-mRBN.js",
      "assets/ProductsTab-C7LjmHrd.js",
      "assets/triangle-alert-DvO-HZUW.js",
    ]),
) => i.map((i) => d[i]);
import {
  Q as a,
  D as l,
  R as fe,
  c as Vt,
  P as kn,
  a1 as ie,
  S as Jo,
  n as Kt,
  ab as es,
  d as ts,
  _ as se,
  l as $n,
  m as ns,
} from "./index-C2UuTsl-.js";
import { a as F, S as ln, c as rs } from "./skeleton-0MS9dn16.js";
import { u as Re } from "./useQuery-tYhz7w83.js";
import {
  a as os,
  A as ss,
  D as is,
  e as as,
  T as cs,
  C as ls,
  U as us,
  P as ds,
  b as fs,
  c as ms,
  B as ps,
  d as hs,
} from "./users-8mZsxf7Z.js";
import { b as Bn, c as Wn, C as Vn, a as vs } from "./credit-card-BMdPgreM.js";
import { P as gs } from "./package-DKlLxxot.js";
import { T as xs } from "./truck-_8doA-LZ.js";
import { L as ys } from "./layout-dashboard-5SKAG8I0.js";
import { C as ws } from "./check-C6tLogbj.js";
function A(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e?.(o), n === !1 || !o.defaultPrevented)) return t?.(o);
  };
}
function Se(e, t = []) {
  let n = [];
  function r(s, c) {
    const i = a.createContext(c),
      m = n.length;
    n = [...n, c];
    const d = (u) => {
      const { scope: p, children: v, ...g } = u,
        h = p?.[e]?.[m] || i,
        x = a.useMemo(() => g, Object.values(g));
      return l.jsx(h.Provider, { value: x, children: v });
    };
    d.displayName = s + "Provider";
    function f(u, p) {
      const v = p?.[e]?.[m] || i,
        g = a.useContext(v);
      if (g) return g;
      if (c !== void 0) return c;
      throw new Error(`\`${u}\` must be used within \`${s}\``);
    }
    return [d, f];
  }
  const o = () => {
    const s = n.map((c) => a.createContext(c));
    return function (i) {
      const m = i?.[e] || s;
      return a.useMemo(() => ({ [`__scope${e}`]: { ...i, [e]: m } }), [i, m]);
    };
  };
  return ((o.scopeName = e), [r, bs(o, ...t)]);
}
function bs(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (s) {
      const c = r.reduce((i, { useScope: m, scopeName: d }) => {
        const u = m(s)[`__scope${d}`];
        return { ...i, ...u };
      }, {});
      return a.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function un(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function he(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = un(o, t);
      return (!n && typeof s == "function" && (n = !0), s);
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : un(e[o], null);
        }
      };
  };
}
function U(...e) {
  return a.useCallback(he(...e), e);
}
function dn(e) {
  const t = Cs(e),
    n = a.forwardRef((r, o) => {
      const { children: s, ...c } = r,
        i = a.Children.toArray(s),
        m = i.find(Rs);
      if (m) {
        const d = m.props.children,
          f = i.map((u) =>
            u === m
              ? a.Children.count(d) > 1
                ? a.Children.only(null)
                : a.isValidElement(d)
                  ? d.props.children
                  : null
              : u,
          );
        return l.jsx(t, {
          ...c,
          ref: o,
          children: a.isValidElement(d) ? a.cloneElement(d, void 0, f) : null,
        });
      }
      return l.jsx(t, { ...c, ref: o, children: s });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
function Cs(e) {
  const t = a.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (a.isValidElement(o)) {
      const c = Ns(o),
        i = Ss(s, o.props);
      return (o.type !== a.Fragment && (i.ref = r ? he(r, c) : c), a.cloneElement(o, i));
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Es = Symbol("radix.slottable");
function Rs(e) {
  return (
    a.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === Es
  );
}
function Ss(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      s = t[r];
    /^on[A-Z]/.test(r)
      ? o && s
        ? (n[r] = (...i) => {
            const m = s(...i);
            return (o(...i), m);
          })
        : o && (n[r] = o)
      : r === "style"
        ? (n[r] = { ...o, ...s })
        : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ns(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function Kn(e) {
  const t = e + "CollectionProvider",
    [n, r] = Se(t),
    [o, s] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    c = (h) => {
      const { scope: x, children: y } = h,
        C = fe.useRef(null),
        b = fe.useRef(new Map()).current;
      return l.jsx(o, { scope: x, itemMap: b, collectionRef: C, children: y });
    };
  c.displayName = t;
  const i = e + "CollectionSlot",
    m = dn(i),
    d = fe.forwardRef((h, x) => {
      const { scope: y, children: C } = h,
        b = s(i, y),
        w = U(x, b.collectionRef);
      return l.jsx(m, { ref: w, children: C });
    });
  d.displayName = i;
  const f = e + "CollectionItemSlot",
    u = "data-radix-collection-item",
    p = dn(f),
    v = fe.forwardRef((h, x) => {
      const { scope: y, children: C, ...b } = h,
        w = fe.useRef(null),
        R = U(x, w),
        N = s(f, y);
      return (
        fe.useEffect(
          () => (
            N.itemMap.set(w, { ref: w, ...b }),
            () => {
              N.itemMap.delete(w);
            }
          ),
        ),
        l.jsx(p, { [u]: "", ref: R, children: C })
      );
    });
  v.displayName = f;
  function g(h) {
    const x = s(e + "CollectionConsumer", h);
    return fe.useCallback(() => {
      const C = x.collectionRef.current;
      if (!C) return [];
      const b = Array.from(C.querySelectorAll(`[${u}]`));
      return Array.from(x.itemMap.values()).sort(
        (N, E) => b.indexOf(N.ref.current) - b.indexOf(E.ref.current),
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [{ Provider: c, Slot: d, ItemSlot: v }, g, r];
}
var ae = globalThis?.document ? a.useLayoutEffect : () => {},
  Ps = Vt[" useId ".trim().toString()] || (() => {}),
  Ms = 0;
function ot(e) {
  const [t, n] = a.useState(Ps());
  return (
    ae(() => {
      n((r) => r ?? String(Ms++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
function As(e) {
  const t = _s(e),
    n = a.forwardRef((r, o) => {
      const { children: s, ...c } = r,
        i = a.Children.toArray(s),
        m = i.find(Os);
      if (m) {
        const d = m.props.children,
          f = i.map((u) =>
            u === m
              ? a.Children.count(d) > 1
                ? a.Children.only(null)
                : a.isValidElement(d)
                  ? d.props.children
                  : null
              : u,
          );
        return l.jsx(t, {
          ...c,
          ref: o,
          children: a.isValidElement(d) ? a.cloneElement(d, void 0, f) : null,
        });
      }
      return l.jsx(t, { ...c, ref: o, children: s });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
function _s(e) {
  const t = a.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (a.isValidElement(o)) {
      const c = Ds(o),
        i = js(s, o.props);
      return (o.type !== a.Fragment && (i.ref = r ? he(r, c) : c), a.cloneElement(o, i));
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Ts = Symbol("radix.slottable");
function Os(e) {
  return (
    a.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === Ts
  );
}
function js(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      s = t[r];
    /^on[A-Z]/.test(r)
      ? o && s
        ? (n[r] = (...i) => {
            const m = s(...i);
            return (o(...i), m);
          })
        : o && (n[r] = o)
      : r === "style"
        ? (n[r] = { ...o, ...s })
        : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ds(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var Is = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  B = Is.reduce((e, t) => {
    const n = As(`Primitive.${t}`),
      r = a.forwardRef((o, s) => {
        const { asChild: c, ...i } = o,
          m = c ? n : t;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          l.jsx(m, { ...i, ref: s })
        );
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function Un(e, t) {
  e && kn.flushSync(() => e.dispatchEvent(t));
}
function ee(e) {
  const t = a.useRef(e);
  return (
    a.useEffect(() => {
      t.current = e;
    }),
    a.useMemo(
      () =>
        (...n) =>
          t.current?.(...n),
      [],
    )
  );
}
var Ls = Vt[" useInsertionEffect ".trim().toString()] || ae;
function Ut({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  const [o, s, c] = Fs({ defaultProp: t, onChange: n }),
    i = e !== void 0,
    m = i ? e : o;
  {
    const f = a.useRef(e !== void 0);
    a.useEffect(() => {
      const u = f.current;
      (u !== i &&
        console.warn(
          `${r} is changing from ${u ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (f.current = i));
    }, [i, r]);
  }
  const d = a.useCallback(
    (f) => {
      if (i) {
        const u = ks(f) ? f(e) : f;
        u !== e && c.current?.(u);
      } else s(f);
    },
    [i, e, s, c],
  );
  return [m, d];
}
function Fs({ defaultProp: e, onChange: t }) {
  const [n, r] = a.useState(e),
    o = a.useRef(n),
    s = a.useRef(t);
  return (
    Ls(() => {
      s.current = t;
    }, [t]),
    a.useEffect(() => {
      o.current !== n && (s.current?.(n), (o.current = n));
    }, [n, o]),
    [n, r, s]
  );
}
function ks(e) {
  return typeof e == "function";
}
var $s = a.createContext(void 0);
function Ht(e) {
  const t = a.useContext($s);
  return e || t || "ltr";
}
var Et = "rovingFocusGroup.onEntryFocus",
  Bs = { bubbles: !1, cancelable: !0 },
  We = "RovingFocusGroup",
  [It, Hn, Ws] = Kn(We),
  [Vs, mt] = Se(We, [Ws]),
  [Ks, Us] = Vs(We),
  Gn = a.forwardRef((e, t) =>
    l.jsx(It.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: l.jsx(It.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: l.jsx(Hs, { ...e, ref: t }),
      }),
    }),
  );
Gn.displayName = We;
var Hs = a.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: o = !1,
        dir: s,
        currentTabStopId: c,
        defaultCurrentTabStopId: i,
        onCurrentTabStopIdChange: m,
        onEntryFocus: d,
        preventScrollOnEntryFocus: f = !1,
        ...u
      } = e,
      p = a.useRef(null),
      v = U(t, p),
      g = Ht(s),
      [h, x] = Ut({ prop: c, defaultProp: i ?? null, onChange: m, caller: We }),
      [y, C] = a.useState(!1),
      b = ee(d),
      w = Hn(n),
      R = a.useRef(!1),
      [N, E] = a.useState(0);
    return (
      a.useEffect(() => {
        const P = p.current;
        if (P) return (P.addEventListener(Et, b), () => P.removeEventListener(Et, b));
      }, [b]),
      l.jsx(Ks, {
        scope: n,
        orientation: r,
        dir: g,
        loop: o,
        currentTabStopId: h,
        onItemFocus: a.useCallback((P) => x(P), [x]),
        onItemShiftTab: a.useCallback(() => C(!0), []),
        onFocusableItemAdd: a.useCallback(() => E((P) => P + 1), []),
        onFocusableItemRemove: a.useCallback(() => E((P) => P - 1), []),
        children: l.jsx(B.div, {
          tabIndex: y || N === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: v,
          style: { outline: "none", ...e.style },
          onMouseDown: A(e.onMouseDown, () => {
            R.current = !0;
          }),
          onFocus: A(e.onFocus, (P) => {
            const O = !R.current;
            if (P.target === P.currentTarget && O && !y) {
              const _ = new CustomEvent(Et, Bs);
              if ((P.currentTarget.dispatchEvent(_), !_.defaultPrevented)) {
                const j = w().filter((T) => T.focusable),
                  I = j.find((T) => T.active),
                  L = j.find((T) => T.id === h),
                  W = [I, L, ...j].filter(Boolean).map((T) => T.ref.current);
                Xn(W, f);
              }
            }
            R.current = !1;
          }),
          onBlur: A(e.onBlur, () => C(!1)),
        }),
      })
    );
  }),
  zn = "RovingFocusGroupItem",
  Yn = a.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        focusable: r = !0,
        active: o = !1,
        tabStopId: s,
        children: c,
        ...i
      } = e,
      m = ot(),
      d = s || m,
      f = Us(zn, n),
      u = f.currentTabStopId === d,
      p = Hn(n),
      { onFocusableItemAdd: v, onFocusableItemRemove: g, currentTabStopId: h } = f;
    return (
      a.useEffect(() => {
        if (r) return (v(), () => g());
      }, [r, v, g]),
      l.jsx(It.ItemSlot, {
        scope: n,
        id: d,
        focusable: r,
        active: o,
        children: l.jsx(B.span, {
          tabIndex: u ? 0 : -1,
          "data-orientation": f.orientation,
          ...i,
          ref: t,
          onMouseDown: A(e.onMouseDown, (x) => {
            r ? f.onItemFocus(d) : x.preventDefault();
          }),
          onFocus: A(e.onFocus, () => f.onItemFocus(d)),
          onKeyDown: A(e.onKeyDown, (x) => {
            if (x.key === "Tab" && x.shiftKey) {
              f.onItemShiftTab();
              return;
            }
            if (x.target !== x.currentTarget) return;
            const y = Ys(x, f.orientation, f.dir);
            if (y !== void 0) {
              if (x.metaKey || x.ctrlKey || x.altKey || x.shiftKey) return;
              x.preventDefault();
              let b = p()
                .filter((w) => w.focusable)
                .map((w) => w.ref.current);
              if (y === "last") b.reverse();
              else if (y === "prev" || y === "next") {
                y === "prev" && b.reverse();
                const w = b.indexOf(x.currentTarget);
                b = f.loop ? Xs(b, w + 1) : b.slice(w + 1);
              }
              setTimeout(() => Xn(b));
            }
          }),
          children: typeof c == "function" ? c({ isCurrentTabStop: u, hasTabStop: h != null }) : c,
        }),
      })
    );
  });
Yn.displayName = zn;
var Gs = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function zs(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Ys(e, t, n) {
  const r = zs(e.key, n);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))
  )
    return Gs[r];
}
function Xn(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Xs(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var qn = Gn,
  Zn = Yn;
function qs(e, t) {
  return a.useReducer((n, r) => t[n][r] ?? n, e);
}
var Ne = (e) => {
  const { present: t, children: n } = e,
    r = Zs(t),
    o = typeof n == "function" ? n({ present: r.isPresent }) : a.Children.only(n),
    s = U(r.ref, Qs(o));
  return typeof n == "function" || r.isPresent ? a.cloneElement(o, { ref: s }) : null;
};
Ne.displayName = "Presence";
function Zs(e) {
  const [t, n] = a.useState(),
    r = a.useRef(null),
    o = a.useRef(e),
    s = a.useRef("none"),
    c = e ? "mounted" : "unmounted",
    [i, m] = qs(c, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    a.useEffect(() => {
      const d = ze(r.current);
      s.current = i === "mounted" ? d : "none";
    }, [i]),
    ae(() => {
      const d = r.current,
        f = o.current;
      if (f !== e) {
        const p = s.current,
          v = ze(d);
        (e
          ? m("MOUNT")
          : v === "none" || d?.display === "none"
            ? m("UNMOUNT")
            : m(f && p !== v ? "ANIMATION_OUT" : "UNMOUNT"),
          (o.current = e));
      }
    }, [e, m]),
    ae(() => {
      if (t) {
        let d;
        const f = t.ownerDocument.defaultView ?? window,
          u = (v) => {
            const h = ze(r.current).includes(CSS.escape(v.animationName));
            if (v.target === t && h && (m("ANIMATION_END"), !o.current)) {
              const x = t.style.animationFillMode;
              ((t.style.animationFillMode = "forwards"),
                (d = f.setTimeout(() => {
                  t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
                })));
            }
          },
          p = (v) => {
            v.target === t && (s.current = ze(r.current));
          };
        return (
          t.addEventListener("animationstart", p),
          t.addEventListener("animationcancel", u),
          t.addEventListener("animationend", u),
          () => {
            (f.clearTimeout(d),
              t.removeEventListener("animationstart", p),
              t.removeEventListener("animationcancel", u),
              t.removeEventListener("animationend", u));
          }
        );
      } else m("ANIMATION_END");
    }, [t, m]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(i),
      ref: a.useCallback((d) => {
        ((r.current = d ? getComputedStyle(d) : null), n(d));
      }, []),
    }
  );
}
function ze(e) {
  return e?.animationName || "none";
}
function Qs(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var pt = "Tabs",
  [Js] = Se(pt, [mt]),
  Qn = mt(),
  [ei, Gt] = Js(pt),
  Jn = a.forwardRef((e, t) => {
    const {
        __scopeTabs: n,
        value: r,
        onValueChange: o,
        defaultValue: s,
        orientation: c = "horizontal",
        dir: i,
        activationMode: m = "automatic",
        ...d
      } = e,
      f = Ht(i),
      [u, p] = Ut({ prop: r, onChange: o, defaultProp: s ?? "", caller: pt });
    return l.jsx(ei, {
      scope: n,
      baseId: ot(),
      value: u,
      onValueChange: p,
      orientation: c,
      dir: f,
      activationMode: m,
      children: l.jsx(B.div, { dir: f, "data-orientation": c, ...d, ref: t }),
    });
  });
Jn.displayName = pt;
var er = "TabsList",
  tr = a.forwardRef((e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e,
      s = Gt(er, n),
      c = Qn(n);
    return l.jsx(qn, {
      asChild: !0,
      ...c,
      orientation: s.orientation,
      dir: s.dir,
      loop: r,
      children: l.jsx(B.div, { role: "tablist", "aria-orientation": s.orientation, ...o, ref: t }),
    });
  });
tr.displayName = er;
var nr = "TabsTrigger",
  rr = a.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...s } = e,
      c = Gt(nr, n),
      i = Qn(n),
      m = ir(c.baseId, r),
      d = ar(c.baseId, r),
      f = r === c.value;
    return l.jsx(Zn, {
      asChild: !0,
      ...i,
      focusable: !o,
      active: f,
      children: l.jsx(B.button, {
        type: "button",
        role: "tab",
        "aria-selected": f,
        "aria-controls": d,
        "data-state": f ? "active" : "inactive",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        id: m,
        ...s,
        ref: t,
        onMouseDown: A(e.onMouseDown, (u) => {
          !o && u.button === 0 && u.ctrlKey === !1 ? c.onValueChange(r) : u.preventDefault();
        }),
        onKeyDown: A(e.onKeyDown, (u) => {
          [" ", "Enter"].includes(u.key) && c.onValueChange(r);
        }),
        onFocus: A(e.onFocus, () => {
          const u = c.activationMode !== "manual";
          !f && !o && u && c.onValueChange(r);
        }),
      }),
    });
  });
rr.displayName = nr;
var or = "TabsContent",
  sr = a.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: s, ...c } = e,
      i = Gt(or, n),
      m = ir(i.baseId, r),
      d = ar(i.baseId, r),
      f = r === i.value,
      u = a.useRef(f);
    return (
      a.useEffect(() => {
        const p = requestAnimationFrame(() => (u.current = !1));
        return () => cancelAnimationFrame(p);
      }, []),
      l.jsx(Ne, {
        present: o || f,
        children: ({ present: p }) =>
          l.jsx(B.div, {
            "data-state": f ? "active" : "inactive",
            "data-orientation": i.orientation,
            role: "tabpanel",
            "aria-labelledby": m,
            hidden: !p,
            id: d,
            tabIndex: 0,
            ...c,
            ref: t,
            style: { ...e.style, animationDuration: u.current ? "0s" : void 0 },
            children: p && s,
          }),
      })
    );
  });
sr.displayName = or;
function ir(e, t) {
  return `${e}-trigger-${t}`;
}
function ar(e, t) {
  return `${e}-content-${t}`;
}
var ti = Jn,
  cr = tr,
  lr = rr,
  ur = sr;
const ni = ti,
  dr = a.forwardRef(({ className: e, ...t }, n) =>
    l.jsx(cr, {
      ref: n,
      className: F(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        e,
      ),
      ...t,
    }),
  );
dr.displayName = cr.displayName;
const Oe = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(lr, {
    ref: n,
    className: F(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      e,
    ),
    ...t,
  }),
);
Oe.displayName = lr.displayName;
const je = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(ur, {
    ref: n,
    className: F(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e,
    ),
    ...t,
  }),
);
je.displayName = ur.displayName;
function ri() {
  return Re({
    queryKey: ["dashboard", "financial-metrics"],
    queryFn: async () => {
      const { data: e, error: t } = await ie.rpc("get_executive_financial_metrics");
      if (t) throw t;
      return e;
    },
  });
}
function oi() {
  return Re({
    queryKey: ["dashboard", "order-funnel"],
    queryFn: async () => {
      const { data: e, error: t } = await ie.rpc("get_order_funnel");
      if (t) throw t;
      return e;
    },
  });
}
function Su() {
  return Re({
    queryKey: ["dashboard", "customer-insights"],
    queryFn: async () => {
      const { data: e, error: t } = await ie.rpc("get_customer_insights");
      if (t) throw t;
      return e;
    },
  });
}
function Nu(e = "month") {
  return Re({
    queryKey: ["dashboard", "product-performance", e],
    queryFn: async () => {
      const { data: t, error: n } = await ie.rpc("get_product_performance", { p_interval: e });
      if (n) throw n;
      return t;
    },
  });
}
function Pu(e = "month") {
  return Re({
    queryKey: ["dashboard", "sales-chart", e],
    queryFn: async () => {
      const { data: t, error: n } = await ie.rpc("get_sales_chart_data", { p_interval: e });
      if (n) throw n;
      return t;
    },
  });
}
function si() {
  return Re({
    queryKey: ["dashboard", "alerts"],
    queryFn: async () => {
      const { data: e, error: t } = await ie.rpc("get_dashboard_alerts");
      if (t) throw t;
      return e;
    },
  });
}
const Ie = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx("div", {
    ref: n,
    className: F("rounded-xl border bg-card text-card-foreground shadow", e),
    ...t,
  }),
);
Ie.displayName = "Card";
const Le = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx("div", { ref: n, className: F("flex flex-col space-y-1.5 p-6", e), ...t }),
);
Le.displayName = "CardHeader";
const st = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx("div", { ref: n, className: F("font-semibold leading-none tracking-tight", e), ...t }),
);
st.displayName = "CardTitle";
const ii = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx("div", { ref: n, className: F("text-sm text-muted-foreground", e), ...t }),
);
ii.displayName = "CardDescription";
const Fe = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx("div", { ref: n, className: F("p-6 pt-0", e), ...t }),
);
Fe.displayName = "CardContent";
const ai = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx("div", { ref: n, className: F("flex items-center p-6 pt-0", e), ...t }),
);
ai.displayName = "CardFooter";
function Ye({ title: e, value: t, icon: n, description: r, trend: o, isLoading: s, className: c }) {
  return s
    ? l.jsxs(Ie, {
        className: F("overflow-hidden animate-pulse", c),
        children: [
          l.jsxs(Le, {
            className: "flex flex-row items-center justify-between pb-2 space-y-0",
            children: [
              l.jsx("div", { className: "h-4 w-1/3 bg-muted rounded" }),
              l.jsx("div", { className: "h-4 w-4 bg-muted rounded" }),
            ],
          }),
          l.jsxs(Fe, {
            children: [
              l.jsx("div", { className: "h-8 w-1/2 bg-muted rounded mt-2" }),
              l.jsx("div", { className: "h-3 w-1/4 bg-muted rounded mt-3" }),
            ],
          }),
        ],
      })
    : l.jsxs(Ie, {
        className: F("overflow-hidden", c),
        children: [
          l.jsxs(Le, {
            className: "flex flex-row items-center justify-between pb-2 space-y-0",
            children: [
              l.jsx(st, { className: "text-sm font-medium text-muted-foreground", children: e }),
              n && l.jsx("div", { className: "text-muted-foreground", children: n }),
            ],
          }),
          l.jsxs(Fe, {
            children: [
              l.jsx("div", { className: "text-2xl font-bold", children: t }),
              (r || o) &&
                l.jsxs("div", {
                  className: "text-xs mt-1 flex items-center gap-2",
                  children: [
                    o &&
                      l.jsxs("span", {
                        className: F(
                          "font-medium",
                          o.isPositive ? "text-emerald-500" : "text-rose-500",
                        ),
                        children: [o.isPositive ? "+" : "", o.value, "%"],
                      }),
                    l.jsx("span", {
                      className: "text-muted-foreground",
                      children: o ? o.label : r,
                    }),
                  ],
                }),
            ],
          }),
        ],
      });
}
function ci({ data: e, isLoading: t }) {
  if (t || !e)
    return l.jsxs(Ie, {
      children: [
        l.jsx(Le, { children: l.jsx(st, { className: "text-lg", children: "Funil de Pedidos" }) }),
        l.jsx(Fe, { className: "h-40 animate-pulse bg-muted rounded-md mx-6 mb-6" }),
      ],
    });
  const n = [
    {
      id: "received",
      label: "Recebidos",
      count: e.received,
      icon: os,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "pending",
      label: "Pgto Pendente",
      count: e.payment_pending,
      icon: Bn,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: "paid",
      label: "Pagos",
      count: e.paid,
      icon: Wn,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      id: "processing",
      label: "Em Separação",
      count: e.processing,
      icon: gs,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      id: "shipped",
      label: "Enviados",
      count: e.shipped,
      icon: xs,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
    {
      id: "delivered",
      label: "Entregues",
      count: e.delivered,
      icon: Vn,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];
  return l.jsxs(Ie, {
    children: [
      l.jsx(Le, {
        className: "pb-4",
        children: l.jsxs("div", {
          className: "flex items-center justify-between",
          children: [
            l.jsx(st, { className: "text-lg", children: "Funil de Pedidos" }),
            l.jsxs("div", {
              className:
                "flex items-center text-sm text-rose-500 bg-rose-50 px-2 py-1 rounded-full font-medium",
              children: [l.jsx(vs, { className: "w-4 h-4 mr-1" }), e.cancelled, " Cancelados"],
            }),
          ],
        }),
      }),
      l.jsx(Fe, {
        children: l.jsx("div", {
          className:
            "flex flex-col md:flex-row items-center justify-between gap-2 overflow-x-auto pb-2",
          children: n.map((r, o) => {
            const s = r.icon,
              c = e.received > 0 ? Math.round((r.count / e.received) * 100) : 0;
            return l.jsxs(
              "div",
              {
                className: "flex items-center flex-shrink-0",
                children: [
                  l.jsxs("div", {
                    className: "flex flex-col items-center gap-2",
                    children: [
                      l.jsx("div", {
                        className: F(
                          "w-16 h-16 rounded-full flex items-center justify-center border-2 border-white shadow-sm",
                          r.bgColor,
                          r.color,
                        ),
                        children: l.jsx(s, { className: "w-7 h-7" }),
                      }),
                      l.jsxs("div", {
                        className: "text-center",
                        children: [
                          l.jsx("p", {
                            className:
                              "text-xs font-medium text-muted-foreground whitespace-nowrap",
                            children: r.label,
                          }),
                          l.jsx("p", { className: "text-lg font-bold mt-0.5", children: r.count }),
                          o > 0 &&
                            l.jsxs("p", {
                              className: "text-[10px] text-muted-foreground",
                              children: [c, "% do total"],
                            }),
                        ],
                      }),
                    ],
                  }),
                  o < n.length - 1 &&
                    l.jsx("div", {
                      className:
                        "hidden md:flex flex-col items-center mx-4 -mt-10 text-muted-foreground/30",
                      children: l.jsx(ss, { className: "w-5 h-5" }),
                    }),
                ],
              },
              r.id,
            );
          }),
        }),
      }),
    ],
  });
}
function li() {
  const { data: e, isLoading: t } = ri(),
    { data: n, isLoading: r } = oi(),
    o = (s) =>
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(s || 0);
  return l.jsxs("div", {
    className: "space-y-6",
    children: [
      l.jsxs("div", {
        className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
        children: [
          l.jsx(Ye, {
            title: "Faturamento Hoje",
            value: o(e?.today_revenue),
            icon: l.jsx(is, { className: "w-4 h-4" }),
            isLoading: t,
            description: "Apenas pedidos pagos",
          }),
          l.jsx(Ye, {
            title: "Faturamento Mês",
            value: o(e?.month_revenue),
            icon: l.jsx(as, { className: "w-4 h-4" }),
            isLoading: t,
            description: "Apenas pedidos pagos",
          }),
          l.jsx(Ye, {
            title: "Ticket Médio (Mês)",
            value: o(e?.avg_ticket),
            icon: l.jsx(cs, { className: "w-4 h-4" }),
            isLoading: t,
          }),
          l.jsx(Ye, {
            title: "Pedidos no Mês",
            value: n?.received || 0,
            icon: l.jsx(Jo, { className: "w-4 h-4" }),
            isLoading: r,
          }),
        ],
      }),
      l.jsx(ci, { data: n, isLoading: r }),
    ],
  });
}
const ui = a.lazy(() =>
    Kt(
      () => import("./FinancialTab-4CcGsacR.js"),
      __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    ).then((e) => ({ default: e.FinancialTab })),
  ),
  di = a.lazy(() =>
    Kt(
      () => import("./CustomersTab-CuKv5es5.js"),
      __vite__mapDeps([13, 1, 14, 7, 3, 8, 9, 10, 11, 12, 5]),
    ).then((e) => ({ default: e.CustomersTab })),
  ),
  fi = a.lazy(() =>
    Kt(
      () => import("./ProductsTab-C7LjmHrd.js"),
      __vite__mapDeps([15, 1, 2, 3, 4, 5, 16, 8, 7, 9, 10, 11, 12]),
    ).then((e) => ({ default: e.ProductsTab })),
  );
function Rt() {
  return l.jsxs("div", {
    className: "space-y-4",
    children: [
      l.jsx(ln, { className: "h-[100px] w-full" }),
      l.jsx(ln, { className: "h-[300px] w-full" }),
    ],
  });
}
function mi() {
  return l.jsxs(ni, {
    defaultValue: "overview",
    className: "space-y-6",
    children: [
      l.jsxs(dr, {
        className: "bg-background border h-auto flex-wrap gap-1",
        children: [
          l.jsxs(Oe, {
            value: "overview",
            className: "gap-2",
            children: [l.jsx(ys, { className: "w-4 h-4" }), "Visão Geral"],
          }),
          l.jsxs(Oe, {
            value: "financial",
            className: "gap-2",
            children: [l.jsx(ls, { className: "w-4 h-4" }), "Financeiro"],
          }),
          l.jsxs(Oe, {
            value: "customers",
            className: "gap-2",
            children: [l.jsx(us, { className: "w-4 h-4" }), "Clientes"],
          }),
          l.jsxs(Oe, {
            value: "products",
            className: "gap-2",
            children: [l.jsx(ds, { className: "w-4 h-4" }), "Produtos"],
          }),
        ],
      }),
      l.jsx(je, { value: "overview", className: "space-y-4 mt-0", children: l.jsx(li, {}) }),
      l.jsx(je, {
        value: "financial",
        className: "space-y-4 mt-0",
        children: l.jsx(a.Suspense, { fallback: l.jsx(Rt, {}), children: l.jsx(ui, {}) }),
      }),
      l.jsx(je, {
        value: "customers",
        className: "space-y-4 mt-0",
        children: l.jsx(a.Suspense, { fallback: l.jsx(Rt, {}), children: l.jsx(di, {}) }),
      }),
      l.jsx(je, {
        value: "products",
        className: "space-y-4 mt-0",
        children: l.jsx(a.Suspense, { fallback: l.jsx(Rt, {}), children: l.jsx(fi, {}) }),
      }),
    ],
  });
}
function pi() {
  const e = es();
  a.useEffect(() => {
    const t = ie
      .channel("dashboard-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        (e.invalidateQueries({ queryKey: ["dashboard", "financial-metrics"] }),
          e.invalidateQueries({ queryKey: ["dashboard", "order-funnel"] }),
          e.invalidateQueries({ queryKey: ["dashboard", "customer-insights"] }),
          e.invalidateQueries({ queryKey: ["dashboard", "product-performance"] }));
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "products" }, () => {
        e.invalidateQueries({ queryKey: ["dashboard", "product-performance"] });
      })
      .subscribe();
    return () => {
      ie.removeChannel(t);
    };
  }, [e]);
}
var hi = Symbol.for("react.lazy"),
  it = Vt[" use ".trim().toString()];
function vi(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function fr(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "$$typeof" in e &&
    e.$$typeof === hi &&
    "_payload" in e &&
    vi(e._payload)
  );
}
function gi(e) {
  const t = yi(e),
    n = a.forwardRef((r, o) => {
      let { children: s, ...c } = r;
      fr(s) && typeof it == "function" && (s = it(s._payload));
      const i = a.Children.toArray(s),
        m = i.find(bi);
      if (m) {
        const d = m.props.children,
          f = i.map((u) =>
            u === m
              ? a.Children.count(d) > 1
                ? a.Children.only(null)
                : a.isValidElement(d)
                  ? d.props.children
                  : null
              : u,
          );
        return l.jsx(t, {
          ...c,
          ref: o,
          children: a.isValidElement(d) ? a.cloneElement(d, void 0, f) : null,
        });
      }
      return l.jsx(t, { ...c, ref: o, children: s });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var xi = gi("Slot");
function yi(e) {
  const t = a.forwardRef((n, r) => {
    let { children: o, ...s } = n;
    if ((fr(o) && typeof it == "function" && (o = it(o._payload)), a.isValidElement(o))) {
      const c = Ei(o),
        i = Ci(s, o.props);
      return (o.type !== a.Fragment && (i.ref = r ? he(r, c) : c), a.cloneElement(o, i));
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var wi = Symbol("radix.slottable");
function bi(e) {
  return (
    a.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === wi
  );
}
function Ci(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      s = t[r];
    /^on[A-Z]/.test(r)
      ? o && s
        ? (n[r] = (...i) => {
            const m = s(...i);
            return (o(...i), m);
          })
        : o && (n[r] = o)
      : r === "style"
        ? (n[r] = { ...o, ...s })
        : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ei(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
const fn = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  mn = rs,
  mr = (e, t) => (n) => {
    var r;
    if (t?.variants == null) return mn(e, n?.class, n?.className);
    const { variants: o, defaultVariants: s } = t,
      c = Object.keys(o).map((d) => {
        const f = n?.[d],
          u = s?.[d];
        if (f === null) return null;
        const p = fn(f) || fn(u);
        return o[d][p];
      }),
      i =
        n &&
        Object.entries(n).reduce((d, f) => {
          let [u, p] = f;
          return (p === void 0 || (d[u] = p), d);
        }, {}),
      m =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((d, f) => {
              let { class: u, className: p, ...v } = f;
              return Object.entries(v).every((g) => {
                let [h, x] = g;
                return Array.isArray(x) ? x.includes({ ...s, ...i }[h]) : { ...s, ...i }[h] === x;
              })
                ? [...d, u, p]
                : d;
            }, []);
    return mn(e, c, m, n?.class, n?.className);
  },
  Ri = mr(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          outline:
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  pr = a.forwardRef(({ className: e, variant: t, size: n, asChild: r = !1, ...o }, s) => {
    const c = r ? xi : "button";
    return l.jsx(c, { className: F(Ri({ variant: t, size: n, className: e })), ref: s, ...o });
  });
pr.displayName = "Button";
function Si(e, t = globalThis?.document) {
  const n = ee(e);
  a.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return (
      t.addEventListener("keydown", r, { capture: !0 }),
      () => t.removeEventListener("keydown", r, { capture: !0 })
    );
  }, [n, t]);
}
var Ni = "DismissableLayer",
  Lt = "dismissableLayer.update",
  Pi = "dismissableLayer.pointerDownOutside",
  Mi = "dismissableLayer.focusOutside",
  pn,
  hr = a.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  vr = a.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: s,
        onInteractOutside: c,
        onDismiss: i,
        ...m
      } = e,
      d = a.useContext(hr),
      [f, u] = a.useState(null),
      p = f?.ownerDocument ?? globalThis?.document,
      [, v] = a.useState({}),
      g = U(t, (E) => u(E)),
      h = Array.from(d.layers),
      [x] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1),
      y = h.indexOf(x),
      C = f ? h.indexOf(f) : -1,
      b = d.layersWithOutsidePointerEventsDisabled.size > 0,
      w = C >= y,
      R = Ti((E) => {
        const P = E.target,
          O = [...d.branches].some((_) => _.contains(P));
        !w || O || (o?.(E), c?.(E), E.defaultPrevented || i?.());
      }, p),
      N = Oi((E) => {
        const P = E.target;
        [...d.branches].some((_) => _.contains(P)) || (s?.(E), c?.(E), E.defaultPrevented || i?.());
      }, p);
    return (
      Si((E) => {
        C === d.layers.size - 1 && (r?.(E), !E.defaultPrevented && i && (E.preventDefault(), i()));
      }, p),
      a.useEffect(() => {
        if (f)
          return (
            n &&
              (d.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((pn = p.body.style.pointerEvents), (p.body.style.pointerEvents = "none")),
              d.layersWithOutsidePointerEventsDisabled.add(f)),
            d.layers.add(f),
            hn(),
            () => {
              n &&
                d.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (p.body.style.pointerEvents = pn);
            }
          );
      }, [f, p, n, d]),
      a.useEffect(
        () => () => {
          f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), hn());
        },
        [f, d],
      ),
      a.useEffect(() => {
        const E = () => v({});
        return (document.addEventListener(Lt, E), () => document.removeEventListener(Lt, E));
      }, []),
      l.jsx(B.div, {
        ...m,
        ref: g,
        style: { pointerEvents: b ? (w ? "auto" : "none") : void 0, ...e.style },
        onFocusCapture: A(e.onFocusCapture, N.onFocusCapture),
        onBlurCapture: A(e.onBlurCapture, N.onBlurCapture),
        onPointerDownCapture: A(e.onPointerDownCapture, R.onPointerDownCapture),
      })
    );
  });
vr.displayName = Ni;
var Ai = "DismissableLayerBranch",
  _i = a.forwardRef((e, t) => {
    const n = a.useContext(hr),
      r = a.useRef(null),
      o = U(t, r);
    return (
      a.useEffect(() => {
        const s = r.current;
        if (s)
          return (
            n.branches.add(s),
            () => {
              n.branches.delete(s);
            }
          );
      }, [n.branches]),
      l.jsx(B.div, { ...e, ref: o })
    );
  });
_i.displayName = Ai;
function Ti(e, t = globalThis?.document) {
  const n = ee(e),
    r = a.useRef(!1),
    o = a.useRef(() => {});
  return (
    a.useEffect(() => {
      const s = (i) => {
          if (i.target && !r.current) {
            let m = function () {
              gr(Pi, n, d, { discrete: !0 });
            };
            const d = { originalEvent: i };
            i.pointerType === "touch"
              ? (t.removeEventListener("click", o.current),
                (o.current = m),
                t.addEventListener("click", o.current, { once: !0 }))
              : m();
          } else t.removeEventListener("click", o.current);
          r.current = !1;
        },
        c = window.setTimeout(() => {
          t.addEventListener("pointerdown", s);
        }, 0);
      return () => {
        (window.clearTimeout(c),
          t.removeEventListener("pointerdown", s),
          t.removeEventListener("click", o.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function Oi(e, t = globalThis?.document) {
  const n = ee(e),
    r = a.useRef(!1);
  return (
    a.useEffect(() => {
      const o = (s) => {
        s.target && !r.current && gr(Mi, n, { originalEvent: s }, { discrete: !1 });
      };
      return (t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o));
    }, [t, n]),
    { onFocusCapture: () => (r.current = !0), onBlurCapture: () => (r.current = !1) }
  );
}
function hn() {
  const e = new CustomEvent(Lt);
  document.dispatchEvent(e);
}
function gr(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }), r ? Un(o, s) : o.dispatchEvent(s));
}
var St = 0;
function ji() {
  a.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? vn()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? vn()),
      St++,
      () => {
        (St === 1 &&
          document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()),
          St--);
      }
    );
  }, []);
}
function vn() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Nt = "focusScope.autoFocusOnMount",
  Pt = "focusScope.autoFocusOnUnmount",
  gn = { bubbles: !1, cancelable: !0 },
  Di = "FocusScope",
  xr = a.forwardRef((e, t) => {
    const { loop: n = !1, trapped: r = !1, onMountAutoFocus: o, onUnmountAutoFocus: s, ...c } = e,
      [i, m] = a.useState(null),
      d = ee(o),
      f = ee(s),
      u = a.useRef(null),
      p = U(t, (h) => m(h)),
      v = a.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (a.useEffect(() => {
      if (r) {
        let h = function (b) {
            if (v.paused || !i) return;
            const w = b.target;
            i.contains(w) ? (u.current = w) : oe(u.current, { select: !0 });
          },
          x = function (b) {
            if (v.paused || !i) return;
            const w = b.relatedTarget;
            w !== null && (i.contains(w) || oe(u.current, { select: !0 }));
          },
          y = function (b) {
            if (document.activeElement === document.body)
              for (const R of b) R.removedNodes.length > 0 && oe(i);
          };
        (document.addEventListener("focusin", h), document.addEventListener("focusout", x));
        const C = new MutationObserver(y);
        return (
          i && C.observe(i, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", h),
              document.removeEventListener("focusout", x),
              C.disconnect());
          }
        );
      }
    }, [r, i, v.paused]),
      a.useEffect(() => {
        if (i) {
          yn.add(v);
          const h = document.activeElement;
          if (!i.contains(h)) {
            const y = new CustomEvent(Nt, gn);
            (i.addEventListener(Nt, d),
              i.dispatchEvent(y),
              y.defaultPrevented ||
                (Ii(Bi(yr(i)), { select: !0 }), document.activeElement === h && oe(i)));
          }
          return () => {
            (i.removeEventListener(Nt, d),
              setTimeout(() => {
                const y = new CustomEvent(Pt, gn);
                (i.addEventListener(Pt, f),
                  i.dispatchEvent(y),
                  y.defaultPrevented || oe(h ?? document.body, { select: !0 }),
                  i.removeEventListener(Pt, f),
                  yn.remove(v));
              }, 0));
          };
        }
      }, [i, d, f, v]));
    const g = a.useCallback(
      (h) => {
        if ((!n && !r) || v.paused) return;
        const x = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey,
          y = document.activeElement;
        if (x && y) {
          const C = h.currentTarget,
            [b, w] = Li(C);
          b && w
            ? !h.shiftKey && y === w
              ? (h.preventDefault(), n && oe(b, { select: !0 }))
              : h.shiftKey && y === b && (h.preventDefault(), n && oe(w, { select: !0 }))
            : y === C && h.preventDefault();
        }
      },
      [n, r, v.paused],
    );
    return l.jsx(B.div, { tabIndex: -1, ...c, ref: p, onKeyDown: g });
  });
xr.displayName = Di;
function Ii(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e) if ((oe(r, { select: t }), document.activeElement !== n)) return;
}
function Li(e) {
  const t = yr(e),
    n = xn(t, e),
    r = xn(t.reverse(), e);
  return [n, r];
}
function yr(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function xn(e, t) {
  for (const n of e) if (!Fi(n, { upTo: t })) return n;
}
function Fi(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ki(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function oe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && ki(e) && t && e.select());
  }
}
var yn = $i();
function $i() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && n?.pause(), (e = wn(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = wn(e, t)), e[0]?.resume());
    },
  };
}
function wn(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function Bi(e) {
  return e.filter((t) => t.tagName !== "A");
}
const Wi = ["top", "right", "bottom", "left"],
  ce = Math.min,
  H = Math.max,
  at = Math.round,
  Xe = Math.floor,
  Q = (e) => ({ x: e, y: e }),
  Vi = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Ft(e, t, n) {
  return H(e, ce(t, n));
}
function te(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ne(e) {
  return e.split("-")[0];
}
function Pe(e) {
  return e.split("-")[1];
}
function zt(e) {
  return e === "x" ? "y" : "x";
}
function Yt(e) {
  return e === "y" ? "height" : "width";
}
function Z(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Xt(e) {
  return zt(Z(e));
}
function Ki(e, t, n) {
  n === void 0 && (n = !1);
  const r = Pe(e),
    o = Xt(e),
    s = Yt(o);
  let c =
    o === "x" ? (r === (n ? "end" : "start") ? "right" : "left") : r === "start" ? "bottom" : "top";
  return (t.reference[s] > t.floating[s] && (c = ct(c)), [c, ct(c)]);
}
function Ui(e) {
  const t = ct(e);
  return [kt(e), t, kt(t)];
}
function kt(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const bn = ["left", "right"],
  Cn = ["right", "left"],
  Hi = ["top", "bottom"],
  Gi = ["bottom", "top"];
function zi(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? Cn : bn) : t ? bn : Cn;
    case "left":
    case "right":
      return t ? Hi : Gi;
    default:
      return [];
  }
}
function Yi(e, t, n, r) {
  const o = Pe(e);
  let s = zi(ne(e), n === "start", r);
  return (o && ((s = s.map((c) => c + "-" + o)), t && (s = s.concat(s.map(kt)))), s);
}
function ct(e) {
  const t = ne(e);
  return Vi[t] + e.slice(t.length);
}
function Xi(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function wr(e) {
  return typeof e != "number" ? Xi(e) : { top: e, right: e, bottom: e, left: e };
}
function lt(e) {
  const { x: t, y: n, width: r, height: o } = e;
  return { width: r, height: o, top: n, left: t, right: t + r, bottom: n + o, x: t, y: n };
}
function En(e, t, n) {
  let { reference: r, floating: o } = e;
  const s = Z(t),
    c = Xt(t),
    i = Yt(c),
    m = ne(t),
    d = s === "y",
    f = r.x + r.width / 2 - o.width / 2,
    u = r.y + r.height / 2 - o.height / 2,
    p = r[i] / 2 - o[i] / 2;
  let v;
  switch (m) {
    case "top":
      v = { x: f, y: r.y - o.height };
      break;
    case "bottom":
      v = { x: f, y: r.y + r.height };
      break;
    case "right":
      v = { x: r.x + r.width, y: u };
      break;
    case "left":
      v = { x: r.x - o.width, y: u };
      break;
    default:
      v = { x: r.x, y: r.y };
  }
  switch (Pe(t)) {
    case "start":
      v[c] -= p * (n && d ? -1 : 1);
      break;
    case "end":
      v[c] += p * (n && d ? -1 : 1);
      break;
  }
  return v;
}
async function qi(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: o, platform: s, rects: c, elements: i, strategy: m } = e,
    {
      boundary: d = "clippingAncestors",
      rootBoundary: f = "viewport",
      elementContext: u = "floating",
      altBoundary: p = !1,
      padding: v = 0,
    } = te(t, e),
    g = wr(v),
    x = i[p ? (u === "floating" ? "reference" : "floating") : u],
    y = lt(
      await s.getClippingRect({
        element:
          (n = await (s.isElement == null ? void 0 : s.isElement(x))) == null || n
            ? x
            : x.contextElement ||
              (await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating))),
        boundary: d,
        rootBoundary: f,
        strategy: m,
      }),
    ),
    C =
      u === "floating"
        ? { x: r, y: o, width: c.floating.width, height: c.floating.height }
        : c.reference,
    b = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)),
    w = (await (s.isElement == null ? void 0 : s.isElement(b)))
      ? (await (s.getScale == null ? void 0 : s.getScale(b))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    R = lt(
      s.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: i,
            rect: C,
            offsetParent: b,
            strategy: m,
          })
        : C,
    );
  return {
    top: (y.top - R.top + g.top) / w.y,
    bottom: (R.bottom - y.bottom + g.bottom) / w.y,
    left: (y.left - R.left + g.left) / w.x,
    right: (R.right - y.right + g.right) / w.x,
  };
}
const Zi = 50,
  Qi = async (e, t, n) => {
    const {
        placement: r = "bottom",
        strategy: o = "absolute",
        middleware: s = [],
        platform: c,
      } = n,
      i = c.detectOverflow ? c : { ...c, detectOverflow: qi },
      m = await (c.isRTL == null ? void 0 : c.isRTL(t));
    let d = await c.getElementRects({ reference: e, floating: t, strategy: o }),
      { x: f, y: u } = En(d, r, m),
      p = r,
      v = 0;
    const g = {};
    for (let h = 0; h < s.length; h++) {
      const x = s[h];
      if (!x) continue;
      const { name: y, fn: C } = x,
        {
          x: b,
          y: w,
          data: R,
          reset: N,
        } = await C({
          x: f,
          y: u,
          initialPlacement: r,
          placement: p,
          strategy: o,
          middlewareData: g,
          rects: d,
          platform: i,
          elements: { reference: e, floating: t },
        });
      ((f = b ?? f),
        (u = w ?? u),
        (g[y] = { ...g[y], ...R }),
        N &&
          v < Zi &&
          (v++,
          typeof N == "object" &&
            (N.placement && (p = N.placement),
            N.rects &&
              (d =
                N.rects === !0
                  ? await c.getElementRects({ reference: e, floating: t, strategy: o })
                  : N.rects),
            ({ x: f, y: u } = En(d, p, m))),
          (h = -1)));
    }
    return { x: f, y: u, placement: p, strategy: o, middlewareData: g };
  },
  Ji = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const { x: n, y: r, placement: o, rects: s, platform: c, elements: i, middlewareData: m } = t,
        { element: d, padding: f = 0 } = te(e, t) || {};
      if (d == null) return {};
      const u = wr(f),
        p = { x: n, y: r },
        v = Xt(o),
        g = Yt(v),
        h = await c.getDimensions(d),
        x = v === "y",
        y = x ? "top" : "left",
        C = x ? "bottom" : "right",
        b = x ? "clientHeight" : "clientWidth",
        w = s.reference[g] + s.reference[v] - p[v] - s.floating[g],
        R = p[v] - s.reference[v],
        N = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(d));
      let E = N ? N[b] : 0;
      (!E || !(await (c.isElement == null ? void 0 : c.isElement(N)))) &&
        (E = i.floating[b] || s.floating[g]);
      const P = w / 2 - R / 2,
        O = E / 2 - h[g] / 2 - 1,
        _ = ce(u[y], O),
        j = ce(u[C], O),
        I = _,
        L = E - h[g] - j,
        D = E / 2 - h[g] / 2 + P,
        W = Ft(I, D, L),
        T =
          !m.arrow &&
          Pe(o) != null &&
          D !== W &&
          s.reference[g] / 2 - (D < I ? _ : j) - h[g] / 2 < 0,
        k = T ? (D < I ? D - I : D - L) : 0;
      return {
        [v]: p[v] + k,
        data: { [v]: W, centerOffset: D - W - k, ...(T && { alignmentOffset: k }) },
        reset: T,
      };
    },
  }),
  ea = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: o,
              middlewareData: s,
              rects: c,
              initialPlacement: i,
              platform: m,
              elements: d,
            } = t,
            {
              mainAxis: f = !0,
              crossAxis: u = !0,
              fallbackPlacements: p,
              fallbackStrategy: v = "bestFit",
              fallbackAxisSideDirection: g = "none",
              flipAlignment: h = !0,
              ...x
            } = te(e, t);
          if ((n = s.arrow) != null && n.alignmentOffset) return {};
          const y = ne(o),
            C = Z(i),
            b = ne(i) === i,
            w = await (m.isRTL == null ? void 0 : m.isRTL(d.floating)),
            R = p || (b || !h ? [ct(i)] : Ui(i)),
            N = g !== "none";
          !p && N && R.push(...Yi(i, h, g, w));
          const E = [i, ...R],
            P = await m.detectOverflow(t, x),
            O = [];
          let _ = ((r = s.flip) == null ? void 0 : r.overflows) || [];
          if ((f && O.push(P[y]), u)) {
            const D = Ki(o, c, w);
            O.push(P[D[0]], P[D[1]]);
          }
          if (((_ = [..._, { placement: o, overflows: O }]), !O.every((D) => D <= 0))) {
            var j, I;
            const D = (((j = s.flip) == null ? void 0 : j.index) || 0) + 1,
              W = E[D];
            if (
              W &&
              (!(u === "alignment" ? C !== Z(W) : !1) ||
                _.every((M) => (Z(M.placement) === C ? M.overflows[0] > 0 : !0)))
            )
              return { data: { index: D, overflows: _ }, reset: { placement: W } };
            let T =
              (I = _.filter((k) => k.overflows[0] <= 0).sort(
                (k, M) => k.overflows[1] - M.overflows[1],
              )[0]) == null
                ? void 0
                : I.placement;
            if (!T)
              switch (v) {
                case "bestFit": {
                  var L;
                  const k =
                    (L = _.filter((M) => {
                      if (N) {
                        const S = Z(M.placement);
                        return S === C || S === "y";
                      }
                      return !0;
                    })
                      .map((M) => [
                        M.placement,
                        M.overflows.filter((S) => S > 0).reduce((S, V) => S + V, 0),
                      ])
                      .sort((M, S) => M[1] - S[1])[0]) == null
                      ? void 0
                      : L[0];
                  k && (T = k);
                  break;
                }
                case "initialPlacement":
                  T = i;
                  break;
              }
            if (o !== T) return { reset: { placement: T } };
          }
          return {};
        },
      }
    );
  };
function Rn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function Sn(e) {
  return Wi.some((t) => e[t] >= 0);
}
const ta = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(t) {
          const { rects: n, platform: r } = t,
            { strategy: o = "referenceHidden", ...s } = te(e, t);
          switch (o) {
            case "referenceHidden": {
              const c = await r.detectOverflow(t, { ...s, elementContext: "reference" }),
                i = Rn(c, n.reference);
              return { data: { referenceHiddenOffsets: i, referenceHidden: Sn(i) } };
            }
            case "escaped": {
              const c = await r.detectOverflow(t, { ...s, altBoundary: !0 }),
                i = Rn(c, n.floating);
              return { data: { escapedOffsets: i, escaped: Sn(i) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  br = new Set(["left", "top"]);
async function na(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    c = ne(n),
    i = Pe(n),
    m = Z(n) === "y",
    d = br.has(c) ? -1 : 1,
    f = s && m ? -1 : 1,
    u = te(t, e);
  let {
    mainAxis: p,
    crossAxis: v,
    alignmentAxis: g,
  } = typeof u == "number"
    ? { mainAxis: u, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: u.mainAxis || 0, crossAxis: u.crossAxis || 0, alignmentAxis: u.alignmentAxis };
  return (
    i && typeof g == "number" && (v = i === "end" ? g * -1 : g),
    m ? { x: v * f, y: p * d } : { x: p * d, y: v * f }
  );
}
const ra = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: o, y: s, placement: c, middlewareData: i } = t,
            m = await na(t, e);
          return c === ((n = i.offset) == null ? void 0 : n.placement) &&
            (r = i.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: o + m.x, y: s + m.y, data: { ...m, placement: c } };
        },
      }
    );
  },
  oa = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: o, platform: s } = t,
            {
              mainAxis: c = !0,
              crossAxis: i = !1,
              limiter: m = {
                fn: (y) => {
                  let { x: C, y: b } = y;
                  return { x: C, y: b };
                },
              },
              ...d
            } = te(e, t),
            f = { x: n, y: r },
            u = await s.detectOverflow(t, d),
            p = Z(ne(o)),
            v = zt(p);
          let g = f[v],
            h = f[p];
          if (c) {
            const y = v === "y" ? "top" : "left",
              C = v === "y" ? "bottom" : "right",
              b = g + u[y],
              w = g - u[C];
            g = Ft(b, g, w);
          }
          if (i) {
            const y = p === "y" ? "top" : "left",
              C = p === "y" ? "bottom" : "right",
              b = h + u[y],
              w = h - u[C];
            h = Ft(b, h, w);
          }
          const x = m.fn({ ...t, [v]: g, [p]: h });
          return { ...x, data: { x: x.x - n, y: x.y - r, enabled: { [v]: c, [p]: i } } };
        },
      }
    );
  },
  sa = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: o, rects: s, middlewareData: c } = t,
            { offset: i = 0, mainAxis: m = !0, crossAxis: d = !0 } = te(e, t),
            f = { x: n, y: r },
            u = Z(o),
            p = zt(u);
          let v = f[p],
            g = f[u];
          const h = te(i, t),
            x =
              typeof h == "number"
                ? { mainAxis: h, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...h };
          if (m) {
            const b = p === "y" ? "height" : "width",
              w = s.reference[p] - s.floating[b] + x.mainAxis,
              R = s.reference[p] + s.reference[b] - x.mainAxis;
            v < w ? (v = w) : v > R && (v = R);
          }
          if (d) {
            var y, C;
            const b = p === "y" ? "width" : "height",
              w = br.has(ne(o)),
              R =
                s.reference[u] -
                s.floating[b] +
                ((w && ((y = c.offset) == null ? void 0 : y[u])) || 0) +
                (w ? 0 : x.crossAxis),
              N =
                s.reference[u] +
                s.reference[b] +
                (w ? 0 : ((C = c.offset) == null ? void 0 : C[u]) || 0) -
                (w ? x.crossAxis : 0);
            g < R ? (g = R) : g > N && (g = N);
          }
          return { [p]: v, [u]: g };
        },
      }
    );
  },
  ia = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var n, r;
          const { placement: o, rects: s, platform: c, elements: i } = t,
            { apply: m = () => {}, ...d } = te(e, t),
            f = await c.detectOverflow(t, d),
            u = ne(o),
            p = Pe(o),
            v = Z(o) === "y",
            { width: g, height: h } = s.floating;
          let x, y;
          u === "top" || u === "bottom"
            ? ((x = u),
              (y =
                p === ((await (c.isRTL == null ? void 0 : c.isRTL(i.floating))) ? "start" : "end")
                  ? "left"
                  : "right"))
            : ((y = u), (x = p === "end" ? "top" : "bottom"));
          const C = h - f.top - f.bottom,
            b = g - f.left - f.right,
            w = ce(h - f[x], C),
            R = ce(g - f[y], b),
            N = !t.middlewareData.shift;
          let E = w,
            P = R;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (P = b),
            (r = t.middlewareData.shift) != null && r.enabled.y && (E = C),
            N && !p)
          ) {
            const _ = H(f.left, 0),
              j = H(f.right, 0),
              I = H(f.top, 0),
              L = H(f.bottom, 0);
            v
              ? (P = g - 2 * (_ !== 0 || j !== 0 ? _ + j : H(f.left, f.right)))
              : (E = h - 2 * (I !== 0 || L !== 0 ? I + L : H(f.top, f.bottom)));
          }
          await m({ ...t, availableWidth: P, availableHeight: E });
          const O = await c.getDimensions(i.floating);
          return g !== O.width || h !== O.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  };
function ht() {
  return typeof window < "u";
}
function Me(e) {
  return Cr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function G(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function J(e) {
  var t;
  return (t = (Cr(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Cr(e) {
  return ht() ? e instanceof Node || e instanceof G(e).Node : !1;
}
function Y(e) {
  return ht() ? e instanceof Element || e instanceof G(e).Element : !1;
}
function re(e) {
  return ht() ? e instanceof HTMLElement || e instanceof G(e).HTMLElement : !1;
}
function Nn(e) {
  return !ht() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof G(e).ShadowRoot;
}
function Ve(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = X(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && o !== "inline" && o !== "contents";
}
function aa(e) {
  return /^(table|td|th)$/.test(Me(e));
}
function vt(e) {
  try {
    if (e.matches(":popover-open")) return !0;
  } catch {}
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const ca = /transform|translate|scale|rotate|perspective|filter/,
  la = /paint|layout|strict|content/,
  me = (e) => !!e && e !== "none";
let Mt;
function qt(e) {
  const t = Y(e) ? X(e) : e;
  return (
    me(t.transform) ||
    me(t.translate) ||
    me(t.scale) ||
    me(t.rotate) ||
    me(t.perspective) ||
    (!Zt() && (me(t.backdropFilter) || me(t.filter))) ||
    ca.test(t.willChange || "") ||
    la.test(t.contain || "")
  );
}
function ua(e) {
  let t = le(e);
  for (; re(t) && !Ee(t); ) {
    if (qt(t)) return t;
    if (vt(t)) return null;
    t = le(t);
  }
  return null;
}
function Zt() {
  return (
    Mt == null &&
      (Mt = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")),
    Mt
  );
}
function Ee(e) {
  return /^(html|body|#document)$/.test(Me(e));
}
function X(e) {
  return G(e).getComputedStyle(e);
}
function gt(e) {
  return Y(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function le(e) {
  if (Me(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (Nn(e) && e.host) || J(e);
  return Nn(t) ? t.host : t;
}
function Er(e) {
  const t = le(e);
  return Ee(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : re(t) && Ve(t) ? t : Er(t);
}
function ke(e, t, n) {
  var r;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const o = Er(e),
    s = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    c = G(o);
  if (s) {
    const i = $t(c);
    return t.concat(c, c.visualViewport || [], Ve(o) ? o : [], i && n ? ke(i) : []);
  } else return t.concat(o, ke(o, [], n));
}
function $t(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Rr(e) {
  const t = X(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const o = re(e),
    s = o ? e.offsetWidth : n,
    c = o ? e.offsetHeight : r,
    i = at(n) !== s || at(r) !== c;
  return (i && ((n = s), (r = c)), { width: n, height: r, $: i });
}
function Qt(e) {
  return Y(e) ? e : e.contextElement;
}
function be(e) {
  const t = Qt(e);
  if (!re(t)) return Q(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: s } = Rr(t);
  let c = (s ? at(n.width) : n.width) / r,
    i = (s ? at(n.height) : n.height) / o;
  return (
    (!c || !Number.isFinite(c)) && (c = 1),
    (!i || !Number.isFinite(i)) && (i = 1),
    { x: c, y: i }
  );
}
const da = Q(0);
function Sr(e) {
  const t = G(e);
  return !Zt() || !t.visualViewport
    ? da
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function fa(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== G(e)) ? !1 : t);
}
function pe(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const o = e.getBoundingClientRect(),
    s = Qt(e);
  let c = Q(1);
  t && (r ? Y(r) && (c = be(r)) : (c = be(e)));
  const i = fa(s, n, r) ? Sr(s) : Q(0);
  let m = (o.left + i.x) / c.x,
    d = (o.top + i.y) / c.y,
    f = o.width / c.x,
    u = o.height / c.y;
  if (s) {
    const p = G(s),
      v = r && Y(r) ? G(r) : r;
    let g = p,
      h = $t(g);
    for (; h && r && v !== g; ) {
      const x = be(h),
        y = h.getBoundingClientRect(),
        C = X(h),
        b = y.left + (h.clientLeft + parseFloat(C.paddingLeft)) * x.x,
        w = y.top + (h.clientTop + parseFloat(C.paddingTop)) * x.y;
      ((m *= x.x), (d *= x.y), (f *= x.x), (u *= x.y), (m += b), (d += w), (g = G(h)), (h = $t(g)));
    }
  }
  return lt({ width: f, height: u, x: m, y: d });
}
function xt(e, t) {
  const n = gt(e).scrollLeft;
  return t ? t.left + n : pe(J(e)).left + n;
}
function Nr(e, t) {
  const n = e.getBoundingClientRect(),
    r = n.left + t.scrollLeft - xt(e, n),
    o = n.top + t.scrollTop;
  return { x: r, y: o };
}
function ma(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
  const s = o === "fixed",
    c = J(r),
    i = t ? vt(t.floating) : !1;
  if (r === c || (i && s)) return n;
  let m = { scrollLeft: 0, scrollTop: 0 },
    d = Q(1);
  const f = Q(0),
    u = re(r);
  if ((u || (!u && !s)) && ((Me(r) !== "body" || Ve(c)) && (m = gt(r)), u)) {
    const v = pe(r);
    ((d = be(r)), (f.x = v.x + r.clientLeft), (f.y = v.y + r.clientTop));
  }
  const p = c && !u && !s ? Nr(c, m) : Q(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - m.scrollLeft * d.x + f.x + p.x,
    y: n.y * d.y - m.scrollTop * d.y + f.y + p.y,
  };
}
function pa(e) {
  return Array.from(e.getClientRects());
}
function ha(e) {
  const t = J(e),
    n = gt(e),
    r = e.ownerDocument.body,
    o = H(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    s = H(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let c = -n.scrollLeft + xt(e);
  const i = -n.scrollTop;
  return (
    X(r).direction === "rtl" && (c += H(t.clientWidth, r.clientWidth) - o),
    { width: o, height: s, x: c, y: i }
  );
}
const Pn = 25;
function va(e, t) {
  const n = G(e),
    r = J(e),
    o = n.visualViewport;
  let s = r.clientWidth,
    c = r.clientHeight,
    i = 0,
    m = 0;
  if (o) {
    ((s = o.width), (c = o.height));
    const f = Zt();
    (!f || (f && t === "fixed")) && ((i = o.offsetLeft), (m = o.offsetTop));
  }
  const d = xt(r);
  if (d <= 0) {
    const f = r.ownerDocument,
      u = f.body,
      p = getComputedStyle(u),
      v =
        (f.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) ||
        0,
      g = Math.abs(r.clientWidth - u.clientWidth - v);
    g <= Pn && (s -= g);
  } else d <= Pn && (s += d);
  return { width: s, height: c, x: i, y: m };
}
function ga(e, t) {
  const n = pe(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    s = re(e) ? be(e) : Q(1),
    c = e.clientWidth * s.x,
    i = e.clientHeight * s.y,
    m = o * s.x,
    d = r * s.y;
  return { width: c, height: i, x: m, y: d };
}
function Mn(e, t, n) {
  let r;
  if (t === "viewport") r = va(e, n);
  else if (t === "document") r = ha(J(e));
  else if (Y(t)) r = ga(t, n);
  else {
    const o = Sr(e);
    r = { x: t.x - o.x, y: t.y - o.y, width: t.width, height: t.height };
  }
  return lt(r);
}
function Pr(e, t) {
  const n = le(e);
  return n === t || !Y(n) || Ee(n) ? !1 : X(n).position === "fixed" || Pr(n, t);
}
function xa(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = ke(e, [], !1).filter((i) => Y(i) && Me(i) !== "body"),
    o = null;
  const s = X(e).position === "fixed";
  let c = s ? le(e) : e;
  for (; Y(c) && !Ee(c); ) {
    const i = X(c),
      m = qt(c);
    (!m && i.position === "fixed" && (o = null),
      (
        s
          ? !m && !o
          : (!m &&
              i.position === "static" &&
              !!o &&
              (o.position === "absolute" || o.position === "fixed")) ||
            (Ve(c) && !m && Pr(e, c))
      )
        ? (r = r.filter((f) => f !== c))
        : (o = i),
      (c = le(c)));
  }
  return (t.set(e, r), r);
}
function ya(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
  const c = [...(n === "clippingAncestors" ? (vt(t) ? [] : xa(t, this._c)) : [].concat(n)), r],
    i = Mn(t, c[0], o);
  let m = i.top,
    d = i.right,
    f = i.bottom,
    u = i.left;
  for (let p = 1; p < c.length; p++) {
    const v = Mn(t, c[p], o);
    ((m = H(v.top, m)), (d = ce(v.right, d)), (f = ce(v.bottom, f)), (u = H(v.left, u)));
  }
  return { width: d - u, height: f - m, x: u, y: m };
}
function wa(e) {
  const { width: t, height: n } = Rr(e);
  return { width: t, height: n };
}
function ba(e, t, n) {
  const r = re(t),
    o = J(t),
    s = n === "fixed",
    c = pe(e, !0, s, t);
  let i = { scrollLeft: 0, scrollTop: 0 };
  const m = Q(0);
  function d() {
    m.x = xt(o);
  }
  if (r || (!r && !s))
    if (((Me(t) !== "body" || Ve(o)) && (i = gt(t)), r)) {
      const v = pe(t, !0, s, t);
      ((m.x = v.x + t.clientLeft), (m.y = v.y + t.clientTop));
    } else o && d();
  s && !r && o && d();
  const f = o && !r && !s ? Nr(o, i) : Q(0),
    u = c.left + i.scrollLeft - m.x - f.x,
    p = c.top + i.scrollTop - m.y - f.y;
  return { x: u, y: p, width: c.width, height: c.height };
}
function At(e) {
  return X(e).position === "static";
}
function An(e, t) {
  if (!re(e) || X(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (J(e) === n && (n = n.ownerDocument.body), n);
}
function Mr(e, t) {
  const n = G(e);
  if (vt(e)) return n;
  if (!re(e)) {
    let o = le(e);
    for (; o && !Ee(o); ) {
      if (Y(o) && !At(o)) return o;
      o = le(o);
    }
    return n;
  }
  let r = An(e, t);
  for (; r && aa(r) && At(r); ) r = An(r, t);
  return r && Ee(r) && At(r) && !qt(r) ? n : r || ua(e) || n;
}
const Ca = async function (e) {
  const t = this.getOffsetParent || Mr,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: ba(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function Ea(e) {
  return X(e).direction === "rtl";
}
const Ra = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ma,
  getDocumentElement: J,
  getClippingRect: ya,
  getOffsetParent: Mr,
  getElementRects: Ca,
  getClientRects: pa,
  getDimensions: wa,
  getScale: be,
  isElement: Y,
  isRTL: Ea,
};
function Ar(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Sa(e, t) {
  let n = null,
    r;
  const o = J(e);
  function s() {
    var i;
    (clearTimeout(r), (i = n) == null || i.disconnect(), (n = null));
  }
  function c(i, m) {
    (i === void 0 && (i = !1), m === void 0 && (m = 1), s());
    const d = e.getBoundingClientRect(),
      { left: f, top: u, width: p, height: v } = d;
    if ((i || t(), !p || !v)) return;
    const g = Xe(u),
      h = Xe(o.clientWidth - (f + p)),
      x = Xe(o.clientHeight - (u + v)),
      y = Xe(f),
      b = {
        rootMargin: -g + "px " + -h + "px " + -x + "px " + -y + "px",
        threshold: H(0, ce(1, m)) || 1,
      };
    let w = !0;
    function R(N) {
      const E = N[0].intersectionRatio;
      if (E !== m) {
        if (!w) return c();
        E
          ? c(!1, E)
          : (r = setTimeout(() => {
              c(!1, 1e-7);
            }, 1e3));
      }
      (E === 1 && !Ar(d, e.getBoundingClientRect()) && c(), (w = !1));
    }
    try {
      n = new IntersectionObserver(R, { ...b, root: o.ownerDocument });
    } catch {
      n = new IntersectionObserver(R, b);
    }
    n.observe(e);
  }
  return (c(!0), s);
}
function Na(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: s = !0,
      elementResize: c = typeof ResizeObserver == "function",
      layoutShift: i = typeof IntersectionObserver == "function",
      animationFrame: m = !1,
    } = r,
    d = Qt(e),
    f = o || s ? [...(d ? ke(d) : []), ...(t ? ke(t) : [])] : [];
  f.forEach((y) => {
    (o && y.addEventListener("scroll", n, { passive: !0 }), s && y.addEventListener("resize", n));
  });
  const u = d && i ? Sa(d, n) : null;
  let p = -1,
    v = null;
  c &&
    ((v = new ResizeObserver((y) => {
      let [C] = y;
      (C &&
        C.target === d &&
        v &&
        t &&
        (v.unobserve(t),
        cancelAnimationFrame(p),
        (p = requestAnimationFrame(() => {
          var b;
          (b = v) == null || b.observe(t);
        }))),
        n());
    })),
    d && !m && v.observe(d),
    t && v.observe(t));
  let g,
    h = m ? pe(e) : null;
  m && x();
  function x() {
    const y = pe(e);
    (h && !Ar(h, y) && n(), (h = y), (g = requestAnimationFrame(x)));
  }
  return (
    n(),
    () => {
      var y;
      (f.forEach((C) => {
        (o && C.removeEventListener("scroll", n), s && C.removeEventListener("resize", n));
      }),
        u?.(),
        (y = v) == null || y.disconnect(),
        (v = null),
        m && cancelAnimationFrame(g));
    }
  );
}
const Pa = ra,
  Ma = oa,
  Aa = ea,
  _a = ia,
  Ta = ta,
  _n = Ji,
  Oa = sa,
  ja = (e, t, n) => {
    const r = new Map(),
      o = { platform: Ra, ...n },
      s = { ...o.platform, _c: r };
    return Qi(e, t, { ...o, platform: s });
  };
var Da = typeof document < "u",
  Ia = function () {},
  et = Da ? a.useLayoutEffect : Ia;
function ut(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!ut(e[r], t[r])) return !1;
      return !0;
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === "_owner" && e.$$typeof) && !ut(e[s], t[s])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function _r(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Tn(e, t) {
  const n = _r(e);
  return Math.round(t * n) / n;
}
function _t(e) {
  const t = a.useRef(e);
  return (
    et(() => {
      t.current = e;
    }),
    t
  );
}
function La(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: r = [],
      platform: o,
      elements: { reference: s, floating: c } = {},
      transform: i = !0,
      whileElementsMounted: m,
      open: d,
    } = e,
    [f, u] = a.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [p, v] = a.useState(r);
  ut(p, r) || v(r);
  const [g, h] = a.useState(null),
    [x, y] = a.useState(null),
    C = a.useCallback((M) => {
      M !== N.current && ((N.current = M), h(M));
    }, []),
    b = a.useCallback((M) => {
      M !== E.current && ((E.current = M), y(M));
    }, []),
    w = s || g,
    R = c || x,
    N = a.useRef(null),
    E = a.useRef(null),
    P = a.useRef(f),
    O = m != null,
    _ = _t(m),
    j = _t(o),
    I = _t(d),
    L = a.useCallback(() => {
      if (!N.current || !E.current) return;
      const M = { placement: t, strategy: n, middleware: p };
      (j.current && (M.platform = j.current),
        ja(N.current, E.current, M).then((S) => {
          const V = { ...S, isPositioned: I.current !== !1 };
          D.current &&
            !ut(P.current, V) &&
            ((P.current = V),
            kn.flushSync(() => {
              u(V);
            }));
        }));
    }, [p, t, n, j, I]);
  et(() => {
    d === !1 &&
      P.current.isPositioned &&
      ((P.current.isPositioned = !1), u((M) => ({ ...M, isPositioned: !1 })));
  }, [d]);
  const D = a.useRef(!1);
  (et(
    () => (
      (D.current = !0),
      () => {
        D.current = !1;
      }
    ),
    [],
  ),
    et(() => {
      if ((w && (N.current = w), R && (E.current = R), w && R)) {
        if (_.current) return _.current(w, R, L);
        L();
      }
    }, [w, R, L, _, O]));
  const W = a.useMemo(
      () => ({ reference: N, floating: E, setReference: C, setFloating: b }),
      [C, b],
    ),
    T = a.useMemo(() => ({ reference: w, floating: R }), [w, R]),
    k = a.useMemo(() => {
      const M = { position: n, left: 0, top: 0 };
      if (!T.floating) return M;
      const S = Tn(T.floating, f.x),
        V = Tn(T.floating, f.y);
      return i
        ? {
            ...M,
            transform: "translate(" + S + "px, " + V + "px)",
            ...(_r(T.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: S, top: V };
    }, [n, i, T.floating, f.x, f.y]);
  return a.useMemo(
    () => ({ ...f, update: L, refs: W, elements: T, floatingStyles: k }),
    [f, L, W, T, k],
  );
}
const Fa = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: r, padding: o } = typeof e == "function" ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? _n({ element: r.current, padding: o }).fn(n)
            : {}
          : r
            ? _n({ element: r, padding: o }).fn(n)
            : {};
      },
    };
  },
  ka = (e, t) => {
    const n = Pa(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  $a = (e, t) => {
    const n = Ma(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  Ba = (e, t) => ({ fn: Oa(e).fn, options: [e, t] }),
  Wa = (e, t) => {
    const n = Aa(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  Va = (e, t) => {
    const n = _a(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  Ka = (e, t) => {
    const n = Ta(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  Ua = (e, t) => {
    const n = Fa(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  };
var Ha = "Arrow",
  Tr = a.forwardRef((e, t) => {
    const { children: n, width: r = 10, height: o = 5, ...s } = e;
    return l.jsx(B.svg, {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : l.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
Tr.displayName = Ha;
var Ga = Tr;
function za(e) {
  const [t, n] = a.useState(void 0);
  return (
    ae(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver((o) => {
          if (!Array.isArray(o) || !o.length) return;
          const s = o[0];
          let c, i;
          if ("borderBoxSize" in s) {
            const m = s.borderBoxSize,
              d = Array.isArray(m) ? m[0] : m;
            ((c = d.inlineSize), (i = d.blockSize));
          } else ((c = e.offsetWidth), (i = e.offsetHeight));
          n({ width: c, height: i });
        });
        return (r.observe(e, { box: "border-box" }), () => r.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var Jt = "Popper",
  [Or, jr] = Se(Jt),
  [Ya, Dr] = Or(Jt),
  Ir = (e) => {
    const { __scopePopper: t, children: n } = e,
      [r, o] = a.useState(null);
    return l.jsx(Ya, { scope: t, anchor: r, onAnchorChange: o, children: n });
  };
Ir.displayName = Jt;
var Lr = "PopperAnchor",
  Fr = a.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e,
      s = Dr(Lr, n),
      c = a.useRef(null),
      i = U(t, c),
      m = a.useRef(null);
    return (
      a.useEffect(() => {
        const d = m.current;
        ((m.current = r?.current || c.current), d !== m.current && s.onAnchorChange(m.current));
      }),
      r ? null : l.jsx(B.div, { ...o, ref: i })
    );
  });
Fr.displayName = Lr;
var en = "PopperContent",
  [Xa, qa] = Or(en),
  kr = a.forwardRef((e, t) => {
    const {
        __scopePopper: n,
        side: r = "bottom",
        sideOffset: o = 0,
        align: s = "center",
        alignOffset: c = 0,
        arrowPadding: i = 0,
        avoidCollisions: m = !0,
        collisionBoundary: d = [],
        collisionPadding: f = 0,
        sticky: u = "partial",
        hideWhenDetached: p = !1,
        updatePositionStrategy: v = "optimized",
        onPlaced: g,
        ...h
      } = e,
      x = Dr(en, n),
      [y, C] = a.useState(null),
      b = U(t, ($) => C($)),
      [w, R] = a.useState(null),
      N = za(w),
      E = N?.width ?? 0,
      P = N?.height ?? 0,
      O = r + (s !== "center" ? "-" + s : ""),
      _ = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f },
      j = Array.isArray(d) ? d : [d],
      I = j.length > 0,
      L = { padding: _, boundary: j.filter(Qa), altBoundary: I },
      {
        refs: D,
        floatingStyles: W,
        placement: T,
        isPositioned: k,
        middlewareData: M,
      } = La({
        strategy: "fixed",
        placement: O,
        whileElementsMounted: (...$) => Na(...$, { animationFrame: v === "always" }),
        elements: { reference: x.anchor },
        middleware: [
          ka({ mainAxis: o + P, alignmentAxis: c }),
          m && $a({ mainAxis: !0, crossAxis: !1, limiter: u === "partial" ? Ba() : void 0, ...L }),
          m && Wa({ ...L }),
          Va({
            ...L,
            apply: ({ elements: $, rects: Te, availableWidth: Xo, availableHeight: qo }) => {
              const { width: Zo, height: Qo } = Te.reference,
                Ge = $.floating.style;
              (Ge.setProperty("--radix-popper-available-width", `${Xo}px`),
                Ge.setProperty("--radix-popper-available-height", `${qo}px`),
                Ge.setProperty("--radix-popper-anchor-width", `${Zo}px`),
                Ge.setProperty("--radix-popper-anchor-height", `${Qo}px`));
            },
          }),
          w && Ua({ element: w, padding: i }),
          Ja({ arrowWidth: E, arrowHeight: P }),
          p && Ka({ strategy: "referenceHidden", ...L }),
        ],
      }),
      [S, V] = Wr(T),
      q = ee(g);
    ae(() => {
      k && q?.();
    }, [k, q]);
    const ue = M.arrow?.x,
      Ae = M.arrow?.y,
      _e = M.arrow?.centerOffset !== 0,
      [He, de] = a.useState();
    return (
      ae(() => {
        y && de(window.getComputedStyle(y).zIndex);
      }, [y]),
      l.jsx("div", {
        ref: D.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...W,
          transform: k ? W.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: He,
          "--radix-popper-transform-origin": [M.transformOrigin?.x, M.transformOrigin?.y].join(" "),
          ...(M.hide?.referenceHidden && { visibility: "hidden", pointerEvents: "none" }),
        },
        dir: e.dir,
        children: l.jsx(Xa, {
          scope: n,
          placedSide: S,
          onArrowChange: R,
          arrowX: ue,
          arrowY: Ae,
          shouldHideArrow: _e,
          children: l.jsx(B.div, {
            "data-side": S,
            "data-align": V,
            ...h,
            ref: b,
            style: { ...h.style, animation: k ? void 0 : "none" },
          }),
        }),
      })
    );
  });
kr.displayName = en;
var $r = "PopperArrow",
  Za = { top: "bottom", right: "left", bottom: "top", left: "right" },
  Br = a.forwardRef(function (t, n) {
    const { __scopePopper: r, ...o } = t,
      s = qa($r, r),
      c = Za[s.placedSide];
    return l.jsx("span", {
      ref: s.onArrowChange,
      style: {
        position: "absolute",
        left: s.arrowX,
        top: s.arrowY,
        [c]: 0,
        transformOrigin: { top: "", right: "0 0", bottom: "center 0", left: "100% 0" }[
          s.placedSide
        ],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[s.placedSide],
        visibility: s.shouldHideArrow ? "hidden" : void 0,
      },
      children: l.jsx(Ga, { ...o, ref: n, style: { ...o.style, display: "block" } }),
    });
  });
Br.displayName = $r;
function Qa(e) {
  return e !== null;
}
var Ja = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t,
      c = o.arrow?.centerOffset !== 0,
      i = c ? 0 : e.arrowWidth,
      m = c ? 0 : e.arrowHeight,
      [d, f] = Wr(n),
      u = { start: "0%", center: "50%", end: "100%" }[f],
      p = (o.arrow?.x ?? 0) + i / 2,
      v = (o.arrow?.y ?? 0) + m / 2;
    let g = "",
      h = "";
    return (
      d === "bottom"
        ? ((g = c ? u : `${p}px`), (h = `${-m}px`))
        : d === "top"
          ? ((g = c ? u : `${p}px`), (h = `${r.floating.height + m}px`))
          : d === "right"
            ? ((g = `${-m}px`), (h = c ? u : `${v}px`))
            : d === "left" && ((g = `${r.floating.width + m}px`), (h = c ? u : `${v}px`)),
      { data: { x: g, y: h } }
    );
  },
});
function Wr(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var ec = Ir,
  tc = Fr,
  nc = kr,
  rc = Br,
  oc = "Portal",
  Vr = a.forwardRef((e, t) => {
    const { container: n, ...r } = e,
      [o, s] = a.useState(!1);
    ae(() => s(!0), []);
    const c = n || (o && globalThis?.document?.body);
    return c ? ts.createPortal(l.jsx(B.div, { ...r, ref: t }), c) : null;
  });
Vr.displayName = oc;
function sc(e) {
  const t = ic(e),
    n = a.forwardRef((r, o) => {
      const { children: s, ...c } = r,
        i = a.Children.toArray(s),
        m = i.find(cc);
      if (m) {
        const d = m.props.children,
          f = i.map((u) =>
            u === m
              ? a.Children.count(d) > 1
                ? a.Children.only(null)
                : a.isValidElement(d)
                  ? d.props.children
                  : null
              : u,
          );
        return l.jsx(t, {
          ...c,
          ref: o,
          children: a.isValidElement(d) ? a.cloneElement(d, void 0, f) : null,
        });
      }
      return l.jsx(t, { ...c, ref: o, children: s });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
function ic(e) {
  const t = a.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (a.isValidElement(o)) {
      const c = uc(o),
        i = lc(s, o.props);
      return (o.type !== a.Fragment && (i.ref = r ? he(r, c) : c), a.cloneElement(o, i));
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var ac = Symbol("radix.slottable");
function cc(e) {
  return (
    a.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === ac
  );
}
function lc(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      s = t[r];
    /^on[A-Z]/.test(r)
      ? o && s
        ? (n[r] = (...i) => {
            const m = s(...i);
            return (o(...i), m);
          })
        : o && (n[r] = o)
      : r === "style"
        ? (n[r] = { ...o, ...s })
        : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function uc(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var dc = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  xe = new WeakMap(),
  qe = new WeakMap(),
  Ze = {},
  Tt = 0,
  Kr = function (e) {
    return e && (e.host || Kr(e.parentNode));
  },
  fc = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = Kr(n);
        return r && e.contains(r)
          ? r
          : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  mc = function (e, t, n, r) {
    var o = fc(t, Array.isArray(e) ? e : [e]);
    Ze[n] || (Ze[n] = new WeakMap());
    var s = Ze[n],
      c = [],
      i = new Set(),
      m = new Set(o),
      d = function (u) {
        !u || i.has(u) || (i.add(u), d(u.parentNode));
      };
    o.forEach(d);
    var f = function (u) {
      !u ||
        m.has(u) ||
        Array.prototype.forEach.call(u.children, function (p) {
          if (i.has(p)) f(p);
          else
            try {
              var v = p.getAttribute(r),
                g = v !== null && v !== "false",
                h = (xe.get(p) || 0) + 1,
                x = (s.get(p) || 0) + 1;
              (xe.set(p, h),
                s.set(p, x),
                c.push(p),
                h === 1 && g && qe.set(p, !0),
                x === 1 && p.setAttribute(n, "true"),
                g || p.setAttribute(r, "true"));
            } catch (y) {
              console.error("aria-hidden: cannot operate on ", p, y);
            }
        });
    };
    return (
      f(t),
      i.clear(),
      Tt++,
      function () {
        (c.forEach(function (u) {
          var p = xe.get(u) - 1,
            v = s.get(u) - 1;
          (xe.set(u, p),
            s.set(u, v),
            p || (qe.has(u) || u.removeAttribute(r), qe.delete(u)),
            v || u.removeAttribute(n));
        }),
          Tt--,
          Tt || ((xe = new WeakMap()), (xe = new WeakMap()), (qe = new WeakMap()), (Ze = {})));
      }
    );
  },
  pc = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = dc(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))),
        mc(r, o, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  tt = "right-scroll-bar-position",
  nt = "width-before-scroll-bar",
  hc = "with-scroll-bars-hidden",
  vc = "--removed-body-scroll-bar-size";
function Ot(e, t) {
  return (typeof e == "function" ? e(t) : e && (e.current = t), e);
}
function gc(e, t) {
  var n = a.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var xc = typeof window < "u" ? a.useLayoutEffect : a.useEffect,
  On = new WeakMap();
function yc(e, t) {
  var n = gc(null, function (r) {
    return e.forEach(function (o) {
      return Ot(o, r);
    });
  });
  return (
    xc(
      function () {
        var r = On.get(n);
        if (r) {
          var o = new Set(r),
            s = new Set(e),
            c = n.current;
          (o.forEach(function (i) {
            s.has(i) || Ot(i, null);
          }),
            s.forEach(function (i) {
              o.has(i) || Ot(i, c);
            }));
        }
        On.set(n, e);
      },
      [e],
    ),
    n
  );
}
function wc(e) {
  return e;
}
function bc(e, t) {
  t === void 0 && (t = wc);
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (s) {
        var c = t(s, r);
        return (
          n.push(c),
          function () {
            n = n.filter(function (i) {
              return i !== c;
            });
          }
        );
      },
      assignSyncMedium: function (s) {
        for (r = !0; n.length; ) {
          var c = n;
          ((n = []), c.forEach(s));
        }
        n = {
          push: function (i) {
            return s(i);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (s) {
        r = !0;
        var c = [];
        if (n.length) {
          var i = n;
          ((n = []), i.forEach(s), (c = n));
        }
        var m = function () {
            var f = c;
            ((c = []), f.forEach(s));
          },
          d = function () {
            return Promise.resolve().then(m);
          };
        (d(),
          (n = {
            push: function (f) {
              (c.push(f), d());
            },
            filter: function (f) {
              return ((c = c.filter(f)), n);
            },
          }));
      },
    };
  return o;
}
function Cc(e) {
  e === void 0 && (e = {});
  var t = bc(null);
  return ((t.options = se({ async: !0, ssr: !1 }, e)), t);
}
var Ur = function (e) {
  var t = e.sideCar,
    n = $n(e, ["sideCar"]);
  if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return a.createElement(r, se({}, n));
};
Ur.isSideCarExport = !0;
function Ec(e, t) {
  return (e.useMedium(t), Ur);
}
var Hr = Cc(),
  jt = function () {},
  yt = a.forwardRef(function (e, t) {
    var n = a.useRef(null),
      r = a.useState({ onScrollCapture: jt, onWheelCapture: jt, onTouchMoveCapture: jt }),
      o = r[0],
      s = r[1],
      c = e.forwardProps,
      i = e.children,
      m = e.className,
      d = e.removeScrollBar,
      f = e.enabled,
      u = e.shards,
      p = e.sideCar,
      v = e.noRelative,
      g = e.noIsolation,
      h = e.inert,
      x = e.allowPinchZoom,
      y = e.as,
      C = y === void 0 ? "div" : y,
      b = e.gapMode,
      w = $n(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      R = p,
      N = yc([n, t]),
      E = se(se({}, w), o);
    return a.createElement(
      a.Fragment,
      null,
      f &&
        a.createElement(R, {
          sideCar: Hr,
          removeScrollBar: d,
          shards: u,
          noRelative: v,
          noIsolation: g,
          inert: h,
          setCallbacks: s,
          allowPinchZoom: !!x,
          lockRef: n,
          gapMode: b,
        }),
      c
        ? a.cloneElement(a.Children.only(i), se(se({}, E), { ref: N }))
        : a.createElement(C, se({}, E, { className: m, ref: N }), i),
    );
  });
yt.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
yt.classNames = { fullWidth: nt, zeroRight: tt };
var Rc = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function Sc() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Rc();
  return (t && e.setAttribute("nonce", t), e);
}
function Nc(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function Pc(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Mc = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = Sc()) && (Nc(t, n), Pc(t)), e++);
      },
      remove: function () {
        (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  Ac = function () {
    var e = Mc();
    return function (t, n) {
      a.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  Gr = function () {
    var e = Ac(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic;
        return (e(r, o), null);
      };
    return t;
  },
  _c = { left: 0, top: 0, right: 0, gap: 0 },
  Dt = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  Tc = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [Dt(n), Dt(r), Dt(o)];
  },
  Oc = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return _c;
    var t = Tc(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
  },
  jc = Gr(),
  Ce = "data-scroll-locked",
  Dc = function (e, t, n, r) {
    var o = e.left,
      s = e.top,
      c = e.right,
      i = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          hc,
          ` {
   overflow: hidden `,
        )
        .concat(
          r,
          `;
   padding-right: `,
        )
        .concat(i, "px ")
        .concat(
          r,
          `;
  }
  body[`,
        )
        .concat(
          Ce,
          `] {
    overflow: hidden `,
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(r, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `,
                )
                .concat(
                  s,
                  `px;
    padding-right: `,
                )
                .concat(
                  c,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(i, "px ")
                .concat(
                  r,
                  `;
    `,
                ),
            n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          tt,
          ` {
    right: `,
        )
        .concat(i, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(
          nt,
          ` {
    margin-right: `,
        )
        .concat(i, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(tt, " .")
        .concat(
          tt,
          ` {
    right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(nt, " .")
        .concat(
          nt,
          ` {
    margin-right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  body[`,
        )
        .concat(
          Ce,
          `] {
    `,
        )
        .concat(vc, ": ")
        .concat(
          i,
          `px;
  }
`,
        )
    );
  },
  jn = function () {
    var e = parseInt(document.body.getAttribute(Ce) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  Ic = function () {
    a.useEffect(function () {
      return (
        document.body.setAttribute(Ce, (jn() + 1).toString()),
        function () {
          var e = jn() - 1;
          e <= 0 ? document.body.removeAttribute(Ce) : document.body.setAttribute(Ce, e.toString());
        }
      );
    }, []);
  },
  Lc = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? "margin" : r;
    Ic();
    var s = a.useMemo(
      function () {
        return Oc(o);
      },
      [o],
    );
    return a.createElement(jc, { styles: Dc(s, !t, o, n ? "" : "!important") });
  },
  Bt = !1;
if (typeof window < "u")
  try {
    var Qe = Object.defineProperty({}, "passive", {
      get: function () {
        return ((Bt = !0), !0);
      },
    });
    (window.addEventListener("test", Qe, Qe), window.removeEventListener("test", Qe, Qe));
  } catch {
    Bt = !1;
  }
var ye = Bt ? { passive: !1 } : !1,
  Fc = function (e) {
    return e.tagName === "TEXTAREA";
  },
  zr = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Fc(e) && n[t] === "visible");
  },
  kc = function (e) {
    return zr(e, "overflowY");
  },
  $c = function (e) {
    return zr(e, "overflowX");
  },
  Dn = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
      var o = Yr(e, r);
      if (o) {
        var s = Xr(e, r),
          c = s[1],
          i = s[2];
        if (c > i) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  Bc = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  Wc = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  Yr = function (e, t) {
    return e === "v" ? kc(t) : $c(t);
  },
  Xr = function (e, t) {
    return e === "v" ? Bc(t) : Wc(t);
  },
  Vc = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  Kc = function (e, t, n, r, o) {
    var s = Vc(e, window.getComputedStyle(t).direction),
      c = s * r,
      i = n.target,
      m = t.contains(i),
      d = !1,
      f = c > 0,
      u = 0,
      p = 0;
    do {
      if (!i) break;
      var v = Xr(e, i),
        g = v[0],
        h = v[1],
        x = v[2],
        y = h - x - s * g;
      (g || y) && Yr(e, i) && ((u += y), (p += g));
      var C = i.parentNode;
      i = C && C.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? C.host : C;
    } while ((!m && i !== document.body) || (m && (t.contains(i) || t === i)));
    return (((f && Math.abs(u) < 1) || (!f && Math.abs(p) < 1)) && (d = !0), d);
  },
  Je = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  In = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Ln = function (e) {
    return e && "current" in e ? e.current : e;
  },
  Uc = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  Hc = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  Gc = 0,
  we = [];
function zc(e) {
  var t = a.useRef([]),
    n = a.useRef([0, 0]),
    r = a.useRef(),
    o = a.useState(Gc++)[0],
    s = a.useState(Gr)[0],
    c = a.useRef(e);
  (a.useEffect(
    function () {
      c.current = e;
    },
    [e],
  ),
    a.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var h = ns([e.lockRef.current], (e.shards || []).map(Ln), !0).filter(Boolean);
          return (
            h.forEach(function (x) {
              return x.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(o)),
                h.forEach(function (x) {
                  return x.classList.remove("allow-interactivity-".concat(o));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var i = a.useCallback(function (h, x) {
      if (("touches" in h && h.touches.length === 2) || (h.type === "wheel" && h.ctrlKey))
        return !c.current.allowPinchZoom;
      var y = Je(h),
        C = n.current,
        b = "deltaX" in h ? h.deltaX : C[0] - y[0],
        w = "deltaY" in h ? h.deltaY : C[1] - y[1],
        R,
        N = h.target,
        E = Math.abs(b) > Math.abs(w) ? "h" : "v";
      if ("touches" in h && E === "h" && N.type === "range") return !1;
      var P = window.getSelection(),
        O = P && P.anchorNode,
        _ = O ? O === N || O.contains(N) : !1;
      if (_) return !1;
      var j = Dn(E, N);
      if (!j) return !0;
      if ((j ? (R = E) : ((R = E === "v" ? "h" : "v"), (j = Dn(E, N))), !j)) return !1;
      if ((!r.current && "changedTouches" in h && (b || w) && (r.current = R), !R)) return !0;
      var I = r.current || R;
      return Kc(I, x, h, I === "h" ? b : w);
    }, []),
    m = a.useCallback(function (h) {
      var x = h;
      if (!(!we.length || we[we.length - 1] !== s)) {
        var y = "deltaY" in x ? In(x) : Je(x),
          C = t.current.filter(function (R) {
            return (
              R.name === x.type &&
              (R.target === x.target || x.target === R.shadowParent) &&
              Uc(R.delta, y)
            );
          })[0];
        if (C && C.should) {
          x.cancelable && x.preventDefault();
          return;
        }
        if (!C) {
          var b = (c.current.shards || [])
              .map(Ln)
              .filter(Boolean)
              .filter(function (R) {
                return R.contains(x.target);
              }),
            w = b.length > 0 ? i(x, b[0]) : !c.current.noIsolation;
          w && x.cancelable && x.preventDefault();
        }
      }
    }, []),
    d = a.useCallback(function (h, x, y, C) {
      var b = { name: h, delta: x, target: y, should: C, shadowParent: Yc(y) };
      (t.current.push(b),
        setTimeout(function () {
          t.current = t.current.filter(function (w) {
            return w !== b;
          });
        }, 1));
    }, []),
    f = a.useCallback(function (h) {
      ((n.current = Je(h)), (r.current = void 0));
    }, []),
    u = a.useCallback(function (h) {
      d(h.type, In(h), h.target, i(h, e.lockRef.current));
    }, []),
    p = a.useCallback(function (h) {
      d(h.type, Je(h), h.target, i(h, e.lockRef.current));
    }, []);
  a.useEffect(function () {
    return (
      we.push(s),
      e.setCallbacks({ onScrollCapture: u, onWheelCapture: u, onTouchMoveCapture: p }),
      document.addEventListener("wheel", m, ye),
      document.addEventListener("touchmove", m, ye),
      document.addEventListener("touchstart", f, ye),
      function () {
        ((we = we.filter(function (h) {
          return h !== s;
        })),
          document.removeEventListener("wheel", m, ye),
          document.removeEventListener("touchmove", m, ye),
          document.removeEventListener("touchstart", f, ye));
      }
    );
  }, []);
  var v = e.removeScrollBar,
    g = e.inert;
  return a.createElement(
    a.Fragment,
    null,
    g ? a.createElement(s, { styles: Hc(o) }) : null,
    v ? a.createElement(Lc, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  );
}
function Yc(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
const Xc = Ec(Hr, zc);
var qr = a.forwardRef(function (e, t) {
  return a.createElement(yt, se({}, e, { ref: t, sideCar: Xc }));
});
qr.classNames = yt.classNames;
var Wt = ["Enter", " "],
  qc = ["ArrowDown", "PageUp", "Home"],
  Zr = ["ArrowUp", "PageDown", "End"],
  Zc = [...qc, ...Zr],
  Qc = { ltr: [...Wt, "ArrowRight"], rtl: [...Wt, "ArrowLeft"] },
  Jc = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  Ke = "Menu",
  [$e, el, tl] = Kn(Ke),
  [ve, Qr] = Se(Ke, [tl, jr, mt]),
  wt = jr(),
  Jr = mt(),
  [nl, ge] = ve(Ke),
  [rl, Ue] = ve(Ke),
  eo = (e) => {
    const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: s, modal: c = !0 } = e,
      i = wt(t),
      [m, d] = a.useState(null),
      f = a.useRef(!1),
      u = ee(s),
      p = Ht(o);
    return (
      a.useEffect(() => {
        const v = () => {
            ((f.current = !0),
              document.addEventListener("pointerdown", g, { capture: !0, once: !0 }),
              document.addEventListener("pointermove", g, { capture: !0, once: !0 }));
          },
          g = () => (f.current = !1);
        return (
          document.addEventListener("keydown", v, { capture: !0 }),
          () => {
            (document.removeEventListener("keydown", v, { capture: !0 }),
              document.removeEventListener("pointerdown", g, { capture: !0 }),
              document.removeEventListener("pointermove", g, { capture: !0 }));
          }
        );
      }, []),
      l.jsx(ec, {
        ...i,
        children: l.jsx(nl, {
          scope: t,
          open: n,
          onOpenChange: u,
          content: m,
          onContentChange: d,
          children: l.jsx(rl, {
            scope: t,
            onClose: a.useCallback(() => u(!1), [u]),
            isUsingKeyboardRef: f,
            dir: p,
            modal: c,
            children: r,
          }),
        }),
      })
    );
  };
eo.displayName = Ke;
var ol = "MenuAnchor",
  tn = a.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = wt(n);
    return l.jsx(tc, { ...o, ...r, ref: t });
  });
tn.displayName = ol;
var nn = "MenuPortal",
  [sl, to] = ve(nn, { forceMount: void 0 }),
  no = (e) => {
    const { __scopeMenu: t, forceMount: n, children: r, container: o } = e,
      s = ge(nn, t);
    return l.jsx(sl, {
      scope: t,
      forceMount: n,
      children: l.jsx(Ne, {
        present: n || s.open,
        children: l.jsx(Vr, { asChild: !0, container: o, children: r }),
      }),
    });
  };
no.displayName = nn;
var z = "MenuContent",
  [il, rn] = ve(z),
  ro = a.forwardRef((e, t) => {
    const n = to(z, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      s = ge(z, e.__scopeMenu),
      c = Ue(z, e.__scopeMenu);
    return l.jsx($e.Provider, {
      scope: e.__scopeMenu,
      children: l.jsx(Ne, {
        present: r || s.open,
        children: l.jsx($e.Slot, {
          scope: e.__scopeMenu,
          children: c.modal ? l.jsx(al, { ...o, ref: t }) : l.jsx(cl, { ...o, ref: t }),
        }),
      }),
    });
  }),
  al = a.forwardRef((e, t) => {
    const n = ge(z, e.__scopeMenu),
      r = a.useRef(null),
      o = U(t, r);
    return (
      a.useEffect(() => {
        const s = r.current;
        if (s) return pc(s);
      }, []),
      l.jsx(on, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: A(e.onFocusOutside, (s) => s.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  cl = a.forwardRef((e, t) => {
    const n = ge(z, e.__scopeMenu);
    return l.jsx(on, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  ll = sc("MenuContent.ScrollLock"),
  on = a.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: o,
        onOpenAutoFocus: s,
        onCloseAutoFocus: c,
        disableOutsidePointerEvents: i,
        onEntryFocus: m,
        onEscapeKeyDown: d,
        onPointerDownOutside: f,
        onFocusOutside: u,
        onInteractOutside: p,
        onDismiss: v,
        disableOutsideScroll: g,
        ...h
      } = e,
      x = ge(z, n),
      y = Ue(z, n),
      C = wt(n),
      b = Jr(n),
      w = el(n),
      [R, N] = a.useState(null),
      E = a.useRef(null),
      P = U(t, E, x.onContentChange),
      O = a.useRef(0),
      _ = a.useRef(""),
      j = a.useRef(0),
      I = a.useRef(null),
      L = a.useRef("right"),
      D = a.useRef(0),
      W = g ? qr : a.Fragment,
      T = g ? { as: ll, allowPinchZoom: !0 } : void 0,
      k = (S) => {
        const V = _.current + S,
          q = w().filter(($) => !$.disabled),
          ue = document.activeElement,
          Ae = q.find(($) => $.ref.current === ue)?.textValue,
          _e = q.map(($) => $.textValue),
          He = bl(_e, V, Ae),
          de = q.find(($) => $.textValue === He)?.ref.current;
        ((function $(Te) {
          ((_.current = Te),
            window.clearTimeout(O.current),
            Te !== "" && (O.current = window.setTimeout(() => $(""), 1e3)));
        })(V),
          de && setTimeout(() => de.focus()));
      };
    (a.useEffect(() => () => window.clearTimeout(O.current), []), ji());
    const M = a.useCallback((S) => L.current === I.current?.side && El(S, I.current?.area), []);
    return l.jsx(il, {
      scope: n,
      searchRef: _,
      onItemEnter: a.useCallback(
        (S) => {
          M(S) && S.preventDefault();
        },
        [M],
      ),
      onItemLeave: a.useCallback(
        (S) => {
          M(S) || (E.current?.focus(), N(null));
        },
        [M],
      ),
      onTriggerLeave: a.useCallback(
        (S) => {
          M(S) && S.preventDefault();
        },
        [M],
      ),
      pointerGraceTimerRef: j,
      onPointerGraceIntentChange: a.useCallback((S) => {
        I.current = S;
      }, []),
      children: l.jsx(W, {
        ...T,
        children: l.jsx(xr, {
          asChild: !0,
          trapped: o,
          onMountAutoFocus: A(s, (S) => {
            (S.preventDefault(), E.current?.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: c,
          children: l.jsx(vr, {
            asChild: !0,
            disableOutsidePointerEvents: i,
            onEscapeKeyDown: d,
            onPointerDownOutside: f,
            onFocusOutside: u,
            onInteractOutside: p,
            onDismiss: v,
            children: l.jsx(qn, {
              asChild: !0,
              ...b,
              dir: y.dir,
              orientation: "vertical",
              loop: r,
              currentTabStopId: R,
              onCurrentTabStopIdChange: N,
              onEntryFocus: A(m, (S) => {
                y.isUsingKeyboardRef.current || S.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: l.jsx(nc, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": wo(x.open),
                "data-radix-menu-content": "",
                dir: y.dir,
                ...C,
                ...h,
                ref: P,
                style: { outline: "none", ...h.style },
                onKeyDown: A(h.onKeyDown, (S) => {
                  const q = S.target.closest("[data-radix-menu-content]") === S.currentTarget,
                    ue = S.ctrlKey || S.altKey || S.metaKey,
                    Ae = S.key.length === 1;
                  q && (S.key === "Tab" && S.preventDefault(), !ue && Ae && k(S.key));
                  const _e = E.current;
                  if (S.target !== _e || !Zc.includes(S.key)) return;
                  S.preventDefault();
                  const de = w()
                    .filter(($) => !$.disabled)
                    .map(($) => $.ref.current);
                  (Zr.includes(S.key) && de.reverse(), yl(de));
                }),
                onBlur: A(e.onBlur, (S) => {
                  S.currentTarget.contains(S.target) ||
                    (window.clearTimeout(O.current), (_.current = ""));
                }),
                onPointerMove: A(
                  e.onPointerMove,
                  Be((S) => {
                    const V = S.target,
                      q = D.current !== S.clientX;
                    if (S.currentTarget.contains(V) && q) {
                      const ue = S.clientX > D.current ? "right" : "left";
                      ((L.current = ue), (D.current = S.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
ro.displayName = z;
var ul = "MenuGroup",
  sn = a.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx(B.div, { role: "group", ...r, ref: t });
  });
sn.displayName = ul;
var dl = "MenuLabel",
  oo = a.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx(B.div, { ...r, ref: t });
  });
oo.displayName = dl;
var dt = "MenuItem",
  Fn = "menu.itemSelect",
  bt = a.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e,
      s = a.useRef(null),
      c = Ue(dt, e.__scopeMenu),
      i = rn(dt, e.__scopeMenu),
      m = U(t, s),
      d = a.useRef(!1),
      f = () => {
        const u = s.current;
        if (!n && u) {
          const p = new CustomEvent(Fn, { bubbles: !0, cancelable: !0 });
          (u.addEventListener(Fn, (v) => r?.(v), { once: !0 }),
            Un(u, p),
            p.defaultPrevented ? (d.current = !1) : c.onClose());
        }
      };
    return l.jsx(so, {
      ...o,
      ref: m,
      disabled: n,
      onClick: A(e.onClick, f),
      onPointerDown: (u) => {
        (e.onPointerDown?.(u), (d.current = !0));
      },
      onPointerUp: A(e.onPointerUp, (u) => {
        d.current || u.currentTarget?.click();
      }),
      onKeyDown: A(e.onKeyDown, (u) => {
        const p = i.searchRef.current !== "";
        n ||
          (p && u.key === " ") ||
          (Wt.includes(u.key) && (u.currentTarget.click(), u.preventDefault()));
      }),
    });
  });
bt.displayName = dt;
var so = a.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e,
      c = rn(dt, n),
      i = Jr(n),
      m = a.useRef(null),
      d = U(t, m),
      [f, u] = a.useState(!1),
      [p, v] = a.useState("");
    return (
      a.useEffect(() => {
        const g = m.current;
        g && v((g.textContent ?? "").trim());
      }, [s.children]),
      l.jsx($e.ItemSlot, {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: l.jsx(Zn, {
          asChild: !0,
          ...i,
          focusable: !r,
          children: l.jsx(B.div, {
            role: "menuitem",
            "data-highlighted": f ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: d,
            onPointerMove: A(
              e.onPointerMove,
              Be((g) => {
                r
                  ? c.onItemLeave(g)
                  : (c.onItemEnter(g),
                    g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: A(
              e.onPointerLeave,
              Be((g) => c.onItemLeave(g)),
            ),
            onFocus: A(e.onFocus, () => u(!0)),
            onBlur: A(e.onBlur, () => u(!1)),
          }),
        }),
      })
    );
  }),
  fl = "MenuCheckboxItem",
  io = a.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return l.jsx(fo, {
      scope: e.__scopeMenu,
      checked: n,
      children: l.jsx(bt, {
        role: "menuitemcheckbox",
        "aria-checked": ft(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": cn(n),
        onSelect: A(o.onSelect, () => r?.(ft(n) ? !0 : !n), { checkForDefaultPrevented: !1 }),
      }),
    });
  });
io.displayName = fl;
var ao = "MenuRadioGroup",
  [ml, pl] = ve(ao, { value: void 0, onValueChange: () => {} }),
  co = a.forwardRef((e, t) => {
    const { value: n, onValueChange: r, ...o } = e,
      s = ee(r);
    return l.jsx(ml, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: s,
      children: l.jsx(sn, { ...o, ref: t }),
    });
  });
co.displayName = ao;
var lo = "MenuRadioItem",
  uo = a.forwardRef((e, t) => {
    const { value: n, ...r } = e,
      o = pl(lo, e.__scopeMenu),
      s = n === o.value;
    return l.jsx(fo, {
      scope: e.__scopeMenu,
      checked: s,
      children: l.jsx(bt, {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": cn(s),
        onSelect: A(r.onSelect, () => o.onValueChange?.(n), { checkForDefaultPrevented: !1 }),
      }),
    });
  });
uo.displayName = lo;
var an = "MenuItemIndicator",
  [fo, hl] = ve(an, { checked: !1 }),
  mo = a.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e,
      s = hl(an, n);
    return l.jsx(Ne, {
      present: r || ft(s.checked) || s.checked === !0,
      children: l.jsx(B.span, { ...o, ref: t, "data-state": cn(s.checked) }),
    });
  });
mo.displayName = an;
var vl = "MenuSeparator",
  po = a.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx(B.div, { role: "separator", "aria-orientation": "horizontal", ...r, ref: t });
  });
po.displayName = vl;
var gl = "MenuArrow",
  ho = a.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = wt(n);
    return l.jsx(rc, { ...o, ...r, ref: t });
  });
ho.displayName = gl;
var xl = "MenuSub",
  [Mu, vo] = ve(xl),
  De = "MenuSubTrigger",
  go = a.forwardRef((e, t) => {
    const n = ge(De, e.__scopeMenu),
      r = Ue(De, e.__scopeMenu),
      o = vo(De, e.__scopeMenu),
      s = rn(De, e.__scopeMenu),
      c = a.useRef(null),
      { pointerGraceTimerRef: i, onPointerGraceIntentChange: m } = s,
      d = { __scopeMenu: e.__scopeMenu },
      f = a.useCallback(() => {
        (c.current && window.clearTimeout(c.current), (c.current = null));
      }, []);
    return (
      a.useEffect(() => f, [f]),
      a.useEffect(() => {
        const u = i.current;
        return () => {
          (window.clearTimeout(u), m(null));
        };
      }, [i, m]),
      l.jsx(tn, {
        asChild: !0,
        ...d,
        children: l.jsx(so, {
          id: o.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": n.open,
          "aria-controls": o.contentId,
          "data-state": wo(n.open),
          ...e,
          ref: he(t, o.onTriggerChange),
          onClick: (u) => {
            (e.onClick?.(u),
              !(e.disabled || u.defaultPrevented) &&
                (u.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: A(
            e.onPointerMove,
            Be((u) => {
              (s.onItemEnter(u),
                !u.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !c.current &&
                  (s.onPointerGraceIntentChange(null),
                  (c.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), f());
                  }, 100))));
            }),
          ),
          onPointerLeave: A(
            e.onPointerLeave,
            Be((u) => {
              f();
              const p = n.content?.getBoundingClientRect();
              if (p) {
                const v = n.content?.dataset.side,
                  g = v === "right",
                  h = g ? -5 : 5,
                  x = p[g ? "left" : "right"],
                  y = p[g ? "right" : "left"];
                (s.onPointerGraceIntentChange({
                  area: [
                    { x: u.clientX + h, y: u.clientY },
                    { x, y: p.top },
                    { x: y, y: p.top },
                    { x: y, y: p.bottom },
                    { x, y: p.bottom },
                  ],
                  side: v,
                }),
                  window.clearTimeout(i.current),
                  (i.current = window.setTimeout(() => s.onPointerGraceIntentChange(null), 300)));
              } else {
                if ((s.onTriggerLeave(u), u.defaultPrevented)) return;
                s.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: A(e.onKeyDown, (u) => {
            const p = s.searchRef.current !== "";
            e.disabled ||
              (p && u.key === " ") ||
              (Qc[r.dir].includes(u.key) &&
                (n.onOpenChange(!0), n.content?.focus(), u.preventDefault()));
          }),
        }),
      })
    );
  });
go.displayName = De;
var xo = "MenuSubContent",
  yo = a.forwardRef((e, t) => {
    const n = to(z, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      s = ge(z, e.__scopeMenu),
      c = Ue(z, e.__scopeMenu),
      i = vo(xo, e.__scopeMenu),
      m = a.useRef(null),
      d = U(t, m);
    return l.jsx($e.Provider, {
      scope: e.__scopeMenu,
      children: l.jsx(Ne, {
        present: r || s.open,
        children: l.jsx($e.Slot, {
          scope: e.__scopeMenu,
          children: l.jsx(on, {
            id: i.contentId,
            "aria-labelledby": i.triggerId,
            ...o,
            ref: d,
            align: "start",
            side: c.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (f) => {
              (c.isUsingKeyboardRef.current && m.current?.focus(), f.preventDefault());
            },
            onCloseAutoFocus: (f) => f.preventDefault(),
            onFocusOutside: A(e.onFocusOutside, (f) => {
              f.target !== i.trigger && s.onOpenChange(!1);
            }),
            onEscapeKeyDown: A(e.onEscapeKeyDown, (f) => {
              (c.onClose(), f.preventDefault());
            }),
            onKeyDown: A(e.onKeyDown, (f) => {
              const u = f.currentTarget.contains(f.target),
                p = Jc[c.dir].includes(f.key);
              u && p && (s.onOpenChange(!1), i.trigger?.focus(), f.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
yo.displayName = xo;
function wo(e) {
  return e ? "open" : "closed";
}
function ft(e) {
  return e === "indeterminate";
}
function cn(e) {
  return ft(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function yl(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function wl(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function bl(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t,
    s = n ? e.indexOf(n) : -1;
  let c = wl(e, Math.max(s, 0));
  o.length === 1 && (c = c.filter((d) => d !== n));
  const m = c.find((d) => d.toLowerCase().startsWith(o.toLowerCase()));
  return m !== n ? m : void 0;
}
function Cl(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, c = t.length - 1; s < t.length; c = s++) {
    const i = t[s],
      m = t[c],
      d = i.x,
      f = i.y,
      u = m.x,
      p = m.y;
    f > r != p > r && n < ((u - d) * (r - f)) / (p - f) + d && (o = !o);
  }
  return o;
}
function El(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Cl(n, t);
}
function Be(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
var Rl = eo,
  Sl = tn,
  Nl = no,
  Pl = ro,
  Ml = sn,
  Al = oo,
  _l = bt,
  Tl = io,
  Ol = co,
  jl = uo,
  Dl = mo,
  Il = po,
  Ll = ho,
  Fl = go,
  kl = yo,
  Ct = "DropdownMenu",
  [$l] = Se(Ct, [Qr]),
  K = Qr(),
  [Bl, bo] = $l(Ct),
  Co = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: r,
        open: o,
        defaultOpen: s,
        onOpenChange: c,
        modal: i = !0,
      } = e,
      m = K(t),
      d = a.useRef(null),
      [f, u] = Ut({ prop: o, defaultProp: s ?? !1, onChange: c, caller: Ct });
    return l.jsx(Bl, {
      scope: t,
      triggerId: ot(),
      triggerRef: d,
      contentId: ot(),
      open: f,
      onOpenChange: u,
      onOpenToggle: a.useCallback(() => u((p) => !p), [u]),
      modal: i,
      children: l.jsx(Rl, { ...m, open: f, onOpenChange: u, dir: r, modal: i, children: n }),
    });
  };
Co.displayName = Ct;
var Eo = "DropdownMenuTrigger",
  Ro = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e,
      s = bo(Eo, n),
      c = K(n);
    return l.jsx(Sl, {
      asChild: !0,
      ...c,
      children: l.jsx(B.button, {
        type: "button",
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": s.open,
        "aria-controls": s.open ? s.contentId : void 0,
        "data-state": s.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...o,
        ref: he(t, s.triggerRef),
        onPointerDown: A(e.onPointerDown, (i) => {
          !r &&
            i.button === 0 &&
            i.ctrlKey === !1 &&
            (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: A(e.onKeyDown, (i) => {
          r ||
            (["Enter", " "].includes(i.key) && s.onOpenToggle(),
            i.key === "ArrowDown" && s.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        }),
      }),
    });
  });
Ro.displayName = Eo;
var Wl = "DropdownMenuPortal",
  So = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = K(t);
    return l.jsx(Nl, { ...r, ...n });
  };
So.displayName = Wl;
var No = "DropdownMenuContent",
  Po = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = bo(No, n),
      s = K(n),
      c = a.useRef(!1);
    return l.jsx(Pl, {
      id: o.contentId,
      "aria-labelledby": o.triggerId,
      ...s,
      ...r,
      ref: t,
      onCloseAutoFocus: A(e.onCloseAutoFocus, (i) => {
        (c.current || o.triggerRef.current?.focus(), (c.current = !1), i.preventDefault());
      }),
      onInteractOutside: A(e.onInteractOutside, (i) => {
        const m = i.detail.originalEvent,
          d = m.button === 0 && m.ctrlKey === !0,
          f = m.button === 2 || d;
        (!o.modal || f) && (c.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
Po.displayName = No;
var Vl = "DropdownMenuGroup",
  Mo = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(Ml, { ...o, ...r, ref: t });
  });
Mo.displayName = Vl;
var Kl = "DropdownMenuLabel",
  Ao = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(Al, { ...o, ...r, ref: t });
  });
Ao.displayName = Kl;
var Ul = "DropdownMenuItem",
  _o = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(_l, { ...o, ...r, ref: t });
  });
_o.displayName = Ul;
var Hl = "DropdownMenuCheckboxItem",
  To = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(Tl, { ...o, ...r, ref: t });
  });
To.displayName = Hl;
var Gl = "DropdownMenuRadioGroup",
  zl = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(Ol, { ...o, ...r, ref: t });
  });
zl.displayName = Gl;
var Yl = "DropdownMenuRadioItem",
  Oo = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(jl, { ...o, ...r, ref: t });
  });
Oo.displayName = Yl;
var Xl = "DropdownMenuItemIndicator",
  jo = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(Dl, { ...o, ...r, ref: t });
  });
jo.displayName = Xl;
var ql = "DropdownMenuSeparator",
  Do = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(Il, { ...o, ...r, ref: t });
  });
Do.displayName = ql;
var Zl = "DropdownMenuArrow",
  Ql = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(Ll, { ...o, ...r, ref: t });
  });
Ql.displayName = Zl;
var Jl = "DropdownMenuSubTrigger",
  Io = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(Fl, { ...o, ...r, ref: t });
  });
Io.displayName = Jl;
var eu = "DropdownMenuSubContent",
  Lo = a.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = K(n);
    return l.jsx(kl, {
      ...o,
      ...r,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
Lo.displayName = eu;
var tu = Co,
  nu = Ro,
  ru = So,
  Fo = Po,
  ou = Mo,
  ko = Ao,
  $o = _o,
  Bo = To,
  Wo = Oo,
  Vo = jo,
  Ko = Do,
  Uo = Io,
  Ho = Lo;
const su = tu,
  iu = nu,
  au = ou,
  cu = a.forwardRef(({ className: e, inset: t, children: n, ...r }, o) =>
    l.jsxs(Uo, {
      ref: o,
      className: F(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        t && "pl-8",
        e,
      ),
      ...r,
      children: [n, l.jsx(fs, { className: "ml-auto" })],
    }),
  );
cu.displayName = Uo.displayName;
const lu = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(Ho, {
    ref: n,
    className: F(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      e,
    ),
    ...t,
  }),
);
lu.displayName = Ho.displayName;
const Go = a.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
  l.jsx(ru, {
    children: l.jsx(Fo, {
      ref: r,
      sideOffset: t,
      className: F(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
        e,
      ),
      ...n,
    }),
  }),
);
Go.displayName = Fo.displayName;
const rt = a.forwardRef(({ className: e, inset: t, ...n }, r) =>
  l.jsx($o, {
    ref: r,
    className: F(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      t && "pl-8",
      e,
    ),
    ...n,
  }),
);
rt.displayName = $o.displayName;
const uu = a.forwardRef(({ className: e, children: t, checked: n, ...r }, o) =>
  l.jsxs(Bo, {
    ref: o,
    className: F(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    checked: n,
    ...r,
    children: [
      l.jsx("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: l.jsx(Vo, { children: l.jsx(ws, { className: "h-4 w-4" }) }),
      }),
      t,
    ],
  }),
);
uu.displayName = Bo.displayName;
const du = a.forwardRef(({ className: e, children: t, ...n }, r) =>
  l.jsxs(Wo, {
    ref: r,
    className: F(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    ...n,
    children: [
      l.jsx("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: l.jsx(Vo, { children: l.jsx(ms, { className: "h-2 w-2 fill-current" }) }),
      }),
      t,
    ],
  }),
);
du.displayName = Wo.displayName;
const zo = a.forwardRef(({ className: e, inset: t, ...n }, r) =>
  l.jsx(ko, { ref: r, className: F("px-2 py-1.5 text-sm font-semibold", t && "pl-8", e), ...n }),
);
zo.displayName = ko.displayName;
const Yo = a.forwardRef(({ className: e, ...t }, n) =>
  l.jsx(Ko, { ref: n, className: F("-mx-1 my-1 h-px bg-muted", e), ...t }),
);
Yo.displayName = Ko.displayName;
const fu = mr(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
function mu({ className: e, variant: t, ...n }) {
  return l.jsx("div", { className: F(fu({ variant: t }), e), ...n });
}
function pu() {
  const { data: e, isLoading: t } = si(),
    n = (e?.low_stock?.length || 0) + (e?.pending_payments || 0) + (e?.delayed_orders || 0);
  return l.jsxs(su, {
    children: [
      l.jsx(iu, {
        asChild: !0,
        children: l.jsxs(pr, {
          variant: "outline",
          size: "icon",
          className: "relative",
          children: [
            l.jsx(ps, { className: "w-4 h-4" }),
            n > 0 &&
              l.jsxs("span", {
                className: "absolute top-1 right-1 flex h-3 w-3",
                children: [
                  l.jsx("span", {
                    className:
                      "animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75",
                  }),
                  l.jsx("span", {
                    className:
                      "relative inline-flex rounded-full h-3 w-3 bg-rose-500 text-[8px] font-bold text-white items-center justify-center",
                    children: n > 9 ? "9+" : n,
                  }),
                ],
              }),
          ],
        }),
      }),
      l.jsxs(Go, {
        className: "w-80",
        align: "end",
        children: [
          l.jsxs(zo, {
            className: "flex items-center justify-between",
            children: [
              "Central de Alertas",
              l.jsxs(mu, { variant: "secondary", children: [n, " alertas"] }),
            ],
          }),
          l.jsx(Yo, {}),
          t
            ? l.jsx("div", {
                className: "p-4 space-y-3",
                children: [1, 2, 3].map((r) =>
                  l.jsx("div", { className: "h-10 w-full animate-pulse bg-muted rounded" }, r),
                ),
              })
            : n === 0
              ? l.jsxs("div", {
                  className:
                    "p-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2",
                  children: [
                    l.jsx(Vn, { className: "w-8 h-8 text-emerald-500 mb-1" }),
                    "Tudo tranquilo por aqui!",
                  ],
                })
              : l.jsxs(au, {
                  className: "max-h-[300px] overflow-y-auto",
                  children: [
                    e?.low_stock &&
                      e.low_stock.length > 0 &&
                      l.jsxs(rt, {
                        className: "cursor-pointer gap-3 p-3 items-start",
                        children: [
                          l.jsx("div", {
                            className: "mt-0.5 bg-rose-100 p-1.5 rounded-full text-rose-600",
                            children: l.jsx(hs, { className: "w-4 h-4" }),
                          }),
                          l.jsxs("div", {
                            className: "flex-1",
                            children: [
                              l.jsx("p", {
                                className: "text-sm font-medium leading-none mb-1",
                                children: "Estoque Crítico",
                              }),
                              l.jsxs("p", {
                                className: "text-xs text-muted-foreground",
                                children: [
                                  e.low_stock.length,
                                  " produto(s) com 5 ou menos unidades em estoque.",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    e?.delayed_orders > 0 &&
                      l.jsxs(rt, {
                        className: "cursor-pointer gap-3 p-3 items-start",
                        children: [
                          l.jsx("div", {
                            className: "mt-0.5 bg-orange-100 p-1.5 rounded-full text-orange-600",
                            children: l.jsx(Bn, { className: "w-4 h-4" }),
                          }),
                          l.jsxs("div", {
                            className: "flex-1",
                            children: [
                              l.jsx("p", {
                                className: "text-sm font-medium leading-none mb-1",
                                children: "Envios Atrasados",
                              }),
                              l.jsxs("p", {
                                className: "text-xs text-muted-foreground",
                                children: [
                                  e.delayed_orders,
                                  " pedido(s) pagos há mais de 3 dias não enviados.",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    e?.pending_payments > 0 &&
                      l.jsxs(rt, {
                        className: "cursor-pointer gap-3 p-3 items-start",
                        children: [
                          l.jsx("div", {
                            className: "mt-0.5 bg-blue-100 p-1.5 rounded-full text-blue-600",
                            children: l.jsx(Wn, { className: "w-4 h-4" }),
                          }),
                          l.jsxs("div", {
                            className: "flex-1",
                            children: [
                              l.jsx("p", {
                                className: "text-sm font-medium leading-none mb-1",
                                children: "Aguardando Pagamento",
                              }),
                              l.jsxs("p", {
                                className: "text-xs text-muted-foreground",
                                children: [
                                  e.pending_payments,
                                  " pedido(s) aguardando confirmação (Pix/Boleto).",
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
    ],
  });
}
function hu() {
  return (
    pi(),
    l.jsxs("div", {
      className: "space-y-6",
      children: [
        l.jsxs("div", {
          className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
          children: [
            l.jsxs("div", {
              children: [
                l.jsx("h1", {
                  className: "text-3xl font-bold tracking-tight",
                  children: "Dashboard Executivo",
                }),
                l.jsx("p", {
                  className: "text-muted-foreground mt-1",
                  children: "Visão geral e acompanhamento de métricas em tempo real.",
                }),
              ],
            }),
            l.jsx("div", { className: "flex items-center gap-2", children: l.jsx(pu, {}) }),
          ],
        }),
        l.jsx(mi, {}),
      ],
    })
  );
}
const Au = Object.freeze(
  Object.defineProperty({ __proto__: null, component: hu }, Symbol.toStringTag, {
    value: "Module",
  }),
);
export {
  tc as A,
  Pu as B,
  Ie as C,
  vr as D,
  xr as F,
  Ye as M,
  Vr as P,
  qr as R,
  rc as a,
  Fe as b,
  Le as c,
  st as d,
  nc as e,
  B as f,
  ec as g,
  Au as h,
  A as i,
  he as j,
  Kn as k,
  Se as l,
  jr as m,
  gi as n,
  pc as o,
  U as p,
  Ut as q,
  Su as r,
  si as s,
  Ht as t,
  ee as u,
  ri as v,
  ji as w,
  ot as x,
  ae as y,
  Nu as z,
};
