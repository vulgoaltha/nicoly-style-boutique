import { Bell, PackageX, Clock, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDashboardAlerts } from "@/hooks/useDashboardData";
import { Badge } from "@/components/ui/badge";

export function AlertCenter() {
  const { data, isLoading } = useDashboardAlerts();

  const totalAlerts = (data?.low_stock?.length || 0) + (data?.pending_payments || 0) + (data?.delayed_orders || 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {totalAlerts > 0 && (
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 text-[8px] font-bold text-white items-center justify-center">
                {totalAlerts > 9 ? '9+' : totalAlerts}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          Central de Alertas
          <Badge variant="secondary">{totalAlerts} alertas</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-10 w-full animate-pulse bg-muted rounded"></div>)}
          </div>
        ) : totalAlerts === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
            <CheckCircle className="w-8 h-8 text-emerald-500 mb-1" />
            Tudo tranquilo por aqui!
          </div>
        ) : (
          <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
            {/* Estoque Baixo */}
            {data?.low_stock && data.low_stock.length > 0 && (
              <DropdownMenuItem className="cursor-pointer gap-3 p-3 items-start">
                <div className="mt-0.5 bg-rose-100 p-1.5 rounded-full text-rose-600">
                  <PackageX className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none mb-1">Estoque Crítico</p>
                  <p className="text-xs text-muted-foreground">
                    {data.low_stock.length} produto(s) com 5 ou menos unidades em estoque.
                  </p>
                </div>
              </DropdownMenuItem>
            )}

            {/* Pedidos Atrasados */}
            {data?.delayed_orders > 0 && (
              <DropdownMenuItem className="cursor-pointer gap-3 p-3 items-start">
                <div className="mt-0.5 bg-orange-100 p-1.5 rounded-full text-orange-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none mb-1">Envios Atrasados</p>
                  <p className="text-xs text-muted-foreground">
                    {data.delayed_orders} pedido(s) pagos há mais de 3 dias não enviados.
                  </p>
                </div>
              </DropdownMenuItem>
            )}

            {/* Pagamentos Pendentes */}
            {data?.pending_payments > 0 && (
              <DropdownMenuItem className="cursor-pointer gap-3 p-3 items-start">
                <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full text-blue-600">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none mb-1">Aguardando Pagamento</p>
                  <p className="text-xs text-muted-foreground">
                    {data.pending_payments} pedido(s) aguardando confirmação (Pix/Boleto).
                  </p>
                </div>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

