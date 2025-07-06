
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      const formattedProduct: Product = {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image_url || `https://images.unsplash.com/photo-${Date.now()}?w=800&h=1200&fit=crop`,
        description: data.description || 'No description available.',
        category: data.category,
        sustainable: data.sustainable || false,
        stockQuantity: data.stock_quantity || 0,
      };

      setProduct(formattedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading };
};
