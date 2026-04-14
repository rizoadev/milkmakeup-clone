"use client";
import { useState, createContext, useContext, ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  wholesalePrice: number;
  stock: number;
  image: string;
  category: string;
  description: string;
  sku: string;
};

type CartItem = Product & { quantity: number };

type AdminCartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
};

const AdminCartContext = createContext<AdminCartContextType | null>(null);

export function AdminCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.wholesalePrice * item.quantity, 0);

  return (
    <AdminCartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}
    >
      {children}
    </AdminCartContext.Provider>
  );
}

export function useAdminCart() {
  const context = useContext(AdminCartContext);
  if (!context) throw new Error("useAdminCart must be used within AdminCartProvider");
  return context;
}

export const distributorProducts = [
  {
    id: "1",
    name: "Cloud Wing - Ultra Black Mascara",
    slug: "cloud-wing-ultra-black-mascara",
    price: 32000,
    wholesalePrice: 16000,
    stock: 450,
    image: "https://placehold.co/400x500/f5f5f5/000?text=Cloud+Wing",
    category: "Mascara",
    description: "Our best-selling ultra-black mascara for dramatic volume.",
    sku: "MW-MASC-001",
  },
  {
    id: "2",
    name: "Girl Gang - Lip Gloss",
    slug: "girl-gang-lip-gloss",
    price: 24000,
    wholesalePrice: 12000,
    stock: 820,
    image: "https://placehold.co/400x500/f5f5f5/000?text=Girl+Gang",
    category: "Lip",
    description: "Hydrating lip gloss with a subtle pink tint.",
    sku: "MW-LIP-001",
  },
  {
    id: "3",
    name: "Proof Waterproof Primer",
    slug: "proof-waterproof-primer",
    price: 38000,
    wholesalePrice: 19000,
    stock: 320,
    image: "https://placehold.co/400x500/f5f5f5/000?text=Proof+Primer",
    category: "Primer",
    description: "24-hour waterproof primer for all-day wear.",
    sku: "MW-PRIM-001",
  },
  {
    id: "4",
    name: "Cloud Paint - Rosy",
    slug: "cloud-paint-rosy",
    price: 28000,
    wholesalePrice: 14000,
    stock: 560,
    image: "https://placehold.co/400x500/f5f5f5/000?text=Cloud+Paint",
    category: "Blush",
    description: "cream blush for a natural, dewy glow.",
    sku: "MW-BLUSH-001",
  },
  {
    id: "5",
    name: "Skin Savvy - Daily Moisturizer",
    slug: "skin-savvy-daily-moisturizer",
    price: 42000,
    wholesalePrice: 21000,
    stock: 280,
    image: "https://placehold.co/400x500/f5f5f5/000?text=Skin+Savvy",
    category: "Skincare",
    description: "Lightweight daily moisturizer with SPF 30.",
    sku: "MW-SKIN-001",
  },
  {
    id: "6",
    name: "Ooh Lash Lift",
    slug: "ooh-lash-lift",
    price: 36000,
    wholesalePrice: 18000,
    stock: 410,
    image: "https://placehold.co/400x500/f5f5f5/000?text=Ooh+Lash",
    category: "Mascara",
    description: "Instant lash lift serum and mascara.",
    sku: "MW-MASC-002",
  },
  {
    id: "7",
    name: "Kiss For Day - Lip Balm",
    slug: "kiss-for-day-lip-balm",
    price: 18000,
    wholesalePrice: 9000,
    stock: 1200,
    image: "https://placehold.co/400x500/f5f5f5/000?text=Kiss+For+Day",
    category: "Lip",
    description: "Hydrating lip balm with vitamin E.",
    sku: "MW-LIP-002",
  },
  {
    id: "8",
    name: "Eyes On You - Eye Pencil",
    slug: "eyes-on-you-eye-pencil",
    price: 22000,
    wholesalePrice: 11000,
    stock: 680,
    image: "https://placehold.co/400x500/f5f5f5/000?text=Eyes+On+You",
    category: "Eyes",
    description: "Waterproof eye pencil for precise lines.",
    sku: "MW-EYE-001",
  },
];

export const distributorOrders = [
  { id: "ORD-2026-001", date: "2026-04-10", items: 5, total: 125000, status: "delivered" },
  { id: "ORD-2026-002", date: "2026-04-08", items: 12, total: 280000, status: "shipped" },
  { id: "ORD-2026-003", date: "2026-04-05", items: 8, total: 192000, status: "processing" },
  { id: "ORD-2026-004", date: "2026-04-01", items: 20, total: 480000, status: "delivered" },
];