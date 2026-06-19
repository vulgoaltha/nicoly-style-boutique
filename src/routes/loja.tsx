import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product, Category } from "@/lib/types";

const search = z.object({
  cat: z.string().optional(),
  page: z.number().optional().catch(1),
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
  const { cat, page = 1 } = Route.useSearch();
  const navigate = Route.useNavigate();
  const PAGE_SIZE = 12;

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id,name,slug")
        .order("name");
      if (error) throw error;
      return data as unknown as Category[];
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["shop-products", cat, page],
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select("id,slug,name,price,sale_price,images,is_new,category_id", { count: "exact" })
        .eq("is_active", true);

      if (cat) {
        const c = categories.find((c) => c.slug === cat);
        if (c) q = q.eq("category_id", c.id);
      }

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await q
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return {
        products: (data as unknown as Product[]) || [],
        totalCount: count || 0,
      };
    },
    enabled: !cat || categories.length > 0,
  });

  const products = data?.products || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

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
          onClick={() => navigate({ search: (prev) => ({ ...prev, cat: undefined, page: 1 }) })}
          className={`text-xs tracking-editorial uppercase px-3 py-1.5 rounded-sm transition ${
            !cat ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
          }`}
        >
          Tudo
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate({ search: (prev) => ({ ...prev, cat: c.slug, page: 1 }) })}
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
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16 border-t border-border pt-8">
              <button
                disabled={page <= 1}
                onClick={() => navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })}
                className="text-xs uppercase tracking-editorial px-4 py-2 border border-border rounded-sm hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Anterior
              </button>
              <span className="text-xs text-muted-foreground">
                Página {page} de {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => navigate({ search: (prev) => ({ ...prev, page: page + 1 }) })}
                className="text-xs uppercase tracking-editorial px-4 py-2 border border-border rounded-sm hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
