import {
  R as Z,
  J as se,
  a0 as _,
  E as O,
  o as K,
  p as Se,
  ab as ir,
  Q as He,
  D as a,
  a1 as Re,
  a6 as ye,
} from "./index-C2UuTsl-.js";
import { u as ar } from "./useQuery-tYhz7w83.js";
var Ee = (e) => e.type === "checkbox",
  he = (e) => e instanceof Date,
  H = (e) => e == null;
const Cs = (e) => typeof e == "object";
var C = (e) => !H(e) && !Array.isArray(e) && Cs(e) && !he(e),
  nr = (e) => (C(e) && e.target ? (Ee(e.target) ? e.target.checked : e.target.value) : e),
  lr = (e, r) =>
    r.split(".").some((s, i, d) => !isNaN(Number(s)) && e.has(d.slice(0, i).join("."))),
  or = (e) => {
    const r = e.constructor && e.constructor.prototype;
    return C(r) && r.hasOwnProperty("isPrototypeOf");
  },
  es = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function X(e) {
  if (e instanceof Date) return new Date(e);
  const r = typeof FileList < "u" && e instanceof FileList;
  if (es && (e instanceof Blob || r)) return e;
  const s = Array.isArray(e);
  if (!s && !(C(e) && or(e))) return e;
  const i = s ? [] : Object.create(Object.getPrototypeOf(e));
  for (const d in e) Object.prototype.hasOwnProperty.call(e, d) && (i[d] = X(e[d]));
  return i;
}
var ke = (e) => /^\w*$/.test(e),
  P = (e) => e === void 0,
  ss = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  Me = (e) => ss(e.replace(/["|']|\]/g, "").split(/\.|\[/)),
  g = (e, r, s) => {
    if (!r || !C(e)) return s;
    const d = (ke(r) ? [r] : Me(r)).reduce((n, c) => (H(n) ? void 0 : n[c]), e);
    return P(d) || d === e ? (P(e[r]) ? s : e[r]) : d;
  },
  de = (e) => typeof e == "boolean",
  ee = (e) => typeof e == "function",
  D = (e, r, s) => {
    let i = -1;
    const d = ke(r) ? [r] : Me(r),
      n = d.length,
      c = n - 1;
    for (; ++i < n; ) {
      const u = d[i];
      let N = s;
      if (i !== c) {
        const F = e[u];
        N = C(F) || Array.isArray(F) ? F : isNaN(+d[i + 1]) ? {} : [];
      }
      if (u === "__proto__" || u === "constructor" || u === "prototype") return;
      ((e[u] = N), (e = e[u]));
    }
  };
const _e = {
    BLUR: "blur",
    FOCUS_OUT: "focusout",
    SUBMIT: "submit",
    TRIGGER: "trigger",
    VALID: "valid",
  },
  le = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  ne = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  },
  Ge = "form",
  Ts = "root",
  cr = Z.createContext(null);
cr.displayName = "HookFormControlContext";
var dr = (e, r, s, i = !0) => {
  const d = {};
  for (const n in e)
    Object.defineProperty(d, n, {
      get: () => {
        const c = n;
        return (r._proxyFormState[c] !== le.all && (r._proxyFormState[c] = !i || le.all), e[c]);
      },
    });
  return d;
};
const ur = typeof window < "u" ? Z.useLayoutEffect : Z.useEffect;
var Y = (e) => typeof e == "string",
  fr = (e, r, s, i, d) =>
    Y(e)
      ? (i && r.watch.add(e), g(s, e, d))
      : Array.isArray(e)
        ? e.map((n) => (i && r.watch.add(n), g(s, n)))
        : (i && (r.watchAll = !0), s),
  We = (e) => H(e) || !Cs(e);
function ue(e, r, s = new WeakSet()) {
  if (e === r) return !0;
  if (We(e) || We(r)) return Object.is(e, r);
  if (he(e) && he(r)) return Object.is(e.getTime(), r.getTime());
  const i = Object.keys(e),
    d = Object.keys(r);
  if (i.length !== d.length) return !1;
  if (s.has(e) || s.has(r)) return !0;
  (s.add(e), s.add(r));
  for (const n of i) {
    const c = e[n];
    if (!(n in r)) return !1;
    if (n !== "ref") {
      const u = r[n];
      if (
        (he(c) && he(u)) || ((C(c) || Array.isArray(c)) && (C(u) || Array.isArray(u)))
          ? !ue(c, u, s)
          : !Object.is(c, u)
      )
        return !1;
    }
  }
  return !0;
}
const mr = Z.createContext(null);
mr.displayName = "HookFormContext";
var rs = (e, r, s, i, d) =>
    r ? { ...s[e], types: { ...(s[e] && s[e].types ? s[e].types : {}), [i]: d || !0 } } : {},
  Ve = (e) => (Array.isArray(e) ? e : [e]),
  _s = () => {
    let e = [];
    return {
      get observers() {
        return e;
      },
      next: (d) => {
        for (const n of e) n.next && n.next(d);
      },
      subscribe: (d) => (
        e.push(d),
        {
          unsubscribe: () => {
            e = e.filter((n) => n !== d);
          },
        }
      ),
      unsubscribe: () => {
        e = [];
      },
    };
  };
function Rs(e, r) {
  const s = {};
  for (const i in e)
    if (e.hasOwnProperty(i)) {
      const d = e[i],
        n = r[i];
      if (d && C(d) && n) {
        const c = Rs(d, n);
        C(c) && (s[i] = c);
      } else e[i] && (s[i] = n);
    }
  return s;
}
var G = (e) => C(e) && !Object.keys(e).length,
  ts = (e) => e.type === "file",
  Ue = (e) => {
    if (!es) return !1;
    const r = e ? e.ownerDocument : 0;
    return e instanceof (r && r.defaultView ? r.defaultView.HTMLElement : HTMLElement);
  },
  Us = (e) => e.type === "select-multiple",
  is = (e) => e.type === "radio",
  hr = (e) => is(e) || Ee(e),
  Ye = (e) => Ue(e) && e.isConnected;
function pr(e, r) {
  const s = r.slice(0, -1).length;
  let i = 0;
  for (; i < s; ) {
    if (H(e)) {
      e = void 0;
      break;
    }
    ((e = e[r[i]]), i++);
  }
  return e;
}
function gr(e) {
  for (const r in e) if (e.hasOwnProperty(r) && !P(e[r])) return !1;
  return !0;
}
function z(e, r) {
  if (Y(r) && Object.prototype.hasOwnProperty.call(e, r)) return (delete e[r], e);
  const s = Array.isArray(r) ? r : ke(r) ? [r] : Me(r),
    i = s.length === 1 ? e : pr(e, s),
    d = s.length - 1,
    n = s[d];
  return (
    i && delete i[n],
    d !== 0 && ((C(i) && G(i)) || (Array.isArray(i) && gr(i))) && z(e, s.slice(0, -1)),
    e
  );
}
var yr = (e) => {
  for (const r in e) if (ee(e[r])) return !0;
  return !1;
};
function Ls(e) {
  return Array.isArray(e) || (C(e) && !yr(e));
}
function Ze(e, r = {}) {
  for (const s in e) {
    const i = e[s];
    Ls(i) ? ((r[s] = Array.isArray(i) ? [] : {}), Ze(i, r[s])) : P(i) || (r[s] = !0);
  }
  return r;
}
function Ke(e) {
  if (e !== !1) {
    if (e === !0) return !0;
    if (Array.isArray(e)) {
      const r = e.map((s) => Ke(s));
      return r.some((s) => s !== void 0) ? r : void 0;
    }
    if (C(e)) {
      const r = {};
      for (const s in e) {
        const i = Ke(e[s]);
        P(i) || (r[s] = i);
      }
      return Object.keys(r).length ? r : void 0;
    }
  }
}
function ve(e, r, s) {
  s || (s = Ze(r));
  for (const i in e) {
    const d = e[i];
    if (Ls(d))
      P(r) || We(s[i]) ? (s[i] = Ze(d, Array.isArray(d) ? [] : {})) : ve(d, H(r) ? {} : r[i], s[i]);
    else {
      const n = r[i];
      s[i] = !ue(d, n);
    }
  }
  return Ke(s) || {};
}
const xs = { value: !1, isValid: !1 },
  vs = { value: !0, isValid: !0 };
var Ms = (e) => {
    if (Array.isArray(e)) {
      if (e.length > 1) {
        const r = e.filter((s) => s && s.checked && !s.disabled).map((s) => s.value);
        return { value: r, isValid: !!r.length };
      }
      return e[0].checked && !e[0].disabled
        ? e[0].attributes && !P(e[0].attributes.value)
          ? P(e[0].value) || e[0].value === ""
            ? vs
            : { value: e[0].value, isValid: !0 }
          : vs
        : xs;
    }
    return xs;
  },
  Is = (e, { valueAsNumber: r, valueAsDate: s, setValueAs: i }) =>
    P(e) ? e : r ? (e === "" ? NaN : e && +e) : s && Y(e) ? new Date(e) : i ? i(e) : e;
const bs = { isValid: !1, value: null };
var Bs = (e) =>
  Array.isArray(e)
    ? e.reduce((r, s) => (s && s.checked && !s.disabled ? { isValid: !0, value: s.value } : r), bs)
    : bs;
function js(e) {
  const r = e.ref;
  return ts(r)
    ? r.files
    : is(r)
      ? Bs(e.refs).value
      : Us(r)
        ? [...r.selectedOptions].map(({ value: s }) => s)
        : Ee(r)
          ? Ms(e.refs).value
          : Is(P(r.value) ? e.ref.value : r.value, e);
}
var _r = (e, r, s, i) => {
    const d = {};
    for (const n of e) {
      const c = g(r, n);
      c && D(d, n, c._f);
    }
    return { criteriaMode: s, names: [...e], fields: d, shouldUseNativeValidation: i };
  },
  Le = (e) => e instanceof RegExp,
  we = (e) => (P(e) ? e : Le(e) ? e.source : C(e) ? (Le(e.value) ? e.value.source : e.value) : e),
  Ns = (e) => ({
    isOnSubmit: !e || e === le.onSubmit,
    isOnBlur: e === le.onBlur,
    isOnChange: e === le.onChange,
    isOnAll: e === le.all,
    isOnTouch: e === le.onTouched,
  });
const ws = "AsyncFunction";
var xr = (e) =>
    !!e &&
    !!e.validate &&
    !!(
      (ee(e.validate) && e.validate.constructor.name === ws) ||
      (C(e.validate) && Object.values(e.validate).find((r) => r.constructor.name === ws))
    ),
  vr = (e) =>
    e.mount &&
    (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate),
  Ss = (e, r, s) =>
    !s &&
    (r.watchAll ||
      r.watch.has(e) ||
      [...r.watch].some((i) => e.startsWith(i) && /^\.\w+/.test(e.slice(i.length))));
const Fe = (e, r, s, i) => {
  for (const d of s || Object.keys(e)) {
    const n = g(e, d);
    if (n) {
      const { _f: c, ...u } = n;
      if (c) {
        if (c.refs && c.refs[0] && r(c.refs[0], d) && !i) return !0;
        if (c.ref && r(c.ref, c.name) && !i) return !0;
        if (Fe(u, r)) break;
      } else if (C(u) && Fe(u, r)) break;
    }
  }
};
function Vs(e, r, s) {
  const i = g(e, s);
  if (i || ke(s)) return { error: i, name: s };
  const d = s.split(".");
  for (; d.length; ) {
    const n = d.join("."),
      c = g(r, n),
      u = g(e, n);
    if (c && !Array.isArray(c) && s !== n) return { name: s };
    if (u && u.type) return { name: n, error: u };
    if (u && u.root && u.root.type) return { name: `${n}.root`, error: u.root };
    d.pop();
  }
  return { name: s };
}
var br = (e, r, s, i) => {
    s(e);
    const { name: d, ...n } = e;
    return (
      G(n) ||
      (i && Object.keys(n).length >= Object.keys(r).length) ||
      Object.keys(n).find((c) => r[c] === (!i || le.all))
    );
  },
  jr = (e, r, s) =>
    !e ||
    !r ||
    e === r ||
    Ve(e).some((i) => i && (s ? i === r : i.startsWith(r) || r.startsWith(i))),
  Nr = (e, r, s, i, d) =>
    d.isOnAll
      ? !1
      : !s && d.isOnTouch
        ? !(r || e)
        : (s ? i.isOnBlur : d.isOnBlur)
          ? !e
          : (s ? i.isOnChange : d.isOnChange)
            ? e
            : !0,
  wr = (e, r) => !ss(g(e, r)).length && z(e, r),
  Fs = (e, r, s) => {
    const i = Ve(g(e, s));
    return (D(i, Ts, r[s]), D(e, s, i), e);
  };
function Es(e, r, s = "validate") {
  if (Y(e) || (Array.isArray(e) && e.every(Y)) || (de(e) && !e))
    return { type: s, message: Y(e) ? e : "", ref: r };
}
var xe = (e) => (C(e) && !Le(e) ? e : { value: e, message: "" }),
  ks = async (e, r, s, i, d, n) => {
    const {
        ref: c,
        refs: u,
        required: N,
        maxLength: F,
        minLength: T,
        min: V,
        max: A,
        pattern: b,
        validate: W,
        name: L,
        valueAsNumber: $,
        mount: M,
      } = e._f,
      w = g(s, L);
    if (!M || r.has(L)) return {};
    const j = u ? u[0] : c,
      I = (k) => {
        d && j.reportValidity && (j.setCustomValidity(de(k) ? "" : k || ""), j.reportValidity());
      },
      R = {},
      Ae = is(c),
      be = Ee(c),
      De = Ae || be,
      pe =
        (($ || ts(c)) && P(c.value) && P(w)) ||
        (Ue(c) && c.value === "") ||
        w === "" ||
        (Array.isArray(w) && !w.length),
      re = rs.bind(null, L, i, R),
      Oe = (k, E, q, U = ne.maxLength, Q = ne.minLength) => {
        const fe = k ? E : q;
        R[L] = { type: k ? U : Q, message: fe, ref: c, ...re(k ? U : Q, fe) };
      };
    if (
      n
        ? !Array.isArray(w) || !w.length
        : N &&
          ((!De && (pe || H(w))) ||
            (de(w) && !w) ||
            (be && !Ms(u).isValid) ||
            (Ae && !Bs(u).isValid))
    ) {
      const { value: k, message: E } = Y(N) ? { value: !!N, message: N } : xe(N);
      if (k && ((R[L] = { type: ne.required, message: E, ref: j, ...re(ne.required, E) }), !i))
        return (I(E), R);
    }
    if (!pe && (!H(V) || !H(A))) {
      let k, E;
      const q = xe(A),
        U = xe(V);
      if (!H(w) && !isNaN(w)) {
        const Q = c.valueAsNumber || (w && +w);
        (H(q.value) || (k = Q > q.value), H(U.value) || (E = Q < U.value));
      } else {
        const Q = c.valueAsDate || new Date(w),
          fe = (Pe) => new Date(new Date().toDateString() + " " + Pe),
          ge = c.type == "time",
          je = c.type == "week";
        (Y(q.value) &&
          w &&
          (k = ge ? fe(w) > fe(q.value) : je ? w > q.value : Q > new Date(q.value)),
          Y(U.value) &&
            w &&
            (E = ge ? fe(w) < fe(U.value) : je ? w < U.value : Q < new Date(U.value)));
      }
      if ((k || E) && (Oe(!!k, q.message, U.message, ne.max, ne.min), !i))
        return (I(R[L].message), R);
    }
    if ((F || T) && !pe && (Y(w) || (n && Array.isArray(w)))) {
      const k = xe(F),
        E = xe(T),
        q = !H(k.value) && w.length > +k.value,
        U = !H(E.value) && w.length < +E.value;
      if ((q || U) && (Oe(q, k.message, E.message), !i)) return (I(R[L].message), R);
    }
    if (b && !pe && Y(w)) {
      const { value: k, message: E } = xe(b);
      if (
        Le(k) &&
        !w.match(k) &&
        ((R[L] = { type: ne.pattern, message: E, ref: c, ...re(ne.pattern, E) }), !i)
      )
        return (I(E), R);
    }
    if (W) {
      if (ee(W)) {
        const k = await W(w, s),
          E = Es(k, j);
        if (E && ((R[L] = { ...E, ...re(ne.validate, E.message) }), !i)) return (I(E.message), R);
      } else if (C(W)) {
        let k = {};
        for (const E in W) {
          if (!G(k) && !i) break;
          const q = Es(await W[E](w, s), j, E);
          q && ((k = { ...q, ...re(E, q.message) }), I(q.message), i && (R[L] = k));
        }
        if (!G(k) && ((R[L] = { ref: j, ...k }), !i)) return R;
      }
    }
    return (I(!0), R);
  };
const Sr = { mode: le.onSubmit, reValidateMode: le.onChange, shouldFocusError: !0 },
  Xs = {
    submitCount: 0,
    isDirty: !1,
    isReady: !1,
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
  };
function Vr(e = {}) {
  let r = { ...Sr, ...e },
    s = {
      ...X(Xs),
      isLoading: ee(r.defaultValues),
      errors: r.errors || {},
      disabled: r.disabled || !1,
    },
    i = {},
    d = C(r.defaultValues) || C(r.values) ? X(r.defaultValues || r.values) || {} : {},
    n = r.shouldUnregister ? {} : X(d),
    c = { action: !1, mount: !1, watch: !1, keepIsValid: !1 },
    u = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
      registerName: new Set(),
    },
    N,
    F = 0;
  const T = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    V = { ...T };
  let A = { ...V };
  const b = { array: _s(), state: _s() },
    W = r.criteriaMode === le.all,
    L = (t) => (l) => {
      (clearTimeout(F), (F = setTimeout(t, l)));
    },
    $ = async (t) => {
      if (!c.keepIsValid && !r.disabled && (V.isValid || A.isValid || t)) {
        let l;
        (r.resolver
          ? ((l = G((await re()).errors)), M())
          : (l = await E({ fields: i, onlyCheckValid: !0, eventType: _e.VALID })),
          l !== s.isValid && b.state.next({ isValid: l }));
      }
    },
    M = (t, l) => {
      !r.disabled &&
        (V.isValidating || V.validatingFields || A.isValidating || A.validatingFields) &&
        ((t || Array.from(u.mount)).forEach((o) => {
          o && (l ? D(s.validatingFields, o, l) : z(s.validatingFields, o));
        }),
        b.state.next({
          validatingFields: s.validatingFields,
          isValidating: !G(s.validatingFields),
        }));
    },
    w = () => {
      s.dirtyFields = ve(d, n);
    },
    j = (t, l = [], o, f, h = !0, p = !0) => {
      if (f && o && !r.disabled) {
        if (((c.action = !0), p && Array.isArray(g(i, t)))) {
          const m = o(g(i, t), f.argA, f.argB);
          h && D(i, t, m);
        }
        if (p && Array.isArray(g(s.errors, t))) {
          const m = o(g(s.errors, t), f.argA, f.argB);
          (h && D(s.errors, t, m), wr(s.errors, t));
        }
        if ((V.touchedFields || A.touchedFields) && p && Array.isArray(g(s.touchedFields, t))) {
          const m = o(g(s.touchedFields, t), f.argA, f.argB);
          h && D(s.touchedFields, t, m);
        }
        ((V.dirtyFields || A.dirtyFields) && w(),
          b.state.next({
            name: t,
            isDirty: U(t, l),
            dirtyFields: s.dirtyFields,
            errors: s.errors,
            isValid: s.isValid,
          }));
      } else D(n, t, l);
    },
    I = (t, l) => {
      (D(s.errors, t, l), b.state.next({ errors: s.errors }));
    },
    R = (t) => {
      ((s.errors = t), b.state.next({ errors: s.errors, isValid: !1 }));
    },
    Ae = (t) => {
      const l = ke(t) ? [t] : Me(t);
      let o = n,
        f = d;
      for (let h = 0; h < l.length - 1; h++) {
        const p = l[h];
        if (((o = H(o) ? o : o[p]), (f = H(f) ? f : f[p]), o === null && f !== null)) return !0;
      }
      return !1;
    },
    be = (t, l, o, f) => {
      const h = g(i, t);
      if (h) {
        if (Ae(t)) return;
        const p = P(g(n, t)),
          m = g(n, t, P(o) ? g(d, t) : o);
        (P(m) || (f && f.defaultChecked) || l ? D(n, t, l ? m : js(h._f)) : ge(t, m),
          c.mount &&
            !c.action &&
            ($(),
            p &&
              s.isDirty &&
              (V.isDirty || A.isDirty) &&
              (U() || ((s.isDirty = !1), b.state.next({ ...s })))));
      }
    },
    De = (t, l, o, f, h) => {
      let p = !1,
        m = !1;
      const y = { name: t };
      if (!r.disabled) {
        if (!o || f) {
          (V.isDirty || A.isDirty) &&
            ((m = s.isDirty), (s.isDirty = y.isDirty = U()), (p = m !== y.isDirty));
          const S = ue(g(d, t), l);
          ((m = !!g(s.dirtyFields, t)),
            S !== s.isDirty
              ? (s.dirtyFields = ve(d, n))
              : S
                ? z(s.dirtyFields, t)
                : D(s.dirtyFields, t, !0),
            (y.dirtyFields = s.dirtyFields),
            (p = p || ((V.dirtyFields || A.dirtyFields) && m !== !S)));
        }
        if (o) {
          const S = g(s.touchedFields, t);
          S ||
            (D(s.touchedFields, t, o),
            (y.touchedFields = s.touchedFields),
            (p = p || ((V.touchedFields || A.touchedFields) && S !== o)));
        }
        p && h && b.state.next(y);
      }
      return p ? y : {};
    },
    pe = (t, l, o, f) => {
      const h = g(s.errors, t),
        p = (V.isValid || A.isValid) && de(l) && s.isValid !== l;
      if (
        (r.delayError && o
          ? ((N = L(() => I(t, o))), N(r.delayError))
          : (clearTimeout(F), (N = null), o ? D(s.errors, t, o) : z(s.errors, t)),
        (o ? !ue(h, o) : h) || !G(f) || p)
      ) {
        const m = { ...f, ...(p && de(l) ? { isValid: l } : {}), errors: s.errors, name: t };
        ((s = { ...s, ...m }), b.state.next(m));
      }
    },
    re = async (t) => (
      M(t, !0),
      await r.resolver(
        n,
        r.context,
        _r(t || u.mount, i, r.criteriaMode, r.shouldUseNativeValidation),
      )
    ),
    Oe = async (t) => {
      const { errors: l } = await re(t);
      if ((M(t), t))
        for (const o of t) {
          const f = g(l, o);
          f
            ? u.array.has(o) && C(f)
              ? Fs(s.errors, { [o]: f }, o)
              : D(s.errors, o, f)
            : z(s.errors, o);
        }
      else s.errors = l;
      return l;
    },
    k = async ({ name: t, eventType: l }) => {
      if (e.validate) {
        const o = await e.validate({ formValues: n, formState: s, name: t, eventType: l });
        if (C(o))
          for (const f in o) {
            const h = o[f];
            h &&
              Ce(`${Ge}.${f}`, {
                message: Y(h.message) ? h.message : "",
                type: h.type || ne.validate,
              });
          }
        else Y(o) || !o ? Ce(Ge, { message: o || "", type: ne.validate }) : cs(Ge);
        return o;
      }
      return !0;
    },
    E = async ({
      fields: t,
      onlyCheckValid: l,
      name: o,
      eventType: f,
      context: h = { valid: !0, runRootValidation: !1 },
    }) => {
      if (
        e.validate &&
        ((h.runRootValidation = !0), !(await k({ name: o, eventType: f })) && ((h.valid = !1), l))
      )
        return h.valid;
      for (const p in t) {
        const m = t[p];
        if (m) {
          const { _f: y, ...S } = m;
          if (y) {
            const B = u.array.has(y.name),
              J = m._f && xr(m._f),
              te = V.validatingFields || V.isValidating || A.validatingFields || A.isValidating;
            J && te && M([y.name], !0);
            const me = await ks(m, u.disabled, n, W, r.shouldUseNativeValidation && !l, B);
            if (
              (J && te && M([y.name]),
              (me[y.name] && ((h.valid = !1), l)) ||
                (!l &&
                  (g(me, y.name)
                    ? B
                      ? Fs(s.errors, me, y.name)
                      : D(s.errors, y.name, me[y.name])
                    : z(s.errors, y.name)),
                e.shouldUseNativeValidation && me[y.name]))
            )
              break;
          }
          !G(S) && (await E({ context: h, onlyCheckValid: l, fields: S, name: p, eventType: f }));
        }
      }
      return h.valid;
    },
    q = () => {
      for (const t of u.unMount) {
        const l = g(i, t);
        l && (l._f.refs ? l._f.refs.every((o) => !Ye(o)) : !Ye(l._f.ref)) && Be(t);
      }
      u.unMount = new Set();
    },
    U = (t, l) => !r.disabled && (t && l && D(n, t, l), !ue(ls(), d)),
    Q = (t, l, o) => fr(t, u, { ...(c.mount ? n : P(l) ? d : Y(t) ? { [t]: l } : l) }, o, l),
    fe = (t) => ss(g(c.mount ? n : d, t, r.shouldUnregister ? g(d, t, []) : [])),
    ge = (t, l, o = {}, f = !1) => {
      const h = g(i, t);
      let p = l;
      if (h) {
        const m = h._f;
        m &&
          (!m.disabled && D(n, t, Is(l, m)),
          (p = Ue(m.ref) && H(l) ? "" : l),
          Us(m.ref)
            ? [...m.ref.options].forEach((y) => (y.selected = p.includes(y.value)))
            : m.refs
              ? Ee(m.ref)
                ? m.refs.forEach((y) => {
                    (!y.defaultChecked || !y.disabled) &&
                      (Array.isArray(p)
                        ? (y.checked = !!p.find((S) => S === y.value))
                        : (y.checked = p === y.value || !!p));
                  })
                : m.refs.forEach((y) => (y.checked = y.value === p))
              : ts(m.ref)
                ? (m.ref.value = "")
                : ((m.ref.value = p),
                  m.ref.type || b.state.next({ name: t, values: f ? n : X(n) })));
      }
      ((o.shouldDirty || o.shouldTouch) && De(t, p, o.shouldTouch, o.shouldDirty, !0),
        o.shouldValidate && Ie(t));
    },
    je = (t, l, o, f = !1) => {
      for (const h in l) {
        if (!l.hasOwnProperty(h)) return;
        const p = l[h],
          m = t + "." + h,
          y = g(i, m);
        (u.array.has(t) || C(p) || (y && !y._f)) && !he(p) ? je(m, p, o, f) : ge(m, p, o, f);
      }
    },
    Pe = (t, l, o, f) => {
      const h = g(i, t),
        p = u.array.has(t),
        m = f ? l : X(l),
        y = g(n, t),
        S = ue(y, m);
      if ((S || D(n, t, m), p))
        (b.array.next({ name: t, values: f ? n : X(n) }),
          (V.isDirty || V.dirtyFields || A.isDirty || A.dirtyFields) &&
            o.shouldDirty &&
            (w(), b.state.next({ name: t, dirtyFields: s.dirtyFields, isDirty: U(t, m) })));
      else {
        const B = (Array.isArray(m) && !m.length) || G(m);
        !h || h._f || H(m) || B ? ge(t, m, o, f) : je(t, m, o, f);
      }
      if (!S) {
        const B = Ss(t, u),
          J = f ? n : X(n);
        b.state.next({ ...(B && s), name: c.mount || B ? t : void 0, values: J });
      }
    },
    Ne = (t, l, o = {}) => Pe(t, l, o, !1),
    Ws = (t, l = {}) => {
      const o = ee(t) ? t(n) : t;
      if (!ue(n, o)) {
        n = { ...n, ...o };
        for (const f of u.mount) Pe(f, g(o, f), l, !0);
        (b.state.next({ ...s, name: void 0, type: void 0, values: n }), l.shouldValidate && $());
      }
    },
    as = async (t) => {
      c.mount = !0;
      const l = t.target;
      let o = l.name,
        f = !0;
      const h = g(i, o),
        p = (S) => {
          f = Number.isNaN(S) || (he(S) && isNaN(S.getTime())) || ue(S, g(n, o, S));
        },
        m = Ns(r.mode),
        y = Ns(r.reValidateMode);
      if (h) {
        let S, B;
        const J = l.type ? js(h._f) : nr(t),
          te = t.type === _e.BLUR || t.type === _e.FOCUS_OUT,
          me =
            (!vr(h._f) && !e.validate && !r.resolver && !g(s.errors, o) && !h._f.deps) ||
            Nr(te, g(s.touchedFields, o), s.isSubmitted, y, m),
          qe = Ss(o, u, te);
        (D(n, o, J),
          te
            ? (!l || !l.readOnly) && (h._f.onBlur && h._f.onBlur(t), N && N(0))
            : h._f.onChange && h._f.onChange(t));
        const $e = De(o, J, te),
          rr = !G($e) || qe;
        if ((!te && b.state.next({ name: o, type: t.type, values: X(n) }), me))
          return (
            (V.isValid || A.isValid) && (r.mode === "onBlur" ? te && $() : te || $()),
            rr && b.state.next({ name: o, ...(qe ? {} : $e) })
          );
        if (
          (!r.resolver && e.validate && (await k({ name: o, eventType: t.type })),
          !te && qe && b.state.next({ ...s }),
          r.resolver)
        ) {
          const { errors: gs } = await re([o]);
          if ((M([o]), p(J), f)) {
            const tr = Vs(s.errors, i, o),
              ys = Vs(gs, i, tr.name || o);
            ((S = ys.error), (o = ys.name), (B = G(gs)));
          }
        } else
          (M([o], !0),
            (S = (await ks(h, u.disabled, n, W, r.shouldUseNativeValidation))[o]),
            M([o]),
            p(J),
            f &&
              (S
                ? (B = !1)
                : (V.isValid || A.isValid) &&
                  (B = await E({ fields: i, onlyCheckValid: !0, name: o, eventType: t.type }))));
        f &&
          (h._f.deps && (!Array.isArray(h._f.deps) || h._f.deps.length > 0) && Ie(h._f.deps),
          pe(o, B, S, $e));
      }
    },
    ns = (t, l) => {
      if (g(s.errors, l) && t.focus) return (t.focus(), 1);
    },
    Ie = async (t, l = {}) => {
      let o, f;
      const h = Ve(t);
      if (r.resolver) {
        const p = await Oe(P(t) ? t : h);
        ((o = G(p)), (f = t ? !h.some((m) => g(p, m)) : o));
      } else
        t
          ? ((f = (
              await Promise.all(
                h.map(async (p) => {
                  const m = g(i, p);
                  return await E({ fields: m && m._f ? { [p]: m } : m, eventType: _e.TRIGGER });
                }),
              )
            ).every(Boolean)),
            !(!f && !s.isValid) && $())
          : (f = o = await E({ fields: i, name: t, eventType: _e.TRIGGER }));
      return (
        b.state.next({
          ...(!Y(t) || ((V.isValid || A.isValid) && o !== s.isValid) ? {} : { name: t }),
          ...(r.resolver || !t ? { isValid: o } : {}),
          errors: s.errors,
        }),
        l.shouldFocus && !f && Fe(i, ns, t ? h : u.mount),
        f
      );
    },
    ls = (t, l) => {
      let o = { ...(c.mount ? n : d) };
      return (
        l && (o = Rs(l.dirtyFields ? s.dirtyFields : s.touchedFields, o)),
        P(t) ? o : Y(t) ? g(o, t) : t.map((f) => g(o, f))
      );
    },
    os = (t, l) => ({
      invalid: !!g((l || s).errors, t),
      isDirty: !!g((l || s).dirtyFields, t),
      error: g((l || s).errors, t),
      isValidating: !!g(s.validatingFields, t),
      isTouched: !!g((l || s).touchedFields, t),
    }),
    cs = (t) => {
      const l = t ? Ve(t) : void 0;
      (l?.forEach((o) => z(s.errors, o)),
        l
          ? l.forEach((o) => {
              b.state.next({ name: o, errors: s.errors });
            })
          : b.state.next({ errors: {} }));
    },
    Ce = (t, l, o) => {
      const f = (g(i, t, { _f: {} })._f || {}).ref,
        h = g(s.errors, t) || {},
        { ref: p, message: m, type: y, ...S } = h;
      (D(s.errors, t, { ...S, ...l, ref: f }),
        b.state.next({ name: t, errors: s.errors, isValid: !1 }),
        o && o.shouldFocus && f && f.focus && f.focus());
    },
    Zs = (t, l) =>
      ee(t)
        ? b.state.subscribe({ next: (o) => "values" in o && t(o.values || Q(void 0, l), o) })
        : Q(t, l, !0),
    ds = (t) =>
      b.state.subscribe({
        next: (l) => {
          if (jr(t.name, l.name, t.exact) && br(l, t.formState || V, sr, t.reRenderRoot)) {
            const o = { ...n };
            t.callback({ values: o, ...s, ...l, defaultValues: d });
          }
        },
      }).unsubscribe,
    Ks = (t) => (
      (c.mount = !0),
      (A = { ...A, ...t.formState }),
      ds({ ...t, formState: { ...T, ...t.formState } })
    ),
    Be = (t, l = {}) => {
      for (const o of t ? Ve(t) : u.mount)
        (u.mount.delete(o),
          u.array.delete(o),
          l.keepValue || (z(i, o), z(n, o)),
          !l.keepError && z(s.errors, o),
          !l.keepDirty && z(s.dirtyFields, o),
          !l.keepTouched && z(s.touchedFields, o),
          !l.keepIsValidating && z(s.validatingFields, o),
          !r.shouldUnregister && !l.keepDefaultValue && z(d, o));
      (b.state.next({ values: X(n) }),
        b.state.next({ ...s, ...(l.keepDirty ? { isDirty: U() } : {}) }),
        !l.keepIsValid && $());
    },
    us = ({ disabled: t, name: l }) => {
      if ((de(t) && c.mount) || t || u.disabled.has(l)) {
        const h = u.disabled.has(l) !== !!t;
        (t ? u.disabled.add(l) : u.disabled.delete(l), h && c.mount && !c.action && $());
      }
    },
    Xe = (t, l = {}) => {
      let o = g(i, t);
      const f = de(l.disabled) || de(r.disabled),
        h = !u.registerName.has(t) && o && o._f && !o._f.mount;
      return (
        D(i, t, {
          ...(o || {}),
          _f: { ...(o && o._f ? o._f : { ref: { name: t } }), name: t, mount: !0, ...l },
        }),
        u.mount.add(t),
        o && !h
          ? us({ disabled: de(l.disabled) ? l.disabled : r.disabled, name: t })
          : be(t, !0, l.value),
        {
          ...(f ? { disabled: l.disabled || r.disabled } : {}),
          ...(r.progressive
            ? {
                required: !!l.required,
                min: we(l.min),
                max: we(l.max),
                minLength: we(l.minLength),
                maxLength: we(l.maxLength),
                pattern: we(l.pattern),
              }
            : {}),
          name: t,
          onChange: as,
          onBlur: as,
          ref: (p) => {
            if (p) {
              (u.registerName.add(t), Xe(t, l), u.registerName.delete(t), (o = g(i, t)));
              const m =
                  (P(p.value) &&
                    p.querySelectorAll &&
                    p.querySelectorAll("input,select,textarea")[0]) ||
                  p,
                y = hr(m),
                S = o._f.refs || [];
              if (y ? S.find((B) => B === m) : m === o._f.ref) return;
              (D(i, t, {
                _f: {
                  ...o._f,
                  ...(y
                    ? {
                        refs: [...S.filter(Ye), m, ...(Array.isArray(g(d, t)) ? [{}] : [])],
                        ref: { type: m.type, name: t },
                      }
                    : { ref: m }),
                },
              }),
                be(t, !1, void 0, m));
            } else
              ((o = g(i, t, {})),
                o._f && (o._f.mount = !1),
                (r.shouldUnregister || l.shouldUnregister) &&
                  !(lr(u.array, t) && c.action) &&
                  u.unMount.add(t));
          },
        }
      );
    },
    ze = () => r.shouldFocusError && !r.shouldUseNativeValidation && Fe(i, ns, u.mount),
    Qs = (t) => {
      de(t) &&
        (b.state.next({ disabled: t }),
        Fe(
          i,
          (l, o) => {
            const f = g(i, o);
            f &&
              ((l.disabled = f._f.disabled || t),
              Array.isArray(f._f.refs) &&
                f._f.refs.forEach((h) => {
                  h.disabled = f._f.disabled || t;
                }));
          },
          0,
          !1,
        ));
    },
    fs = (t, l) => async (o) => {
      let f;
      o && (o.preventDefault && o.preventDefault(), o.persist && o.persist());
      let h = X(n);
      if ((b.state.next({ isSubmitting: !0 }), r.resolver)) {
        const { errors: p, values: m } = await re();
        (M(), (s.errors = p), (h = X(m)));
      } else await E({ fields: i, eventType: _e.SUBMIT });
      if (u.disabled.size) for (const p of u.disabled) z(h, p);
      if ((z(s.errors, Ts), G(s.errors))) {
        b.state.next({ errors: {} });
        try {
          await t(h, o);
        } catch (p) {
          f = p;
        }
      } else (l && (await l({ ...s.errors }, o)), ze(), setTimeout(ze));
      if (
        (b.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: G(s.errors) && !f,
          submitCount: s.submitCount + 1,
          errors: s.errors,
        }),
        f)
      )
        throw f;
    },
    Js = (t, l = {}) => {
      g(i, t) &&
        (P(l.defaultValue)
          ? Ne(t, X(g(d, t)))
          : (Ne(t, l.defaultValue), D(d, t, X(l.defaultValue))),
        l.keepTouched || z(s.touchedFields, t),
        l.keepDirty || (z(s.dirtyFields, t), (s.isDirty = l.defaultValue ? U(t, X(g(d, t))) : U())),
        l.keepError || (z(s.errors, t), V.isValid && $()),
        b.state.next({ ...s }));
    },
    ms = (t, l = {}) => {
      const o = t ? X(t) : d,
        f = X(o),
        h = G(t),
        p = h ? d : f;
      if ((l.keepDefaultValues || (d = o), !l.keepValues)) {
        if (l.keepDirtyValues) {
          const m = new Set([...u.mount, ...Object.keys(ve(d, n))]);
          for (const y of Array.from(m)) {
            const S = g(s.dirtyFields, y),
              B = g(n, y),
              J = g(p, y);
            S && !P(B) ? D(p, y, B) : !S && !P(J) && Ne(y, J);
          }
        } else {
          if (es && P(t))
            for (const m of u.mount) {
              const y = g(i, m);
              if (y && y._f) {
                const S = Array.isArray(y._f.refs) ? y._f.refs[0] : y._f.ref;
                if (Ue(S)) {
                  const B = S.closest("form");
                  if (B) {
                    B.reset();
                    break;
                  }
                }
              }
            }
          if (l.keepFieldsRef) for (const m of u.mount) Ne(m, g(p, m));
          else i = {};
        }
        ((n = r.shouldUnregister ? (l.keepDefaultValues ? X(d) : {}) : X(p)),
          b.array.next({ values: { ...p } }),
          b.state.next({ values: { ...p } }));
      }
      ((u = {
        mount: l.keepDirtyValues ? u.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        registerName: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        (c.mount =
          !V.isValid || !!l.keepIsValid || !!l.keepDirtyValues || (!r.shouldUnregister && !G(p))),
        (c.watch = !!r.shouldUnregister),
        (c.keepIsValid = !!l.keepIsValid),
        (c.action = !1),
        l.keepErrors || (s.errors = {}),
        b.state.next({
          submitCount: l.keepSubmitCount ? s.submitCount : 0,
          isDirty: h ? !1 : l.keepDirty ? s.isDirty : !!(l.keepDefaultValues && !ue(t, d)),
          isSubmitted: l.keepIsSubmitted ? s.isSubmitted : !1,
          dirtyFields: h
            ? {}
            : l.keepDirtyValues
              ? l.keepDefaultValues && n
                ? ve(d, n)
                : s.dirtyFields
              : l.keepDefaultValues && t
                ? ve(d, t)
                : l.keepDirty
                  ? s.dirtyFields
                  : {},
          touchedFields: l.keepTouched ? s.touchedFields : {},
          errors: l.keepErrors ? s.errors : {},
          isSubmitSuccessful: l.keepIsSubmitSuccessful ? s.isSubmitSuccessful : !1,
          isSubmitting: !1,
          defaultValues: d,
        }));
    },
    hs = (t, l) => ms(ee(t) ? t(n) : t, { ...r.resetOptions, ...l }),
    er = (t, l = {}) => {
      const o = g(i, t),
        f = o && o._f;
      if (f) {
        const h = f.refs ? f.refs[0] : f.ref;
        h.focus &&
          setTimeout(() => {
            (h.focus(), l.shouldSelect && ee(h.select) && h.select());
          });
      }
    },
    sr = (t) => {
      s = { ...s, ...t };
    },
    ps = {
      control: {
        register: Xe,
        unregister: Be,
        getFieldState: os,
        handleSubmit: fs,
        setError: Ce,
        _subscribe: ds,
        _runSchema: re,
        _updateIsValidating: M,
        _focusError: ze,
        _getWatch: Q,
        _getDirty: U,
        _setValid: $,
        _setFieldArray: j,
        _setDisabledField: us,
        _setErrors: R,
        _getFieldArray: fe,
        _reset: ms,
        _resetDefaultValues: () =>
          ee(r.defaultValues) &&
          r.defaultValues().then((t) => {
            (hs(t, r.resetOptions), b.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: q,
        _disableForm: Qs,
        _subjects: b,
        _proxyFormState: V,
        get _fields() {
          return i;
        },
        get _formValues() {
          return n;
        },
        get _state() {
          return c;
        },
        set _state(t) {
          c = t;
        },
        get _defaultValues() {
          return d;
        },
        get _names() {
          return u;
        },
        set _names(t) {
          u = t;
        },
        get _formState() {
          return s;
        },
        get _options() {
          return r;
        },
        set _options(t) {
          r = { ...r, ...t };
        },
      },
      subscribe: Ks,
      trigger: Ie,
      register: Xe,
      handleSubmit: fs,
      watch: Zs,
      setValue: Ne,
      setValues: Ws,
      getValues: ls,
      reset: hs,
      resetField: Js,
      clearErrors: cs,
      unregister: Be,
      setError: Ce,
      setFocus: er,
      getFieldState: os,
    };
  return { ...ps, formControl: ps };
}
function oe(e = {}) {
  const r = Z.useRef(void 0),
    s = Z.useRef(void 0),
    [i, d] = Z.useState(() => ({
      ...X(Xs),
      isLoading: ee(e.defaultValues),
      errors: e.errors || {},
      disabled: e.disabled || !1,
      defaultValues: ee(e.defaultValues) ? void 0 : e.defaultValues,
    }));
  if (!r.current)
    if (e.formControl)
      ((r.current = { ...e.formControl, formState: i }),
        e.defaultValues &&
          !ee(e.defaultValues) &&
          e.formControl.reset(e.defaultValues, e.resetOptions));
    else {
      const { formControl: c, ...u } = Vr(e);
      r.current = { ...u, formState: i };
    }
  const n = r.current.control;
  return (
    (n._options = e),
    ur(() => {
      const c = n._subscribe({
        formState: n._proxyFormState,
        callback: () => d({ ...n._formState, defaultValues: n._defaultValues }),
        reRenderRoot: !0,
      });
      return (d((u) => ({ ...u, isReady: !0 })), (n._formState.isReady = !0), c);
    }, [n]),
    Z.useEffect(() => n._disableForm(e.disabled), [n, e.disabled]),
    Z.useEffect(() => {
      (e.mode && (n._options.mode = e.mode),
        e.reValidateMode && (n._options.reValidateMode = e.reValidateMode));
    }, [n, e.mode, e.reValidateMode]),
    Z.useEffect(() => {
      e.errors && (n._setErrors(e.errors), n._focusError());
    }, [n, e.errors]),
    Z.useEffect(() => {
      e.shouldUnregister && n._subjects.state.next({ values: n._getWatch() });
    }, [n, e.shouldUnregister]),
    Z.useEffect(() => {
      if (n._proxyFormState.isDirty) {
        const c = n._getDirty();
        c !== i.isDirty && n._subjects.state.next({ isDirty: c });
      }
    }, [n, i.isDirty]),
    Z.useEffect(() => {
      var c;
      e.values && !ue(e.values, s.current)
        ? (n._reset(e.values, { keepFieldsRef: !0, ...n._options.resetOptions }),
          (!((c = n._options.resetOptions) === null || c === void 0) && c.keepIsValid) ||
            n._setValid(),
          (s.current = e.values),
          d((u) => ({ ...u })))
        : n._resetDefaultValues();
    }, [n, e.values]),
    Z.useEffect(() => {
      (n._state.mount || (n._setValid(), (n._state.mount = !0)),
        n._state.watch && ((n._state.watch = !1), n._subjects.state.next({ ...n._formState })),
        n._removeUnmounted());
    }),
    (r.current.formState = Z.useMemo(() => dr(i, n), [n, i])),
    r.current
  );
}
const As = (e, r, s) => {
    if (e && "reportValidity" in e) {
      const i = g(s, r);
      (e.setCustomValidity((i && i.message) || ""), e.reportValidity());
    }
  },
  Qe = (e, r) => {
    for (const s in r.fields) {
      const i = r.fields[s];
      i && i.ref && "reportValidity" in i.ref
        ? As(i.ref, s, e)
        : i && i.refs && i.refs.forEach((d) => As(d, s, e));
    }
  },
  Ds = (e, r) => {
    r.shouldUseNativeValidation && Qe(e, r);
    const s = {};
    for (const i in e) {
      const d = g(r.fields, i),
        n = Object.assign(e[i] || {}, { ref: d && d.ref });
      if (Fr(r.names || Object.keys(e), i)) {
        const c = Object.assign({}, g(s, i));
        (D(c, "root", n), D(s, i, c));
      } else D(s, i, n);
    }
    return s;
  },
  Fr = (e, r) => {
    const s = Os(r).replace(/[.*+?^${}()|\\]/g, "\\$&");
    return e.some((i) => Os(i).match(`^${s}\\.\\d+`));
  };
function Os(e) {
  return e.replace(/[\[\]]/g, "");
}
function zs(e, r, s) {
  function i(u, N) {
    var F;
    (Object.defineProperty(u, "_zod", { value: u._zod ?? {}, enumerable: !1 }),
      (F = u._zod).traits ?? (F.traits = new Set()),
      u._zod.traits.add(e),
      r(u, N));
    for (const T in c.prototype)
      T in u || Object.defineProperty(u, T, { value: c.prototype[T].bind(u) });
    ((u._zod.constr = c), (u._zod.def = N));
  }
  const d = s?.Parent ?? Object;
  class n extends d {}
  Object.defineProperty(n, "name", { value: e });
  function c(u) {
    var N;
    const F = s?.Parent ? new n() : this;
    (i(F, u), (N = F._zod).deferred ?? (N.deferred = []));
    for (const T of F._zod.deferred) T();
    return F;
  }
  return (
    Object.defineProperty(c, "init", { value: i }),
    Object.defineProperty(c, Symbol.hasInstance, {
      value: (u) => (s?.Parent && u instanceof s.Parent ? !0 : u?._zod?.traits?.has(e)),
    }),
    Object.defineProperty(c, "name", { value: e }),
    c
  );
}
class Er extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
const kr = {};
function qs(e) {
  return kr;
}
function Ar(e, r) {
  return typeof r == "bigint" ? r.toString() : r;
}
const $s = Error.captureStackTrace ? Error.captureStackTrace : (...e) => {};
function Te(e) {
  return typeof e == "string" ? e : e?.message;
}
function Hs(e, r, s) {
  const i = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const d =
      Te(e.inst?._zod.def?.error?.(e)) ??
      Te(r?.error?.(e)) ??
      Te(s.customError?.(e)) ??
      Te(s.localeError?.(e)) ??
      "Invalid input";
    i.message = d;
  }
  return (delete i.inst, delete i.continue, r?.reportInput || delete i.input, i);
}
const Gs = (e, r) => {
    ((e.name = "$ZodError"),
      Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, "issues", { value: r, enumerable: !1 }),
      Object.defineProperty(e, "message", {
        get() {
          return JSON.stringify(r, Ar, 2);
        },
        enumerable: !0,
      }),
      Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
  },
  Dr = zs("$ZodError", Gs),
  Ys = zs("$ZodError", Gs, { Parent: Error }),
  Or = (e) => (r, s, i, d) => {
    const n = i ? Object.assign(i, { async: !1 }) : { async: !1 },
      c = r._zod.run({ value: s, issues: [] }, n);
    if (c instanceof Promise) throw new Er();
    if (c.issues.length) {
      const u = new (d?.Err ?? e)(c.issues.map((N) => Hs(N, n, qs())));
      throw ($s(u, d?.callee), u);
    }
    return c.value;
  },
  Pr = Or(Ys),
  Cr = (e) => async (r, s, i, d) => {
    const n = i ? Object.assign(i, { async: !0 }) : { async: !0 };
    let c = r._zod.run({ value: s, issues: [] }, n);
    if ((c instanceof Promise && (c = await c), c.issues.length)) {
      const u = new (d?.Err ?? e)(c.issues.map((N) => Hs(N, n, qs())));
      throw ($s(u, d?.callee), u);
    }
    return c.value;
  },
  Tr = Cr(Ys);
function Je() {
  return (
    (Je = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var s = arguments[r];
            for (var i in s) ({}).hasOwnProperty.call(s, i) && (e[i] = s[i]);
          }
          return e;
        }),
    Je.apply(null, arguments)
  );
}
function Ps(e, r) {
  try {
    var s = e();
  } catch (i) {
    return r(i);
  }
  return s && s.then ? s.then(void 0, r) : s;
}
function Rr(e, r) {
  for (var s = {}; e.length; ) {
    var i = e[0],
      d = i.code,
      n = i.message,
      c = i.path.join(".");
    if (!s[c])
      if ("unionErrors" in i) {
        var u = i.unionErrors[0].errors[0];
        s[c] = { message: u.message, type: u.code };
      } else s[c] = { message: n, type: d };
    if (
      ("unionErrors" in i &&
        i.unionErrors.forEach(function (T) {
          return T.errors.forEach(function (V) {
            return e.push(V);
          });
        }),
      r)
    ) {
      var N = s[c].types,
        F = N && N[i.code];
      s[c] = rs(c, r, s, d, F ? [].concat(F, i.message) : i.message);
    }
    e.shift();
  }
  return s;
}
function Ur(e, r) {
  for (
    var s = {},
      i = function () {
        var d = e[0],
          n = d.code,
          c = d.message,
          u = d.path.join(".");
        if (!s[u])
          if (d.code === "invalid_union" && d.errors.length > 0) {
            var N = d.errors[0][0];
            s[u] = { message: N.message, type: N.code };
          } else s[u] = { message: c, type: n };
        if (
          (d.code === "invalid_union" &&
            d.errors.forEach(function (V) {
              return V.forEach(function (A) {
                return e.push(Je({}, A, { path: [].concat(d.path, A.path) }));
              });
            }),
          r)
        ) {
          var F = s[u].types,
            T = F && F[d.code];
          s[u] = rs(u, r, s, n, T ? [].concat(T, d.message) : d.message);
        }
        e.shift();
      };
    e.length;
  )
    i();
  return s;
}
function ce(e, r, s) {
  if (
    (s === void 0 && (s = {}),
    (function (i) {
      return "_def" in i && typeof i._def == "object" && "typeName" in i._def;
    })(e))
  )
    return function (i, d, n) {
      try {
        return Promise.resolve(
          Ps(
            function () {
              return Promise.resolve(e[s.mode === "sync" ? "parse" : "parseAsync"](i, r)).then(
                function (c) {
                  return (
                    n.shouldUseNativeValidation && Qe({}, n),
                    { errors: {}, values: s.raw ? Object.assign({}, i) : c }
                  );
                },
              );
            },
            function (c) {
              if (
                (function (u) {
                  return Array.isArray(u?.issues);
                })(c)
              )
                return {
                  values: {},
                  errors: Ds(
                    Rr(c.errors, !n.shouldUseNativeValidation && n.criteriaMode === "all"),
                    n,
                  ),
                };
              throw c;
            },
          ),
        );
      } catch (c) {
        return Promise.reject(c);
      }
    };
  if (
    (function (i) {
      return "_zod" in i && typeof i._zod == "object";
    })(e)
  )
    return function (i, d, n) {
      try {
        return Promise.resolve(
          Ps(
            function () {
              return Promise.resolve((s.mode === "sync" ? Pr : Tr)(e, i, r)).then(function (c) {
                return (
                  n.shouldUseNativeValidation && Qe({}, n),
                  { errors: {}, values: s.raw ? Object.assign({}, i) : c }
                );
              });
            },
            function (c) {
              if (
                (function (u) {
                  return u instanceof Dr;
                })(c)
              )
                return {
                  values: {},
                  errors: Ds(
                    Ur(c.issues, !n.shouldUseNativeValidation && n.criteriaMode === "all"),
                    n,
                  ),
                };
              throw c;
            },
          ),
        );
      } catch (c) {
        return Promise.reject(c);
      }
    };
  throw new Error("Invalid input: not a Zod schema");
}
const Lr = se({
    store_name: _().min(2, "Nome da loja é obrigatório"),
    store_phone: _().optional().or(O("")),
    store_email: _().email("Email inválido").optional().or(O("")),
    store_cnpj: _().optional().or(O("")),
    store_logo_url: _().url("URL inválida").optional().or(O("")),
    store_favicon_url: _().url("URL inválida").optional().or(O("")),
  }),
  Mr = se({
    company_cep: _().min(8, "CEP inválido"),
    company_street: _().min(2, "Rua é obrigatória"),
    company_number: _().min(1, "Número é obrigatório"),
    company_complement: _().optional().or(O("")),
    company_neighborhood: _().min(2, "Bairro é obrigatório"),
    company_city: _().min(2, "Cidade é obrigatória"),
    company_state: _().length(2, "UF inválida"),
  }),
  Ir = se({
    return_cep: _().min(8, "CEP inválido"),
    return_street: _().min(2, "Rua é obrigatória"),
    return_number: _().min(1, "Número é obrigatório"),
    return_complement: _().optional().or(O("")),
    return_neighborhood: _().min(2, "Bairro é obrigatório"),
    return_city: _().min(2, "Cidade é obrigatória"),
    return_state: _().length(2, "UF inválida"),
  }),
  Br = se({
    admin_name: _().min(2, "Nome é obrigatório"),
    admin_phone: _().optional().or(O("")),
    admin_role: _().optional().or(O("")),
  }),
  Xr = se({
    current_password: _().min(6, "Senha atual é obrigatória"),
    new_password: _().min(6, "Nova senha deve ter no mínimo 6 caracteres"),
    confirm_password: _().min(6, "Confirmação de senha é obrigatória"),
  }).refine((e) => e.new_password === e.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  }),
  zr = se({
    new_email: _().email("Email inválido"),
    current_password: _().min(6, "Senha atual é obrigatória"),
  }),
  qr = se({
    smtp_host: _().min(1, "Host SMTP é obrigatório"),
    smtp_port: Se.number().min(1, "Porta inválida"),
    smtp_user: _().min(1, "Usuário SMTP é obrigatório"),
    smtp_password: _().min(1, "Senha SMTP é obrigatória"),
    smtp_from: _().email("Email remetente inválido"),
    smtp_secure: K().default(!0),
  }),
  $r = se({
    maintenance_mode: K().default(!1),
    allow_register: K().default(!0),
    currency: _().default("BRL"),
    timezone: _().default("America/Sao_Paulo"),
    date_format: _().default("DD/MM/YYYY"),
  }),
  Hr = se({
    default_shipping_cost: Se.number().min(0, "Custo não pode ser negativo"),
    free_shipping_threshold: Se.number().min(0).optional(),
    shipping_provider: _().default("manual"),
    delivery_time_min: Se.number().min(1).optional(),
    delivery_time_max: Se.number().min(1).optional(),
  }),
  Gr = se({
    site_title: _().min(1, "Título do site é obrigatório"),
    site_description: _().max(160, "Máximo 160 caracteres").optional().or(O("")),
    site_keywords: _().optional().or(O("")),
    google_analytics_id: _().optional().or(O("")),
    facebook_pixel_id: _().optional().or(O("")),
  });
