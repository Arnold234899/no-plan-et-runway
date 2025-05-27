
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const Promotions = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const promotionalProducts = [
    {
      id: 1,
      name: "Eco Warrior Jacket",
      originalPrice: 329,
      salePrice: 229,
      discount: 30,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    },
    {
      id: 2,
      name: "Future Canvas Tee",
      originalPrice: 89,
      salePrice: 62,
      discount: 30,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop",
    },
    {
      id: 3,
      name: "Revolution Pants",
      originalPrice: 195,
      salePrice: 136,
      discount: 30,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    },
    {
      id: 4,
      name: "Conscious Collective Dress",
      originalPrice: 275,
      salePrice: 192,
      discount: 30,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="mr-2 h-4 w-4" />
            Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            30% Off Sale
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Sustainable fashion at unbeatable prices. Don't miss out on these exclusive deals.
          </p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-zinc-950 p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-zinc-400 text-sm">Days</div>
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-zinc-400 text-sm">Hours</div>
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-zinc-400 text-sm">Minutes</div>
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-zinc-400 text-sm">Seconds</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promotionalProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden bg-zinc-950 rounded-lg hover:transform hover:scale-105 transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute top-4 left-4">
                  <div className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                    -{product.discount}%
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to={`/checkout/${product.id}`}>
                    <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white font-semibold text-lg mb-3">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-red-400 text-xl font-bold">${product.salePrice}</span>
                  <span className="text-zinc-500 text-sm line-through">${product.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <Button 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4"
            >
              Shop All Sale Items
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
