import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

/* Types -------------------------------------------------------------------- */
type Size = string;
type Color = string;
type ImageUrl = string;

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  order_position: number;
  active: boolean;
  created_at: string;
};

export type Collection = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  redirect_url: string | null;
  order_position: number;
  active: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  images: string[];
  sizes: Size[];
  colors: Color[];
  stock: number;
  weight: number | null;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  category_id: string | null;
  category: Category | null;
  collection_id: string | null;
  collection: Collection | null;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_cep: string;
  shipping_street: string;
  shipping_number: string;
  shipping_complement: string | null;
  shipping_neighborhood: string;
  shipping_city: string;
  shipping_state: string;
  shipping_cost: number;
  status: OrderStatus;
  notes: string | null;
  total: number;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
  size: string | null;
  color: string | null;
  created_at: string;
};

export type SiteConfig = {
  id: string;
  key: string;
  value: string;
};

export type UserRole = "admin" | "customer";

export type PromoBanner = {
  id: string;
  title: string;
  active: boolean;
  message: string;
  link_url: string | null;
};
