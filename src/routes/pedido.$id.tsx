import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/format";

export const Route = createFileRoute("/pedido/$id")({
  component: OrderPage,
});

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  processing: "Em separação",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

function OrderPage() {
  const { id } = Route.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const [{ data: order, error: e1 }, { data: items, error: e2 }] = await Promise.all([
        supabase.from("orders").select("*").eq("id", id).maybeSingle(),
        supabase.from("order_items").select("*").eq("order_id", id),
      ]);
      if (e1) throw e1;
      if (e2) throw e2;
      return { order, items: items ?? [] };
    },
  });

  if (isLoading)
    return (
      <div className="container-editorial py-20 text-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  if (error || !data?.order) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="font-display text-3xl">Pedido não encontrado</h1>
        <Link to="/" className="mt-6 inline-block text-xs tracking-editorial uppercase underline">
          Voltar à loja
        </Link>
      </div>
    );
  }

  const { order, items } = data;

  return (
    <div className="container-editorial py-10 md:py-16 max-w-3xl">
      <div className="text-center mb-10">
        <CheckCircle2 className="h-12 w-12 mx-auto text-blush" />
        <h1 className="font-display text-4xl mt-4">Pedido confirmado</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Número <span className="font-medium text-foreground">{order.order_number}</span> · Status:{" "}
          {STATUS_LABEL[order.status] ?? order.status}
        </p>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <div className="p-6 bg-secondary/30 border-b border-border">
          <h2 className="font-display text-xl">Itens</h2>
        </div>
        <ul className="divide-y divide-border">
          {items.map((it) => (
            <li key={it.id} className="p-4 flex gap-4">
              <div className="w-16 h-20 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                {it.product_image && (
                  <img
                    src={it.product_image}
                    alt={it.product_name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 flex justify-between text-sm">
                <div>
                  <div className="font-medium">{it.product_name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {it.size && <>Tam: {it.size} · </>}
                    {it.color && <>Cor: {it.color} · </>}
                    Qtd: {it.quantity}
                  </div>
                </div>
                <div className="font-medium">{brl(Number(it.unit_price) * it.quantity)}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-6 border-t border-border space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{brl(Number(order.subtotal))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frete</span>
            <span>{brl(Number(order.shipping_cost))}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t border-border mt-2 text-base">
            <span>Total</span>
            <span>{brl(Number(order.total))}</span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-6 text-sm">
        <div className="border border-border rounded-sm p-5">
          <h3 className="text-xs tracking-editorial uppercase text-muted-foreground mb-2">
            Cliente
          </h3>
          <div>{order.customer_name}</div>
          <div className="text-muted-foreground">{order.customer_email}</div>
          <div className="text-muted-foreground">{order.customer_phone}</div>
        </div>
        <div className="border border-border rounded-sm p-5">
          <h3 className="text-xs tracking-editorial uppercase text-muted-foreground mb-2">
            Entrega
          </h3>
          <div>
            {order.shipping_street}, {order.shipping_number}
            {order.shipping_complement ? ` · ${order.shipping_complement}` : ""}
          </div>
          <div className="text-muted-foreground">
            {order.shipping_neighborhood} · {order.shipping_city}/{order.shipping_state}
          </div>
          <div className="text-muted-foreground">CEP {order.shipping_cep}</div>
        </div>
      </div>

      <div className="flex gap-3 mt-8 justify-center">
        <Link to="/minha-conta/pedidos" className="text-xs tracking-editorial uppercase underline">
          Meus pedidos
        </Link>
        <span className="text-muted-foreground">·</span>
        <Link to="/loja" className="text-xs tracking-editorial uppercase underline">
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}
