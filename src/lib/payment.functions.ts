import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type {
  PaymentPreferenceRequest,
  PaymentPreferenceResponse,
  WebhookPaymentData,
  OrderPaymentStatus,
} from "./payment.types";

const MP_API_BASE = "https://api.mercadopago.com";
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN ?? "";

function getMpHeaders() {
  return {
    Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };
}

export function toOrderPaymentStatus(mpStatus: string): OrderPaymentStatus {
  switch (mpStatus) {
    case "approved":
      return "paid";
    case "pending":
    case "in_process":
    case "in_mediation":
      return "pending";
    case "rejected":
    case "cancelled":
      return "failed";
    case "refunded":
    case "charged_back":
      return "refunded";
    default:
      return "pending";
  }
}

const preferenceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  unit_price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  picture_url: z.string().optional(),
});

const createPreferenceSchema = z.object({
  orderId: z.string().uuid(),
  items: z.array(preferenceItemSchema).min(1),
  payer: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  externalReference: z.string(),
});

export const createPaymentPreference = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createPreferenceSchema.parse(input))
  .handler(async ({ data }) => {
    const { orderId, items, payer, externalReference } = data;

    if (!MP_ACCESS_TOKEN) {
      throw new Error("MP_ACCESS_TOKEN nao configurado no servidor.");
    }

    const siteUrl = process.env.VITE_SITE_URL ?? "";
    
    const body: PaymentPreferenceRequest = {
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        unit_price: i.unit_price,
        quantity: i.quantity,
        picture_url: i.picture_url,
        category_id: "fashion",
      })),
      payer: {
        name: payer.name,
        email: payer.email,
      },
      external_reference: externalReference,
      notification_url: siteUrl ? `${siteUrl}/api/mercadopago/webhook` : undefined,
      back_urls: {
        success: `${siteUrl}/pedido/${orderId}`,
        failure: `${siteUrl}/pedido/${orderId}`,
        pending: `${siteUrl}/pedido/${orderId}`,
      },
      auto_return: "approved",
    };

    const res = await fetch(`${MP_API_BASE}/checkout/preferences`, {
      method: "POST",
      headers: getMpHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao criar preferencia no Mercado Pago: ${res.status} - ${errorText}`);
    }

    const preference = (await res.json()) as PaymentPreferenceResponse;

    // Atualiza o pedido com os dados da integração
    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        payment_gateway: "mercadopago",
        payment_gateway_id: preference.id,
        external_reference: externalReference,
      })
      .eq("id", orderId);

    if (error) {
      throw new Error(`Erro ao atualizar pedido: ${error.message}`);
    }

    return {
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
      externalReference,
    };
  });

export const getPaymentStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({ paymentId: z.number().optional(), externalReference: z.string().optional() })
      .parse(input),
  )
  .handler(async ({ data }) => {
    if (!MP_ACCESS_TOKEN) {
      throw new Error("MP_ACCESS_TOKEN nao configurado no servidor.");
    }

    let url: string;

    if (data.paymentId) {
      url = `${MP_API_BASE}/v1/payments/${data.paymentId}`;
    } else if (data.externalReference) {
      url = `${MP_API_BASE}/v1/payments/search?external_reference=${encodeURIComponent(data.externalReference)}`;
    } else {
      throw new Error("paymentId ou externalReference eh obrigatorio.");
    }

    const res = await fetch(url, {
      method: "GET",
      headers: getMpHeaders(),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao consultar pagamento no Mercado Pago: ${res.status} - ${errorText}`);
    }

    const result = (await res.json()) as WebhookPaymentData | { results: WebhookPaymentData[] };

    if ("results" in result) {
      const first = result.results[0];
      if (!first) return null;
      return first;
    }

    return result;
  });

export const updateOrderPaymentStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        orderId: z.string().uuid(),
        paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
        orderStatus: z.string().optional(),
        transactionId: z.string().nullable().optional(),
        pixCode: z.string().nullable().optional(),
        pixQrCode: z.string().nullable().optional(),
        paidAt: z.string().nullable().optional(),
        webhookPayload: z.record(z.unknown()).nullable().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const updateData: Record<string, unknown> = {
      payment_status: data.paymentStatus,
    };

    if (data.transactionId !== undefined) updateData.transaction_id = data.transactionId;
    if (data.pixCode !== undefined) updateData.pix_code = data.pixCode;
    if (data.pixQrCode !== undefined) updateData.pix_qrcode = data.pixQrCode;
    if (data.paidAt !== undefined) updateData.paid_at = data.paidAt;
    if (data.webhookPayload !== undefined) updateData.webhook_payload = data.webhookPayload;
    if (data.orderStatus) updateData.status = data.orderStatus;

    const { error } = await supabaseAdmin.from("orders").update(updateData as any).eq("id", data.orderId);

    if (error) {
      throw new Error(`Erro ao atualizar status do pagamento: ${error.message}`);
    }

    return { success: true };
  });

const processPaymentSchema = z.object({
  orderId: z.string().uuid(),
  formData: z.any(),
});

export const processMercadoPagoPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => processPaymentSchema.parse(input))
  .handler(async ({ data }) => {
    const { orderId, formData } = data;

    if (!MP_ACCESS_TOKEN) {
      throw new Error("MP_ACCESS_TOKEN nao configurado no servidor.");
    }

    const payload = {
      ...(formData as Record<string, unknown>),
      external_reference: orderId,
    };

    const res = await fetch(`${MP_API_BASE}/v1/payments`, {
      method: "POST",
      headers: {
        ...getMpHeaders(),
        "X-Idempotency-Key": `${orderId}-${Date.now()}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao criar pagamento no Mercado Pago: ${res.status} - ${errorText}`);
    }

    const payment = await res.json();
    console.log("=== FULL LOG RETORNADO PELO MERCADO PAGO ===");
    console.log(JSON.stringify(payment, null, 2));
    console.log("============================================");

    const { error, data: orderData } = await supabaseAdmin
      .from("orders")
      .update({
        payment_gateway: "mercadopago",
        transaction_id: payment.id?.toString(),
        payment_status: toOrderPaymentStatus(payment.status),
        payment_method: payment.payment_method_id,
        pix_code: payment.payment_method_id === 'pix' ? payment.point_of_interaction?.transaction_data?.qr_code : null,
        pix_qrcode: payment.payment_method_id === 'pix' ? payment.point_of_interaction?.transaction_data?.qr_code_base64 : null,
      })
      .eq("id", orderId)
      .select();

    if (error) {
      console.error("Erro ao atualizar pedido:", error.message);
    } else {
      console.log("=== RESULTADO DA CRIAÇÃO/ATUALIZAÇÃO DO PEDIDO ===");
      console.log(JSON.stringify(orderData, null, 2));
      console.log("==================================================");
    }

    console.log("=== JSON COMPLETO RETORNADO PELA FUNÇÃO processMercadoPagoPayment ===");
    console.log(JSON.stringify(payment, null, 2));
    console.log("=====================================================================");

    return payment;
  });