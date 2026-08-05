import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const calculateCorreiosInputSchema = z.object({
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

type CorreiosOption = {
  id: string;
  name: string;
  price: number;
  days: string;
  code: string;
};

export const calculateCorreiosShipping = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => calculateCorreiosInputSchema.parse(input))
  .handler(async ({ data }) => {
    // 1. Busca as configurações de frete no Supabase
    const { data: settingData, error: settingError } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "shipping_settings")
      .maybeSingle();

    if (settingError || !settingData?.value) {
      throw new Error("Configurações de frete não encontradas.");
    }

    const settings = settingData.value as Record<string, any>;
    const originCep = (settings.store_cep || "04864-090").replace(/\D/g, "");
    const destinationCep = data.destination_cep.replace(/\D/g, "");

    const pacCode = settings.correios_codigo_pac || "04510"; // PAC sem contrato ou com contrato
    const sedexCode = settings.correios_codigo_sedex || "04016"; // SEDEX sem contrato ou com contrato
    const usuario = settings.correios_usuario || "";
    const senha = settings.correios_senha || "";

    const packageWeight = Number(settings.default_package_weight ?? 0.3);
    const packageHeight = Number(settings.default_package_height ?? 4);
    const packageWidth = Number(settings.default_package_width ?? 20);
    const packageLength = Number(settings.default_package_length ?? 25);

    const totalQuantity = data.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalWeight = Math.max(0.3, parseFloat((packageWeight * totalQuantity).toFixed(2)));
    const totalHeight = Math.max(2, packageHeight * Math.ceil(totalQuantity / 2));
    const totalWidth = Math.max(11, packageWidth);
    const totalLength = Math.max(16, packageLength);

    const services = `${sedexCode},${pacCode}`;

    const url = `https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=${usuario}&sDsSenha=${senha}&sCepOrigem=${originCep}&sCepDestino=${destinationCep}&nVlPeso=${totalWeight}&nCdFormato=1&nVlComprimento=${totalLength}&nVlAltura=${totalHeight}&nVlLargura=${totalWidth}&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=${services}&StrRetorno=xml`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      });

      if (!response.ok) {
        return {
          success: false,
          use_fallback: true,
          message: "Servidor dos Correios temporariamente indisponível.",
        };
      }

      const xmlText = await response.text();

      // Parse simples de XML retornado pelos Correios
      const options: CorreiosOption[] = [];

      const servicos = xmlText.split("<cServico>");
      for (let i = 1; i < servicos.length; i++) {
        const item = servicos[i];

        const codigoMatch = item.match(/<Codigo>(.*?)<\/Codigo>/);
        const valorMatch = item.match(/<Valor>(.*?)<\/Valor>/);
        const prazoMatch = item.match(/<PrazoEntrega>(.*?)<\/PrazoEntrega>/);
        const erroMatch = item.match(/<Erro>(.*?)<\/Erro>/);
        const msgErroMatch = item.match(/<MsgErro>(.*?)<\/MsgErro>/);

        const codigo = codigoMatch ? codigoMatch[1].trim() : "";
        const valorStr = valorMatch ? valorMatch[1].trim().replace(".", "").replace(",", ".") : "0";
        const prazo = prazoMatch ? prazoMatch[1].trim() : "0";
        const erro = erroMatch ? erroMatch[1].trim() : "0";
        const msgErro = msgErroMatch ? msgErroMatch[1].trim() : "";

        // Se erro for 0 ou erro aceitável de prazo extra
        if ((erro === "0" || erro === "010" || erro === "011") && parseFloat(valorStr) > 0) {
          const price = parseFloat(valorStr);
          const isSedex =
            codigo === sedexCode || codigo === "04016" || codigo === "04782" || codigo === "40010";
          const isPac =
            codigo === pacCode || codigo === "04510" || codigo === "04669" || codigo === "41106";

          const name = isSedex
            ? "SEDEX (Correios)"
            : isPac
              ? "PAC (Correios)"
              : `Correios (${codigo})`;

          options.push({
            id: `correios_${codigo}`,
            name,
            price,
            days: `${prazo} dia(s) úteis`,
            code: codigo,
          });
        }
      }

      if (options.length > 0) {
        // Ordena por preço (menor primeiro)
        options.sort((a, b) => a.price - b.price);
        return {
          success: true,
          use_fallback: false,
          options,
        };
      }

      return {
        success: false,
        use_fallback: true,
        message: "Não foi possível obter cotação direta dos Correios para este CEP.",
      };
    } catch (err: any) {
      console.error("[CORREIOS API EXCEPTION]", err);
      return {
        success: false,
        use_fallback: true,
        message: err.message || "Erro na conexão com os Correios.",
      };
    }
  });
