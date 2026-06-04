import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, Menu, X, Instagram, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { useAuth } from "@/hooks/use-auth";
import { useInstagram } from "@/hooks/use-site-settings";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/", label: "Início" },
  { to: "/loja", label: "Loja" },
  { to: "/loja?cat=vestidos", label: "Vestidos" },
  { to: "/loja?cat=blusas", label: "Blusas" },
  { to: "/loja?cat=conjuntos", label: "Conjuntos" },
];

export function Header() {
  const count = useCart((s) => s.count());
  const { user, isAdmin } = useAuth();
  const { data: instagram } = useInstagram();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-editorial flex h-16 items-center justify-between gap-6 md:h-20">
        <button
          className="md:hidden -ml-2 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="font-display text-2xl tracking-tight md:text-3xl">
          Nicoly <span className="text-blush">Modas</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="tracking-editorial uppercase text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {instagram?.active && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hidden md:inline-flex p-2 hover:text-blush transition"
              title={`@${instagram.username}`}
            >
              <Instagram className="h-5 w-5" />
            </a>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden md:inline text-xs tracking-editorial uppercase border border-border px-3 py-1.5 rounded hover:bg-secondary transition"
            >
              Admin
            </Link>
          )}

          <Link
            to={user ? "/minha-conta/pedidos" : "/login"}
            className="p-2 hover:text-blush transition"
            aria-label="Conta"
            title={user ? "Meus pedidos" : "Entrar"}
          >
            <User className="h-5 w-5" />
          </Link>
          {user && (
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
              className="p-2 hover:text-blush transition"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
          <Link
            to="/carrinho"
            className="relative p-2 hover:text-blush transition"
            aria-label="Sacola"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blush text-accent-foreground text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container-editorial py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm py-1">
                {n.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)} className="text-sm py-1">
                Painel Admin
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
