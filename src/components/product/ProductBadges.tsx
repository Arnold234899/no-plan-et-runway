
interface ProductBadgesProps {
  sustainable: boolean;
  stockQuantity: number;
}

export const ProductBadges = ({ sustainable, stockQuantity }: ProductBadgesProps) => {
  return (
    <>
      {sustainable && (
        <div className="inline-flex items-center bg-green-600 text-white text-sm px-3 py-1 rounded-full mb-4">
          Sustainable Fashion
        </div>
      )}
      
      {stockQuantity <= 5 && stockQuantity > 0 && (
        <p className="text-orange-500 font-medium mb-4">
          Only {stockQuantity} left in stock!
        </p>
      )}
      
      {stockQuantity === 0 && (
        <p className="text-red-500 font-medium mb-4">
          Out of stock
        </p>
      )}
    </>
  );
};
