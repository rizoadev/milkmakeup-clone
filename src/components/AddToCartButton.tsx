"use client";
import { useCart } from "@/context/CartContext";

type Props = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    category: string;
    description: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart, items } = useCart();
  const inCart = items.find((i) => i.id === product.id);

  return (
    <button
      onClick={() => addToCart(product)}
      className="btn-milk w-full"
    >
      {inCart ? "Add Another" : "Add to Cart"} - ${product.price.toLocaleString()}
    </button>
  );
}