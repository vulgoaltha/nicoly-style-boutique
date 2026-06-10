import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { brl } from "@/lib/format";
import { PixDisplay } from "@/components/payment/PixDisplay";
import { PaymentStatus } from "@/components/payment/PaymentStatus";
import { createPaymentPreference } from "@/lib/payment.functions";
import type { PaymentStatusType, PaymentMethodType } from "@/components/payment/PaymentStatus";

export const Route = createFileRoute("/checkout/pagamento/$orderId")({
  component: CheckoutPaymentPage,
});

function CheckoutPaymentPage() {
  const navigate = useNavigate();
  const { orderId } = Route.useParams();
  const { user, loading } = useAuth();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusType>("pending");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("unknown");
  const [pixInfo, setPixInfo] = useState<{
    qrCode: string;
    code: string;
    expiration: string;
  } | null>(null);

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!order) return;

    const initPayment = async () => {
      try {
        if (order.payment_gateway_id) {
          setPreferenceId(order.payment_gateway_id);
        } else {
          const result = await createPaymentPreference({
            data: {
              orderId: order.id,
              items: [
                {
                  id: order.id,
                  title: `Pedido ${order.order_number}`,
                  unit_price: order.total,
                  quantity: 1,
                },
              ],
              payer: {
                name: order.customer_name,
                email: order.customer_email,
              },
              externalReference: order.id,
            },
          });
          setPreferenceId(result.preferenceId);
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Erro ao inicializar pagamento.");
      }
    };

    initPayment();
  }, [order]);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
    if (publicKey) {
      initMercadoPago(publicKey, { locale: "pt-BR" });
    }
  }, []);

  const handlePaymentSubmit = async (formData: unknown) => {
    try {
      console.log("Payment submitted:", formData);
      toast.success("Pagamento enviado! Processando...");
    } catch (error) {
      toast.error("Erro ao processar pagamento.");
    }
  };

  const handlePaymentError = (error: unknown) => {
    console.error("Payment error:", error);
    toast.error("Erro ao processar pagamento. Tente novamente.");
  };

  if (isLoading || !order) {
    return (
      <div className="container-editorial py-20 text-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  return (
    <div className="container-editorial py-10 md:py-16">
      <h1 className="font-display text-3xl mb-2">Pagamento do Pedido</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Pedido {order.order_number} - Total: {brl(Number(order.total))}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <PaymentStatus
            status={paymentStatus}
            method={paymentMethod}
            transactionId={order.transaction_id}
            paidAt={order.paid_at}
          />

          {pixInfo && (
            <div className="mt-6">
              <PixDisplay
                qrCodeBase64={pixInfo.qrCode}
                pixCode={pixInfo.code}
                expirationDate={pixInfo.expiration}
                onExpire={() => toast.error("Codigo PIX expirado.")}
              />
            </div>
          )}
        </div>

        <div className="border border-border rounded-sm p-6 bg-secondary/20">
          <h2 className="font-display text-xl mb-4">Escolha a forma de pagamento</h2>
          {preferenceId ? (
            <Payment
              initialization={{ preferenceId }}
              customization={{
                visual: { style: { theme: "default" } },
                paymentMethods: { maxInstallments: 12, minInstallments: 1 },
              }}
              onSubmit={handlePaymentSubmit}
              onError={handlePaymentError}
            />
          ) : (
            <div className="text-sm text-muted-foreground">Carregando opcoes de pagamento...</div>
          )}
        </div>
      </div>
    </div>
  );
}
