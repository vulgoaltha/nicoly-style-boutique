import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useDashboardRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          // Quando qualquer pedido mudar (novo, pago, cancelado, etc)
          queryClient.invalidateQueries({ queryKey: ["dashboard", "financial-metrics"] });
          queryClient.invalidateQueries({ queryKey: ["dashboard", "order-funnel"] });
          queryClient.invalidateQueries({ queryKey: ["dashboard", "customer-insights"] });
          queryClient.invalidateQueries({ queryKey: ["dashboard", "product-performance"] });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "products" },
        () => {
          // Atualiza dados de produtos (ex: estoque crítico mudou)
          queryClient.invalidateQueries({ queryKey: ["dashboard", "product-performance"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
