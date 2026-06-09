import { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, ShoppingBag } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { supabase } from "@/integrations/supabase/client";
import type { CustomerReview } from "@/lib/types";

/* ─────────────────────────── helpers ─────────────────────────── */

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < rating ? "fill-amber-400 text-amber-400" : "fill-border text-border"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <div className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3">
      <div className="relative bg-background border border-border rounded-sm p-6 h-full flex flex-col gap-4 group hover:border-blush/60 hover:shadow-md transition-all duration-300">
        {/* Quote icon */}
        <Quote className="h-6 w-6 text-blush/40 absolute top-5 right-5" />

        {/* Stars */}
        <StarRating rating={review.rating} size={15} />

        {/* Comment */}
        <p className="text-sm text-foreground/80 leading-relaxed flex-1 line-clamp-5 italic">
          "{review.comment}"
        </p>

        {/* Product tag */}
        {review.product && (
          <div className="flex items-center gap-1.5 text-[11px] text-blush-deep tracking-wide uppercase border border-blush/30 rounded-sm px-2 py-1 w-fit bg-blush-soft">
            <ShoppingBag className="h-3 w-3" />
            <span className="truncate max-w-[180px]">{review.product.name}</span>
          </div>
        )}

        {/* Footer: avatar + name + city */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          {review.customer_photo ? (
            <img
              src={review.customer_photo}
              alt={review.customer_name}
              className="w-9 h-9 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blush-soft border border-blush/30 flex items-center justify-center text-blush font-display text-sm font-semibold select-none">
              {review.customer_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{review.customer_name}</p>
            {review.city && (
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
                <MapPin className="h-2.5 w-2.5" />
                {review.city}
                {review.state ? `, ${review.state}` : ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── main ─────────────────────────── */

export function CustomerReviewsCarousel() {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["public-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("*, product:products(name, images)")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as CustomerReview[];
    },
  });

  /* Embla setup */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 4500);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
    startAutoplay();
    return () => stopAutoplay();
  }, [emblaApi, startAutoplay, stopAutoplay]);

  /* Stats */
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  if (isLoading) {
    return (
      <section className="container-editorial my-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-secondary rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-56 bg-secondary rounded-sm" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!reviews.length) return null;

  return (
    <section className="my-20 bg-blush-soft/30 border-y border-border py-16">
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs tracking-editorial uppercase text-blush-deep">
              O que dizem sobre nós
            </span>
            <h2 className="font-display text-4xl mt-1">Avaliações</h2>
          </div>

          {/* Stats badge */}
          <div className="flex items-center gap-3 bg-background border border-border rounded-sm px-5 py-3 shadow-sm w-fit">
            <div>
              <StarRating rating={5} size={16} />
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display text-2xl leading-none">{avgRating}</span>
                <span className="text-xs text-muted-foreground">/5</span>
              </div>
            </div>
            <div className="border-l border-border pl-3">
              <p className="text-lg font-semibold leading-none">{reviews.length}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide">
                avaliações
              </p>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className="flex -mx-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex gap-1.5 flex-wrap">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Avaliação ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === selectedIndex ? "w-6 bg-blush" : "w-1.5 bg-border hover:bg-blush/50"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                emblaApi?.scrollPrev();
                startAutoplay();
              }}
              aria-label="Anterior"
              className="w-9 h-9 rounded-full border border-border bg-background hover:bg-blush-soft hover:border-blush/50 flex items-center justify-center transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                emblaApi?.scrollNext();
                startAutoplay();
              }}
              aria-label="Próximo"
              className="w-9 h-9 rounded-full border border-border bg-background hover:bg-blush-soft hover:border-blush/50 flex items-center justify-center transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
