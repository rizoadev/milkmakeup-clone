import { useParams } from "next/navigation";
import Link from "next/link";
import { mockOrders } from "@/context/AuthContext";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id;
  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <Link href="/account/orders" className="btn-milk">View Orders</Link>
      </div>
    );
  }

  const statusTimeline = ["pending", "paid", "processing", "shipped", "delivered"];
  const currentStatusIdx = statusTimeline.indexOf(order.status);
  const canCancel = order.status === "pending" || order.status === "paid";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Order {order.id}</h1>
        <Link href="/account/orders" className="text-sm underline">&larr; Back</Link>
      </div>

      {/* Status Timeline */}
      <div className="bg-white border p-6 mb-6">
        <h2 className="font-bold mb-4">Order Status</h2>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {statusTimeline.map((status, idx) => (
            <div key={status} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                idx <= currentStatusIdx ? "bg-black text-white" : "bg-gray-200"
              }`}>
                {idx < currentStatusIdx ? "✓" : idx + 1}
              </div>
              <span className={`text-xs ml-2 capitalize hidden sm:inline ${
                idx <= currentStatusIdx ? "font-bold" : "text-gray-400"
              }`}>
                {status}
              </span>
              {idx < statusTimeline.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 mx-1 ${
                  idx < currentStatusIdx ? "bg-black" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {order.tracking && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm">
              <span className="text-gray-500">Tracking:</span>{" "}
              <span className="font-bold">{order.tracking}</span>
            </p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white border mb-6">
        <div className="p-4 border-b"><h2 className="font-bold">Items</h2></div>
        <div className="divide-y">
          {order.products.map((product, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <span>{product}</span>
              <span className="text-gray-500">1</span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex justify-between font-bold">
          <span>Total</span>
          <span>Rp {order.total.toLocaleString()}</span>
        </div>
      </div>

      <p className="text-sm text-gray-500">Contact support to request cancel or refund.</p>
    </div>
  );
}