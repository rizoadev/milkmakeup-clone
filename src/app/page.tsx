import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="max-w-full">
      <Hero />
      <ProductGrid />
      
      {/* Categories */}
      <section className="py-0">
        <h2 className="text-xl font-bold tracking-widest uppercase px-4 py-4 border-b border-black">
          SHOP BY CATEGORY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {["Faces", "Lips", "Eyes", "Sets"].map((cat) => (
            <div key={cat} className="aspect-square relative">
              <img 
                src={`https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop`}
                alt={cat}
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xs font-bold tracking-widest uppercase">
                  {cat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}