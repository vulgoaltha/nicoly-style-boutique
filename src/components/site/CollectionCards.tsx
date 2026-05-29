import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight } from "lucide-react";

type Collection = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  redirect_url: string | null;
};

export function CollectionCards() {
  const { data: collections = [] } = useQuery({
    queryKey: ["homepage-collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_collections")
        .select("id,title,subtitle,image_url,redirect_url")
        .eq("active", true)
        .order("order_position");
      if (error) throw error;
      return data as Collection[];
    },
  });

  console.log("[CollectionCards]", collections);
  if (!collections.length) return null;

  return (
    <section className="container-editorial my-20">
      <div className="mb-8 text-center">
        <span className="text-xs tracking-editorial uppercase text-blush-deep">
          Coleções
        </span>
        <h2 className="font-display text-4xl mt-1">Inspirações da estação</h2>
      </div>

      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none">
        {collections.map((c) => (
          <a
            key={c.id}
            href={c.redirect_url ?? "/loja"}
            className="group relative overflow-hidden rounded-sm bg-secondary snap-start shrink-0 w-[85%] md:w-auto aspect-[4/5] block"
          >
            <img
              src={c.image_url}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-background">
              {c.subtitle && (
                <span className="text-[10px] tracking-editorial uppercase text-blush">
                  {c.subtitle}
                </span>
              )}
              <h3 className="font-display text-2xl md:text-3xl leading-tight mt-1 flex items-center gap-2">
                {c.title}
                <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
