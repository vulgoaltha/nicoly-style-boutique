-- Migração: Criação de RPC (Stored Procedure) para transação atômica de pedidos
-- Data: 2026-06-03
-- Objetivo: Garantir que Pedido, Itens e Baixa de Estoque ocorram em bloco indestrutível.

BEGIN;

CREATE OR REPLACE FUNCTION public.create_order_transaction(
  p_user_id UUID,
  p_order_data JSONB,
  p_items_data JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_order_id UUID;
  v_order_number TEXT;
  v_subtotal NUMERIC := 0;
  v_total NUMERIC;
  v_item JSONB;
  v_product RECORD;
  v_shipping_cost NUMERIC;
BEGIN
  -- Extrai o custo de frete
  v_shipping_cost := COALESCE((p_order_data->>'shipping_cost')::NUMERIC, 0);

  -- 1. Validação de Estoque e Preços
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items_data)
  LOOP
    SELECT id, price, sale_price, stock, is_active, name, slug, images
    INTO v_product
    FROM public.products
    WHERE id = (v_item->>'product_id')::UUID;

    IF NOT FOUND OR NOT v_product.is_active THEN
      RAISE EXCEPTION 'Produto indisponível ou inativo: %', COALESCE(v_product.name, 'Desconhecido');
    END IF;

    IF v_product.stock < (v_item->>'quantity')::INT THEN
      RAISE EXCEPTION 'Estoque insuficiente para: %', v_product.name;
    END IF;

    -- Soma subtotal
    v_subtotal := v_subtotal + (COALESCE(v_product.sale_price, v_product.price) * (v_item->>'quantity')::INT);
  END LOOP;

  v_total := v_subtotal + v_shipping_cost;

  -- 2. Criação do Pedido (Orders)
  INSERT INTO public.orders (
    user_id,
    customer_name,
    customer_email,
    customer_phone,
    shipping_cep,
    shipping_street,
    shipping_number,
    shipping_complement,
    shipping_neighborhood,
    shipping_city,
    shipping_state,
    notes,
    subtotal,
    shipping_cost,
    total
  ) VALUES (
    p_user_id,
    p_order_data->>'customer_name',
    p_order_data->>'customer_email',
    p_order_data->>'customer_phone',
    p_order_data->>'shipping_cep',
    p_order_data->>'shipping_street',
    p_order_data->>'shipping_number',
    p_order_data->>'shipping_complement',
    p_order_data->>'shipping_neighborhood',
    p_order_data->>'shipping_city',
    UPPER(p_order_data->>'shipping_state'),
    p_order_data->>'notes',
    v_subtotal,
    v_shipping_cost,
    v_total
  ) RETURNING id, order_number INTO v_order_id, v_order_number;

  -- 3. Criação dos Itens e Baixa de Estoque
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items_data)
  LOOP
    SELECT id, price, sale_price, stock, is_active, name, slug, images
    INTO v_product
    FROM public.products
    WHERE id = (v_item->>'product_id')::UUID;

    -- Insere o item
    INSERT INTO public.order_items (
      order_id,
      product_id,
      product_name,
      product_slug,
      product_image,
      unit_price,
      size,
      color,
      quantity
    ) VALUES (
      v_order_id,
      v_product.id,
      v_product.name,
      v_product.slug,
      v_product.images[1], -- No Postgres arrays começam no índice 1
      COALESCE(v_product.sale_price, v_product.price),
      v_item->>'size',
      v_item->>'color',
      (v_item->>'quantity')::INT
    );

    -- Decrementa o estoque
    UPDATE public.products
    SET stock = GREATEST(0, stock - (v_item->>'quantity')::INT)
    WHERE id = v_product.id;
  END LOOP;

  -- Retorna os dados necessários para o frontend
  RETURN jsonb_build_object('id', v_order_id, 'order_number', v_order_number);
END;
$$;

-- Permissões
REVOKE EXECUTE ON FUNCTION public.create_order_transaction(UUID, JSONB, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_order_transaction(UUID, JSONB, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_order_transaction(UUID, JSONB, JSONB) TO service_role;

COMMIT;
