import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CreditCard, Truck, Shield, Leaf, User, UserPlus } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { GuestCheckoutForm, GuestCheckoutData } from '@/components/checkout/GuestCheckoutForm';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useTheme } from '@/hooks/useTheme';

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

const CartCheckout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state: cartState, clearCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [creating, setCreating] = useState(false);
  const [checkoutType, setCheckoutType] = useState<'guest' | 'user'>('guest');

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

  useEffect(() => {
    if (cartState.items.length === 0) {
      navigate('/cart');
    }
    
    // If user is logged in, default to user checkout
    if (user) {
      setCheckoutType('user');
    }
  }, [cartState.items.length, navigate, user]);

  const createOrderForUser = async (paymentId: string, paymentMethod: string) => {
    if (!user) {
      toast.error('Please sign in to complete your order');
      return null;
    }

    try {
      setCreating(true);

      const orderData = {
        user_id: user.id,
        email: user.email!,
        status: 'pending' as const,
        total_amount: cartState.total,
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

      // Create order items
      const orderItems = cartState.items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        variant_id: item.variantId || null,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        toast.error('Failed to create order items');
        return null;
      }

      toast.success('Order created successfully!');
      clearCart();
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
      return null;
    } finally {
      setCreating(false);
    }
  };

  const createOrderForGuest = async (paymentId: string, paymentMethod: string, guestData: GuestCheckoutData) => {
    try {
      setCreating(true);

      const orderData = {
        user_id: null, // Guest order
        email: guestData.email,
        status: 'pending' as const,
        total_amount: cartState.total,
        currency: 'USD',
        payment_method: paymentMethod,
        payment_id: paymentId,
        shipping_address: {
          first_name: guestData.firstName,
          last_name: guestData.lastName,
          address_line_1: guestData.shippingAddress.addressLine1,
          address_line_2: guestData.shippingAddress.addressLine2 || '',
          city: guestData.shippingAddress.city,
          state: guestData.shippingAddress.state,
          postal_code: guestData.shippingAddress.postalCode,
          country: guestData.shippingAddress.country,
          phone: guestData.phone || ''
        },
        billing_address: {
          first_name: guestData.firstName,
          last_name: guestData.lastName,
          address_line_1: guestData.shippingAddress.addressLine1,
          address_line_2: guestData.shippingAddress.addressLine2 || '',
          city: guestData.shippingAddress.city,
          state: guestData.shippingAddress.state,
          postal_code: guestData.shippingAddress.postalCode,
          country: guestData.shippingAddress.country,
          phone: guestData.phone || ''
        },
        notes: guestData.notes || null
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

      // Create order items
      const orderItems = cartState.items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        variant_id: item.variantId || null,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        toast.error('Failed to create order items');
        return null;
      }

      toast.success('Order created successfully!');
      clearCart();
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
      return null;
    } finally {
      setCreating(false);
    }
  };

  const [currentGuestData, setCurrentGuestData] = useState<GuestCheckoutData | null>(null);

  const handleGuestCheckout = (guestData: GuestCheckoutData) => {
    setCurrentGuestData(guestData);
    // Process payment immediately for guest
  };

  const handlePayPalSuccess = async (details: any) => {
    let order;
    if (checkoutType === 'guest' && currentGuestData) {
      order = await createOrderForGuest(details.id, 'paypal', currentGuestData);
    } else if (checkoutType === 'user') {
      order = await createOrderForUser(details.id, 'paypal');
    }
    
    if (order) {
      navigate(`/order-confirmation/${order.id}`);
    }
  };

  if (cartState.items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/cart" className="inline-flex items-center text-zinc-400 hover:text-emerald-400 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>

          {/* Branded Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
              NO PLAN-ET B Checkout
            </h1>
            <p className="text-lg text-zinc-400">Complete your sustainable purchase</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <Card className="bg-zinc-900 border-emerald-400/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-emerald-400" />
                    Your Sustainable Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {cartState.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                          <p className="text-zinc-400 text-xs">{item.category}</p>
                          {item.sustainable && (
                            <span className="inline-block bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full mt-1">
                              Sustainable
                            </span>
                          )}
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-emerald-400 font-bold">${item.price} x {item.quantity}</span>
                            <span className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-700 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold text-white mb-4">
                      <span>Total:</span>
                      <span className="text-emerald-400">${cartState.total.toFixed(2)}</span>
                    </div>
                    
                    {/* Environmental Impact Message */}
                    <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 p-4 rounded-lg border border-emerald-400/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Environmental Impact</span>
                      </div>
                      <p className="text-sm text-emerald-200">
                        Your purchase supports {cartState.items.filter(item => item.sustainable).length} sustainable products, 
                        helping reduce fashion industry waste and carbon footprint.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Options */}
            <div>
              <Tabs value={checkoutType} onValueChange={(value) => setCheckoutType(value as 'guest' | 'user')}>
                <TabsList className="grid w-full grid-cols-2 bg-zinc-800 mb-6">
                  <TabsTrigger value="guest" className="text-white data-[state=active]:bg-zinc-700">
                    <User className="mr-2 h-4 w-4" />
                    Guest Checkout
                  </TabsTrigger>
                  <TabsTrigger value="user" className="text-white data-[state=active]:bg-zinc-700">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {user ? 'Account Checkout' : 'Sign In & Checkout'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="guest">
                  <GuestCheckoutForm 
                    onSubmit={handleGuestCheckout}
                    loading={creating}
                  />
                  
                  {currentGuestData && (
                    <div className="mt-6">
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
                                  value: cartState.total.toFixed(2),
                                  currency_code: "USD"
                                },
                                description: `NO PLAN-ET B Order - ${cartState.items.length} items`
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
                </TabsContent>

                <TabsContent value="user">
                  {!user ? (
                    <Card className="bg-zinc-900 border-emerald-400/20">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold text-white mb-4">Sign In to Continue</h3>
                          <p className="text-zinc-300 mb-6">Sign in to your account for a faster checkout experience</p>
                          <Link to="/auth">
                            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                              Sign In / Sign Up
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-zinc-900 border-emerald-400/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Truck className="mr-2 h-5 w-5 text-emerald-400" />
                          Shipping Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="text-zinc-300">First Name</Label>
                            <Input
                              value={shippingAddress.first_name}
                              onChange={(e) => setShippingAddress({...shippingAddress, first_name: e.target.value})}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-300">Last Name</Label>
                            <Input
                              value={shippingAddress.last_name}
                              onChange={(e) => setShippingAddress({...shippingAddress, last_name: e.target.value})}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <Label className="text-zinc-300">Address Line 1</Label>
                          <Input
                            value={shippingAddress.address_line_1}
                            onChange={(e) => setShippingAddress({...shippingAddress, address_line_1: e.target.value})}
                            className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <Label className="text-zinc-300">Address Line 2 (Optional)</Label>
                          <Input
                            value={shippingAddress.address_line_2}
                            onChange={(e) => setShippingAddress({...shippingAddress, address_line_2: e.target.value})}
                            className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="text-zinc-300">City</Label>
                            <Input
                              value={shippingAddress.city}
                              onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-300">State</Label>
                            <Input
                              value={shippingAddress.state}
                              onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
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
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-300">Phone</Label>
                            <Input
                              value={shippingAddress.phone}
                              onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <Label className="text-zinc-300">Order Notes (Optional)</Label>
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                            placeholder="Any special instructions for your sustainable order..."
                          />
                        </div>

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
                                      value: cartState.total.toFixed(2),
                                      currency_code: "USD"
                                    },
                                    description: `NO PLAN-ET B Order - ${cartState.items.length} items`
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
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CartCheckout;
