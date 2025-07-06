
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { seedProducts } from "./utils/seedProducts";
import { useEffect } from "react";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import CompleteCheckout from "./pages/CompleteCheckout";
import Cart from "./pages/Cart";
import CartCheckout from "./pages/CartCheckout";
import Orders from "./pages/Orders";
import OrderConfirmation from "./pages/OrderConfirmation";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Wishlist from "./pages/Wishlist";
import BrandAmbassador from "./pages/BrandAmbassador";
import NotFound from "./pages/NotFound";
import Lerai from "./pages/Lerai";

const queryClient = new QueryClient();

function App() {
  // Seed products on app start
  useEffect(() => {
    seedProducts();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/checkout/:id" element={<Checkout />} />
                  <Route path="/complete-checkout/:id" element={<CompleteCheckout />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/cart/checkout" element={<CartCheckout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/brand-ambassador" element={<BrandAmbassador />} />
                  <Route path="/lerai" element={<Lerai />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
