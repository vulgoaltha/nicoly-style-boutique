import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Package, ShoppingBag, LogOut, Store, Image as ImageIcon, Tags, Layers, Settings, Megaphone } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="p-10 text-sm text-muted-foreground">Carregando...</div>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="p-10 max-w-md mx-auto text-center">
        <h1 className="font-display text-2xl">Acesso restrito</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sua conta não tem permissão de administrador. Peça para o dono da loja
          adicionar o papel <code>admin</code> ao seu usuário no painel da Lovable Cloud
          (tabela <code>user_roles</code>, com seu user id e role = admin).
        </p>
        <Link to="/" className="mt-6 inline-block text-xs tracking-editorial uppercase underline">
          Voltar à loja
        </Link>
      </div>
    );
  }

  const items = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/produtos", label: "Produtos", icon: Package },
    { to: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag },
    { to: "/admin/banners", label: "Banners", icon: ImageIcon },
    { to: "/admin/anuncio", label: "Barra de anúncios", icon: Megaphone },
    { to: "/admin/categorias-home", label: "Categorias home", icon: Tags },
    { to: "/admin/colecoes", label: "Coleções", icon: Layers },
    { to: "/admin/configuracoes", label: "Configurações", icon: Settings },
  ];


  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside className="w-60 border-r border-border bg-background hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="font-display text-xl">
            Nicoly <span className="text-blush">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((it) => {
            const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition ${
                  active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm hover:bg-secondary">
            <Store className="h-4 w-4" /> Ver loja
          </Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
