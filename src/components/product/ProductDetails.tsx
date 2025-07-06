
interface ProductDetailsProps {
  category: string;
  price: number;
  sustainable: boolean;
  stockQuantity: number;
}

export const ProductDetails = ({ category, price, sustainable, stockQuantity }: ProductDetailsProps) => {
  return (
    <div className="border-t border-zinc-700 pt-6">
      <h3 className="text-white font-semibold mb-3">Product Details</h3>
      <ul className="text-zinc-300 space-y-1">
        <li>Category: {category}</li>
        <li>Price: ${price}</li>
        <li>Stock: {stockQuantity > 0 ? `${stockQuantity} available` : 'Out of stock'}</li>
        {sustainable && <li>✓ Sustainable Material</li>}
      </ul>
    </div>
  );
};
