import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero.jpg";
import { Skeleton } from "@/components/ui/skeleton";

import { OptimizedImage } from "@/components/ui/OptimizedImage";

type Banner = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  button_text: string | null;
  button_link: string | null;
};

const FALLBACK: Banner[] = [
  {
    id: "fallback",
    title: "Elegância que veste você.",
    subtitle: "Peças selecionadas para mulheres que se vestem com intenção.",
    image_url: heroImg,
    button_text: "Explorar coleção",
    button_link: "/loja",
  },
];

export function HeroCarousel() {
  const { data, isLoading } = useQuery({
    queryKey: ["hero-banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_banners")
        .select("id,title,subtitle,image_url,button_text,button_link")
        .eq("active", true)
        .order("order_position");
      if (error) throw error;
      return data as Banner[];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const banners = data && data.length ? data : FALLBACK;
  console.log("[HeroCarousel]", banners);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % banners.length), 6000);
    return () => clearInterval(t);
  }, [banners.length]);

  if (isLoading) {
    return <Skeleton className="h-[60vh] w-full rounded-none" />;
  }

  const b = banners[index];

  const go = (dir: number) => setIndex((i) => (i + dir + banners.length) % banners.length);

  return (
    <section className="relative overflow-hidden bg-blush-soft">
      <div className="relative h-[70vh] min-h-[480px] md:h-[78vh]">
        <AnimatePresence initial={false}>
          <motion.div
            key={b.id}
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <OptimizedImage
              src={b.image_url}
              alt={b.title}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {banners.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background backdrop-blur p-2.5 rounded-full transition hidden md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Próximo"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background backdrop-blur p-2.5 rounded-full transition hidden md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Banner ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-background" : "w-1.5 bg-background/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
