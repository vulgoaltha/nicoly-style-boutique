import { aa as r, Q as n, a1 as d, a6 as c, D as a } from "./index-C2UuTsl-.js";
function h() {
  const e = r(),
    [i, t] = n.useState("Processando autenticação...");
  return (
    n.useEffect(() => {
      const s = new URL(window.location.href).searchParams.get("code");
      s
        ? d.auth.exchangeCodeForSession(s).then(({ data: m, error: o }) => {
            o
              ? (c.error("Erro ao confirmar e-mail: " + o.message),
                t("Falha na autenticação. Redirecionando..."),
                setTimeout(() => e({ to: "/login" }), 2e3))
              : (c.success("Conta confirmada com sucesso! Bem-vinda."),
                t("Sucesso! Redirecionando..."),
                setTimeout(() => e({ to: "/minha-conta/pedidos" }), 1e3));
          })
        : (t("Nenhum código de autenticação encontrado. Redirecionando..."),
          setTimeout(() => e({ to: "/login" }), 2e3));
    }, [e]),
    a.jsx("div", {
      className: "flex min-h-[60vh] items-center justify-center",
      children: a.jsxs("div", {
        className: "text-center",
        children: [
          a.jsx("h1", { className: "font-display text-2xl mb-2", children: i }),
          a.jsx("p", { className: "text-muted-foreground", children: "Aguarde..." }),
        ],
      }),
    })
  );
}
export { h as component };
