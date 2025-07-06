
import { supabase } from "@/integrations/supabase/client";
import { sampleProducts } from "@/data/sampleProducts";

export const seedProducts = async () => {
  try {
    console.log('Starting to seed products...');
    
    // Check if products already exist to avoid duplicates
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('name')
      .limit(1);

    if (checkError) {
      console.error('Error checking existing products:', checkError);
      return;
    }

    // Only seed if we have fewer than 5 products
    if (existingProducts && existingProducts.length >= 5) {
      console.log('Products already exist, skipping seeding');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (error) {
      console.error('Error seeding products:', error);
      return;
    }

    console.log(`Successfully seeded ${data?.length || 0} products`);
    return data;
  } catch (error) {
    console.error('Error in seedProducts:', error);
  }
};
