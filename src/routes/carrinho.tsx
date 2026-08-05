import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { brl } from "@/lib/format";

export const Route = createFileRoute("/carrinho")({
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const subtotal = useCart((s) => s.subtotal());

  if (!items.length) {
    return (
      <div className="container-editorial py-24 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
        <h1 className="font-display text-3xl mt-4">Sua sacola está vazia</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Explore nossa coleção e encontre seu próximo look.
        </p>
        <Link
          to="/loja"
          className="mt-6 inline-flex items-center bg-primary text-primary-foreground px-6 py-3 text-xs tracking-editorial uppercase rounded-sm"
        >
          Ir para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="container-editorial py-8 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl mb-6 md:mb-8">Sua sacola</h1>

      <div className="grid md:grid-cols-3 gap-6 md:gap-10">
        {/* ── Lista de itens ── */}
        <div className="md:col-span-2 space-y-3 md:space-y-4">
          {items.map((item) => {
            const k = `${item.productId}_${item.size ?? ""}_${item.color ?? ""}`;
            return (
              <div
                key={k}
                className="flex gap-3 sm:gap-4 border border-border p-3 sm:p-4 rounded-sm"
              >
                {/* Imagem */}
                <div className="w-20 h-28 sm:w-24 sm:h-32 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>

                {/* Dados do item */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        to="/produto/$slug"
                        params={{ slug: item.slug }}
                        className="font-medium hover:text-blush text-sm block truncate"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-1 flex gap-2 flex-wrap">
                        {item.size && <span>Tam: {item.size}</span>}
                        {item.color && <span>Cor: {item.color}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(item.productId, item.size, item.color)}
                      className="flex-shrink-0 flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground rounded"
                      aria-label="Remover item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-2 gap-2">
                    {/* Controles de quantidade */}
                    <div className="flex items-center border border-border rounded-sm text-sm">
                      <button
                        onClick={() =>
                          setQty(item.productId, item.quantity - 1, item.size, item.color)
                        }
                        className="flex h-9 w-9 items-center justify-center"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          setQty(item.productId, item.quantity + 1, item.size, item.color)
                        }
                        className="flex h-9 w-9 items-center justify-center"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="font-medium text-sm">{brl(item.price * item.quantity)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Resumo (desktop) ── */}
        <div className="hidden md:block space-y-4 border border-border p-6 rounded-sm h-fit bg-secondary/30">
          <h2 className="font-display text-xl">Resumo</h2>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{brl(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frete</span>
            <span className="text-muted-foreground">Calculado no checkout</span>
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span>{brl(subtotal)}</span>
          </div>
          <Link
            to="/checkout"
            className="block text-center w-full bg-primary text-primary-foreground py-3.5 text-xs tracking-editorial uppercase rounded-sm hover:opacity-90 transition"
          >
            Finalizar compra
          </Link>
          <p className="text-xs text-muted-foreground text-center">
            Pagamento seguro via Mercado Pago.
          </p>
        </div>
      </div>

      {/* ── Barra de checkout fixo no mobile ── */}
      {/* z-30 < z-50 do WhatsApp — posicionada à esquerda para não cobrir o botão */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border px-4 py-3 flex items-center gap-3 pb-safe">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground">Subtotal</div>
          <div className="font-display text-lg font-medium">{brl(subtotal)}</div>
        </div>
        <Link
          to="/checkout"
          className="flex-shrink-0 bg-primary text-primary-foreground px-6 py-3 text-xs tracking-editorial uppercase rounded-sm hover:opacity-90 transition"
        >
          Finalizar compra
        </Link>
      </div>

      {/* Espaço extra no mobile para a barra fixa não cobrir conteúdo */}
      <div className="md:hidden h-24" />
    </div>
  );
}
