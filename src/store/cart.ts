import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (productId: string, size?: string, color?: string) => void;
  setQty: (productId: string, qty: number, size?: string, color?: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  count: () => number;
  subtotal: () => number;
}

const key = (i: { productId: string; size?: string; color?: string }) =>
  `${i.productId}__${i.size ?? ""}__${i.color ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (item) =>
        set((s) => {
          const k = key(item);
          const existing = s.items.find((i) => key(i) === k);
          if (existing) {
            return {
              items: s.items.map((i) =>
                key(i) === k ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
            };
          }
          return { items: [...s.items, item] };
        }),
      remove: (productId, size, color) =>
        set((s) => ({
          items: s.items.filter((i) => key(i) !== key({ productId, size, color })),
        })),
      setQty: (productId, qty, size, color) =>
        set((s) => ({
          items: s.items.map((i) =>
            key(i) === key({ productId, size, color }) ? { ...i, quantity: Math.max(1, qty) } : i,
          ),
        })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      count: () => get().items.reduce((a, i) => a + i.quantity, 0),
      subtotal: () => get().items.reduce((a, i) => a + i.price * i.quantity, 0),
    }),
    { name: "nicoly-cart" },
  ),
);
