import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/shop" className="text-sm underline mb-8 block">&larr; Back to Shop</Link>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-[4/5] bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-6">${product.price.toLocaleString()}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          
          <AddToCartButton product={product} />
          
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold mb-4">Details</h3>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• Vegan & Cruelty-Free</li>
              <li>• Clean Ingredients</li>
              <li>• Sustainable Packaging</li>
              <li>• Made in USA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}