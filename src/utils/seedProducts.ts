
import { supabase } from "@/integrations/supabase/client";
import { sampleProducts } from "@/data/sampleProducts";

export const seedProducts = async () => {
  try {
    console.log("Starting to seed products...");
    
    // First, check if products already exist
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error("Error checking existing products:", checkError);
      return;
    }

    if (existingProducts && existingProducts.length > 0) {
      console.log("Products already exist in database");
      return;
    }

    // Insert all sample products
    const productsToInsert = sampleProducts.map((product, index) => ({
      id: (index + 1).toString(), // Use simple IDs like "1", "2", "3", etc.
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image_url: product.image_url, // Fixed: was 'image'
      sustainable: product.sustainable,
      is_new: product.is_new, // Fixed: was 'isNew'
      bestseller: product.bestseller,
      stock_quantity: 50, // Set a good stock quantity
      is_active: true
    }));

    const { data, error } = await supabase
      .from('products')
      .insert(productsToInsert)
      .select();

    if (error) {
      console.error("Error seeding products:", error);
      return;
    }

    console.log(`Successfully seeded ${data?.length} products`);
    return data;
  } catch (error) {
    console.error("Error in seedProducts:", error);
  }
};

// Auto-seed products when this module is imported
seedProducts();
