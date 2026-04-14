"use client";
import { useState } from "react";
import { useAdminCart, distributorProducts } from "@/context/AdminCartContext";
import { Package, Search } from "lucide-react";

export default function AdminProductsPage() {
  const { addToCart, items } = useAdminCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = ["all", ...new Set(distributorProducts.map((p) => p.category))];

  const filteredProducts = distributorProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="text-sm text-gray-500">
          {items.reduce((sum, i) => sum + i.quantity, 0)} items in cart
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          const inCart = items.find((i) => i.id === product.id);
          return (
            <div key={product.id} className="bg-white border">
              <div className="aspect-square bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase">{product.sku}</p>
                <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 line-through">Rp {product.price.toLocaleString()}</p>
                    <p className="font-bold">Rp {product.wholesalePrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className={`font-bold ${product.stock < 100 ? "text-red-600" : "text-green-600"}`}>
                      {product.stock}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className={`w-full py-2 text-sm ${inCart ? "bg-green-600 text-white" : "bg-black text-white"}`}
                >
                  {inCart ? `Add More (${inCart.quantity + 1})` : "Add to Order"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}