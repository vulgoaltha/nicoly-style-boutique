import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/format";
import type { Product } from "@/lib/types";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export const Route = createFileRoute("/admin/produtos")({
  component: AdminProductsLayout,
});

function AdminProductsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname === "/admin/produtos" || pathname === "/admin/produtos/";

  if (!isIndex) {
    return <Outlet />;
  }

  return <AdminProductsList />;
}

function AdminProductsList() {
  const qc = useQueryClient();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id,slug,name,price,sale_price,images,sku,stock,is_active")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Product[];
    },
  });

  const remove = async (id: string) => {
    if (!confirm("Remover este produto?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Produto removido");
    qc.invalidateQueries({ queryKey: ["admin-products"] });
  };

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Produtos</h1>
          <p className="text-sm text-muted-foreground">{products.length} cadastrados</p>
        </div>
        <Link
          to="/admin/produtos/novo"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2.5 md:px-4 text-xs tracking-editorial uppercase rounded-sm flex-shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo produto</span>
          <span className="sm:hidden">Novo</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="p-10 text-center text-sm text-muted-foreground">Carregando...</div>
      ) : products.length === 0 ? (
        <div className="p-10 text-center text-sm text-muted-foreground">
          Nenhum produto. Comece criando seu primeiro.
        </div>
      ) : (
        <>
          {/* ── MOBILE: cards ── */}
          <div className="md:hidden space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex gap-3 p-3 bg-background border border-border rounded-sm"
              >
                {/* Imagem */}
                <div
                  className="w-14 h-18 flex-shrink-0 bg-secondary rounded overflow-hidden"
                  style={{ height: "4.5rem" }}
                >
                  {p.images[0] && (
                    <OptimizedImage
                      src={p.images[0]}
                      alt=""
                      containerClassName="h-full w-full"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="font-medium text-sm truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.sku || "—"}</div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-sm font-medium">{brl(p.sale_price ?? p.price)}</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          p.is_active
                            ? "bg-blush-soft text-blush-deep"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {p.is_active ? "Ativo" : "Inativo"}
                      </span>
                      <span
                        className={`text-xs ${p.stock === 0 ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        Estoque: {p.stock}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col gap-1 flex-shrink-0 justify-center">
                  <Link
                    to="/admin/produtos/$id"
                    params={{ id: p.id }}
                    className="flex h-9 w-9 items-center justify-center hover:bg-secondary rounded transition"
                    aria-label="Editar produto"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => remove(p.id)}
                    className="flex h-9 w-9 items-center justify-center hover:bg-secondary rounded text-destructive transition"
                    aria-label="Remover produto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── DESKTOP: tabela ── */}
          <div className="hidden md:block bg-background border border-border rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs tracking-editorial uppercase text-muted-foreground">
                <tr>
                  <th className="text-left p-3">Produto</th>
                  <th className="text-left p-3">Preço</th>
                  <th className="text-left p-3">Estoque</th>
                  <th className="text-left p-3">Status</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-border hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-secondary rounded overflow-hidden flex-shrink-0">
                          {p.images[0] && (
                            <OptimizedImage
                              src={p.images[0]}
                              alt=""
                              containerClassName="h-full w-full"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.sku || "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{brl(p.sale_price ?? p.price)}</td>
                    <td className={`p-3 ${p.stock === 0 ? "text-destructive" : ""}`}>{p.stock}</td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          p.is_active
                            ? "bg-blush-soft text-blush-deep"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {p.is_active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Link
                          to="/admin/produtos/$id"
                          params={{ id: p.id }}
                          className="p-2 hover:bg-secondary rounded"
                          aria-label="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => remove(p.id)}
                          className="p-2 hover:bg-secondary rounded text-destructive"
                          aria-label="Remover"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
