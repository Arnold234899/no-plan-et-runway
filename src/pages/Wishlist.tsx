
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

import { toast } from "sonner";

type WishlistItem = {
  id: string;
  created_at: string;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    category: string;
    stock_quantity: number;
  };
};

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
    
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchWishlist();
  }, [user, navigate]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const fetchWishlist = async () => {
    if (!user) return;

    try {
      // Mock wishlist for frontend-only mode
      const mockWishlist: WishlistItem[] = [];
      setWishlistItems(mockWishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      // Mock removal for frontend-only mode
      setWishlistItems(prev => prev.filter(item => item.id !== wishlistId));
      toast.success('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-white">Loading wishlist...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
            <p className="text-zinc-400">Items you've saved for later</p>
          </div>

          {wishlistItems.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="text-center py-12">
                <Heart className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
                <p className="text-zinc-400 mb-6">Add items you love to save them for later</p>
                <Link to="/shop">
                  <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden bg-zinc-900 rounded-lg hover:transform hover:scale-105 transition-all duration-500"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={item.products.image_url || `https://images.unsplash.com/photo-${Date.now()}?w=400&h=600&fit=crop`}
                      alt={item.products.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                        className="bg-red-600 border-red-600 text-white hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={`/checkout/${item.products.id}`}>
                        <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-zinc-500 text-sm mb-1">{item.products.category}</p>
                    <h3 className="text-white font-semibold text-lg mb-2">{item.products.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-zinc-300 text-xl font-bold">${item.products.price}</p>
                      {item.products.stock_quantity <= 5 && (
                        <p className="text-orange-500 text-xs">
                          {item.products.stock_quantity === 0 ? 'Out of Stock' : `Only ${item.products.stock_quantity} left`}
                        </p>
                      )}
                    </div>
                    <p className="text-zinc-500 text-xs mt-2">
                      Added {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
