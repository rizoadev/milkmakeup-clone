"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Face", href: "/face" },
  { label: "Lips", href: "/lips" },
  { label: "Eyes", href: "/eyes" },
  { label: "Sets", href: "/sets" },
  { label: "Support", href: "/account/support" },
];

const tickerItems = [
  "FREE SHIPPING ON ORDERS $50+",
  "CLEAN BEAUTY SINCE 2016",
  "VEGAN + CRUELTY FREE",
  "FREE RETURNS 30 DAYS",
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      {/* Black ticker tape */}
      <div className="header-black overflow-hidden py-2">
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav - Black background */}
      <div className="flex items-center justify-between px-4 py-3 bg-black">
        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu size={24} color="#fff" />
        </button>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-widest text-white uppercase">
          MilkMakeup
        </Link>

        {/* Desktop Nav - White text */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-xs font-bold text-white uppercase tracking-widest hover:text-gray-300">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Account + Cart */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link href="/account" className="flex items-center gap-1">
              <User size={20} color="#fff" />
            </Link>
          ) : (
            <Link href="/login" className="text-xs text-white uppercase tracking-widest">
              Login
            </Link>
          )}
          <Link href="/cart" className="relative">
            <ShoppingBag size={24} color="#fff" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-black z-50"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <span className="text-white font-bold tracking-widest uppercase">Menu</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={24} color="#fff" />
                </button>
              </div>
              <nav className="p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-white text-sm font-bold uppercase tracking-widest"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-800 pt-4">
                  {isAuthenticated ? (
                    <Link href="/account" className="block text-white text-sm">My Account</Link>
                  ) : (
                    <Link href="/login" className="block text-white text-sm">Login</Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}