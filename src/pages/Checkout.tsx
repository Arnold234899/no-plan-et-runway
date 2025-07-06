
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  sustainable: boolean;
  stockQuantity: number;
};

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      const formattedProduct: Product = {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image_url || `https://images.unsplash.com/photo-${Date.now()}?w=800&h=1200&fit=crop`,
        description: data.description || 'No description available.',
        category: data.category,
        sustainable: data.sustainable || false,
        stockQuantity: data.stock_quantity || 0,
      };

      setProduct(formattedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-white">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <Link to="/shop" className="text-blue-400 hover:underline">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "sku": product.id,
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "url": `https://noplanetb.com/checkout/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price.toFixed(2),
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>{product.name} - NO PLAN-ET B</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://noplanetb.com/checkout/${product.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/shop" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-zinc-900">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-zinc-400 text-sm uppercase tracking-wide mb-2">{product.category}</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-white mb-6">${product.price}</p>
                
                {product.sustainable && (
                  <div className="inline-flex items-center bg-green-600 text-white text-sm px-3 py-1 rounded-full mb-4">
                    Sustainable Fashion
                  </div>
                )}
                
                {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                  <p className="text-orange-500 font-medium mb-4">
                    Only {product.stockQuantity} left in stock!
                  </p>
                )}
                
                {product.stockQuantity === 0 && (
                  <p className="text-red-500 font-medium mb-4">
                    Out of stock
                  </p>
                )}
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-300 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <Link to={`/complete-checkout/${product.id}`}>
                  <Button 
                    className="bg-white text-zinc-950 hover:bg-zinc-100 px-8 py-3 text-lg"
                    disabled={product.stockQuantity === 0}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {product.stockQuantity === 0 ? 'Out of Stock' : 'Buy Now'}
                  </Button>
                </Link>
                <WishlistButton productId={product.id} className="px-4 py-3" />
              </div>

              <div className="border-t border-zinc-700 pt-6">
                <h3 className="text-white font-semibold mb-3">Product Details</h3>
                <ul className="text-zinc-300 space-y-1">
                  <li>Category: {product.category}</li>
                  <li>Price: ${product.price}</li>
                  <li>Stock: {product.stockQuantity > 0 ? `${product.stockQuantity} available` : 'Out of stock'}</li>
                  {product.sustainable && <li>✓ Sustainable Material</li>}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Reviews */}
          <ProductReviews productId={product.id} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
