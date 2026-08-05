import { Link, useLoaderData } from "@tanstack/react-router";
import { ShoppingBag, User, Menu, X, Instagram, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { useAuth } from "@/hooks/use-auth";
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

  const loaderData = useLoaderData({ from: "__root__" }) as any;
  const storeData = loaderData?.storeData || {};
  const instagram = loaderData?.instagram || null;
  const storeName = storeData?.store_name || "Nicoly Modas";

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      {/* ── Barra principal ── */}
      <div className="container-editorial relative flex h-14 items-center justify-between gap-2 md:h-20">
        {/* Esquerda — hamburguer (só mobile) */}
        <button
          className="relative z-10 -ml-1 flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo — absoluta e centralizada no mobile, estática no desktop */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-tight md:static md:left-auto md:translate-x-0 md:text-3xl"
        >
          {storeName}
        </Link>

        {/* Centro — nav desktop */}
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

        {/* Direita — ações (sempre visíveis) */}
        <div className="relative z-10 flex items-center gap-0.5">
          {instagram?.active && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hidden md:inline-flex h-11 w-11 items-center justify-center hover:text-blush transition"
              title={`@${instagram.username}`}
            >
              <Instagram className="h-5 w-5" />
            </a>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden md:inline-flex h-9 items-center text-xs tracking-editorial uppercase border border-border px-3 rounded hover:bg-secondary transition"
            >
              Admin
            </Link>
          )}

          <Link
            to={user ? "/minha-conta/pedidos" : "/login"}
            className="flex h-11 w-11 items-center justify-center hover:text-blush transition"
            aria-label={user ? "Meus pedidos" : "Entrar"}
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
              className="hidden md:flex h-11 w-11 items-center justify-center hover:text-blush transition"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}

          <Link
            to="/carrinho"
            className="relative flex h-11 w-11 items-center justify-center hover:text-blush transition"
            aria-label="Sacola"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute top-1.5 right-1 bg-blush text-accent-foreground text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container-editorial py-2 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center py-3.5 text-sm border-b border-border/40 last:border-0"
              >
                {n.label}
              </Link>
            ))}
            {instagram?.active && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-3.5 text-sm border-b border-border/40"
              >
                <Instagram className="h-4 w-4" /> @{instagram.username}
              </a>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center py-3.5 text-sm border-b border-border/40"
              >
                Painel Admin
              </Link>
            )}
            {user && (
              <button
                onClick={async () => {
                  setOpen(false);
                  await supabase.auth.signOut();
                  window.location.href = "/login";
                }}
                className="flex items-center gap-2 py-3.5 text-sm text-muted-foreground"
              >
                <LogOut className="h-4 w-4" /> Sair
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
