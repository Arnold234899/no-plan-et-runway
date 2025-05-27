
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Eco Warrior Jacket",
      price: "$329",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
      category: "Outerwear",
      sustainable: true,
    },
    {
      id: 2,
      name: "Future Canvas Tee",
      price: "$89",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop",
      category: "Tops",
      sustainable: true,
    },
    {
      id: 3,
      name: "Revolution Pants",
      price: "$195",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      category: "Bottoms",
      sustainable: true,
    },
    {
      id: 4,
      name: "Conscious Collective Dress",
      price: "$275",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      category: "Dresses",
      sustainable: true,
    },
  ];

  return (
    <section id="shop" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Featured Collection
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Curated pieces that challenge conventions and embrace the future of conscious fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden bg-zinc-900 rounded-lg hover:transform hover:scale-105 transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                
                {/* Sustainable Badge */}
                {product.sustainable && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Sustainable
                  </div>
                )}
                
                {/* Quick Shop Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Quick Shop
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-zinc-500 text-sm mb-1">{product.category}</p>
                <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-zinc-300 text-xl font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-zinc-600 text-white hover:bg-zinc-800 text-lg px-8 py-4"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
