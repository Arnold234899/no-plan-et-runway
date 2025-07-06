
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { seedProducts } from "@/utils/seedProducts";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  sustainable: boolean;
  stockQuantity: number;
};

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      console.log(`Fetching product with ID: ${id}`);
      
      // First ensure products are seeded
      await seedProducts();
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no data found

      if (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
        return;
      }

      if (!data) {
        console.log(`No product found with ID: ${id}`);
        setProduct(null);
        return;
      }

      const formattedProduct: Product = {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image_url || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop`,
        description: data.description || 'No description available.',
        category: data.category,
        sustainable: data.sustainable || false,
        stockQuantity: data.stock_quantity || 0,
      };

      console.log('Product found:', formattedProduct);
      setProduct(formattedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading };
};
