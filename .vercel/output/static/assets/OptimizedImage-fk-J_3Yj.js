import { Q as n, D as s } from "./index-C2UuTsl-.js";
import { S as g, a as d } from "./skeleton-0MS9dn16.js";
import { I as N } from "./image-off-Df7chaH8.js";
const I = ({
  src: f,
  alt: c = "",
  className: x,
  fallbackSrc: t = "/placeholder.svg",
  containerClassName: p,
  width: e,
  height: r,
  onLoad: l,
  ...o
}) => {
  const [i, m] = n.useState(!1),
    [y, j] = n.useState(!1),
    [a, v] = n.useState(f),
    E = (u) => {
      (m(!0), l && l());
    },
    b = (u) => {
      (j(!0), m(!0), t && a !== t && v(t), o.onError && o.onError(u));
    };
  return s.jsxs("div", {
    className: d("relative overflow-hidden", p),
    style: {
      width: e ? (typeof e == "number" ? `${e}px` : e) : void 0,
      height: r ? (typeof r == "number" ? `${r}px` : r) : void 0,
      aspectRatio: e && r ? `${e}/${r}` : void 0,
    },
    children: [
      !i && s.jsx(g, { className: "absolute inset-0 w-full h-full z-10 rounded-sm" }),
      y && !a
        ? s.jsxs("div", {
            className:
              "absolute inset-0 flex flex-col items-center justify-center bg-muted/40 text-muted-foreground p-2",
            children: [
              s.jsx(N, { className: "h-8 w-8 mb-1 opacity-50" }),
              s.jsx("span", {
                className: "text-xs truncate max-w-full",
                children: c || "Erro ao carregar imagem",
              }),
            ],
          })
        : s.jsx("img", {
            src: a,
            alt: c,
            width: e,
            height: r,
            loading: "lazy",
            decoding: "async",
            onLoad: E,
            onError: b,
            style: { width: "100%", height: "100%", objectFit: "cover" },
            className: d(
              "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
              i ? "opacity-100" : "opacity-0",
              x,
            ),
            ...o,
          }),
    ],
  });
};
export { I as O };
