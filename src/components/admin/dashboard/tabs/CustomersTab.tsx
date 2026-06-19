import { useCustomerInsights } from "@/hooks/useDashboardData";
import { MetricCard } from "../MetricCard";
import { Users, UserPlus, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CustomersTab() {
  const { data, isLoading } = useCustomerInsights();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      value || 0,
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Novos Clientes (Mês)"
          value={data?.new_customers_month || 0}
          icon={<UserPlus className="w-4 h-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Clientes Recorrentes"
          value={data?.recurring_customers || 0}
          icon={<UserCheck className="w-4 h-4" />}
          isLoading={isLoading}
          description="Fizeram mais de 1 pedido"
        />
        <MetricCard
          title="Clientes Inativos"
          value={data?.inactive_customers || 0}
          icon={<UserX className="w-4 h-4" />}
          isLoading={isLoading}
          description="Sem compras há > 90 dias"
        />
        <MetricCard
          title="Total na Base"
          value={
            (data?.new_customers_month || 0) +
            (data?.recurring_customers || 0) +
            (data?.inactive_customers || 0)
          } // Estimativa visual
          icon={<Users className="w-4 h-4" />}
          isLoading={isLoading}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Compradores (Lifetime Value)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 w-full animate-pulse bg-muted rounded"></div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Cliente</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium text-right">Total de Pedidos</th>
                    <th className="px-4 py-3 font-medium text-right">Valor Total (LTV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data?.top_buyers?.map((buyer: any, index: number) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{buyer.customer_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{buyer.customer_email}</td>
                      <td className="px-4 py-3 text-right">{buyer.total_orders}</td>
                      <td className="px-4 py-3 text-right text-emerald-600 font-medium">
                        {formatCurrency(buyer.lifetime_value)}
                      </td>
                    </tr>
                  ))}
                  {(!data?.top_buyers || data.top_buyers.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        Nenhum dado encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
