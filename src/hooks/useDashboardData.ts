import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useExecutiveFinancialMetrics() {
  return useQuery({
    queryKey: ["dashboard", "financial-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_executive_financial_metrics");
      if (error) throw error;
      return data as any;
    },
  });
}

export function useOrderFunnel() {
  return useQuery({
    queryKey: ["dashboard", "order-funnel"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_order_funnel");
      if (error) throw error;
      return data as any;
    },
  });
}

export function useCustomerInsights() {
  return useQuery({
    queryKey: ["dashboard", "customer-insights"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_customer_insights");
      if (error) throw error;
      return data as any;
    },
  });
}

export function useProductPerformance(interval: 'today' | 'week' | 'month' = 'month') {
  return useQuery({
    queryKey: ["dashboard", "product-performance", interval],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_product_performance", { p_interval: interval });
      if (error) throw error;
      return data as any[];
    },
  });
}

export function useSalesChartData(interval: 'today' | 'week' | 'month' = 'month') {
  return useQuery({
    queryKey: ["dashboard", "sales-chart", interval],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_sales_chart_data", { p_interval: interval });
      if (error) throw error;
      return data as any[];
    },
  });
}

export function useDashboardAlerts() {
  return useQuery({
    queryKey: ["dashboard", "alerts"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_dashboard_alerts");
      if (error) throw error;
      return data as any;
    },
  });
}
