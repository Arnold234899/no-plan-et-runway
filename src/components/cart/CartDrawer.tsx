
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { state, updateQuantity, removeItem } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-zinc-950 border-emerald-400/20 text-white min-w-[400px]">
        <SheetHeader className="border-b border-emerald-400/20 pb-4">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
            NO PLAN-ET B Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <ShoppingBag className="h-16 w-16 text-zinc-600 mb-4" />
              <h3 className="text-xl font-semibold text-zinc-300 mb-2">Your cart is empty</h3>
              <p className="text-zinc-500 mb-6">Start shopping for sustainable fashion!</p>
              <Link to="/shop" onClick={onClose}>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                  Shop Collection
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-zinc-900/50 rounded-lg border border-emerald-400/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                      <p className="text-zinc-400 text-xs">{item.category}</p>
                      {item.sustainable && (
                        <span className="inline-block bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full mt-1">
                          Sustainable
                        </span>
                      )}
                      <p className="text-emerald-400 font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1 h-auto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 border-emerald-400/30 text-emerald-400 hover:bg-emerald-900/30"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 border-emerald-400/30 text-emerald-400 hover:bg-emerald-900/30"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-emerald-400/20 pt-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-emerald-400">${state.total.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <Link to="/cart" onClick={onClose} className="block">
                    <Button 
                      variant="outline" 
                      className="w-full border-emerald-400/50 text-emerald-400 hover:bg-emerald-900/30"
                    >
                      View Full Cart
                    </Button>
                  </Link>
                  <Link to="/cart/checkout" onClick={onClose} className="block">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold">
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
