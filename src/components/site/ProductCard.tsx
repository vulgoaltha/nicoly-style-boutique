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
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
        {img ? (
          <>
            {/* Imagem principal */}
            <OptimizedImage
              src={img}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isHovered ? "scale-[1.03]" : "scale-100"
              } ${hoverImg && isHovered ? "opacity-0" : "opacity-100"}`}
              containerClassName="absolute inset-0 w-full h-full"
              onLoad={() => setImgLoaded(true)}
            />

            {/* Imagem hover (segunda foto) */}
            {hoverImg && (
              <OptimizedImage
                src={hoverImg}
                alt={product.name}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isHovered ? "opacity-100 scale-[1.03]" : "opacity-0 scale-100"
                }`}
                containerClassName="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
            Sem imagem
          </div>
        )}

        {/* Skeleton loading (mostra quando imagem principal ainda não carregou) */}
        {!imgLoaded && img && (
          <div className="absolute inset-0 bg-muted/20 animate-pulse rounded-sm" />
        )}

        {/* Badges premium */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.is_new && (
            <span
              className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] uppercase tracking-editorial px-2 py-1 rounded-sm font-medium"
              aria-label="Novo produto"
            >
              Novo
            </span>
          )}
          {hasDiscount && (
            <span
              className="bg-blush text-accent-foreground text-[10px] uppercase tracking-editorial px-2 py-1 rounded-sm font-medium"
              aria-label="Produto em promoção"
            >
              Promo
            </span>
          )}
        </div>
      </div>

      {/* Informações do produto */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium leading-tight line-clamp-2 font-display">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 text-sm">
          {hasDiscount && (
            <span className="text-muted-foreground line-through text-xs">
              {brl(product.price)}
            </span>
          )}
          <span className={hasDiscount ? "text-blush-deep font-medium" : "font-medium"}>
            {brl(effectivePrice)}
          </span>
        </div>
      </div>
    </Link>
  );
}
