import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product, Category } from "@/lib/types";

const search = z.object({
  cat: z.string().optional(),
});

export const Route = createFileRoute("/loja")({
  validateSearch: search,
  component: Shop,
  head: () => ({
    meta: [
      { title: "Loja — Nicoly Modas" },
      {
        name: "description",
        content: "Catálogo completo Nicoly Modas: vestidos, blusas, saias, conjuntos e mais.",
      },
    ],
  }),
});

function Shop() {
  const { cat } = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data as unknown as Category[];
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["shop-products", cat],
    queryFn: async () => {
      let q = supabase.from("products").select("*, categories(slug)").eq("is_active", true);
      if (cat) {
        const c = categories.find((c) => c.slug === cat);
        if (c) q = q.eq("category_id", c.id);
      }
      const { data, error } = await q.order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Product[];
    },
    enabled: !cat || categories.length > 0,
  });

  return (
    <div className="container-editorial py-10 md:py-16">
      <div className="mb-8 md:mb-12">
        <span className="text-xs tracking-editorial uppercase text-blush-deep">Coleção</span>
        <h1 className="font-display text-4xl md:text-5xl mt-1">
          {cat ? (categories.find((c) => c.slug === cat)?.name ?? "Loja") : "Todos os produtos"}
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 border-b border-border pb-5">
        <button
          onClick={() => navigate({ search: {} })}
          className={`text-xs tracking-editorial uppercase px-3 py-1.5 rounded-sm transition ${
            !cat ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
          }`}
        >
          Tudo
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate({ search: { cat: c.slug } })}
            className={`text-xs tracking-editorial uppercase px-3 py-1.5 rounded-sm transition ${
              cat === c.slug ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[3/4] bg-secondary animate-pulse rounded-sm" />
              <div className="h-3 bg-secondary animate-pulse rounded w-2/3" />
              <div className="h-3 bg-secondary animate-pulse rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <p>Nenhum produto encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
