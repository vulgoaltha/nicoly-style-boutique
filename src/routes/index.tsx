import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, Shield, Sparkles, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/site/ProductCard";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { AnnouncementMarquee } from "@/components/site/AnnouncementMarquee";
import { CategoriesCarousel } from "@/components/site/CategoriesCarousel";
import { CollectionCards } from "@/components/site/CollectionCards";
import { useInstagram } from "@/hooks/use-site-settings";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Nicoly Modas — Moda Feminina Premium" },
      {
        name: "description",
        content:
          "Coleções de vestidos, blusas e conjuntos. Estilo elegante e atemporal para mulheres modernas.",
      },
    ],
  }),
});

function Home() {
  const { data: instagram } = useInstagram();

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

      {/* Editorial banner */}
      <section className="container-editorial my-20">
        <div className="relative bg-primary text-primary-foreground overflow-hidden rounded-sm">
          <div className="p-10 md:p-20 max-w-xl">
            <span className="text-xs tracking-editorial uppercase text-blush">Edição limitada</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
              Looks que contam histórias.
            </h2>
            <p className="text-primary-foreground/70 mt-4">
              Inspirados no nosso feed, criados para o seu guarda-roupa.
            </p>
            <Link
              to="/loja"
              className="mt-6 inline-flex items-center gap-2 bg-blush text-accent-foreground px-6 py-3 text-xs tracking-editorial uppercase rounded-sm hover:opacity-90 transition"
            >
              Ver looks <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Section
        title="Em destaque"
        subtitle="Selecionados da coleção"
        link="/loja"
        products={featured}
      />

      {/* Instagram */}
      {instagram?.active && (
        <section className="container-editorial my-20">
          <div className="text-center mb-8">
            <span className="text-xs tracking-editorial uppercase text-blush-deep">Siga-nos</span>
            <a
              href={instagram.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-display text-4xl md:text-5xl hover:text-blush transition"
            >
              <Instagram className="h-7 w-7" /> @{instagram.username}
            </a>
          </div>
          <a
            href={instagram.url}
            target="_blank"
            rel="noreferrer"
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-blush-soft relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blush-soft to-blush/30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
              </div>
            ))}
          </a>
        </section>
      )}
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
