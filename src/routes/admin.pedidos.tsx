import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/format";

export const Route = createFileRoute("/admin/pedidos")({
  component: AdminOrders,
});

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  processing: "Em separação",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-secondary text-muted-foreground",
  paid: "bg-blush-soft text-blush-deep",
  processing: "bg-blush-soft text-blush-deep",
  shipped: "bg-blush-soft text-blush-deep",
  delivered: "bg-blush-soft text-blush-deep",
  cancelled: "bg-destructive/10 text-destructive",
};

function AdminOrders() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "id, order_number, customer_name, customer_email, status, payment_status, total, created_at",
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl">Pedidos</h1>
        <p className="text-sm text-muted-foreground">{orders.length} pedidos no total</p>
      </div>

      <div className="bg-background border border-border rounded-sm overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Carregando...</div>
        ) : orders.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Nenhum pedido ainda.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs tracking-editorial uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">Pedido</th>
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Data</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-border hover:bg-secondary/30">
                  <td className="p-3">
                    <Link
                      to="/admin/pedidos/$id"
                      params={{ id: o.id }}
                      className="font-medium hover:text-blush"
                    >
                      {o.order_number}
                    </Link>
                  </td>
                  <td className="p-3">
                    <div>{o.customer_name}</div>
                    <div className="text-xs text-muted-foreground">{o.customer_email}</div>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {new Date(o.created_at || new Date()).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="p-3">{brl(Number(o.total))}</td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${STATUS_COLOR[o.status || ""] ?? "bg-secondary"}`}
                    >
                      {STATUS_LABEL[o.status || ""] ?? o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
