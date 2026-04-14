import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-black text-white text-4xl flex items-center justify-center mx-auto mb-6">
        ✓
      </div>
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-gray-600 mb-8">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
      <Link href="/shop" className="btn-milk inline-block">Continue Shopping</Link>
    </div>
  );
}