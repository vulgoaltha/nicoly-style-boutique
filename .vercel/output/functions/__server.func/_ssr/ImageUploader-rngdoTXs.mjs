import { r as x, j as e } from "../_libs/react.mjs";
import { t as d } from "../_libs/sonner.mjs";
import { p } from "./client-DbGX8m2J.mjs";
import { i as g } from "../_libs/browser-image-compression.mjs";
import { ag as f, y as h, a9 as b, v as w } from "../_libs/lucide-react.mjs";
async function v(t, n = "site") {
  const s = { maxSizeMB: 2, maxWidthOrHeight: 1920, useWebWorker: !0, fileType: "image/webp" };
  let r = t;
  try {
    r = await g(t, s);
  } catch (m) {
    console.warn("A compressão de imagem falhou, fazendo upload do arquivo original", m);
  }
  const c = r.type === "image/webp" ? "webp" : (t.name.split(".").pop() ?? "jpg"),
    o = `${n}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${c}`,
    { error: i } = await p.storage
      .from("products")
      .upload(o, r, { cacheControl: "3600", upsert: !1, contentType: r.type });
  if (i) throw i;
  const { data: l } = p.storage.from("products").getPublicUrl(o);
  return l.publicUrl;
}
function G({ value: t, onChange: n, folder: s = "site", compact: r = !1 }) {
  const [c, o] = x.useState(!1),
    i = () => {
      switch (s) {
        case "category_icons":
          return "Recomendado: Imagem PNG ou JPG de 100x100px. Máx 10MB.";
        case "banners":
          return "Recomendado: 1920x800 (Desktop) ou 800x1200 (Mobile). Máx 10MB.";
        case "products":
          return "Recomendado: 800x1000 (Formato retrato 4:5). Máx 10MB.";
        case "categories":
          return "Recomendado: Ícone PNG ou JPG de 100x100px. Máx 10MB.";
        case "collections":
          return "Recomendado: 1200x600 (Formato paisagem). Máx 10MB.";
        default:
          return "Formatos aceitos: JPG, PNG, WEBP. Tamanho máx: 10MB.";
      }
    },
    l = async (a) => {
      if (a.size > 10 * 1024 * 1024) {
        d.error("O arquivo é muito grande. O limite máximo é 10MB.");
        return;
      }
      if (!a.type.startsWith("image/")) {
        d.error("Por favor, selecione apenas arquivos de imagem (PNG ou JPG).");
        return;
      }
      o(!0);
      try {
        const u = await v(a, s);
        (n(u), d.success("Ícone/Imagem enviado com sucesso!"));
      } catch (u) {
        d.error(u.message ?? "Ocorreu um erro ao enviar a imagem.");
      } finally {
        o(!1);
      }
    };
  if (t)
    return e.jsx("div", {
      className: "space-y-2",
      children: e.jsxs("div", {
        className: `relative bg-secondary rounded-sm overflow-hidden border border-border flex items-center justify-center ${r || s === "category_icons" ? "w-24 h-24 aspect-square" : "aspect-video w-full max-w-md"}`,
        children: [
          e.jsx("img", {
            src: t,
            alt: "Preview do ícone",
            className: "h-full w-full object-cover",
          }),
          e.jsx("button", {
            type: "button",
            onClick: () => n(""),
            className:
              "absolute top-1 right-1 bg-background/90 rounded-full p-1 hover:bg-destructive hover:text-white transition-colors shadow-sm",
            title: "Remover imagem",
            children: e.jsx(f, { className: "h-3.5 w-3.5" }),
          }),
        ],
      }),
    });
  const m = r || s === "category_icons";
  return e.jsxs("div", {
    className: `space-y-2 ${m ? "w-auto" : "max-w-md w-full"}`,
    children: [
      e.jsxs("label", {
        className: `flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-border rounded-sm cursor-pointer hover:bg-secondary/50 transition-colors text-xs text-muted-foreground bg-secondary/20 p-2 ${m ? "w-28 h-28 aspect-square" : "aspect-video w-full"}`,
        children: [
          c
            ? e.jsxs(e.Fragment, {
                children: [
                  e.jsx(h, { className: "h-5 w-5 animate-spin text-primary" }),
                  e.jsx("span", {
                    className: "text-[11px] text-center font-medium",
                    children: "Enviando...",
                  }),
                ],
              })
            : e.jsxs(e.Fragment, {
                children: [
                  e.jsx(b, { className: "h-5 w-5 text-muted-foreground" }),
                  e.jsx("span", {
                    className: "font-medium text-[11px] text-center",
                    children: "Enviar ícone",
                  }),
                  e.jsx("span", {
                    className: "text-[10px] text-muted-foreground/70",
                    children: "PNG ou JPG (100x100)",
                  }),
                ],
              }),
          e.jsx("input", {
            type: "file",
            accept: "image/jpeg,image/png,image/webp,image/gif",
            className: "hidden",
            onChange: (a) => {
              a.target.files?.[0] && (l(a.target.files[0]), (a.target.value = ""));
            },
            disabled: c,
          }),
        ],
      }),
      e.jsxs("div", {
        className:
          "flex items-start gap-1.5 text-[11px] text-muted-foreground bg-secondary/30 p-1.5 rounded max-w-xs",
        children: [
          e.jsx(w, { className: "h-3 w-3 mt-0.5 shrink-0" }),
          e.jsx("p", { children: i() }),
        ],
      }),
    ],
  });
}
export { G as $ };