se({
  instagram_username: _().optional().or(O("")),
  instagram_url: _().url("URL inválida").optional().or(O("")),
  instagram_active: K().default(!0),
  facebook_url: _().url("URL inválida").optional().or(O("")),
  facebook_active: K().default(!1),
  twitter_url: _().url("URL inválida").optional().or(O("")),
  twitter_active: K().default(!1),
  tiktok_url: _().url("URL inválida").optional().or(O("")),
  tiktok_active: K().default(!1),
  youtube_url: _().url("URL inválida").optional().or(O("")),
  youtube_active: K().default(!1),
  whatsapp_number: _().optional().or(O("")),
  whatsapp_active: K().default(!1),
  pinterest_url: _().url("URL inválida").optional().or(O("")),
  pinterest_active: K().default(!1),
});
se({
  mp_public_key: _().optional().or(O("")),
  mp_access_token: _().optional().or(O("")),
  mp_active: K().default(!1),
  infinitypay_key: _().optional().or(O("")),
  infinitypay_secret: _().optional().or(O("")),
  infinitypay_active: K().default(!1),
  ga_measurement_id: _().optional().or(O("")),
  ga_active: K().default(!1),
  meta_pixel_id: _().optional().or(O("")),
  meta_pixel_active: K().default(!1),
});
const x =
    "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20",
  v = "text-xs tracking-editorial uppercase mb-1.5 block text-muted-foreground",
  ie = "bg-background border border-border rounded-sm p-6 space-y-4";
