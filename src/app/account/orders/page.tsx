"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockOrders } from "@/context/AuthContext";

export default function OrdersPage() {
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  const statusOptions = ["all", "pending", "paid", "processing", "shipped", "delivered", "cancelled"];

  const filteredOrders = mockOrders.filter((order) =>
    filter === "all" || order.status === filter
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Link href="/account" className="text-sm underline">&larr; Back</Link>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 text-sm whitespace-nowrap ${
              filter === status ? "bg-black text-white" : "border"
            }`}
          >
            {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white border">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.items}</td>
                <td className="px-4 py-3">Rp {order.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs capitalize ${
                    order.status === "delivered" ? "bg-green-100 text-green-800" :
                    order.status === "shipped" ? "bg-blue-100 text-blue-800" :
                    order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/account/orders/${order.id}`} className="underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
}