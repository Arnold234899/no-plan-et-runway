
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Lock, Truck, ShieldCheck } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";

const Checkout = () => {
  const { productId } = useParams();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    shipping: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    payment: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: ""
    }
  });

  // Mock product data
  const product = {
    id: productId,
    name: "Eco Warrior Jacket",
    price: 329,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    size: "M",
    color: "Forest Green"
  };

  const handleInputChange = (section: 'shipping' | 'payment', field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Order submitted:", orderData);
      alert("Order placed successfully! You'll receive a confirmation email shortly.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <Link to="/shop" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{product.name}</h3>
                      <p className="text-zinc-400 text-sm">Size: {product.size}</p>
                      <p className="text-zinc-400 text-sm">Color: {product.color}</p>
                      <p className="text-white font-bold mt-2">${product.price}</p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Subtotal</span>
                      <span className="text-white">${product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Shipping</span>
                      <span className="text-white">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Tax</span>
                      <span className="text-white">${Math.round(product.price * 0.08)}</span>
                    </div>
                    <div className="border-t border-zinc-800 pt-2 flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-white">${product.price + Math.round(product.price * 0.08)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-zinc-400">
                      <Truck className="mr-2 h-4 w-4" />
                      Free shipping on orders over $100
                    </div>
                    <div className="flex items-center text-zinc-400">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      30-day return policy
                    </div>
                    <div className="flex items-center text-zinc-400">
                      <Lock className="mr-2 h-4 w-4" />
                      Secure encrypted checkout
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div>
              {/* Progress Steps */}
              <div className="flex items-center mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= stepNumber ? 'bg-white text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {stepNumber}
                    </div>
                    <span className={`ml-2 text-sm ${
                      step >= stepNumber ? 'text-white' : 'text-zinc-400'
                    }`}>
                      {stepNumber === 1 ? 'Shipping' : stepNumber === 2 ? 'Payment' : 'Confirmation'}
                    </span>
                    {stepNumber < 3 && <div className="w-8 h-px bg-zinc-700 mx-4" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">Shipping Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderData.shipping.firstName}
                            onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderData.shipping.lastName}
                            onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-zinc-300 text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={orderData.shipping.email}
                          onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-300 text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={orderData.shipping.phone}
                          onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-300 text-sm font-medium mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={orderData.shipping.address}
                          onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderData.shipping.city}
                            onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderData.shipping.state}
                            onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderData.shipping.zipCode}
                            onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            Country *
                          </label>
                          <select
                            required
                            value={orderData.shipping.country}
                            onChange={(e) => handleInputChange('shipping', 'country', e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          >
                            <option value="">Select</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-white text-zinc-950 hover:bg-zinc-100 text-lg py-3">
                        Continue to Payment
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {step === 2 && (
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white text-xl flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="block text-zinc-300 text-sm font-medium mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          value={orderData.payment.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            value={orderData.payment.expiryDate}
                            onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="123"
                            value={orderData.payment.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-zinc-300 text-sm font-medium mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={orderData.payment.cardName}
                          onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        />
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1 border-zinc-600 text-white hover:bg-zinc-800"
                        >
                          Back to Shipping
                        </Button>
                        <Button type="submit" className="flex-1 bg-white text-zinc-950 hover:bg-zinc-100 text-lg py-3">
                          Review Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 3 && (
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">Order Confirmation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-2">Shipping Address</h3>
                        <p className="text-zinc-300 text-sm">
                          {orderData.shipping.firstName} {orderData.shipping.lastName}<br />
                          {orderData.shipping.address}<br />
                          {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.zipCode}<br />
                          {orderData.shipping.country}
                        </p>
                      </div>

                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-2">Payment Method</h3>
                        <p className="text-zinc-300 text-sm">
                          **** **** **** {orderData.payment.cardNumber.slice(-4)}<br />
                          {orderData.payment.cardName}
                        </p>
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="flex-1 border-zinc-600 text-white hover:bg-zinc-800"
                        >
                          Back to Payment
                        </Button>
                        <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg py-3">
                          <Lock className="mr-2 h-4 w-4" />
                          Place Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
