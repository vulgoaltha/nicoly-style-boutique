import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useInstagram } from "@/hooks/use-site-settings";

export function Footer() {
  const { data: instagram } = useInstagram();
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-editorial py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl">
            Nicoly <span className="text-blush">Modas</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Moda feminina premium para mulheres que se vestem com intenção.
          </p>
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

        <div>
          <h4 className="text-xs tracking-editorial uppercase mb-3">Loja</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/loja">Todos os produtos</Link>
            </li>
            <li>
              <Link to="/loja" search={{ cat: "vestidos" }}>Vestidos</Link>
            </li>
            <li>
              <Link to="/loja" search={{ cat: "blusas" }}>Blusas</Link>
            </li>
            <li>
              <Link to="/loja" search={{ cat: "conjuntos" }}>Conjuntos</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-editorial uppercase mb-3">Atendimento</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Trocas e devoluções</li>
            <li>Política de privacidade</li>
            <li>Fale conosco</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-editorial uppercase mb-3">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Lançamentos e promoções exclusivas.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm"
            />
            <button className="bg-primary text-primary-foreground text-xs tracking-editorial uppercase px-4 rounded">
              Ok
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nicoly Modas. Todos os direitos reservados.
      </div>
    </footer>
  );
}
