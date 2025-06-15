import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { ProductSorting } from "@/components/shop/ProductSorting";
import { featuredProducts, Product } from "@/data/products";

type Product = {
  id: number;
  name: string;
  price: number;
  priceDisplay: string;
  image: string;
  category: string;
  sustainable: boolean;
  isNew: boolean;
  bestseller: boolean;
};

export const FeaturedProducts = () => {
  const [sortBy, setSortBy] = useState("newest");

  const products: Product[] = featuredProducts;

  const sortProducts = (products: Product[], sortBy: string): Product[] => {
    const sorted = [...products];
    
    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "bestsellers":
        return sorted.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
      default:
        return sorted;
    }
  };

  const sortedProducts = sortProducts(products, sortBy);

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

        <ProductSorting sortBy={sortBy} onSortChange={setSortBy} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden bg-zinc-900 rounded-lg hover:transform hover:scale-105 transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.sustainable && (
                    <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      Sustainable
                    </div>
                  )}
                  {product.isNew && (
                    <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </div>
                  )}
                  {product.bestseller && (
                    <div className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                      Bestseller
                    </div>
                  )}
                </div>
                
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
                <p className="text-zinc-300 text-xl font-bold">{product.priceDisplay}</p>
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
