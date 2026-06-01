import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, TrendingUp, Star, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data: products } = await supabase.from("products").select("id, stock, is_active, is_featured");
      const list = products ?? [];
      return {
        total: list.length,
        active: list.filter((p) => p.is_active).length,
        featured: list.filter((p) => p.is_featured).length,
        outOfStock: list.filter((p) => p.stock === 0).length,
      };
    },
  });

  const cards = [
    { label: "Produtos", value: stats?.total ?? 0, icon: Package },
    { label: "Ativos", value: stats?.active ?? 0, icon: TrendingUp },
    { label: "Em destaque", value: stats?.featured ?? 0, icon: Star },
    { label: "Sem estoque", value: stats?.outOfStock ?? 0, icon: AlertCircle },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl mb-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-8">Visão geral da loja</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-background border border-border rounded-sm p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-editorial uppercase text-muted-foreground">{c.label}</span>
              <c.icon className="h-4 w-4 text-blush" />
            </div>
            <div className="font-display text-4xl mt-3">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-background border border-border rounded-sm p-6">
        <h2 className="font-medium mb-2">Próximos passos</h2>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Cadastre seus produtos em <Link to="/admin/produtos" className="text-blush underline">Produtos</Link>.</li>
          <li>• Marque alguns como "em destaque" para aparecerem na home.</li>
          <li>• O checkout com Mercado Pago será adicionado na próxima fase.</li>
        </ul>
      </div>
    </div>
  );
}
