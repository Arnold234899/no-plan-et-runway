
import { useState, useEffect } from 'react';
import { sampleProducts } from '@/data/sampleProducts';

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

    // Mock delay for realistic loading
    setTimeout(() => {
      const foundProduct = sampleProducts.find(p => p.id === id);
      
      if (foundProduct) {
        const formattedProduct: Product = {
          id: foundProduct.id,
          name: foundProduct.name,
          price: foundProduct.price,
          image: foundProduct.image_url || '/placeholder.svg',
          description: foundProduct.description || '',
          category: foundProduct.category,
          sustainable: foundProduct.sustainable ?? true,
          stockQuantity: 50, // Default stock
        };
        setProduct(formattedProduct);
      } else {
        setProduct(null);
      }
      setLoading(false);
    }, 500);
  };

  return { product, loading };
};
