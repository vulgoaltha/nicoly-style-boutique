import { Link, useLoaderData } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function Footer() {
  const loaderData = useLoaderData({ from: "__root__" }) as any;
  const storeData = loaderData?.storeData || {};
  const seoSettings = loaderData?.seoSettings || {};
  const instagram = loaderData?.instagram || null;

  const storeName = storeData?.store_name || "Nicoly Modas";
  const storeDescription =
    seoSettings?.site_description ||
    storeData?.store_description ||
    "Moda feminina premium para mulheres que se vestem com intenção.";

  return (
    <footer className="mt-16 md:mt-24 border-t border-border bg-secondary/40">
      {/* ── Grid principal ── */}
      <div className="container-editorial py-10 md:py-14 grid grid-cols-2 gap-8 md:grid-cols-4">
        {/* Coluna 1 — Marca (span 2 cols no mobile) */}
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl">{storeName}</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">{storeDescription}</p>
          {instagram?.active && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm hover:text-blush transition"
            >
              <Instagram className="h-4 w-4" /> @{instagram.username}
            </a>
          )}
        </div>

        {/* Coluna 2 — Loja */}
        <div>
          <h4 className="text-xs tracking-editorial uppercase mb-4">Loja</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/loja" className="hover:text-foreground transition-colors">
                Todos os produtos
              </Link>
            </li>
            <li>
              <Link
                to="/loja"
                search={{ cat: "vestidos" }}
                className="hover:text-foreground transition-colors"
              >
                Vestidos
              </Link>
            </li>
            <li>
              <Link
                to="/loja"
                search={{ cat: "blusas" }}
                className="hover:text-foreground transition-colors"
              >
                Blusas
              </Link>
            </li>
            <li>
              <Link
                to="/loja"
                search={{ cat: "conjuntos" }}
                className="hover:text-foreground transition-colors"
              >
                Conjuntos
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3 — Atendimento */}
        <div>
          <h4 className="text-xs tracking-editorial uppercase mb-4">Atendimento</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Trocas e devoluções</li>
            <li>Política de privacidade</li>
            <li>Fale conosco</li>
          </ul>
        </div>

        {/* Coluna 4 — Newsletter (span 2 cols no mobile) */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xs tracking-editorial uppercase mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Lançamentos e promoções exclusivas.</p>
          <form className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 bg-background border border-border rounded px-3 py-2.5 text-sm min-w-0"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground text-xs tracking-editorial uppercase px-5 py-2.5 rounded whitespace-nowrap hover:opacity-90 transition"
            >
              Assinar
            </button>
          </form>
        </div>
      </div>

      {/* ── Rodapé legal ── */}
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {storeName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
