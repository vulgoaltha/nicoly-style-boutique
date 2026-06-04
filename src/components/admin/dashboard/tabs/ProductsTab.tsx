import { useProductPerformance, useDashboardAlerts } from "@/hooks/useDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export function ProductsTab() {
  const [interval, setInterval] = useState<'today' | 'week' | 'month'>('month');
  const { data: topProducts, isLoading: isLoadingProducts } = useProductPerformance(interval);
  const { data: alertsData, isLoading: isLoadingAlerts } = useDashboardAlerts();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Produtos Mais Vendidos</CardTitle>
          <Select value={interval} onValueChange={(value: any) => setInterval(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">7 Dias</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {isLoadingProducts ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-12 w-full animate-pulse bg-muted rounded"></div>)}
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Produto</th>
                    <th className="px-4 py-3 font-medium text-right">Qtd Vendida</th>
                    <th className="px-4 py-3 font-medium text-right">Receita</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {topProducts?.map((product: any, index: number) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium flex items-center gap-3">
                        {product.product_image && (
                          <img src={product.product_image} alt={product.product_name} className="w-10 h-10 rounded object-cover" />
                        )}
                        <span className="truncate max-w-[200px]">{product.product_name}</span>
                      </td>
                      <td className="px-4 py-3 text-right">{product.quantity_sold}</td>
                      <td className="px-4 py-3 text-right text-emerald-600 font-medium">
                        {formatCurrency(product.revenue)}
                      </td>
                    </tr>
                  ))}
                  {(!topProducts || topProducts.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                        Nenhum produto vendido no período.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-rose-200 shadow-sm">
        <CardHeader className="bg-rose-50 border-b border-rose-100 rounded-t-xl">
          <CardTitle className="text-rose-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Estoque Crítico
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoadingAlerts ? (
            <div className="p-4 space-y-3">
              {[1, 2].map((i) => <div key={i} className="h-10 w-full animate-pulse bg-rose-100 rounded"></div>)}
            </div>
          ) : (
            <div className="divide-y divide-rose-100">
              {alertsData?.low_stock?.map((item: any) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-rose-50/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">SKU: {item.slug}</p>
                  </div>
                  <div className="bg-rose-100 text-rose-700 font-bold px-2.5 py-1 rounded-md text-sm">
                    {item.stock} un
                  </div>
                </div>
              ))}
              {(!alertsData?.low_stock || alertsData.low_stock.length === 0) && (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Nenhum produto com estoque crítico.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
