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
    const { supabase, userId } = context;

    // Re-fetch product prices server-side to avoid client tampering
    const productIds = Array.from(new Set(data.items.map((i) => i.productId)));
    const { data: products, error: prodErr } = await supabaseAdmin
      .from("products")
      .select("id, price, sale_price, stock, is_active, name, slug, images")
      .in("id", productIds);
    if (prodErr) throw new Error(prodErr.message);

    const productMap = new Map(products!.map((p) => [p.id, p]));

    let subtotal = 0;
    const validatedItems = data.items.map((it) => {
      const p = productMap.get(it.productId);
      if (!p || !p.is_active) throw new Error(`Produto indisponível: ${it.name}`);
      if (p.stock < it.quantity) throw new Error(`Estoque insuficiente: ${p.name}`);
      const unit = Number(p.sale_price ?? p.price);
      subtotal += unit * it.quantity;
      return {
        product_id: p.id,
        product_name: p.name,
        product_slug: p.slug,
        product_image: p.images?.[0] ?? null,
        unit_price: unit,
        size: it.size ?? null,
        color: it.color ?? null,
        quantity: it.quantity,
      };
    });

    const total = subtotal + data.shipping_cost;

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        shipping_cep: data.shipping_cep,
        shipping_street: data.shipping_street,
        shipping_number: data.shipping_number,
        shipping_complement: data.shipping_complement ?? null,
        shipping_neighborhood: data.shipping_neighborhood,
        shipping_city: data.shipping_city,
        shipping_state: data.shipping_state.toUpperCase(),
        notes: data.notes ?? null,
        subtotal,
        shipping_cost: data.shipping_cost,
        total,
      })
      .select("id, order_number")
      .single();
    if (orderErr) throw new Error(orderErr.message);

    const { error: itemsErr } = await supabase
      .from("order_items")
      .insert(validatedItems.map((i) => ({ ...i, order_id: order.id })));
    if (itemsErr) throw new Error(itemsErr.message);

    // Decrement stock (admin client, bypasses RLS)
    for (const it of validatedItems) {
      const p = productMap.get(it.product_id)!;
      await supabaseAdmin
        .from("products")
        .update({ stock: Math.max(0, p.stock - it.quantity) })
        .eq("id", it.product_id);
    }

    return { id: order.id, order_number: order.order_number };
  });
