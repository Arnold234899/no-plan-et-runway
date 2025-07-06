
import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Heart, Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/integrations/supabase/client";
import { seedProducts } from "@/utils/seedProducts";
import { useCart } from "@/contexts/CartContext";

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

const Shop = () => {
  const { theme, toggleTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("all");
  const { addItem } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Ensure products are seeded
      await seedProducts();
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("Error in fetchProducts:", error);
    } finally {
      setLoading(false);
    }
  };

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

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => filterCategory === "all" || product.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const categories = Array.from(new Set(products.map(p => p.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-white text-xl">Loading products...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              NO PLAN-ET B Shop
            </h1>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Sustainable fashion that doesn't compromise on style. Every purchase makes a difference.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48 bg-zinc-900 border-zinc-700 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-zinc-900 border-zinc-700 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {filteredAndSortedProducts.map((product) => (
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
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                      disabled={product.stock_quantity === 0}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link to={`/checkout/${product.id}`}>
                      <Button
                        variant="outline"
                        className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-900/30"
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
