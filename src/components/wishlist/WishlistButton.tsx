
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export const WishlistButton = ({ productId, className = "" }: WishlistButtonProps) => {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Check localStorage for wishlist items
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsInWishlist(wishlist.includes(productId));
    }
  }, [user, productId]);

  const toggleWishlist = async () => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }

    setLoading(true);

    // Mock delay
    setTimeout(() => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      if (isInWishlist) {
        // Remove from wishlist
        const newWishlist = wishlist.filter((id: string) => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        // Add to wishlist
        const newWishlist = [...wishlist, productId];
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleWishlist}
      disabled={loading}
      className={`${isInWishlist 
        ? 'bg-red-600 border-red-600 text-white hover:bg-red-700' 
        : 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
      } ${className}`}
    >
      <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
    </Button>
  );
};
