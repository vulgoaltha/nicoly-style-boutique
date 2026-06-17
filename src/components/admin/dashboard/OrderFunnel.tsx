import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Box,
  CheckCircle,
  Clock,
  CreditCard,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

interface FunnelStep {
  id: string;
  label: string;
  count: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface OrderFunnelProps {
  data?: {
    received: number;
    payment_pending: number;
    paid: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  isLoading?: boolean;
}

export function OrderFunnel({ data, isLoading }: OrderFunnelProps) {
  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Funil de Pedidos</CardTitle>
        </CardHeader>
        <CardContent className="h-40 animate-pulse bg-muted rounded-md mx-6 mb-6"></CardContent>
      </Card>
    );
  }

  const steps: FunnelStep[] = [
    {
      id: "received",
      label: "Recebidos",
      count: data.received,
      icon: Box,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "pending",
      label: "Pgto Pendente",
      count: data.payment_pending,
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: "paid",
      label: "Pagos",
      count: data.paid,
      icon: CreditCard,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      id: "processing",
      label: "Em Separação",
      count: data.processing,
      icon: Package,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      id: "shipped",
      label: "Enviados",
      count: data.shipped,
      icon: Truck,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
    {
      id: "delivered",
      label: "Entregues",
      count: data.delivered,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Funil de Pedidos</CardTitle>
          <div className="flex items-center text-sm text-rose-500 bg-rose-50 px-2 py-1 rounded-full font-medium">
            <XCircle className="w-4 h-4 mr-1" />
            {data.cancelled} Cancelados
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const percentage =
              data.received > 0 ? Math.round((step.count / data.received) * 100) : 0;

            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center border-2 border-white shadow-sm",
                      step.bgColor,
                      step.color,
                    )}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {step.label}
                    </p>
                    <p className="text-lg font-bold mt-0.5">{step.count}</p>
                    {index > 0 && (
                      <p className="text-[10px] text-muted-foreground">{percentage}% do total</p>
                    )}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:flex flex-col items-center mx-4 -mt-10 text-muted-foreground/30">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
