import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, Shield, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/site/ProductCard";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { AnnouncementMarquee } from "@/components/site/AnnouncementMarquee";
import { CategoriesCarousel } from "@/components/site/CategoriesCarousel";
import { CollectionCards } from "@/components/site/CollectionCards";
import { CustomerReviewsCarousel } from "@/components/site/CustomerReviewsCarousel";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: featured = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .eq("is_featured", true)
        .limit(8);
      if (error) throw error;
      return data as unknown as Product[];
    },
  });

  const { data: novidades = [] } = useQuery({
    queryKey: ["new-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .eq("is_new", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return data as unknown as Product[];
    },
  });

  return (
    <div>
      <AnnouncementMarquee />
      <HeroCarousel />
      <AnnouncementMarquee />

      {/* Trust */}
      <section className="border-y border-border">
        <div className="container-editorial grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {[
            { icon: Truck, t: "Frete para todo Brasil", s: "Envio rápido e rastreado" },
            { icon: Sparkles, t: "Curadoria exclusiva", s: "Peças selecionadas a dedo" },
            { icon: Shield, t: "Compra segura", s: "Troca em até 7 dias" },
          ].map((it) => (
            <div key={it.t} className="flex items-center gap-4 py-6 px-2">
              <it.icon className="h-5 w-5 text-blush" />
              <div>
                <div className="text-sm font-medium">{it.t}</div>
                <div className="text-xs text-muted-foreground">{it.s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoriesCarousel />

      <Section title="Novidades" subtitle="Acabou de chegar" link="/loja" products={novidades} />

      <CollectionCards />

      <Section
        title="Em destaque"
        subtitle="Selecionados da coleção"
        link="/loja"
        products={featured}
      />

      {/* Avaliações */}
      <CustomerReviewsCarousel />
    </div>
  );
}

function Section({
  title,
  subtitle,
  link,
  products,
}: {
  title: string;
  subtitle: string;
  link: string;
  products: Product[];
}) {
  if (!products.length) return null;
  return (
    <section className="container-editorial my-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs tracking-editorial uppercase text-blush-deep">{subtitle}</span>
          <h2 className="font-display text-4xl mt-1">{title}</h2>
        </div>
        <Link
          to={link}
          className="text-xs tracking-editorial uppercase hover:text-blush transition hidden sm:block"
        >
          Ver tudo →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
