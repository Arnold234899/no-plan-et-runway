import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { Database } from "@/integrations/supabase/types";

type Product = Database['public']['Tables']['products']['Row'];
type ProductVariant = Database['public']['Tables']['product_variants']['Row'];
type ShippingAddress = Database['public']['Tables']['shipping_addresses']['Row'];

type ShippingAddressForm = {
  first_name: string;
  last_name: string;
  company?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
};

const CompleteCheckout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddressForm>({
    first_name: '',
    last_name: '',
    company: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    phone: ''
  });

  const [notes, setNotes] = useState('');
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
    fetchProduct();
    if (user) {
      fetchSavedAddresses();
    }
  }, [id, user]);

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
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (productError) {
        console.error('Error fetching product:', productError);
        toast.error('Product not found');
        navigate('/shop');
        return;
      }

      setProduct(productData);

      // Fetch variants
      const { data: variantsData, error: variantsError } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', id)
        .eq('is_active', true);

      if (variantsError) {
        console.error('Error fetching variants:', variantsError);
      } else {
        setVariants(variantsData || []);
        if (variantsData && variantsData.length > 0) {
          setSelectedVariant(variantsData[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('shipping_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) {
        console.error('Error fetching addresses:', error);
      } else {
        setSavedAddresses(data || []);
        // Auto-select default address
        const defaultAddress = data?.find(addr => addr.is_default);
        if (defaultAddress) {
          setShippingAddress({
            first_name: defaultAddress.first_name,
            last_name: defaultAddress.last_name,
            company: defaultAddress.company || '',
            address_line_1: defaultAddress.address_line_1,
            address_line_2: defaultAddress.address_line_2 || '',
            city: defaultAddress.city,
            state: defaultAddress.state,
            postal_code: defaultAddress.postal_code,
            country: defaultAddress.country,
            phone: defaultAddress.phone || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const calculateTotal = () => {
    if (!product) return 0;
    const basePrice = product.price;
    const variantAdjustment = selectedVariant?.price_adjustment || 0;
    return (basePrice + variantAdjustment) * quantity;
  };

  const createOrder = async (paymentId: string, paymentMethod: string) => {
    if (!user || !product) {
      toast.error('Please sign in to complete your order');
      return null;
    }

    try {
      setCreating(true);

      const orderData = {
        user_id: user.id,
        email: user.email!,
        status: 'pending' as const,
        total_amount: calculateTotal(),
        currency: 'USD',
        payment_method: paymentMethod,
        payment_id: paymentId,
        shipping_address: shippingAddress,
        billing_address: shippingAddress,
        notes: notes || null
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        toast.error('Failed to create order');
        return null;
      }

      // Create order item
      const orderItemData = {
        order_id: order.id,
        product_id: product.id,
        variant_id: selectedVariant?.id || null,
        quantity: quantity,
        unit_price: product.price + (selectedVariant?.price_adjustment || 0),
        total_price: calculateTotal()
      };

      const { error: itemError } = await supabase
        .from('order_items')
        .insert([orderItemData]);

      if (itemError) {
        console.error('Error creating order item:', itemError);
        toast.error('Failed to create order item');
        return null;
      }

      toast.success('Order created successfully!');
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
      return null;
    } finally {
      setCreating(false);
    }
  };

  const handlePayPalSuccess = async (details: any) => {
    const order = await createOrder(details.id, 'paypal');
    if (order) {
      navigate(`/order-confirmation/${order.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-white">Loading...</div>
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

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/shop" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Summary */}
            <div>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <img
                      src={product.image_url || `https://images.unsplash.com/photo-${Date.now()}?w=400&h=600&fit=crop`}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{product.name}</h3>
                      <p className="text-zinc-400 text-sm">{product.category}</p>
                      <p className="text-zinc-300">${product.price}</p>
                    </div>
                  </div>

                  {variants.length > 0 && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label className="text-zinc-300">Size</Label>
                        <Select 
                          value={selectedVariant?.id || ""} 
                          onValueChange={(value) => {
                            const variant = variants.find(v => v.id === value);
                            setSelectedVariant(variant || null);
                          }}
                        >
                          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {variants.map((variant) => (
                              <SelectItem key={variant.id} value={variant.id}>
                                {variant.size} - {variant.color} (Stock: {variant.stock_quantity})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <Label className="text-zinc-300">Quantity</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-zinc-800 border-zinc-700 text-white"
                      >
                        -
                      </Button>
                      <span className="text-white px-4">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="bg-zinc-800 border-zinc-700 text-white"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-zinc-700 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold text-white">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Truck className="mr-2 h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savedAddresses.length > 0 && (
                    <div className="mb-6">
                      <Label className="text-zinc-300">Saved Addresses</Label>
                      <Select onValueChange={(value) => {
                        const address = savedAddresses.find(addr => addr.id === value);
                        if (address) {
                          setShippingAddress({
                            first_name: address.first_name,
                            last_name: address.last_name,
                            company: address.company || '',
                            address_line_1: address.address_line_1,
                            address_line_2: address.address_line_2 || '',
                            city: address.city,
                            state: address.state,
                            postal_code: address.postal_code,
                            country: address.country,
                            phone: address.phone || ''
                          });
                        }
                      }}>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select saved address" />
                        </SelectTrigger>
                        <SelectContent>
                          {savedAddresses.map((address) => (
                            <SelectItem key={address.id} value={address.id}>
                              {address.first_name} {address.last_name} - {address.address_line_1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-zinc-300">First Name</Label>
                      <Input
                        value={shippingAddress.first_name}
                        onChange={(e) => setShippingAddress({...shippingAddress, first_name: e.target.value})}
                        className="bg-zinc-800 border-zinc-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-300">Last Name</Label>
                      <Input
                        value={shippingAddress.last_name}
                        onChange={(e) => setShippingAddress({...shippingAddress, last_name: e.target.value})}
                        className="bg-zinc-800 border-zinc-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="text-zinc-300">Address Line 1</Label>
                    <Input
                      value={shippingAddress.address_line_1}
                      onChange={(e) => setShippingAddress({...shippingAddress, address_line_1: e.target.value})}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Label className="text-zinc-300">Address Line 2 (Optional)</Label>
                    <Input
                      value={shippingAddress.address_line_2}
                      onChange={(e) => setShippingAddress({...shippingAddress, address_line_2: e.target.value})}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-zinc-300">City</Label>
                      <Input
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className="bg-zinc-800 border-zinc-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-300">State</Label>
                      <Input
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                        className="bg-zinc-800 border-zinc-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-zinc-300">Postal Code</Label>
                      <Input
                        value={shippingAddress.postal_code}
                        onChange={(e) => setShippingAddress({...shippingAddress, postal_code: e.target.value})}
                        className="bg-zinc-800 border-zinc-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-300">Phone</Label>
                      <Input
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label className="text-zinc-300">Order Notes (Optional)</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="Any special instructions..."
                    />
                  </div>

                  {!user ? (
                    <div className="text-center">
                      <p className="text-zinc-300 mb-4">Please sign in to complete your order</p>
                      <Link to="/auth">
                        <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <PayPalScriptProvider options={{ 
                        clientId: "test", 
                        currency: "USD" 
                      }}>
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              intent: "CAPTURE",
                              purchase_units: [{
                                amount: {
                                  value: calculateTotal().toFixed(2),
                                  currency_code: "USD"
                                },
                                description: `${product.name} x ${quantity}`
                              }]
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const details = await actions.order?.capture();
                            if (details) {
                              await handlePayPalSuccess(details);
                            }
                          }}
                          onError={(err) => {
                            console.error('PayPal Error:', err);
                            toast.error('Payment failed. Please try again.');
                          }}
                          disabled={creating}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CompleteCheckout;
