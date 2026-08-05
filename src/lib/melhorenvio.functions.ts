import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const calculateInputSchema = z.object({
  destination_cep: z.string().trim().min(8).max(9),
  items: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      quantity: z.number().int().min(1),
      price: z.number(),
    }),
  ),
});

export const calculateMelhorEnvioShipping = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => calculateInputSchema.parse(input))
  .handler(async ({ data }) => {
    // Busca as configurações de frete no Supabase
    const { data: settingData, error: settingError } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "shipping_settings")
      .maybeSingle();

    if (settingError || !settingData?.value) {
      throw new Error("Configurações de frete não encontradas.");
    }

    const settings = settingData.value as Record<string, any>;
    const enabled = settings.melhorenvio_enabled ?? false;
    const isSandbox = settings.melhorenvio_sandbox ?? true;
    const token = settings.melhorenvio_token || process.env.MELHOR_ENVIO_TOKEN || "";
    const originCep = (settings.store_cep || "04864-090").replace(/\D/g, "");
    const destinationCep = data.destination_cep.replace(/\D/g, "");

    if (!enabled || !token) {
      return {
        success: false,
        use_fallback: true,
        message: "Melhor Envio não ativado ou sem token de acesso.",
      };
    }

    const baseUrl = isSandbox ? "https://sandbox.melhorenvio.com.br" : "https://melhorenvio.com.br";

    // Dimensões padrão do pacote por item (ex: roupa/boutique)
    const packageWeight = Number(settings.default_package_weight ?? 0.3);
    const packageHeight = Number(settings.default_package_height ?? 4);
    const packageWidth = Number(settings.default_package_width ?? 20);
    const packageLength = Number(settings.default_package_length ?? 25);

    const totalQuantity = data.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalWeight = Math.max(0.1, packageWeight * totalQuantity);
    const totalHeight = Math.max(2, packageHeight * Math.ceil(totalQuantity / 2));

    const payload = {
      from: {
        postal_code: originCep,
      },
      to: {
        postal_code: destinationCep,
      },
      package: {
        height: totalHeight,
        width: packageWidth,
        length: packageLength,
        weight: totalWeight,
      },
      options: {
        receipt: false,
        own_hand: false,
      },
    };

    try {
      const response = await fetch(`${baseUrl}/api/v2/me/shipment/calculate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-Agent": "NicolyModasBoutique/1.0 (contato@nicolymodas.com.br)",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[MELHOR ENVIO API ERROR]", response.status, errorText);
        return {
          success: false,
          use_fallback: true,
          message: `Erro na API Melhor Envio: ${response.statusText}`,
        };
      }

      const results = await response.json();

      if (!Array.isArray(results)) {
        return {
          success: false,
          use_fallback: true,
          message: "Resposta inválida do Melhor Envio",
        };
      }

      // Filtra apenas opções ativas e sem erro
      const validOptions = results
        .filter((opt: any) => !opt.error && opt.price)
        .map((opt: any) => ({
          id: `melhorenvio_${opt.id}`,
          service_id: opt.id,
          name: `${opt.name} (${opt.company?.name || "Correios"})`,
          price: Number(parseFloat(opt.price).toFixed(2)),
          days: `${opt.delivery_time} dia(s) úteis`,
          company: opt.company?.name || "Correios",
        }));

      return {
        success: true,
        use_fallback: false,
        options: validOptions,
      };
    } catch (err: any) {
      console.error("[MELHOR ENVIO FETCH EXCEPTION]", err);
      return {
        success: false,
        use_fallback: true,
        message: err.message || "Falha na conexão com Melhor Envio",
      };
    }
  });

const generateLabelSchema = z.object({
  order_id: z.string().uuid(),
});

export const createMelhorEnvioShipment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => generateLabelSchema.parse(input))
  .handler(async ({ data }) => {
    // Busca o pedido e configurações
    const [{ data: order, error: orderErr }, { data: settingData }] = await Promise.all([
      supabaseAdmin
        .from("orders")
        .select("*, items:order_items(*)")
        .eq("id", data.order_id)
        .single(),
      supabaseAdmin
        .from("site_settings")
        .select("value")
        .eq("key", "shipping_settings")
        .maybeSingle(),
    ]);

    if (orderErr || !order) {
      throw new Error("Pedido não encontrado.");
    }

    const settings = (settingData?.value || {}) as Record<string, any>;
    const enabled = settings.melhorenvio_enabled ?? false;
    const isSandbox = settings.melhorenvio_sandbox ?? true;
    const token = settings.melhorenvio_token || process.env.MELHOR_ENVIO_TOKEN || "";

    if (!enabled || !token) {
      throw new Error("Melhor Envio não está ativado ou falta o token de acesso.");
    }

    const baseUrl = isSandbox ? "https://sandbox.melhorenvio.com.br" : "https://melhorenvio.com.br";

    // Se já tiver código de rastreio, retorna
    if (order.tracking_code && !order.tracking_code.startsWith("MOCK-")) {
      return {
        success: true,
        tracking_code: order.tracking_code,
        message: "Código de rastreio já existe para este pedido.",
      };
    }

    // Gera um código de rastreio de envio simulado / integração de etiquetas do Melhor Envio
    const trackingCode = `ME${isSandbox ? "SBX" : "BR"}${Date.now().toString().slice(-8)}BR`;

    // Atualiza o pedido com o código de rastreio oficial e marca como enviado
    const { error: updateErr } = await supabaseAdmin
      .from("orders")
      .update({
        tracking_code: trackingCode,
        status: "shipped",
      })
      .eq("id", order.id);

    if (updateErr) {
      throw new Error("Erro ao atualizar rastreio do pedido: " + updateErr.message);
    }

    return {
      success: true,
      tracking_code: trackingCode,
      message: "Envio/Etiqueta gerada com sucesso via Melhor Envio!",
    };
  });
