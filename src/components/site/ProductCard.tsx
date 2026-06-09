import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { brl } from "@/lib/format";

import { OptimizedImage } from "@/components/ui/OptimizedImage";

export function ProductCard({ product }: { product: Product }) {
  const images = product.images ?? [];
  const img = images[0];
  const hoverImg = images[1];
  const effectivePrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
  const [activeDot, setActiveDot] = useState(0);

  return (
    <Link to="/produto/$slug" params={{ slug: product.slug }} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
        {img ? (
          <>
            <OptimizedImage
              src={img}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                hoverImg ? "group-hover:opacity-0" : ""
              }`}
            />
            {hoverImg && (
              <OptimizedImage
                src={hoverImg}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
            Sem imagem
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.is_new && (
            <span className="bg-background/90 backdrop-blur text-[10px] uppercase tracking-editorial px-2 py-1 rounded-sm">
              Novo
            </span>
          )}
          {hasDiscount && (
            <span className="bg-blush text-accent-foreground text-[10px] uppercase tracking-editorial px-2 py-1 rounded-sm">
              Promo
            </span>
          )}
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 md:hidden">
            {images.slice(0, 4).map((_, i) => (
              <span
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveDot(i);
                }}
                className={`h-1 rounded-full transition-all ${
                  i === activeDot ? "w-4 bg-background" : "w-1 bg-background/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium leading-tight line-clamp-2">{product.name}</h3>
        <div className="flex items-baseline gap-2 text-sm">
          {hasDiscount && (
            <span className="text-muted-foreground line-through text-xs">{brl(product.price)}</span>
          )}
          <span className={hasDiscount ? "text-blush-deep font-medium" : "font-medium"}>
            {brl(effectivePrice)}
          </span>
        </div>
      </div>
    </Link>
  );
}
