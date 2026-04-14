"use client";
import Link from "next/link";
import { Package, ShoppingCart, TrendingUp, Users, ArrowUp, ArrowDown } from "lucide-react";
import { distributorOrders } from "@/context/AdminCartContext";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Sales", value: "Rp 12.5M", change: "+12%", icon: TrendingUp, positive: true },
    { label: "Orders", value: "145", change: "+8%", icon: ShoppingCart, positive: true },
    { label: "Products", value: "48", change: "+3", icon: Package, positive: true },
    { label: "Distributors", value: "12", change: "+2", icon: Users, positive: true },
  ];

  const recentOrders = distributorOrders.slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">{new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-5 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                  <Icon size={20} />
                </div>
              </div>
              <p className={`text-xs mt-2 ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                {stat.positive ? <ArrowUp size={12} className="inline" /> : <ArrowDown size={12} className="inline" />}
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm underline">View All</Link>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.items}</td>
                <td className="px-4 py-3">Rp {order.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs ${
                    order.status === "delivered" ? "bg-green-100 text-green-800" :
                    order.status === "shipped" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}