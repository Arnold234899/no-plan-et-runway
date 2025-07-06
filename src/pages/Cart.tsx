
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { state, updateQuantity, removeItem } = useCart();
  const { theme, toggleTheme } = useTheme();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto py-16">
            <div className="text-center">
              <ShoppingBag className="h-24 w-24 text-zinc-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
              <p className="text-xl text-zinc-400 mb-8">Ready to make a sustainable choice?</p>
              <Link to="/shop">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg px-8 py-4">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-8">
          {/* Branded Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              NO PLAN-ET B Cart
            </h1>
            <p className="text-xl text-zinc-400">Every purchase makes a difference for our planet</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <Card key={item.id} className="bg-zinc-900 border-emerald-400/20">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
                        <p className="text-zinc-400 mb-2">{item.category}</p>
                        {item.sustainable && (
                          <span className="inline-block bg-green-600/20 text-green-400 text-sm px-3 py-1 rounded-full mb-2">
                            Sustainable Choice
                          </span>
                        )}
                        <p className="text-2xl font-bold text-emerald-400">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-10 w-10 p-0 border-emerald-400/30 text-emerald-400 hover:bg-emerald-900/30"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-white font-semibold text-lg min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-10 w-10 p-0 border-emerald-400/30 text-emerald-400 hover:bg-emerald-900/30"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-zinc-900 border-emerald-400/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-zinc-300">{item.name} x {item.quantity}</span>
                        <span className="text-emerald-400">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-zinc-700 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-white">Subtotal:</span>
                      <span className="text-lg font-bold text-emerald-400">${state.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <Link to="/shop" className="block">
                        <Button 
                          variant="outline" 
                          className="w-full border-emerald-400/50 text-emerald-400 hover:bg-emerald-900/30"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                      
                      <Link to="/cart/checkout" className="block">
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg py-3">
                          Proceed to Checkout
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Brand Message */}
                  <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 p-4 rounded-lg border border-emerald-400/20">
                    <p className="text-sm text-emerald-300 text-center font-medium">
                      🌍 Every NO PLAN-ET B purchase supports sustainable fashion and environmental protection
                    </p>
                  </div>
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

export default Cart;
