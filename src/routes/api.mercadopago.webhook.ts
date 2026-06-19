import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhookSignature } from "@/lib/webhook.validator";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { toOrderPaymentStatus } from "@/lib/payment.functions";
import type { WebhookPaymentData } from "@/lib/payment.types";

export const Route = createFileRoute("/api/mercadopago/webhook")({
  loader: async (ctx: any) => {
    const request = ctx.request as Request;
    const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET;
    
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), { 
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!MP_WEBHOOK_SECRET) {
      console.error("[Webhook MP] MP_WEBHOOK_SECRET não configurado");
      return new Response(JSON.stringify({ error: "Webhook secret não configurado" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const signature = request.headers.get("x-signature");
    const body = await request.text();

    // Log para debug (remover em produção)
    console.log("[Webhook MP] Recebido:", { action: JSON.parse(body || "{}").action, signature: signature ? "presente" : "ausente" });

    if (!signature || !await verifyWebhookSignature(body, signature, MP_WEBHOOK_SECRET)) {
      console.warn("[Webhook MP] Assinatura inválida recebida");
      return new Response(JSON.stringify({ error: "Assinatura inválida" }), { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const payload = JSON.parse(body);
      
      // Validar tipo de evento
      if (payload.action !== "payment.created" && payload.action !== "payment.updated") {
        return new Response(JSON.stringify({ message: "Evento ignorado" }), { 
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }

      const paymentId = payload.data?.id;
      if (!paymentId) {
        return new Response(JSON.stringify({ error: "ID do pagamento não encontrado" }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Consultar API do MP para obter detalhes do pagamento
      const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
      if (!MP_ACCESS_TOKEN) {
        throw new Error("MP_ACCESS_TOKEN não configurado");
      }

      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!mpResponse.ok) {
        const errorText = await mpResponse.text();
        throw new Error(`Erro ao consultar pagamento: ${mpResponse.status} - ${errorText}`);
      }

      const payment = (await mpResponse.json()) as WebhookPaymentData;
      const externalReference = payment.external_reference;

      if (!externalReference) {
        return new Response(JSON.stringify({ error: "external_reference não encontrado" }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Buscar pedido pelo external_reference
      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .select("id, payment_status, transaction_id, status")
        .eq("id", externalReference)
        .maybeSingle();

      if (orderError) throw orderError;

      if (!order) {
        return new Response(JSON.stringify({ error: "Pedido não encontrado" }), { 
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Idempotência: verificar se já foi processado com o mesmo transaction_id e status
      if (order.transaction_id && 
          order.transaction_id === String(payment.id) && 
          order.payment_status === toOrderPaymentStatus(payment.status)) {
        console.log(`[Webhook MP] Pagamento ${payment.id} já processado (idempotente)`);
        return new Response(JSON.stringify({ 
          success: true, 
          message: "Pagamento já processado (idempotente)", 
          orderId: order.id 
        }), { 
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Atualizar pedido com base no status do pagamento - usando função centralizada
      const { processPaymentUpdate } = await import("@/lib/webhook.functions");
      const result = await processPaymentUpdate(payment, order.id);

      console.log(`[Webhook MP] Pedido ${order.id} atualizado: ${payment.status}`);

      return new Response(JSON.stringify({ 
        success: true, 
        message: `Pagamento ${payment.status} processado.`, 
        orderId: order.id 
      }), { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    } catch (err) {
      console.error("[Webhook MP] Erro:", err);
      return new Response(JSON.stringify({ error: "Erro interno no servidor" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
});