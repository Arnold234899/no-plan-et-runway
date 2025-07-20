
import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Heart, Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
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
      // Use sample products for frontend-only mode
      setProducts(sampleProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error in fetchProducts:", error);
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
          <div className="text-center space-y-4">
            <div className="text-emerald-400 text-xl">Loading sustainable products...</div>
            <div className="text-zinc-400">Building a better future, one product at a time</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-16 sm:pt-20 container-responsive">
        <div className="max-w-7xl mx-auto">
          {/* Responsive Header */}
          <div className="text-center mb-8 sm:mb-12 section-spacing">
            <Link to="/" className="inline-block mb-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4 hover:from-emerald-300 hover:to-blue-300 transition-all duration-300">
                NO PLAN-ET B Shop
              </h1>
            </Link>
            <p className="text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto px-4">
              Sustainable fashion that doesn't compromise on style. Every purchase makes a difference.
            </p>
          </div>

          {/* Back to Home Link */}
          <div className="mb-6 px-4">
            <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-emerald-400 transition-colors">
              ← Back to Home
            </Link>
          </div>

          {/* Show refresh button if no products */}
          {products.length === 0 && !loading && (
            <div className="text-center py-12 mb-8">
              <div className="text-zinc-400 text-lg mb-4">No products found. Let's load them for you!</div>
              <Button 
                onClick={fetchProducts}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                Load Products
              </Button>
            </div>
          )}

          {/* Only show filters and products if we have products */}
          {products.length > 0 && (
            <>
              {/* Responsive Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 px-4">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-700 text-white">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Responsive Products Grid */}
              <div className="responsive-grid mb-12 sm:mb-16">
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
                        className="responsive-image group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Product Info */}
                    <div className="card-spacing">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.sustainable && (
                          <Badge className="bg-green-600/20 text-green-400 border-green-400/30 text-xs">
                            Sustainable
                          </Badge>
                        )}
                        {product.is_new && (
                          <Badge className="bg-blue-600/20 text-blue-400 border-blue-400/30 text-xs">
                            New
                          </Badge>
                        )}
                        {product.bestseller && (
                          <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-400/30 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Bestseller
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4">
                        ${product.price}
                      </p>

                      {/* Responsive Action Buttons */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white btn-responsive"
                          disabled={product.stock_quantity === 0}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link to={`/checkout/${product.id}`} className="block">
                          <Button
                            variant="outline"
                            className="w-full border-emerald-400/50 text-emerald-400 hover:bg-emerald-900/30 btn-responsive"
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
                    <button className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 tap-target">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Back to Home Button */}
          <div className="text-center mb-8">
            <Link to="/">
              <Button 
                variant="outline" 
                className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-900/30 px-8 py-3 text-lg"
              >
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
