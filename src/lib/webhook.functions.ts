// filepath: C:/Users/Administrador/Desktop/PROJETO ECOMMERCE (NM)1/PROJETO ECOMMERCE (NM)1/nicoly-style-boutique-main/src/lib/webhook.functions.ts
// Imports...
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { verifyWebhookSignature } from "./webhook.validator";
import { toOrderPaymentStatus } from "./payment.functions";
import type { WebhookPaymentData } from "./payment.types";
import type { Json } from "@/integrations/supabase/types"; // Import Json type

const MP_API_BASE = "https://api.mercadopago.com";
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN ?? "";
const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET ?? "";

function getMpHeaders() {
  return {
    Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };
}

const webhookPayloadSchema = z.object({
  id: z.number(),
  live_mode: z.boolean().optional(),
  type: z.string().optional(),
  date_created: z.string().optional(),
  user_id: z.number().optional(),
  api_version: z.string().optional(),
  action: z.string().optional(),
  data: z.object({
    id: z.string(),
  }),
});

export const mercadoPagoWebhook = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => webhookPayloadSchema.parse(input))
  .handler(async ({ data }) => {
    if (!MP_ACCESS_TOKEN) {
      throw new Error("MP_ACCESS_TOKEN nao configurado.");
    }

    const paymentId = Number(data.data.id);

    // 1. Consulta detalhes do pagamento na API do Mercado Pago
    const res = await fetch(`${MP_API_BASE}/v1/payments/${paymentId}`, {
      method: "GET",
      headers: getMpHeaders(),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao consultar pagamento: ${res.status} - ${errorText}`);
    }

    const payment = (await res.json()) as WebhookPaymentData;

    if (!payment.external_reference) {
      throw new Error("external_reference nao encontrado no pagamento.");
    }

    // 2. Busca o pedido no banco pelo external_reference
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("id, payment_status, transaction_id, status")
      .eq("id", payment.external_reference)
      .maybeSingle();

    if (orderError) {
      throw new Error(`Erro ao buscar pedido: ${orderError.message}`);
    }

    if (!order) {
      throw new Error(
        `Pedido com external_reference ${payment.external_reference} nao encontrado.`,
      );
    }

    // 3. Idempotência: verifica se o transaction_id ja foi processado
    if (order.transaction_id && order.transaction_id === String(payment.id)) {
      if (order.payment_status === toOrderPaymentStatus(payment.status)) {
        return {
          success: true,
          message: "Pagamento ja processado (idempotente).",
          orderId: order.id,
        };
      }
    }

    // 4. Mapeia o status do MP para o status do pedido
    const paymentStatus = toOrderPaymentStatus(payment.status);
    const orderStatus = payment.status === "approved" ? "paid" : undefined;
    const paidAt = payment.status === "approved" ? new Date().toISOString() : undefined;

    // 5. Atualiza o pedido no banco com dados completos do pagamento
    const updateData: Record<string, unknown> = {
      payment_status: paymentStatus,
      status: orderStatus,
      transaction_id: String(payment.id),
      paid_at: paidAt,
      webhook_payload: payment as unknown as Json, // Cast to Json
    };

    // Adiciona método de pagamento se disponível
    if (payment.payment_method_id) {
      updateData.payment_method = payment.payment_method_id;
    }

    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update(updateData)
      .eq("id", order.id);

    if (updateError) {
      throw new Error(`Erro ao atualize order payment status: ${updateError.message}`);
    }

    return { success: true, message: `Pagamento ${payment.status} processado.`, orderId: order.id };
  });

// Função auxiliar para validar webhook com assinatura
export async function validateWebhookSignature(body: string, signature: string): Promise<boolean> {
  if (!MP_WEBHOOK_SECRET) {
    console.warn("MP_WEBHOOK_SECRET não configurado - validação de webhook desabilitada");
    return true; // Em desenvolvimento, permite sem validação
  }
  return await verifyWebhookSignature(body, signature, MP_WEBHOOK_SECRET);
}

// Função para processar atualização de status após pagamento
export async function processPaymentUpdate(
  payment: WebhookPaymentData,
  orderId: string
) {
  try {
    const paymentStatus = toOrderPaymentStatus(payment.status);
    const orderStatus = payment.status === "approved" ? "paid" : undefined;
    const paidAt = payment.status === "approved" ? new Date().toISOString() : undefined;

    const updateData: Record<string, unknown> = {
      payment_status: paymentStatus,
      status: orderStatus,
      transaction_id: String(payment.id),
      paid_at: paidAt,
      webhook_payload: payment as unknown as Json, // Cast to Json
    };

    if (payment.payment_method_id) {
      updateData.payment_method = payment.payment_method_id;
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .update(updateData)
      .eq("id", orderId);

    if (error) throw error;

    return { success: true, message: `Pagamento ${payment.status} processado.`, orderId };
  } catch (error) {
    console.error("Erro ao processar atualização de pagamento:", error);
    throw error;
  }
}