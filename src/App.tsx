import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import CompleteCheckout from "./pages/CompleteCheckout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import BrandAmbassador from "./pages/BrandAmbassador";
import Lerai from "./pages/Lerai";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";
import Cart from "./pages/Cart";
import CartCheckout from "./pages/CartCheckout";

const queryClient = new QueryClient();

const App = () => (
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
                <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
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

export default App;
