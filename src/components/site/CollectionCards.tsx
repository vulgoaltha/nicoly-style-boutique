import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

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

  if (!collections.length) return null;

  return (
    <section className="container-editorial my-20">
      <div className="mb-10 text-center">
        <span className="text-xs tracking-editorial uppercase text-blush-deep">
          Coleções
        </span>
        <h2 className="font-display text-4xl mt-2">Inspirações da estação</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((c) => (
          <Link
            key={c.id}
            to={c.redirect_url ?? "/loja"}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blush rounded-3xl"
          >
            {/* Card editorial premium */}
            <div
              className="relative overflow-hidden rounded-3xl shadow-md bg-gradient-to-br from-gray-50 to-gray-200 aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-lg"
            >
              {/* Texto de fundo — camada 1 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none select-none">
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#FF4D94] font-bold mb-1">
                  COLEÇÃO
                </span>
                <span
                  className="font-display italic text-[#1a1a1a]/10 text-3xl sm:text-4xl md:text-5xl leading-none text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Dancing Script', cursive, serif" }}
                >
                  {c.title}
                </span>
              </div>

              {/* Imagem da modelo — camada 2 (acima do texto) */}
              <img
                src={c.image_url}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-105 z-10"
              />
            </div>

            {/* Legenda abaixo do card */}
            <div className="mt-4 text-center">
              {c.subtitle && (
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#FF4D94] block mb-1">
                  {c.subtitle}
                </span>
              )}
              <h3 className="font-display text-lg text-[#1a1a1a] leading-tight">
                {c.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
