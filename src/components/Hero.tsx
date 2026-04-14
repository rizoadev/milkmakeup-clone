"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-neutral-100 overflow-hidden">
      {/* Content - Left aligned */}
      <div className="max-w-md px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold tracking-[0.2em] text-gray-500 mb-4"
        >
          CLEAN BEAUTY + VEGAN MAKEUP
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold leading-none tracking-tight mb-4"
        >
          GLOW<br />
          LIKE A<br />
          GODDESS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 mb-8"
        >
          Clean, vegan, and cruelty-free makeup for the modern minimalist. Because less is always more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/shop"
            className="btn-milk inline-block"
          >
            SHOP NOW
          </Link>
        </motion.div>
      </div>
    </section>
  );
}