import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { ProductSorting } from "@/components/shop/ProductSorting";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  image: string;
  category: string;
  sustainable: boolean;
  isNew: boolean;
  bestseller: boolean;
  stockQuantity: number;
};

const Shop = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      const formattedProducts: Product[] = (data || []).map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        priceDisplay: `$${product.price}`,
        image: product.image_url || `https://images.unsplash.com/photo-${Date.now()}?w=400&h=600&fit=crop`,
        category: product.category,
        sustainable: product.sustainable || false,
        isNew: product.is_new || false,
        bestseller: product.bestseller || false,
        stockQuantity: product.stock_quantity || 0,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Shop Collection",
    "description": "The complete collection of sustainable fashion from NO PLAN-ET B.",
    "url": "https://noplanetb.com/shop",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `https://noplanetb.com/checkout/${product.id}`,
        "name": product.name,
        "image": product.image,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": product.price.toFixed(2)
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>Shop Collection - NO PLAN-ET B</title>
        <meta name="description" content="Discover our complete range of sustainable fashion pieces. Shop outerwear, tops, bottoms, and more from NO PLAN-ET B." />
        <link rel="canonical" href="https://noplanetb.com/shop" />
        <script type="application/ld+json">
          {JSON.stringify(productListSchema)}
        </script>
      </Helmet>
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="text-white">Loading products...</div>
            </div>
          ) : (
            <>
              <ProductSorting sortBy={sortBy} onSortChange={setSortBy} />

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
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      
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
                        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                          <div className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                            Low Stock
                          </div>
                        )}
                        {product.stockQuantity === 0 && (
                          <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                            Out of Stock
                          </div>
                        )}
                      </div>

                      <div className="absolute top-4 right-4">
                        <WishlistButton productId={product.id} />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link to={`/checkout/${product.id}`}>
                          <Button 
                            className="bg-white text-zinc-950 hover:bg-zinc-100"
                            disabled={product.stockQuantity === 0}
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            {product.stockQuantity === 0 ? 'Out of Stock' : 'Quick Shop'}
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-zinc-500 text-sm mb-1">{product.category}</p>
                      <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-zinc-300 text-xl font-bold">{product.priceDisplay}</p>
                        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                          <p className="text-orange-500 text-xs">Only {product.stockQuantity} left</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
