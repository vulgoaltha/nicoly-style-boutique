import { D as e } from "./index-C2UuTsl-.js";
const o = ({ error: r }) =>
  e.jsxs("div", {
    className: "p-4 text-red-500 bg-red-50 border border-red-200 rounded",
    children: [
      e.jsx("strong", { children: "Erro ao carregar pedido:" }),
      e.jsx("pre", {
        className: "mt-2 text-xs",
        children: r instanceof Error ? r.message : JSON.stringify(r),
      }),
    ],
  });
export { o as errorComponent };
