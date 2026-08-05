import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/format";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, ArrowUpDown, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin/pedidos")({
  component: AdminOrdersLayout,
});

function AdminOrdersLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname === "/admin/pedidos" || pathname === "/admin/pedidos/";

  if (!isIndex) {
    return <Outlet />;
  }

  return <AdminOrdersList />;
}

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

const FILTER_OPTIONS = [
  { key: "all", label: "Todos" },
  { key: "today", label: "Hoje" },
  { key: "7days", label: "7 dias" },
  { key: "month", label: "Mês" },
  { key: "year", label: "Ano" },
];

function AdminOrdersList() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [sortCol, setSortCol] = useState("created_at");
  const [sortAsc, setSortAsc] = useState(false);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "id, order_number, customer_name, customer_email, status, payment_status, total, created_at",
        );
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pedido excluído com sucesso");
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
    onError: (err) => {
      toast.error("Erro ao excluir: " + err.message);
    },
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(false);
    }
  };

  const now = new Date();
  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    const orderDate = new Date(o.created_at || new Date());
    if (filter === "today") return orderDate.toDateString() === now.toDateString();
    if (filter === "7days") {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return orderDate >= sevenDaysAgo;
    }
    if (filter === "month") {
      return (
        orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()
      );
    }
    if (filter === "year") return orderDate.getFullYear() === now.getFullYear();
    return true;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let valA: any = a[sortCol as keyof typeof a];
    let valB: any = b[sortCol as keyof typeof b];
    if (sortCol === "created_at") {
      valA = new Date((valA as string) || "").getTime();
      valB = new Date((valB as string) || "").getTime();
    } else if (sortCol === "total") {
      valA = Number(valA);
      valB = Number(valB);
    }
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const filterBtnClass = (f: string) =>
    `px-3 py-1.5 text-xs rounded-full border transition-colors flex-shrink-0 ${
      filter === f
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-background hover:bg-secondary/50 border-border"
    }`;

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Pedidos</h1>
          <p className="text-sm text-muted-foreground">{sortedOrders.length} pedidos encontrados</p>
        </div>
        {/* Filtros — scroll horizontal no mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_OPTIONS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={filterBtnClass(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="p-10 text-center text-sm text-muted-foreground">Carregando...</div>
      ) : orders.length === 0 ? (
        <div className="p-10 text-center text-sm text-muted-foreground">Nenhum pedido ainda.</div>
      ) : sortedOrders.length === 0 ? (
        <div className="p-10 text-center text-sm text-muted-foreground">
          Nenhum pedido encontrado para o filtro selecionado.
        </div>
      ) : (
        <>
          {/* ── MOBILE: cards ── */}
          <div className="md:hidden space-y-3">
            {sortedOrders.map((o) => (
              <div
                key={o.id}
                className="bg-background border border-border rounded-sm p-4 space-y-3"
              >
                {/* Linha 1: Número + Status + Excluir */}
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to="/admin/pedidos/$id"
                    params={{ id: o.id }}
                    className="font-medium text-sm hover:text-blush flex items-center gap-1"
                  >
                    {o.order_number}
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </Link>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        STATUS_COLOR[o.status || ""] ?? "bg-secondary"
                      }`}
                    >
                      {STATUS_LABEL[o.status || ""] ?? o.status}
                    </span>
                    <button
                      onClick={(e) => handleDelete(o.id, e)}
                      disabled={deleteMutation.isPending}
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-50"
                      aria-label="Excluir pedido"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Linha 2: Cliente */}
                <div>
                  <div className="text-sm font-medium">{o.customer_name}</div>
                  <div className="text-xs text-muted-foreground truncate">{o.customer_email}</div>
                </div>

                {/* Linha 3: Data + Total */}
                <div className="flex justify-between text-sm pt-1 border-t border-border/50">
                  <span className="text-muted-foreground text-xs">
                    {new Date(o.created_at || new Date()).toLocaleDateString("pt-BR")}
                  </span>
                  <span className="font-bold">{brl(Number(o.total))}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── DESKTOP: tabela ── */}
          <div className="hidden md:block bg-background border border-border rounded-sm overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-secondary/50 text-xs tracking-editorial uppercase text-muted-foreground">
                <tr>
                  <th className="text-left p-3">Pedido</th>
                  <th className="text-left p-3">Cliente</th>
                  <th
                    className="text-left p-3 cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => handleSort("created_at")}
                  >
                    <div className="flex items-center gap-1">
                      Data <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th
                    className="text-left p-3 cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => handleSort("total")}
                  >
                    <div className="flex items-center gap-1">
                      Total <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sortedOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="p-3">
                      <Link
                        to="/admin/pedidos/$id"
                        params={{ id: o.id }}
                        className="font-medium hover:text-blush text-sm"
                      >
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{o.customer_name}</div>
                      <div className="text-xs text-muted-foreground">{o.customer_email}</div>
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(o.created_at || new Date()).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="p-3 text-sm font-medium">{brl(Number(o.total))}</td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          STATUS_COLOR[o.status || ""] ?? "bg-secondary"
                        }`}
                      >
                        {STATUS_LABEL[o.status || ""] ?? o.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => handleDelete(o.id, e)}
                        disabled={deleteMutation.isPending}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-50"
                        title="Excluir pedido"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
