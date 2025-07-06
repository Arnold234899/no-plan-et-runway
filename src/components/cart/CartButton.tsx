
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartDrawer } from './CartDrawer';

export const CartButton = () => {
  const { state } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="text-white hover:bg-emerald-900/30 hover:text-emerald-400 transition-all duration-300 group border border-emerald-400/20 hover:border-emerald-400/60 relative"
      >
        <ShoppingBag className="h-5 w-5 group-hover:text-teal-400 transition-colors duration-300" />
        <span className="ml-2">Cart ({state.itemCount})</span>
        {state.itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {state.itemCount}
          </span>
        )}
      </Button>
      
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
