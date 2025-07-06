
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductBadges } from "@/components/product/ProductBadges";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductSchema } from "@/components/product/ProductSchema";
import { ProductVariantSelector } from "@/components/product/ProductVariantSelector";
import { useTheme } from "@/hooks/useTheme";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/contexts/CartContext";

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { product, loading } = useProduct(id);
  const { addItem } = useCart();

  const handleAddToCart = (variant: { size: string; quantity: number }) => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        sustainable: product.sustainable,
        size: variant.size
      }, variant.quantity);
    }
  };

  const handleBuyNow = (variant: { size: string; quantity: number }) => {
    if (product) {
      // Add to cart first
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        sustainable: product.sustainable,
        size: variant.size
      }, variant.quantity);
      
      // Navigate to cart checkout
      setTimeout(() => {
        navigate('/cart/checkout');
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-emerald-400 text-xl">Loading product...</div>
          <div className="text-zinc-400">Please wait while we fetch the details</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white mb-4">Product not found</h2>
          <p className="text-zinc-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-semibold">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <ProductSchema product={product} />
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/shop" className="inline-flex items-center text-zinc-400 hover:text-emerald-400 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ProductImage image={product.image} name={product.name} />

            <div className="space-y-6">
              <ProductHeader 
                category={product.category}
                name={product.name}
                price={product.price}
              />
              
              <ProductBadges 
                sustainable={product.sustainable}
                stockQuantity={product.stockQuantity}
              />

              <ProductDescription description={product.description} />

              <ProductVariantSelector
                productId={product.id}
                productName={product.name}
                price={product.price}
                stockQuantity={product.stockQuantity}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />

              <ProductDetails 
                category={product.category}
                price={product.price}
                sustainable={product.sustainable}
                stockQuantity={product.stockQuantity}
              />
            </div>
          </div>

          <ProductReviews productId={product.id} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
