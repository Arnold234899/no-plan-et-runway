
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Minus } from 'lucide-react';

interface ProductVariantSelectorProps {
  productId: string;
  productName: string;
  price: number;
  stockQuantity: number;
  onAddToCart: (variant: { size: string; quantity: number }) => void;
  onBuyNow: (variant: { size: string; quantity: number }) => void;
  showBuyNow?: boolean;
}

export const ProductVariantSelector = ({ 
  productId, 
  productName, 
  price, 
  stockQuantity, 
  onAddToCart, 
  onBuyNow,
  showBuyNow = true 
}: ProductVariantSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleQuantityChange = (increment: boolean) => {
    if (increment && quantity < stockQuantity) {
      setQuantity(prev => prev + 1);
    } else if (!increment && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart({ size: selectedSize, quantity });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onBuyNow({ size: selectedSize, quantity });
  };

  return (
    <div className="space-y-6 bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-emerald-400/20">
      <div className="space-y-4">
        <div>
          <Label className="text-white text-lg font-semibold mb-3 block">Size</Label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="bg-zinc-800 border-emerald-400/30 text-white focus:border-emerald-400">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-emerald-400/30">
              {sizes.map(size => (
                <SelectItem key={size} value={size} className="text-white hover:bg-emerald-900/30">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white text-lg font-semibold mb-3 block">Quantity</Label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(false)}
              disabled={quantity <= 1}
              className="h-10 w-10 p-0 border-emerald-400/30 text-emerald-400 hover:bg-emerald-900/30"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="text-white font-semibold text-xl min-w-[3rem] text-center">
              {quantity}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(true)}
              disabled={quantity >= stockQuantity}
              className="h-10 w-10 p-0 border-emerald-400/30 text-emerald-400 hover:bg-emerald-900/30"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {stockQuantity <= 10 && (
            <p className="text-yellow-400 text-sm mt-2">
              Only {stockQuantity} left in stock!
            </p>
          )}
        </div>

        <div className="border-t border-emerald-400/20 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-lg">Total:</span>
            <span className="text-emerald-400 text-2xl font-bold">
              ${(price * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 text-lg"
          disabled={stockQuantity === 0}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        
        {showBuyNow && (
          <Button
            onClick={handleBuyNow}
            variant="outline"
            className="w-full border-emerald-400/50 text-emerald-400 hover:bg-emerald-900/30 font-semibold py-3 text-lg"
            disabled={stockQuantity === 0}
          >
            Buy Now - ${(price * quantity).toFixed(2)}
          </Button>
        )}
      </div>

      {stockQuantity === 0 && (
        <div className="text-center">
          <p className="text-red-400 font-semibold">Out of Stock</p>
          <p className="text-zinc-400 text-sm mt-1">This item is currently unavailable</p>
        </div>
      )}
    </div>
  );
};
