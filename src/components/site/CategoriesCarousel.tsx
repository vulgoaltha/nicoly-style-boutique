import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type HCategory = {
  id: string;
  title: string;
  icon: string;
  color: string;
  slug: string;
};

function CategoryIcon({ name }: { name: string }) {
  const Cmp = (Icons as any)[name] ?? Icons.Shirt;
  return <Cmp className="h-7 w-7" strokeWidth={1.5} />;
}

export function CategoriesCarousel() {
  const { data: categories = [] } = useQuery({
    queryKey: ["homepage-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_categories")
        .select("id,title,icon,color,slug")
        .eq("active", true)
        .order("order_position");
      if (error) throw error;
      return data as HCategory[];
    },
  });

  console.log("[CategoriesCarousel]", categories);
  const ref = useRef<HTMLDivElement>(null);

  if (!categories.length) return null;

  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section className="container-editorial my-14">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs tracking-editorial uppercase text-blush-deep">
            Categorias
          </span>
          <h2 className="font-display text-3xl mt-1">Compre por estilo</h2>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="p-2 border border-border rounded-full hover:bg-secondary"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="p-2 border border-border rounded-full hover:bg-secondary"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/loja"
            search={{ cat: c.slug } as any}
            className="snap-start shrink-0 w-24 md:w-28 text-center group"
          >
            <div
              className="mx-auto h-20 w-20 md:h-24 md:w-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
              style={{ backgroundColor: c.color }}
            >
              <CategoryIcon name={c.icon} />
            </div>
            <div className="mt-3 text-xs tracking-editorial uppercase">
              {c.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
