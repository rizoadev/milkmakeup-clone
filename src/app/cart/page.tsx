"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Start shopping to add items.</p>
        <Link href="/shop" className="btn-milk inline-block">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b">
              <div className="w-20 h-24 bg-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="font-bold mt-2">${item.price.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 border">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 border">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-sm underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="border p-6">
            <h2 className="font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <Link href="/checkout" className="btn-milk w-full mt-6 block text-center">Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}