import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useCart } from "@/store/cart";
import { useAuth } from "@/hooks/use-auth";
import { brl } from "@/lib/format";
import { createOrder } from "@/lib/orders.functions";
export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const submit = useServerFn(createOrder);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_cep: "",
    shipping_street: "",
    shipping_number: "",
    shipping_complement: "",
    shipping_neighborhood: "",
    shipping_city: "",
    shipping_state: "",
    notes: "",
  });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);
  if (!user) return null;

  if (!items.length) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="font-display text-3xl">Sua sacola está vazia</h1>
        <Link
          to="/loja"
          className="mt-6 inline-block text-xs tracking-editorial uppercase underline"
        >
          Ver coleção
        </Link>
      </div>
    );
  }

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await submit({
        data: {
          ...form,
          shipping_cost: 0,
          items: items.map((i) => ({
            productId: i.productId,
            slug: i.slug,
            name: i.name,
            image: i.image,
            price: i.price,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
          })),
        },
      });
      clear();
      toast.success("Pedido criado com sucesso!");
      // Redirect to payment page instead of order detail
      navigate({ to: "/checkout/pagamento/$orderId", params: { orderId: res.id } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar pedido");
    } finally {
      setSaving(false);
    }
  };

  const input =
    "w-full border border-border bg-background rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-blush";
  const label = "block text-xs tracking-editorial uppercase text-muted-foreground mb-1.5";

  return (
    <div className="container-editorial py-10 md:py-16">
      <h1 className="font-display text-4xl mb-8">Finalizar compra</h1>

      <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="font-display text-2xl">Dados do cliente</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={label}>Nome completo</label>
                <input
                  required
                  value={form.customer_name}
                  onChange={set("customer_name")}
                  className={input}
                />
              </div>
              <div>
                <label className={label}>E-mail</label>
                <input
                  required
                  type="email"
                  value={form.customer_email}
                  onChange={set("customer_email")}
                  className={input}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Telefone / WhatsApp</label>
                <input
                  required
                  value={form.customer_phone}
                  onChange={set("customer_phone")}
                  className={input}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl">Endereço de entrega</h2>
            <div className="grid sm:grid-cols-6 gap-4">
              <div className="sm:col-span-2">
                <label className={label}>CEP</label>
                <input
                  required
                  value={form.shipping_cep}
                  onChange={set("shipping_cep")}
                  className={input}
                />
              </div>
              <div className="sm:col-span-4">
                <label className={label}>Rua</label>
                <input
                  required
                  value={form.shipping_street}
                  onChange={set("shipping_street")}
                  className={input}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Número</label>
                <input
                  required
                  value={form.shipping_number}
                  onChange={set("shipping_number")}
                  className={input}
                />
              </div>
              <div className="sm:col-span-4">
                <label className={label}>Complemento</label>
                <input
                  value={form.shipping_complement}
                  onChange={set("shipping_complement")}
                  className={input}
                />
              </div>
              <div className="sm:col-span-3">
                <label className={label}>Bairro</label>
                <input
                  required
                  value={form.shipping_neighborhood}
                  onChange={set("shipping_neighborhood")}
                  className={input}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Cidade</label>
                <input
                  required
                  value={form.shipping_city}
                  onChange={set("shipping_city")}
                  className={input}
                />
              </div>
              <div className="sm:col-span-1">
                <label className={label}>UF</label>
                <input
                  required
                  maxLength={2}
                  value={form.shipping_state}
                  onChange={set("shipping_state")}
                  className={`${input} uppercase`}
                />
              </div>
            </div>
            <div>
              <label className={label}>Observações (opcional)</label>
              <textarea rows={3} value={form.notes} onChange={set("notes")} className={input} />
            </div>
          </section>
        </div>

        <aside className="space-y-4 border border-border p-6 rounded-sm h-fit bg-secondary/30">
          <h2 className="font-display text-xl">Seu pedido</h2>
          <ul className="space-y-3 text-sm">
            {items.map((i) => (
              <li
                key={`${i.productId}_${i.size}_${i.color}`}
                className="flex justify-between gap-2"
              >
                <span className="text-muted-foreground">
                  {i.quantity}× {i.name}
                  {i.size && <span className="text-xs"> · {i.size}</span>}
                </span>
                <span>{brl(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{brl(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frete</span>
              <span>A combinar</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-border mt-2">
              <span>Total</span>
              <span>{brl(subtotal)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-primary-foreground py-3.5 text-xs tracking-editorial uppercase rounded-sm disabled:opacity-60"
          >
            {saving ? "Enviando..." : "Confirmar pedido"}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Pagamento via Mercado Pago. Voce sera redirecionado para a pagina de pagamento apos
            confirmar o pedido.
          </p>
        </aside>
      </form>
    </div>
  );
}
