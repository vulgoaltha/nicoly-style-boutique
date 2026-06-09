import { useExecutiveFinancialMetrics } from "@/hooks/useDashboardData";
import { MetricCard } from "../MetricCard";
import { SalesChart } from "../SalesChart";
import { Calendar, DollarSign, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function FinancialTab() {
  const { data, isLoading } = useExecutiveFinancialMetrics();

  // Meta fixa para demonstração (na vida real viria do site_settings)
  const monthlyGoal = 50000;
  const currentMonthRevenue = data?.month_revenue || 0;
  const progressPercentage = Math.min(Math.round((currentMonthRevenue / monthlyGoal) * 100), 100);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      value || 0,
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Faturamento Diário"
          value={formatCurrency(data?.today_revenue)}
          icon={<Calendar className="w-4 h-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Faturamento Semanal"
          value={formatCurrency(data?.week_revenue)}
          icon={<TrendingUp className="w-4 h-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Faturamento Mensal"
          value={formatCurrency(data?.month_revenue)}
          icon={<DollarSign className="w-4 h-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Faturamento Previsto"
          value={formatCurrency(data?.predicted_revenue)}
          description="Pagos + Pendentes"
          icon={<Target className="w-4 h-4" />}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
        <SalesChart />

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Meta Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{progressPercentage}%</div>
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                {formatCurrency(currentMonthRevenue)} de {formatCurrency(monthlyGoal)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Extremos do Mês
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Maior Pedido</p>
                <p className="text-lg font-bold text-emerald-600">
                  {formatCurrency(data?.max_order_month)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Menor Pedido</p>
                <p className="text-lg font-bold text-rose-500">
                  {formatCurrency(data?.min_order_month)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
