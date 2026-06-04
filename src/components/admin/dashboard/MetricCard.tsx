import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  isLoading?: boolean;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  description,
  trend,
  isLoading,
  className,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden animate-pulse", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div className="h-4 w-1/3 bg-muted rounded"></div>
          <div className="h-4 w-4 bg-muted rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-1/2 bg-muted rounded mt-2"></div>
          <div className="h-3 w-1/4 bg-muted rounded mt-3"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {(description || trend) && (
          <div className="text-xs mt-1 flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "font-medium",
                  trend.isPositive ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
            )}
            <span className="text-muted-foreground">
              {trend ? trend.label : description}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
