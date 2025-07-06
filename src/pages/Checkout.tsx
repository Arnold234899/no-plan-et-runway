
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductBadges } from "@/components/product/ProductBadges";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductSchema } from "@/components/product/ProductSchema";
import { useTheme } from "@/hooks/useTheme";
import { useProduct } from "@/hooks/useProduct";

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const { theme, toggleTheme } = useTheme();
  const { product, loading } = useProduct(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-white">Loading product...</div>
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
      <ProductSchema product={product} />
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/shop" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
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

              <ProductActions 
                productId={product.id}
                stockQuantity={product.stockQuantity}
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
