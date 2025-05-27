
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { ProductSorting } from "@/components/shop/ProductSorting";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

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

const Shop = () => {
  const [sortBy, setSortBy] = useState("newest");

  const generateMockProducts = (): Product[] => {
    const categories = ["Outerwear", "Tops", "Bottoms", "Dresses", "Accessories"];
    const baseNames = [
      "Eco Warrior", "Future Canvas", "Revolution", "Conscious Collective", 
      "Sustainability", "Zero Waste", "Planet First", "Green Future", 
      "Mindful", "Ethical Choice", "Clean Slate", "Pure Intent",
      "Earth Friendly", "Natural Flow", "Organic Blend", "Renewable",
      "Circular", "Upcycled", "Regenerative", "Timeless"
    ];
    const productTypes = [
      "Jacket", "Tee", "Pants", "Dress", "Hoodie", "Blazer", "Shirt", 
      "Sweater", "Shorts", "Skirt", "Cardigan", "Vest", "Coat", "Jeans",
      "Scarf", "Hat", "Bag", "Belt", "Shoes", "Socks"
    ];

    const products: Product[] = [];
    
    for (let i = 1; i <= 100; i++) {
      const baseName = baseNames[Math.floor(Math.random() * baseNames.length)];
      const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const price = Math.floor(Math.random() * 400) + 50;
      
      products.push({
        id: i,
        name: `${baseName} ${productType}`,
        price,
        priceDisplay: `$${price}`,
        image: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=400&h=600&fit=crop`,
        category,
        sustainable: Math.random() > 0.3,
        isNew: Math.random() > 0.7,
        bestseller: Math.random() > 0.8,
      });
    }
    
    return products;
  };

  const products = generateMockProducts();

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
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Shop Collection
              </h1>
              <p className="text-xl text-zinc-400">
                Discover our complete range of sustainable fashion pieces.
              </p>
            </div>
          </div>

          <ProductSorting sortBy={sortBy} onSortChange={setSortBy} />

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
            {sortedProducts.map((product) => (
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
                    <Link to={`/checkout/${product.id}`}>
                      <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Quick Shop
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-zinc-500 text-sm mb-1">{product.category}</p>
                  <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-zinc-300 text-xl font-bold">{product.priceDisplay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
