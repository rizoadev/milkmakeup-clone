"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isAccount = pathname?.startsWith("/account") || pathname === "/login" || pathname === "/register";

  return (
    <AuthProvider>
      <CartProvider>
        {!isAdmin && <Header />}
        <main className="flex-1">{children}</main>
        {!isAdmin && !isAccount && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}