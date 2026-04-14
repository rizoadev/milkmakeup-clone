"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const shippingMethods = [
  { id: "jne", name: "JNE Express", price: 15000, eta: "2-3 days" },
  { id: "jnt", name: "J&T Express", price: 12000, eta: "1-2 days" },
  { id: "sicepat", name: "SiCepat", price: 10000, eta: "3-4 days" },
  { id: "grab", name: "GrabExpress", price: 20000, eta: "Same day" },
];

const paymentMethods = [
  { id: "bca", name: "Bank Transfer - BCA", account: "1234567890" },
  { id: "mandiri", name: "Bank Transfer - Mandiri", account: "9876543210" },
  { id: "gopay", name: "GoPay", account: "0812 3456 7890" },
  { id: "ovo", name: "OVO", account: "0812 3456 7890" },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<typeof shippingMethods[0] | null>(null);
  const [payment, setPayment] = useState<typeof paymentMethods[0] | null>(null);
  const [address, setAddress] = useState(user?.addresses.find((a) => a.isDefault) || user?.addresses[0]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = total;
  const shippingCost = shipping?.price || 0;
  const grandTotal = subtotal + shippingCost;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1500);
  };

  if (!isAuthenticated || items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Cart is empty</h1>
        <a href="/shop" className="btn-milk inline-block">Shop Now</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress */}
      <div className="flex mb-8">
        {["Address", "Shipping", "Payment"].map((label, idx) => (
          <div key={label} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step > idx ? "bg-black text-white" : step === idx + 1 ? "bg-black text-white" : "bg-gray-200"
            }`}>
              {step > idx + 1 ? "✓" : idx + 1}
            </div>
            <span className={`ml-2 text-sm ${step === idx + 1 ? "font-bold" : "text-gray-400"}`}>{label}</span>
            {idx < 2 && <div className="w-8 h-0.5 bg-gray-200 mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main */}
        <div className="md:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white border p-6">
              <h2 className="font-bold mb-4">Shipping Address</h2>
              {user?.addresses.length === 0 ? (
                <p className="text-gray-500 mb-4">No address saved. Add one in your account.</p>
              ) : (
                <div className="space-y-3">
                  {user?.addresses.map((addr) => (
                    <label key={addr.id} className="flex items-start gap-3 p-3 border cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        checked={address?.id === addr.id}
                        onChange={() => setAddress(addr)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium">{addr.name}</p>
                        <p className="text-sm">{addr.address}</p>
                        <p className="text-sm">{addr.city}, {addr.province} {addr.postal}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              <button onClick={() => setStep(2)} className="btn-milk w-full mt-4">
                Continue to Shipping
              </button>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="bg-white border p-6">
              <h2 className="font-bold mb-4">Shipping Method</h2>
              <div className="space-y-3">
                {shippingMethods.map((method) => (
                  <label key={method.id} className="flex items-center justify-between p-3 border cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shipping?.id === method.id}
                        onChange={() => setShipping(method)}
                      />
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">ETA: {method.eta}</p>
                      </div>
                    </div>
                    <p className="font-bold">Rp {method.price.toLocaleString()}</p>
                  </label>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <button onClick={() => setStep(1)} className="btn-outline flex-1">
                  Back
                </button>
                <button onClick={() => setStep(3)} disabled={!shipping} className="btn-milk flex-1">
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white border p-6">
              <h2 className="font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="flex items-center justify-between p-3 border cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={payment?.id === method.id}
                        onChange={() => setPayment(method)}
                      />
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">Account: {method.account}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-xs text-gray-500 mb-1">Order Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-milk"
                  rows={2}
                  placeholder="Any special instructions..."
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button onClick={() => setStep(2)} className="btn-outline flex-1">
                  Back
                </button>
                <button 
                  onClick={handleSubmit} 
                  disabled={!payment || loading}
                  className="btn-milk flex-1"
                >
                  {loading ? "Processing..." : `Pay Rp ${grandTotal.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white border p-6">
            <h2 className="font-bold mb-4">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping ? `Rp ${shipping.price.toLocaleString()}` : "-"}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>Rp {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}