
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Heart, Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { sampleProducts } from "@/data/sampleProducts";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  sustainable: boolean;
  is_new: boolean;
  bestseller: boolean;
  stock_quantity: number;
}

export const FeaturedProducts = () => {
  const { addItem } = useCart();
  
  // Use sample products directly
  const products = sampleProducts.map(p => ({
    ...p,
    stock_quantity: 50
  }));

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      category: product.category,
      sustainable: product.sustainable
    });
  };


  return (
    <section id="shop" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
            NO PLAN-ET B Collection
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collection of sustainable fashion pieces that prove style and sustainability can coexist beautifully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-emerald-400/20 hover:border-emerald-400/60 transition-all duration-300 hover:transform hover:scale-105"
                >
                  {/* Product Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {product.sustainable && (
                        <Badge className="bg-green-600/20 text-green-400 border-green-400/30">
                          Sustainable
                        </Badge>
                      )}
                      {product.is_new && (
                        <Badge className="bg-blue-600/20 text-blue-400 border-blue-400/30">
                          New
                        </Badge>
                      )}
                      {product.bestseller && (
                        <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-400/30">
                          <Star className="w-3 h-3 mr-1" />
                          Bestseller
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-2xl font-bold text-emerald-400 mb-4">
                      ${product.price}
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        disabled={product.stock_quantity === 0}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Link to={`/checkout/${product.id}`} className="block">
                        <Button
                          variant="outline"
                          className="w-full border-emerald-400/50 text-emerald-400 hover:bg-emerald-900/30"
                          disabled={product.stock_quantity === 0}
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Buy Now
                        </Button>
                      </Link>
                    </div>

                    {product.stock_quantity === 0 && (
                      <p className="text-red-400 text-sm mt-2 font-semibold">Out of Stock</p>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/shop">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 text-lg">
                  View All Products
                </Button>
              </Link>
            </div>
      </div>
    </section>
  );
};
