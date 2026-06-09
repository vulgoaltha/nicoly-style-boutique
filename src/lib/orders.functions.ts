import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const itemSchema = z.object({
  productId: z.string().uuid(),
  slug: z.string().min(1).max(200),
  name: z.string().min(1).max(300),
  image: z.string().max(1000).optional().default(""),
  price: z.number().nonnegative(),
  size: z.string().max(40).optional(),
  color: z.string().max(40).optional(),
  quantity: z.number().int().min(1).max(50),
});

const createOrderSchema = z.object({
  customer_name: z.string().trim().min(2).max(120),
  customer_email: z.string().trim().email().max(200),
  customer_phone: z.string().trim().min(8).max(30),
  shipping_cep: z.string().trim().min(8).max(12),
  shipping_street: z.string().trim().min(2).max(200),
  shipping_number: z.string().trim().min(1).max(20),
  shipping_complement: z.string().trim().max(120).optional(),
  shipping_neighborhood: z.string().trim().min(2).max(120),
  shipping_city: z.string().trim().min(2).max(120),
  shipping_state: z.string().trim().min(2).max(2),
  notes: z.string().trim().max(500).optional(),
  shipping_cost: z.number().nonnegative().max(10000).default(0),
  items: z.array(itemSchema).min(1).max(50),
});

export const createOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createOrderSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    // Removemos os itens do objeto 'data' principal para enviar separadamente
    const { items, ...orderData } = data;

    const itemsData = items.map((i) => ({
      product_id: i.productId,
      quantity: i.quantity,
      size: i.size ?? null,
      color: i.color ?? null,
    }));

    // Chamamos a RPC que processará tudo em uma única transação no banco
    const { data: result, error } = await supabaseAdmin.rpc("create_order_transaction", {
      p_user_id: userId,
      p_order_data: orderData as unknown,
      p_items_data: itemsData as unknown,
    });

    if (error) {
      // Repassa a mensagem de erro do Postgres (ex: "Estoque insuficiente para...")
      throw new Error(error.message);
    }

    return result as { id: string; order_number: string };
  });
