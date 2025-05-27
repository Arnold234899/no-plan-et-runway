
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpAZ, ArrowDownZA, ArrowUpDown } from "lucide-react";

interface ProductSortingProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const ProductSorting = ({ sortBy, onSortChange }: ProductSortingProps) => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="flex items-center space-x-2">
        <ArrowUpDown className="h-5 w-5 text-zinc-400" />
        <span className="text-zinc-300 font-medium">Sort by:</span>
      </div>
      
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-48 bg-zinc-900 border-zinc-700 text-white">
          <SelectValue placeholder="Choose sorting option" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700">
          <SelectItem value="name-asc" className="text-white hover:bg-zinc-800">
            <div className="flex items-center">
              <ArrowUpAZ className="mr-2 h-4 w-4" />
              Name A-Z
            </div>
          </SelectItem>
          <SelectItem value="name-desc" className="text-white hover:bg-zinc-800">
            <div className="flex items-center">
              <ArrowDownZA className="mr-2 h-4 w-4" />
              Name Z-A
            </div>
          </SelectItem>
          <SelectItem value="price-low" className="text-white hover:bg-zinc-800">
            Price: Low to High
          </SelectItem>
          <SelectItem value="price-high" className="text-white hover:bg-zinc-800">
            Price: High to Low
          </SelectItem>
          <SelectItem value="newest" className="text-white hover:bg-zinc-800">
            Newest Arrivals
          </SelectItem>
          <SelectItem value="bestsellers" className="text-white hover:bg-zinc-800">
            Bestsellers
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
