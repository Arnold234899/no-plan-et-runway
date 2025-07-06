
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus } from "lucide-react";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { useCart } from "@/contexts/CartContext";
import { useProduct } from "@/hooks/useProduct";

interface ProductActionsProps {
  productId: string;
  stockQuantity: number;
}

export const ProductActions = ({ productId, stockQuantity }: ProductActionsProps) => {
  const { addItem } = useCart();
  const { product } = useProduct(productId);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        sustainable: product.sustainable
      });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        onClick={handleAddToCart}
        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 text-lg"
        disabled={stockQuantity === 0}
      >
        <Plus className="w-5 h-5 mr-2" />
        {stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
      
      <Link to={`/complete-checkout/${productId}`}>
        <Button 
          variant="outline"
          className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-900/30 px-8 py-3 text-lg"
          disabled={stockQuantity === 0}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Buy Now
        </Button>
      </Link>
      
      <WishlistButton productId={productId} className="px-4 py-3" />
    </div>
  );
};
