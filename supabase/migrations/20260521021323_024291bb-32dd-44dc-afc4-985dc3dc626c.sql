
-- Enums
CREATE TYPE public.order_status AS ENUM ('pending','paid','processing','shipped','delivered','cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending','paid','failed','refunded');

-- Orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  order_number text NOT NULL UNIQUE DEFAULT ('NM-' || lpad((floor(random()*1000000))::text, 6, '0')),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_cep text NOT NULL,
  shipping_street text NOT NULL,
  shipping_number text NOT NULL,
  shipping_complement text,
  shipping_neighborhood text NOT NULL,
  shipping_city text NOT NULL,
  shipping_state text NOT NULL,
  notes text,
  subtotal numeric NOT NULL,
  shipping_cost numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_method text,
  tracking_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own orders" ON public.orders
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users create own orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins update orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Order items
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid,
  product_name text NOT NULL,
  product_slug text NOT NULL,
  product_image text,
  unit_price numeric NOT NULL,
  size text,
  color text,
  quantity integer NOT NULL CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_items_order ON public.order_items(order_id);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View own order items" ON public.order_items
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR has_role(auth.uid(), 'admin'))));

CREATE POLICY "Insert own order items" ON public.order_items
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

-- Decrement stock safely
CREATE OR REPLACE FUNCTION public.decrement_product_stock(_product_id uuid, _qty integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.products
  SET stock = GREATEST(0, stock - _qty)
  WHERE id = _product_id;
END;
$$;
