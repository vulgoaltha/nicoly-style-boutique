import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/estruture-loja")({
  component: EstrutureLoja,
});

// Dados falsos (mock) para testar a renderização sem depender do Supabase
const mockProducts = [
  {
    id: "mock-1",
    name: "Vestido Elegance",
    slug: "vestido-elegance",
    description: "Um vestido maravilhoso para qualquer ocasião.",
    price: 199.9,
    sale_price: 149.9,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60"],
    is_new: true,
  },
  {
    id: "mock-2",
    name: "Blusa Social",
    slug: "blusa-social",
    description: "Blusa social com tecido premium.",
    price: 89.9,
    images: ["https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&auto=format&fit=crop&q=60"],
    is_new: false,
  },
  {
    id: "mock-3",
    name: "Conjunto Alfaiataria",
    slug: "conjunto-alfaiataria",
    description: "Conjunto completo de alfaiataria fina.",
    price: 349.9,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=60"],
    is_new: true,
  },
  {
    id: "mock-4",
    name: "Saia Midi",
    slug: "saia-midi",
    description: "Saia midi super confortável e estilosa.",
    price: 129.9,
    images: ["https://images.unsplash.com/photo-1583496661160-c588c4c1e55d?w=800&auto=format&fit=crop&q=60"],
    is_new: false,
  },
];

const mockCategories = [
  { id: "1", name: "Vestidos", slug: "vestidos" },
  { id: "2", name: "Blusas", slug: "blusas" },
  { id: "3", name: "Conjuntos", slug: "conjuntos" },
];

function EstrutureLoja() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
      {/* HEADER DA LOJA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-primary">Estrutura Loja Teste</h1>
          <p className="text-muted-foreground mt-2">
            Página 100% estática. Nenhum vínculo com Lovable ou Supabase.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR DE CATEGORIAS (ESTÁTICA) */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">Categorias</h3>
            <div className="flex flex-col gap-2">
              <button className="text-left px-3 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-colors">
                Tudo
              </button>
              {mockCategories.map((c) => (
                <button
                  key={c.id}
                  className="text-left px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/50 rounded-md transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* GRID DE PRODUTOS (ESTÁTICO) */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {mockProducts.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>

          {/* PAGINAÇÃO FALSA */}
          <div className="mt-12 flex justify-center border-t pt-8">
            <div className="flex items-center gap-2">
              <button disabled className="px-4 py-2 border rounded-md text-sm opacity-50 cursor-not-allowed">
                Anterior
              </button>
              <span className="text-sm font-medium px-4">Página 1 de 1</span>
              <button disabled className="px-4 py-2 border rounded-md text-sm opacity-50 cursor-not-allowed">
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
