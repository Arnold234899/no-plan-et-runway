
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
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
      checkWishlistStatus();
    }
  }, [user, productId]);

  const checkWishlistStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking wishlist status:', error);
        return;
      }

      setIsInWishlist(!!data);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }

    setLoading(true);

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) {
          console.error('Error removing from wishlist:', error);
          toast.error('Failed to remove from wishlist');
          return;
        }

        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        // Add to wishlist
        const { error } = await supabase
          .from('wishlist')
          .insert([{
            user_id: user.id,
            product_id: productId
          }]);

        if (error) {
          console.error('Error adding to wishlist:', error);
          toast.error('Failed to add to wishlist');
          return;
        }

        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
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
