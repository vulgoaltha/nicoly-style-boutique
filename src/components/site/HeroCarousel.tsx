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
  {
    id: "fallback-2",
    title: "Nova Coleção Primavera.",
    subtitle: "Cores e texturas para renovar seu guarda-roupa.",
    image_url: heroImg,
    button_text: "Ver novidades",
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
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (banners.length < 2) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % banners.length);
    }, 6000);
    return () => clearInterval(t);
  }, [banners.length]);

  if (isLoading) {
    return <Skeleton className="h-[55vw] min-h-[300px] max-h-[85vh] w-full rounded-none" />;
  }

  const b = banners[index];

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + banners.length) % banners.length);
  };

  return (
    <section className="relative overflow-hidden bg-blush-soft">
      {/* Imagem — proporção 3/4 no mobile, 16/9 no sm, altura fixa no lg */}
      <div className="relative w-full aspect-[3/4] sm:aspect-video lg:h-[78vh] lg:min-h-[560px] lg:max-h-[900px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={b.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 1 }),
              center: { x: "0%", opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 1 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {/* Imagem de fundo */}
            <OptimizedImage
              src={b.image_url}
              alt={b.title}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover"
            />

            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Conteúdo de texto + CTA */}
            <div className="absolute inset-0 flex flex-col items-start justify-end z-10 container-editorial pb-10 sm:pb-14 lg:pb-20">
              <motion.div
                key={b.id + "-text"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-xl"
              >
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  {b.title}
                </h2>
                {b.subtitle && (
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/80 max-w-sm">
                    {b.subtitle}
                  </p>
                )}
                {b.button_link && b.button_text && (
                  <a
                    href={b.button_link}
                    className="mt-5 sm:mt-6 inline-flex items-center gap-2 bg-white text-foreground text-xs tracking-editorial uppercase px-6 py-3 rounded-sm hover:bg-blush-soft transition font-medium"
                  >
                    {b.button_text}
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles de navegação */}
        {banners.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Banner anterior"
              className="absolute z-20 left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background backdrop-blur p-2 sm:p-2.5 rounded-full transition flex"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Próximo banner"
              className="absolute z-20 right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background backdrop-blur p-2 sm:p-2.5 rounded-full transition flex"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Indicadores */}
            <div className="absolute z-20 bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Banner ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-white" : "w-1.5 bg-white/50"
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
