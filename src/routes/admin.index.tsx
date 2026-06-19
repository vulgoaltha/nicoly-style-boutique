import { createFileRoute } from "@tanstack/react-router";
import { DashboardTabs } from "@/components/admin/dashboard/DashboardTabs";
import { useDashboardRealtime } from "@/hooks/useDashboardRealtime";
import { AlertCenter } from "@/components/admin/dashboard/AlertCenter";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  useDashboardRealtime();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Executivo</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral e acompanhamento de métricas em tempo real.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AlertCenter />
        </div>
      </div>

      <DashboardTabs />
    </div>
  );
}
