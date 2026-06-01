import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart, Truck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/store/cart";
import { brl } from "@/lib/format";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/produto/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [imgIdx, setImgIdx] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data as Product;
    },
  });

  if (isLoading) {
    return (
      <div className="container-editorial py-16 grid md:grid-cols-2 gap-12">
        <div className="aspect-[3/4] bg-secondary animate-pulse rounded-sm" />
        <div className="space-y-4">
          <div className="h-8 bg-secondary animate-pulse rounded w-3/4" />
          <div className="h-4 bg-secondary animate-pulse rounded w-1/3" />
        </div>
      </div>
    );
  }
  if (!product) return null;

  const price = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;

  const handleAdd = () => {
    if (product.sizes.length && !size) {
      toast.error("Escolha um tamanho");
      return;
    }
    if (product.colors.length && !color) {
      toast.error("Escolha uma cor");
      return;
    }
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "",
      price,
      size,
      color,
      quantity: qty,
    });
    toast.success("Adicionado à sacola");
  };

  return (
    <div className="container-editorial py-10 md:py-16">
      <nav className="text-xs text-muted-foreground mb-6 tracking-editorial uppercase">
        <Link to="/" className="hover:text-foreground">Início</Link> /{" "}
        <Link to="/loja" className="hover:text-foreground">Loja</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-3">
          <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
            {product.images[imgIdx] && (
              <img
                src={product.images[imgIdx]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`aspect-square overflow-hidden rounded-sm border-2 transition ${
                    i === imgIdx ? "border-blush" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-baseline gap-3">
              {hasDiscount && (
                <span className="text-muted-foreground line-through">{brl(product.price)}</span>
              )}
              <span className={`text-2xl ${hasDiscount ? "text-blush-deep" : ""}`}>
                {brl(price)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ou 3x de {brl(price / 3)} sem juros
            </p>
          </div>

          {product.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          )}

          {product.colors.length > 0 && (
            <div>
              <div className="text-xs tracking-editorial uppercase mb-2">
                Cor {color && <span className="text-muted-foreground normal-case tracking-normal">— {color}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-3 py-1.5 text-xs border rounded-sm transition ${
                      color === c ? "border-foreground bg-secondary" : "border-border"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div>
              <div className="text-xs tracking-editorial uppercase mb-2">Tamanho</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[44px] px-3 py-2 text-xs border rounded-sm transition ${
                      size === s ? "border-foreground bg-secondary" : "border-border"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-sm">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3">
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="flex-1 bg-primary text-primary-foreground px-6 py-3.5 text-xs tracking-editorial uppercase rounded-sm hover:bg-blush-deep transition disabled:opacity-40 inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              {product.stock === 0 ? "Esgotado" : "Adicionar à sacola"}
            </button>
            <button className="p-3 border border-border rounded-sm hover:text-blush transition">
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="border-t border-border pt-5 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5" /> Envio para todo o Brasil
            </div>
            {product.sku && <div>SKU: {product.sku}</div>}
            {product.stock > 0 && product.stock < 5 && (
              <div className="text-blush-deep">Últimas {product.stock} unidades</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
