
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Truck, CheckCircle, Eye } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

import { toast } from "sonner";

type Order = {
  id: string;
  status: string;
  total_amount: number;
  currency: string;
  payment_method: string;
  created_at: string;
  order_items: Array<{
    id: string;
    quantity: number;
    products: {
      name: string;
      image_url: string;
    };
  }>;
};

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
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
    
    fetchOrders();
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

  const fetchOrders = async () => {
    if (!user) return;

    try {
      // Mock orders for frontend-only mode
      const mockOrders: Order[] = [
        {
          id: 'order-123',
          status: 'delivered',
          total_amount: 149.99,
          currency: 'USD',
          payment_method: 'paypal',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          order_items: [
            {
              id: 'item-1',
              quantity: 2,
              products: {
                name: 'Sustainable T-Shirt',
                image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop'
              }
            }
          ]
        }
      ];

      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'pending':
        return 'outline';
      case 'processing':
        return 'secondary';
      case 'shipped':
        return 'default';
      case 'delivered':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-white">Loading orders...</div>
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
            <h1 className="text-4xl font-bold text-white mb-2">My Orders</h1>
            <p className="text-zinc-400">Track and manage your orders</p>
          </div>

          {orders.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                <p className="text-zinc-400 mb-6">Start shopping to see your orders here</p>
                <Link to="/shop">
                  <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
                    Start Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">
                          Order #{order.id.slice(0, 8)}
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusVariant(order.status)} className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {order.order_items.slice(0, 3).map((item, index) => (
                            <img
                              key={item.id}
                              src={item.products.image_url || `https://images.unsplash.com/photo-${Date.now()}?w=40&h=40&fit=crop`}
                              alt={item.products.name}
                              className="w-10 h-10 rounded-full border-2 border-zinc-800 object-cover"
                              style={{ zIndex: 10 - index }}
                            />
                          ))}
                          {order.order_items.length > 3 && (
                            <div className="w-10 h-10 rounded-full border-2 border-zinc-800 bg-zinc-700 flex items-center justify-center text-xs text-white">
                              +{order.order_items.length - 3}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">
                            {order.order_items.reduce((total, item) => total + item.quantity, 0)} items
                          </p>
                          <p className="text-zinc-400 text-sm capitalize">
                            Paid via {order.payment_method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          ${order.total_amount} {order.currency}
                        </p>
                        <Link to={`/order-confirmation/${order.id}`}>
                          <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 mt-2">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Orders;
