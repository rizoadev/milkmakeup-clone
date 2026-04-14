"use client";
import { useState } from "react";
import { useAdminCart } from "@/context/AdminCartContext";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function AdminCartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useAdminCart();
  const [ordering, setOrdering] = useState(false);

  const handleOrder = () => {
    setOrdering(true);
    setTimeout(() => {
      setOrdering(false);
      clearCart();
      alert("Order placed successfully!");
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Cart is empty</h1>
        <p className="text-gray-500 mb-8">Add products from the catalog.</p>
        <Link href="/admin/products" className="btn-milk inline-block">Browse Products</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Order Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-600">Clear All</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white border">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Qty</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{item.sku}</td>
                  <td className="px-4 py-3">Rp {item.wholesalePrice.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    Rp {(item.wholesalePrice * item.quantity).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="bg-white border p-6 h-fit">
          <h2 className="font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Items</span>
              <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-bold text-lg">
              <span>Total</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            disabled={ordering}
            className="btn-milk w-full mt-6"
          >
            {ordering ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}