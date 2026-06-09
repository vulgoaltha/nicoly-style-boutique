import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { BarChart3, LayoutDashboard, PackageSearch, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const FinancialTab = React.lazy(() =>
  import("./tabs/FinancialTab").then((m) => ({ default: m.FinancialTab })),
);
const CustomersTab = React.lazy(() =>
  import("./tabs/CustomersTab").then((m) => ({ default: m.CustomersTab })),
);
const ProductsTab = React.lazy(() =>
  import("./tabs/ProductsTab").then((m) => ({ default: m.ProductsTab })),
);

function TabLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}

export function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="bg-background border h-auto flex-wrap gap-1">
        <TabsTrigger value="overview" className="gap-2">
          <LayoutDashboard className="w-4 h-4" />
          Visão Geral
        </TabsTrigger>
        <TabsTrigger value="financial" className="gap-2">
          <BarChart3 className="w-4 h-4" />
          Financeiro
        </TabsTrigger>
        <TabsTrigger value="customers" className="gap-2">
          <Users className="w-4 h-4" />
          Clientes
        </TabsTrigger>
        <TabsTrigger value="products" className="gap-2">
          <PackageSearch className="w-4 h-4" />
          Produtos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-0">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="financial" className="space-y-4 mt-0">
        <Suspense fallback={<TabLoader />}>
          <FinancialTab />
        </Suspense>
      </TabsContent>

      <TabsContent value="customers" className="space-y-4 mt-0">
        <Suspense fallback={<TabLoader />}>
          <CustomersTab />
        </Suspense>
      </TabsContent>

      <TabsContent value="products" className="space-y-4 mt-0">
        <Suspense fallback={<TabLoader />}>
          <ProductsTab />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
