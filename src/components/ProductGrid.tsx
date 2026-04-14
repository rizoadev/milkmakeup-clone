"use client";

import ProductCard from "./ProductCard";

const products = [
  { id: "1", name: "Hydro Grip Primer", price: 34, image: "https://images.unsplash.com/photo-1620916566398-40f95e5c92b3?w=600&h=750&fit=crop" },
  { id: "2", name: "Cloud Paint", price: 28, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=750&fit=crop" },
  { id: "3", name: "Lip + Cheek Stick", price: 24, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=750&fit=crop" },
  { id: "4", name: "Highlighting", price: 22, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=750&fit=crop" },
];

export default function ProductGrid() {
  return (
    <section className="py-0">
      <div className="max-w-7xl mx-auto">
        {/* Title - Left aligned, black */}
        <h2 className="text-xl font-bold tracking-widest uppercase px-4 py-4 border-b border-black">
          BEST SELLERS
        </h2>
        
        {/* Grid - No gap */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}