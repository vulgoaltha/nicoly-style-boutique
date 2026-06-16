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
import { createPaymentPreference, processMercadoPagoPayment } from "@/lib/payment.functions";
import type { PaymentStatusType, PaymentMethodType } from "@/components/payment/PaymentStatus";

export const Route = createFileRoute("/checkout/pagamento/$orderId")({
  component: CheckoutPaymentPage,
});

function CheckoutPaymentPage() {
  const navigate = useNavigate();
  const { orderId } = Route.useParams();
  const { user, loading } = useAuth();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusType>("pending");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("unknown");
  const [pixInfo, setPixInfo] = useState<{
    qrCode: string;
    code: string;
    expiration: string;
  } | null>(null);

  const { data: order, isLoading, isError, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      console.log("FETCHING ORDER ID", orderId);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();
      if (error) {
        console.error("SUPABASE ERROR", error);
        throw error;
      }
      console.log("ORDER DATA RETRIEVED", data);
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
    
    console.log("INIT PAYMENT EFFECT TRIGGERED WITH ORDER", order.id);

    const initPayment = async () => {
      try {
        if (order.payment_gateway_id) {
          console.log("ORDER ALREADY HAS PREFERENCE ID", order.payment_gateway_id);
          setPreferenceId(order.payment_gateway_id);
        } else {
          console.log("CREATING PREFERENCE...");
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
          console.log("PREFERENCE CREATED", result.preferenceId);
          setPreferenceId(result.preferenceId);
        }
      } catch (err) {
        console.error("INIT PAYMENT CATCH BLOCK ERROR:", err);
        toast.error(err instanceof Error ? err.message : "Erro ao inicializar pagamento.");
      }
    };

    initPayment();

    // Sincronizar os estados locais com o que veio do banco para blindar contra o F5
    if (order.payment_status && order.payment_status !== "pending") {
      setPaymentStatus(order.payment_status as PaymentStatusType);
    }
    if (order.payment_method && order.payment_method !== "unknown") {
      setPaymentMethod(order.payment_method as PaymentMethodType);
    }
    // Recuperar QR Code do banco
    if (order.pix_code && order.pix_qrcode && !pixInfo) {
      setPixInfo({
        qrCode: order.pix_qrcode,
        code: order.pix_code,
        expiration: new Date(Date.now() + 86400000).toISOString(),
      });
    }
  }, [order]);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
    console.log("MP PUBLIC KEY", publicKey ? "LOADED" : "UNDEFINED/EMPTY");
    if (publicKey) {
      initMercadoPago(publicKey, { locale: "pt-BR" });
    }
  }, []);

  const handlePaymentSubmit = async (paymentData: any) => {
    try {
      toast.success("Processando pagamento...");
      
      // O SDK do Mercado Pago envia um objeto com { selectedPaymentMethod, formData, paymentType }
      // Nós precisamos enviar apenas o conteúdo de 'formData' para a nossa API do backend
      const actualFormData = paymentData.formData || paymentData;

      const result = await processMercadoPagoPayment({
        data: {
          orderId,
          formData: actualFormData,
        },
      });

      if (result.status === "approved" || result.status === "in_process" || result.status === "pending") {
        setPaymentStatus(result.status === "approved" ? "paid" : "pending");
        setPaymentMethod(result.payment_method_id || "unknown");

        if (result.payment_method_id === "pix" && result.point_of_interaction?.transaction_data) {
          const txData = result.point_of_interaction.transaction_data;
          setPixInfo({
            qrCode: txData.qr_code_base64,
            code: txData.qr_code,
            expiration: txData.date_of_expiration,
          });
          toast.success("PIX gerado com sucesso!");
        } else if (result.status === "approved") {
          toast.success("Pagamento aprovado!");
        }
      } else {
        toast.error("Pagamento nao aprovado. Status: " + result.status);
        setPaymentStatus("failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      const msg = error instanceof Error ? error.message : JSON.stringify(error);
      setDetailedError(msg);
      toast.error(`Erro no frontend/backend: ${msg}`);
    }
  };

  const handlePaymentError = (error: unknown) => {
    console.error("Payment error object:", error);
    setDetailedError(JSON.stringify(error, Object.getOwnPropertyNames(error as object), 2));
    toast.error("Erro ao processar pagamento. Tente novamente.");
  };

  console.log("CURRENT STATE -> isLoading:", isLoading, "isError:", isError, "order:", !!order, "error:", error);

  if (isLoading) {
    return (
      <div className="container-editorial py-20 text-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container-editorial py-20 text-center text-sm text-red-500">
        Erro ao carregar o pedido. Verifique os logs no console.
        <br />
        {error ? String(error) : "Pedido nao encontrado ou nao existe."}
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

        {(!pixInfo && (paymentStatus === "pending" || paymentStatus === "failed")) && (
          <div className="border border-border rounded-sm p-6 bg-secondary/20">
            <h2 className="font-display text-xl mb-4">Escolha a forma de pagamento</h2>
            {preferenceId ? (
              <>
                {detailedError && (
                  <div className="bg-red-100 text-red-900 p-4 rounded-md mb-4 whitespace-pre-wrap font-mono text-xs overflow-auto">
                    <strong>Erro Mercado Pago:</strong><br />
                    {detailedError}
                  </div>
                )}
                <Payment
                  initialization={{ amount: Number(order?.total ?? 0), preferenceId }}
                  customization={{
                    visual: { style: { theme: "default" } },
                    paymentMethods: {
                      creditCard: "all",
                      debitCard: "all",
                      ticket: "all",
                      bankTransfer: "all",
                      mercadoPago: "all",
                    } as any,
                  }}
                  onSubmit={handlePaymentSubmit}
                  onError={handlePaymentError}
                />
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Carregando opcoes de pagamento...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
