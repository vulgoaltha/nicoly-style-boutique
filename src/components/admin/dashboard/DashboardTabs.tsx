import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { FinancialTab } from "./tabs/FinancialTab";
import { CustomersTab } from "./tabs/CustomersTab";
import { ProductsTab } from "./tabs/ProductsTab";
import { BarChart3, LayoutDashboard, PackageSearch, Users } from "lucide-react";

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
        <FinancialTab />
      </TabsContent>

      <TabsContent value="customers" className="space-y-4 mt-0">
        <CustomersTab />
      </TabsContent>

      <TabsContent value="products" className="space-y-4 mt-0">
        <ProductsTab />
      </TabsContent>
    </Tabs>
  );
}