function Yr() {
  return ar({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data: e, error: r } = await Re.from("site_settings").select("key, value");
      if (r) throw r;
      const s = {};
      return (
        e.forEach((i) => {
          s[i.key] = i.value;
        }),
        s
      );
    },
  });
}
function ae({ title: e, description: r, children: s }) {
  return a.jsxs("div", {
    className: "space-y-2",
    children: [
      a.jsxs("div", {
        children: [
          a.jsx("h2", { className: "font-medium text-lg", children: e }),
          r && a.jsx("p", { className: "text-sm text-muted-foreground", children: r }),
        ],
      }),
      s,
    ],
  });
}
function Qr() {
  const e = ir(),
    { data: r, isLoading: s } = Yr(),
    [i, d] = He.useState(null),
    n = (j, I) => (r ? (r[j] ?? I ?? "") : (I ?? "")),
    c = async (j, I) => {
      d(j);
      const { error: R } = await Re.from("site_settings").upsert({ key: j, value: I });
      return (
        d(null),
        R
          ? (ye.error(R.message), !1)
          : (ye.success("Configuração salva com sucesso"),
            e.invalidateQueries({ queryKey: ["site_settings"] }),
            !0)
      );
    },
    u = oe({
      resolver: ce(Lr),
      defaultValues: {
        store_name: n("store_name"),
        store_phone: n("store_phone"),
        store_email: n("store_email"),
        store_cnpj: n("store_cnpj"),
        store_logo_url: n("store_logo_url"),
      },
    }),
    N = oe({
      resolver: ce(Mr),
      defaultValues: {
        company_cep: n("company_cep"),
        company_street: n("company_street"),
        company_number: n("company_number"),
        company_complement: n("company_complement"),
        company_neighborhood: n("company_neighborhood"),
        company_city: n("company_city"),
        company_state: n("company_state"),
      },
    }),
    F = oe({
      resolver: ce(Ir),
      defaultValues: {
        return_cep: n("return_cep"),
        return_street: n("return_street"),
        return_number: n("return_number"),
        return_complement: n("return_complement"),
        return_neighborhood: n("return_neighborhood"),
        return_city: n("return_city"),
        return_state: n("return_state"),
      },
    }),
    T = oe({
      resolver: ce(Br),
      defaultValues: {
        admin_name: n("admin_name"),
        admin_phone: n("admin_phone"),
        admin_role: n("admin_role"),
      },
    }),
    V = oe({
      resolver: ce(Xr),
      defaultValues: { current_password: "", new_password: "", confirm_password: "" },
    }),
    A = oe({ resolver: ce(zr), defaultValues: { new_email: "", current_password: "" } }),
    b = oe({
      resolver: ce(qr),
      defaultValues: {
        smtp_host: n("smtp_host"),
        smtp_port: Number(n("smtp_port", 587)),
        smtp_user: n("smtp_user"),
        smtp_password: n("smtp_password"),
        smtp_from: n("smtp_from"),
        smtp_secure: n("smtp_secure", !0),
      },
    }),
    W = oe({
      resolver: ce($r),
      defaultValues: {
        maintenance_mode: n("maintenance_mode", !1),
        allow_register: n("allow_register", !0),
        currency: n("currency", "BRL"),
        timezone: n("timezone", "America/Sao_Paulo"),
        date_format: n("date_format", "DD/MM/YYYY"),
      },
    }),
    L = oe({
      resolver: ce(Hr),
      defaultValues: {
        default_shipping_cost: Number(n("default_shipping_cost", 0)),
        free_shipping_threshold: Number(n("free_shipping_threshold", 0)),
        shipping_provider: n("shipping_provider", "manual"),
        delivery_time_min: Number(n("delivery_time_min", 1)),
        delivery_time_max: Number(n("delivery_time_max", 10)),
      },
    }),
    $ = oe({
      resolver: ce(Gr),
      defaultValues: {
        site_title: n("site_title"),
        site_description: n("site_description"),
        site_keywords: n("site_keywords"),
        google_analytics_id: n("google_analytics_id"),
        facebook_pixel_id: n("facebook_pixel_id"),
      },
    }),
    [M, w] = He.useState({
      username: "_nicoly.modas",
      url: "https://www.instagram.com/_nicoly.modas",
      active: !0,
    });
  return (
    He.useEffect(() => {
      r?.instagram && w(r.instagram);
    }, [r]),
    s
      ? a.jsx("div", {
          className: "p-10 text-sm text-muted-foreground",
          children: "Carregando configurações...",
        })
      : a.jsxs("div", {
          className: "max-w-3xl space-y-10",
          children: [
            a.jsxs("div", {
              children: [
                a.jsx("h1", {
                  className: "font-display text-3xl mb-1",
                  children: "Configurações do Site",
                }),
                a.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Gerencie dados da loja, endereços, contas e configurações gerais",
                }),
              ],
            }),
            a.jsx(ae, {
              title: "Dados da Loja",
              description: "Informações principais da sua loja.",
              children: a.jsxs("form", {
                onSubmit: u.handleSubmit((j) => c("store_data", j)),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Nome da Loja" }),
                          a.jsx("input", {
                            ...u.register("store_name"),
                            className: x,
                            placeholder: "Ex: Nicoly Modas",
                          }),
                          u.formState.errors.store_name &&
                            a.jsx("p", {
                              className: "text-xs text-destructive mt-1",
                              children: u.formState.errors.store_name.message,
                            }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Telefone" }),
                          a.jsx("input", {
                            ...u.register("store_phone"),
                            className: x,
                            placeholder: "",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Email" }),
                          a.jsx("input", {
                            ...u.register("store_email"),
                            className: x,
                            placeholder: "contato@exemplo.com",
                            type: "email",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "CNPJ" }),
                          a.jsx("input", {
                            ...u.register("store_cnpj"),
                            className: x,
                            placeholder: "00.000.000/0000-00",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "URL do Logo" }),
                          a.jsx("input", {
                            ...u.register("store_logo_url"),
                            className: x,
                            placeholder: "https://...",
                            type: "url",
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children: i === "store_data" ? "Salvando..." : "Salvar Dados da Loja",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Endereço da Empresa",
              children: a.jsxs("form", {
                onSubmit: N.handleSubmit((j) => c("company_address", j)),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                    children: [
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "CEP" }),
                          a.jsx("input", {
                            ...N.register("company_cep"),
                            className: x,
                            placeholder: "00000-000",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Rua" }),
                          a.jsx("input", { ...N.register("company_street"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Número" }),
                          a.jsx("input", { ...N.register("company_number"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Complemento" }),
                          a.jsx("input", { ...N.register("company_complement"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Bairro" }),
                          a.jsx("input", { ...N.register("company_neighborhood"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Cidade" }),
                          a.jsx("input", { ...N.register("company_city"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Estado (UF)" }),
                          a.jsx("input", {
                            ...N.register("company_state"),
                            className: x,
                            maxLength: 2,
                            placeholder: "SP",
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children: i === "company_address" ? "Salvando..." : "Salvar Endereço",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Endereço de Devolução",
              children: a.jsxs("form", {
                onSubmit: F.handleSubmit((j) => c("return_address", j)),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                    children: [
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "CEP" }),
                          a.jsx("input", {
                            ...F.register("return_cep"),
                            className: x,
                            placeholder: "00000-000",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Rua" }),
                          a.jsx("input", { ...F.register("return_street"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Número" }),
                          a.jsx("input", { ...F.register("return_number"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Complemento" }),
                          a.jsx("input", { ...F.register("return_complement"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Bairro" }),
                          a.jsx("input", { ...F.register("return_neighborhood"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Cidade" }),
                          a.jsx("input", { ...F.register("return_city"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Estado (UF)" }),
                          a.jsx("input", {
                            ...F.register("return_state"),
                            className: x,
                            maxLength: 2,
                            placeholder: "SP",
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children:
                        i === "return_address" ? "Salvando..." : "Salvar Endereço de Devolução",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Conta Administrativa",
              children: a.jsxs("form", {
                onSubmit: T.handleSubmit((j) => c("admin_account", j)),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Nome" }),
                          a.jsx("input", { ...T.register("admin_name"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Telefone" }),
                          a.jsx("input", { ...T.register("admin_phone"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Função" }),
                          a.jsx("input", { ...T.register("admin_role"), className: x }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children: i === "admin_account" ? "Salvando..." : "Salvar Conta",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Alteração de Senha",
              children: a.jsxs("form", {
                onSubmit: V.handleSubmit(async (j) => {
                  const { error: I } = await Re.auth.updateUser({ password: j.new_password });
                  if (I) return ye.error(I.message);
                  (ye.success("Senha alterada com sucesso"), V.reset());
                }),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 gap-4",
                    children: [
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Senha Atual" }),
                          a.jsx("input", {
                            type: "password",
                            ...V.register("current_password"),
                            className: x,
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Nova Senha" }),
                          a.jsx("input", {
                            type: "password",
                            ...V.register("new_password"),
                            className: x,
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Confirme a Nova Senha" }),
                          a.jsx("input", {
                            type: "password",
                            ...V.register("confirm_password"),
                            className: x,
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children: "Alterar Senha",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Alteração de Email Login",
              children: a.jsxs("form", {
                onSubmit: A.handleSubmit(async (j) => {
                  const { error: I } = await Re.auth.updateUser({ email: j.new_email });
                  if (I) return ye.error(I.message);
                  (ye.success("Email de login alterado com sucesso. Verifique seu novo email."),
                    A.reset());
                }),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 gap-4",
                    children: [
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Novo Email" }),
                          a.jsx("input", {
                            type: "email",
                            ...A.register("new_email"),
                            className: x,
                            placeholder: "novo@email.com",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Senha Atual" }),
                          a.jsx("input", {
                            type: "password",
                            ...A.register("current_password"),
                            className: x,
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children: "Alterar Email",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Configurações de Email (SMTP)",
              children: a.jsxs("form", {
                onSubmit: b.handleSubmit((j) => c("email_settings", j)),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Host SMTP" }),
                          a.jsx("input", {
                            ...b.register("smtp_host"),
                            className: x,
                            placeholder: "smtp.exemplo.com",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Porta" }),
                          a.jsx("input", {
                            type: "number",
                            ...b.register("smtp_port"),
                            className: x,
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Usuário" }),
                          a.jsx("input", { ...b.register("smtp_user"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Senha" }),
                          a.jsx("input", {
                            type: "password",
                            ...b.register("smtp_password"),
                            className: x,
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Email Remetente" }),
                          a.jsx("input", {
                            ...b.register("smtp_from"),
                            className: x,
                            placeholder: "noreply@exemplo.com",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          a.jsx("input", {
                            type: "checkbox",
                            ...b.register("smtp_secure"),
                            id: "smtp_secure",
                          }),
                          a.jsx("label", {
                            htmlFor: "smtp_secure",
                            className: "text-sm",
                            children: "Usar conexão segura (SSL/TLS)",
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children:
                        i === "email_settings" ? "Salvando..." : "Salvar Configurações de Email",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Configurações Gerais",
              children: a.jsxs("form", {
                onSubmit: W.handleSubmit((j) => c("general_settings", j)),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      a.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          a.jsx("input", {
                            type: "checkbox",
                            ...W.register("maintenance_mode"),
                            id: "maintenance_mode",
                          }),
                          a.jsx("label", {
                            htmlFor: "maintenance_mode",
                            className: "text-sm",
                            children: "Modo Manutenção",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          a.jsx("input", {
                            type: "checkbox",
                            ...W.register("allow_register"),
                            id: "allow_register",
                          }),
                          a.jsx("label", {
                            htmlFor: "allow_register",
                            className: "text-sm",
                            children: "Permitir Cadastro de novos usuários",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Moeda" }),
                          a.jsx("input", { ...W.register("currency"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Fuso Horário" }),
                          a.jsx("input", { ...W.register("timezone"), className: x }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children:
                        i === "general_settings" ? "Salvando..." : "Salvar Configurações Gerais",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Frete",
              children: a.jsxs("form", {
                onSubmit: L.handleSubmit((j) => c("shipping_settings", j)),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Custo Padrão de Frete" }),
                          a.jsx("input", {
                            type: "number",
                            step: "0.01",
                            ...L.register("default_shipping_cost"),
                            className: x,
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Frete Grátis acima de (R$)" }),
                          a.jsx("input", {
                            type: "number",
                            step: "0.01",
                            ...L.register("free_shipping_threshold"),
                            className: x,
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Provedor de Frete" }),
                          a.jsx("input", { ...L.register("shipping_provider"), className: x }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "flex gap-4",
                        children: [
                          a.jsxs("div", {
                            className: "flex-1",
                            children: [
                              a.jsx("label", { className: v, children: "Prazo Mínimo (dias)" }),
                              a.jsx("input", {
                                type: "number",
                                ...L.register("delivery_time_min"),
                                className: x,
                              }),
                            ],
                          }),
                          a.jsxs("div", {
                            className: "flex-1",
                            children: [
                              a.jsx("label", { className: v, children: "Prazo Máximo (dias)" }),
                              a.jsx("input", {
                                type: "number",
                                ...L.register("delivery_time_max"),
                                className: x,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children:
                        i === "shipping_settings" ? "Salvando..." : "Salvar Configurações de Frete",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "SEO e Marketing",
              children: a.jsxs("form", {
                onSubmit: $.handleSubmit((j) => c("seo_settings", j)),
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 gap-4",
                    children: [
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Título do Site" }),
                          a.jsx("input", {
                            ...$.register("site_title"),
                            className: x,
                            placeholder: "Título para motores de busca",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Descrição do Site" }),
                          a.jsx("textarea", {
                            ...$.register("site_description"),
                            className: x,
                            rows: 3,
                            placeholder: "Máximo 160 caracteres...",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        children: [
                          a.jsx("label", { className: v, children: "Palavras-chave" }),
                          a.jsx("input", {
                            ...$.register("site_keywords"),
                            className: x,
                            placeholder: "moda, vestidos, roupas femininas",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                          a.jsxs("div", {
                            children: [
                              a.jsx("label", { className: v, children: "Google Analytics ID" }),
                              a.jsx("input", {
                                ...$.register("google_analytics_id"),
                                className: x,
                                placeholder: "G-XXXXXXXXXX",
                              }),
                            ],
                          }),
                          a.jsxs("div", {
                            children: [
                              a.jsx("label", { className: v, children: "Facebook Pixel ID" }),
                              a.jsx("input", {
                                ...$.register("facebook_pixel_id"),
                                className: x,
                                placeholder: "XXXXXXXXXXXXXXXXXXX",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children: i === "seo_settings" ? "Salvando..." : "Salvar SEO e Marketing",
                    }),
                  }),
                ],
              }),
            }),
            a.jsx(ae, {
              title: "Instagram",
              description: "Configurações do Instagram oficial da loja.",
              children: a.jsxs("form", {
                onSubmit: (j) => {
                  (j.preventDefault(), c("instagram", M));
                },
                className: ie,
                children: [
                  a.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "Username (sem @)" }),
                          a.jsx("input", {
                            value: M.username,
                            onChange: (j) => w({ ...M, username: j.target.value }),
                            className: x,
                            placeholder: "_nicoly.modas",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "md:col-span-2",
                        children: [
                          a.jsx("label", { className: v, children: "URL completa" }),
                          a.jsx("input", {
                            value: M.url,
                            onChange: (j) => w({ ...M, url: j.target.value }),
                            className: x,
                            type: "url",
                            placeholder: "https://www.instagram.com/_nicoly.modas",
                          }),
                        ],
                      }),
                      a.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          a.jsx("input", {
                            type: "checkbox",
                            checked: M.active,
                            onChange: (j) => w({ ...M, active: j.target.checked }),
                            id: "instagram_active",
                          }),
                          a.jsx("label", {
                            htmlFor: "instagram_active",
                            className: "text-sm",
                            children: "Exibir no site",
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx("div", {
                    className: "pt-2",
                    children: a.jsx("button", {
                      disabled: !!i,
                      className:
                        "bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-50",
                      children: i === "instagram" ? "Salvando..." : "Salvar Instagram",
                    }),
                  }),
                ],
              }),
            }),
          ],
        })
  );
}
export { Qr as component };
