import Link from "next/link";
import { products } from "@/lib/data";

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Shop</h1>
      <p className="text-gray-600 mb-8">Clean, vegan makeup for everyone.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`} className="product-card-milk">
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="py-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
              <p className="font-medium text-sm">{product.name}</p>
              <p className="font-bold">${product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}