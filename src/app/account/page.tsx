"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, mockOrders } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <button onClick={logout} className="text-sm underline">Logout</button>
      </div>

      <p className="text-gray-600 mb-8">Welcome back, {user?.name || "Customer"}!</p>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Link href="/account/orders" className="bg-white border p-6 text-center hover:bg-gray-50">
          <p className="text-2xl font-bold">{mockOrders.length}</p>
          <p className="text-sm text-gray-500">Orders</p>
        </Link>
        <Link href="/account/wishlist" className="bg-white border p-6 text-center hover:bg-gray-50">
          <p className="text-2xl font-bold">{user?.wishlist.length || 0}</p>
          <p className="text-sm text-gray-500">Wishlist</p>
        </Link>
        <Link href="/account/addresses" className="bg-white border p-6 text-center hover:bg-gray-50">
          <p className="text-2xl font-bold">{user?.addresses.length || 0}</p>
          <p className="text-sm text-gray-500">Addresses</p>
        </Link>
        <Link href="/account/settings" className="bg-white border p-6 text-center hover:bg-gray-50">
          <p className="text-2xl font-bold">⚙️</p>
          <p className="text-sm text-gray-500">Settings</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm underline">View All</Link>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3">
                  <Link href={`/account/orders/${order.id}`} className="underline">
                    {order.id}
                  </Link>
                </td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.items}</td>
                <td className="px-4 py-3">Rp {order.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs ${
                    order.status === "delivered" ? "bg-green-100 text-green-800" :
                    order.status === "shipped" ? "bg-blue-100 text-blue-800" :
                    order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100"
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