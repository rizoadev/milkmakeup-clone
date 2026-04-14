"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <a href="/shop" className="btn-milk inline-block">Go to Shop</a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="font-bold mb-4">Contact</h2>
              <input required type="email" placeholder="Email" className="input-milk mb-3" />
              <input required type="tel" placeholder="Phone" className="input-milk" />
            </div>
            
            <div className="mb-8">
              <h2 className="font-bold mb-4">Shipping</h2>
              <input required type="text" placeholder="Full Name" className="input-milk mb-3" />
              <input required type="text" placeholder="Address" className="input-milk mb-3" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="text" placeholder="City" className="input-milk" />
                <input required type="text" placeholder="Postal Code" className="input-milk" />
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="font-bold mb-4">Payment</h2>
              <input required type="text" placeholder="Card Number" className="input-milk mb-3" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="text" placeholder="MM/YY" className="input-milk" />
                <input required type="text" placeholder="CVC" className="input-milk" />
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="btn-milk w-full">
              {loading ? "Processing..." : `Pay $${total.toLocaleString()}`}
            </button>
          </form>
        </div>
        
        <div>
          <div className="border p-6">
            <h2 className="font-bold mb-4">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-2 border-t mt-2">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}