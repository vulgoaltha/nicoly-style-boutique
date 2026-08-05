import { useExecutiveFinancialMetrics, useOrderFunnel } from "@/hooks/useDashboardData";
import { MetricCard } from "../MetricCard";
import { OrderFunnel } from "../OrderFunnel";
import { DollarSign, ShoppingBag, Target, TrendingUp } from "lucide-react";

export function OverviewTab() {
  const { data: financeData, isLoading: isLoadingFinance } = useExecutiveFinancialMetrics();
  const { data: funnelData, isLoading: isLoadingFunnel } = useOrderFunnel();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      value || 0,
    );
  };

  return (
    <div className="space-y-6">
      {/* KPIs Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Faturamento Hoje"
          value={formatCurrency(financeData?.today_revenue)}
          icon={<DollarSign className="w-4 h-4" />}
          isLoading={isLoadingFinance}
          description="Apenas pedidos pagos"
        />
        <MetricCard
          title="Faturamento Mês"
          value={formatCurrency(financeData?.month_revenue)}
          icon={<TrendingUp className="w-4 h-4" />}
          isLoading={isLoadingFinance}
          description="Apenas pedidos pagos"
        />
        <MetricCard
          title="Ticket Médio (Mês)"
          value={formatCurrency(financeData?.avg_ticket)}
          icon={<Target className="w-4 h-4" />}
          isLoading={isLoadingFinance}
        />
        <MetricCard
          title="Pedidos no Mês"
          value={funnelData?.received || 0}
          icon={<ShoppingBag className="w-4 h-4" />}
          isLoading={isLoadingFunnel}
        />
      </div>

      {/* Funil de Vendas */}
      <OrderFunnel data={funnelData} isLoading={isLoadingFunnel} />
    </div>
  );
}
