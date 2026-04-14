"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-milk">
      {/* Newsletter */}
      <div className="px-4 py-8 border-b border-gray-800">
        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Join the Milk Club</h3>
        <p className="text-xs text-gray-400 mb-4">Get 15% off your first order + exclusive access.</p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-white text-black text-xs"
          />
          <button className="btn-milk">Subscribe</button>
        </div>
      </div>

      {/* Links */}
      <div className="px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4">Shop</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
            <li><Link href="/best-sellers" className="hover:text-white">Best Sellers</Link></li>
            <li><Link href="/new" className="hover:text-white">New Arrivals</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4">Help</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4">About</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
            <li><Link href="/ingredients" className="hover:text-white">Ingredients</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link href="/admin" className="hover:text-white text-gray-600">Distributor Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-4">Follow</h4>
          <div className="flex gap-2">
            <span className="text-xs">IG</span>
            <span className="text-xs">TT</span>
            <span className="text-xs">YT</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-800 text-center flex flex-col md:flex-row gap-2 justify-center text-xs text-gray-500">
        <p>© 2026 Milk Makeup. All rights reserved.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}