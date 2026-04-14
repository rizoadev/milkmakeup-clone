"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingCart, TrendingUp, Users, FileText, Settings, Menu, X } from "lucide-react";
import { AdminCartProvider, useAdminCart } from "@/context/AdminCartContext";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: TrendingUp },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Distributors", href: "/admin/distributors", icon: Users },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useAdminCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black text-white z-30 flex items-center px-4 py-3">
        <button onClick={() => setSidebarOpen(true)} className="p-1 mr-3">
          <Menu size={24} />
        </button>
        <Link href="/admin" className="font-bold tracking-widest uppercase">
          Milk Admin
        </Link>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed top-0 left-0 bottom-0 w-64 bg-black text-white z-50 transition-transform duration-300
      `}>
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <span className="font-bold tracking-widest uppercase">Menu</span>
          <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        
        <nav className="p-2 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 text-sm ${isActive ? "bg-gray-800" : "hover:bg-gray-900"}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.label === "Products" && cartCount > 0 && (
                  <span className="ml-auto bg-white text-black text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 px-4 min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminCartProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminCartProvider>
  );
}