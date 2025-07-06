
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

interface ProductActionsProps {
  productId: string;
  stockQuantity: number;
}

export const ProductActions = ({ productId, stockQuantity }: ProductActionsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Link to={`/complete-checkout/${productId}`}>
        <Button 
          className="bg-white text-zinc-950 hover:bg-zinc-100 px-8 py-3 text-lg"
          disabled={stockQuantity === 0}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          {stockQuantity === 0 ? 'Out of Stock' : 'Buy Now'}
        </Button>
      </Link>
      <WishlistButton productId={productId} className="px-4 py-3" />
    </div>
  );
};
