import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { brl } from "@/lib/format";

export const Route = createFileRoute("/minha-conta/pedidos")({
  component: MyOrdersPage,
});

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  processing: "Em separação",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

function MyOrdersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();
      if (error && error.code !== "PGRST116") throw error; // PGRST116 is 'not found'
      return data;
    },
  });

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, status, total, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Você saiu da sua conta.");
      navigate({ to: "/login" });
    } catch (error) {
      toast.error("Erro ao sair.");
    }
  };

  if (!user) return null;

  return (
    <div className="container-editorial py-10 md:py-16 max-w-3xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-4xl">Minha conta</h1>
          <p className="text-sm text-muted-foreground mt-2">Olá, {profile?.name || user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs tracking-editorial uppercase text-red-600 hover:underline border border-red-200 bg-red-50 px-4 py-2 rounded-sm"
        >
          Sair da conta
        </button>
      </div>

      <h2 className="text-xl font-medium mb-4">Meus pedidos</h2>
      {isLoading ? (
        <div className="text-center text-sm text-muted-foreground py-10">Carregando...</div>
      ) : orders.length === 0 ? (
        <div className="text-center border border-border rounded-sm p-10">
          <p className="text-muted-foreground">Você ainda não fez pedidos.</p>
          <Link
            to="/loja"
            className="mt-4 inline-block text-xs tracking-editorial uppercase underline"
          >
            Ver coleção
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                to="/pedido/$id"
                params={{ id: o.id }}
                className="flex items-center justify-between border border-border rounded-sm p-4 hover:bg-secondary/40 transition"
              >
                <div>
                  <div className="font-medium">{o.order_number}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{brl(Number(o.total))}</div>
                  <div className="text-xs text-muted-foreground">
                    {STATUS_LABEL[o.status] ?? o.status}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
