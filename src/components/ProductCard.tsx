"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="bg-white cursor-pointer"
      whileHover={{ opacity: 0.9 }}
    >
      {/* Image on top */}
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name below - No padding, minimal */}
      <div className="py-2">
        <h3 className="text-xs font-bold uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm mt-1">${product.price}</p>
      </div>
    </motion.div>
  );
}