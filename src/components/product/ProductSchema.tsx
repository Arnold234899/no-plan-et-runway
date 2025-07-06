
import { Helmet } from "react-helmet-async";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stockQuantity: number;
};

interface ProductSchemaProps {
  product: Product;
}

export const ProductSchema = ({ product }: ProductSchemaProps) => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "sku": product.id,
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "url": `https://noplanetb.com/checkout/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price.toFixed(2),
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <Helmet>
      <title>{product.name} - NO PLAN-ET B</title>
      <meta name="description" content={product.description} />
      <link rel="canonical" href={`https://noplanetb.com/checkout/${product.id}`} />
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};
