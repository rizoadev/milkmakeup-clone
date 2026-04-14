"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  shade?: string;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const initialCart: CartItem[] = [
  {
    id: "1",
    name: "Hydro Grip Primer",
    price: 34,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1620916566398-40f95e5c92b3?w=200&h=200&fit=crop",
    shade: "Original",
  },
  {
    id: "2",
    name: "Cloud Paint",
    price: 28,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
    shade: "Puff",
  },
];

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const shippingLeft = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} strokeWidth={1.5} />
                <span className="text-lg font-semibold">
                  Your Bag ({cart.length})
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="px-6 py-4 bg-[#fceff3]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {shippingLeft > 0
                    ? `Add $${shippingLeft.toFixed(2)} more for FREE shipping`
                    : "🎉 Free Shipping Unlocked!"}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  className="h-full bg-[#ff8da1]"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-semibold text-lg">Your bag is empty</p>
                  <p className="text-gray-500 mt-2">Add some goodies!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      {item.shade && (
                        <p className="text-xs text-gray-500">Shade: {item.shade}</p>
                      )}
                      <p className="font-semibold mt-1">${item.price}</p>
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-medium text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-2xl font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Shipping & taxes calculated at checkout
                </p>
                <button className="w-full py-4 bg-[#ff8da1] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-200 transition-all">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}