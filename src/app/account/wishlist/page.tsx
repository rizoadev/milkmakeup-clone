"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, mockProducts } from "@/context/AuthContext";

export default function WishlistPage() {
  const { user, isAuthenticated, removeFromWishlist } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const wishlistProducts = mockProducts.filter((p) => user.wishlist.includes(p.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <Link href="/account" className="text-sm underline">&larr; Back</Link>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link href="/shop" className="btn-milk">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="bg-white border">
              <div className="aspect-square bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="font-bold">Rp {product.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-2">
                  <Link href={`/products/${product.slug}`} className="text-xs underline flex-1">
                    View
                  </Link>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-xs text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}