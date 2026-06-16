import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/format";

export const Route = createFileRoute("/admin/pedidos/$id")({
  component: AdminOrderDetail,
  errorComponent: ({ error }) => (
    <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded">
      <strong>Erro ao carregar pedido:</strong>
      <pre className="mt-2 text-xs">{error instanceof Error ? error.message : JSON.stringify(error)}</pre>
    </div>
  ),
});

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"] as const;
const PAYMENTS = ["pending", "paid", "failed", "refunded"] as const;
const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  processing: "Em separação",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
  failed: "Falhou",
  refunded: "Reembolsado",
};

function AdminOrderDetail() {
  const { id } = Route.useParams();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-order", id],
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

  const update = async (patch: {
    status?: string;
    payment_status?: string;
    tracking_code?: string | null;
  }) => {
    const { error } = await supabase
      .from("orders")
      .update(patch as never)
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Pedido atualizado");
    qc.invalidateQueries({ queryKey: ["admin-order", id] });
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
  };

  if (isLoading) return <div className="text-sm text-muted-foreground">Carregando...</div>;
  if (!data?.order) return <div>Pedido não encontrado.</div>;
  const { order, items } = data;

  return (
    <div className="max-w-4xl">
      <Link
        to="/admin/pedidos"
        className="inline-flex items-center gap-2 text-xs tracking-editorial uppercase text-muted-foreground mb-6 hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Pedidos
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl">{order.order_number}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date(order.created_at || new Date()).toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl">{brl(Number(order.total))}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="border border-border rounded-sm p-5 bg-background">
          <label className="block text-xs tracking-editorial uppercase text-muted-foreground mb-2">
            Status do pedido
          </label>
          <select
            value={order.status || ""}
            onChange={(e) => update({ status: e.target.value })}
            className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="border border-border rounded-sm p-5 bg-background">
          <label className="block text-xs tracking-editorial uppercase text-muted-foreground mb-2">
            Status do pagamento
          </label>
          <select
            value={order.payment_status || ""}
            onChange={(e) => update({ payment_status: e.target.value })}
            className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background"
          >
            {PAYMENTS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 border border-border rounded-sm p-5 bg-background">
          <label className="block text-xs tracking-editorial uppercase text-muted-foreground mb-2">
            Código de rastreio
          </label>
          <input
            defaultValue={order.tracking_code ?? ""}
            onBlur={(e) =>
              e.target.value !== (order.tracking_code ?? "") &&
              update({ tracking_code: e.target.value || null })
            }
            className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background"
            placeholder="Ex: BR123456789XX"
          />
        </div>
      </div>

      <div className="border border-border rounded-sm overflow-hidden mb-6 bg-background">
        <div className="p-4 border-b border-border bg-secondary/30 font-display text-lg">Itens</div>
        <ul className="divide-y divide-border">
          {items.map((it) => (
            <li key={it.id} className="p-4 flex gap-4 text-sm">
              <div className="w-14 h-16 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                {it.product_image && (
                  <img src={it.product_image} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1 flex justify-between">
                <div>
                  <div className="font-medium">{it.product_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {it.size && <>Tam: {it.size} · </>}
                    {it.color && <>Cor: {it.color} · </>}Qtd: {it.quantity}
                  </div>
                </div>
                <div>{brl(Number(it.unit_price) * it.quantity)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment Info */}
      <div className="border border-border rounded-sm p-5 bg-background mb-6 mt-6">
        <h3 className="text-xs tracking-editorial uppercase text-muted-foreground mb-3">
          Informacoes de Pagamento
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Gateway:</span> {order.payment_gateway ?? "N/A"}
          </div>
          <div>
            <span className="text-muted-foreground">Metodo:</span> {order.payment_method ?? "N/A"}
          </div>
          <div>
            <span className="text-muted-foreground">Transaction ID:</span>{" "}
            <span className="font-mono text-xs">{order.transaction_id ?? "N/A"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Gateway ID:</span>{" "}
            <span className="font-mono text-xs">{order.payment_gateway_id ?? "N/A"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Valor Pago:</span>{" "}
            {order.paid_at ? brl(Number(order.total)) : "N/A"}
          </div>
          <div>
            <span className="text-muted-foreground">Data do Pagamento:</span>{" "}
            {order.paid_at ? new Date(order.paid_at).toLocaleString("pt-BR") : "N/A"}
          </div>
        </div>

        {order.pix_code && (
          <div className="mt-3 pt-3 border-t border-border">
            <label className="block text-xs tracking-editorial uppercase text-muted-foreground mb-2">
              Codigo PIX
            </label>
            <div className="flex gap-2">
              <input
                readOnly
                value={order.pix_code}
                className="flex-1 border border-border bg-background rounded-sm px-3 py-2 text-sm font-mono text-xs break-all"
              />
            </div>
            {order.pix_qrcode && (
              <div className="mt-2">
                <img
                  src={`data:image/png;base64,${order.pix_qrcode}`}
                  alt="QR Code PIX"
                  className="w-24 h-24 object-contain"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="border border-border rounded-sm p-5 bg-background">
          <h3 className="text-xs tracking-editorial uppercase text-muted-foreground mb-2">
            Cliente
          </h3>
          <div>{order.customer_name}</div>
          <div className="text-muted-foreground">{order.customer_email}</div>
          <div className="text-muted-foreground">{order.customer_phone}</div>
          {order.customer_cpf && (
            <div className="text-muted-foreground font-mono mt-1 text-xs">CPF: {order.customer_cpf}</div>
          )}
        </div>
        <div className="border border-border rounded-sm p-5 bg-background">
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
        {order.notes && (
          <div className="md:col-span-2 border border-border rounded-sm p-5 bg-background">
            <h3 className="text-xs tracking-editorial uppercase text-muted-foreground mb-2">
              Observacoes
            </h3>
            <p className="whitespace-pre-wrap">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
