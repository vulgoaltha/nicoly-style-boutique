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
        <p className="text-muted-foreground mt-2 text-sm">Explore nossa coleção e encontre seu próximo look.</p>
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
    <div className="container-editorial py-10 md:py-16">
      <h1 className="font-display text-4xl mb-8">Sua sacola</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => {
            const k = `${item.productId}_${item.size ?? ""}_${item.color ?? ""}`;
            return (
              <div key={k} className="flex gap-4 border border-border p-4 rounded-sm">
                <div className="w-24 h-32 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                  {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link to="/produto/$slug" params={{ slug: item.slug }} className="font-medium hover:text-blush">
                        {item.name}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-1 space-x-2">
                        {item.size && <span>Tam: {item.size}</span>}
                        {item.color && <span>Cor: {item.color}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(item.productId, item.size, item.color)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="Remover"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-center border border-border rounded-sm text-sm">
                      <button
                        onClick={() => setQty(item.productId, item.quantity - 1, item.size, item.color)}
                        className="p-2"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => setQty(item.productId, item.quantity + 1, item.size, item.color)}
                        className="p-2"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="font-medium">{brl(item.price * item.quantity)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4 border border-border p-6 rounded-sm h-fit bg-secondary/30">
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
            Pagamento via Mercado Pago em breve. Por ora, registramos o pedido e entramos em contato.
          </p>
        </div>
      </div>
    </div>
  );
}
