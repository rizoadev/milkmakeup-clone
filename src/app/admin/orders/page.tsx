"use client";
import { useState } from "react";
import { distributorOrders } from "@/context/AdminCartContext";
import { Search, Filter } from "lucide-react";

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = ["all", "processing", "shipped", "delivered"];

  const filteredOrders = distributorOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    processing: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
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
              <th className="px-4 py-3 text-left">Actions</th>
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
                  <span className={`px-2 py-1 text-xs ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-sm underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}