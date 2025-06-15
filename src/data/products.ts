
export type Product = {
  id: number;
  name: string;
  price: number;
  priceDisplay: string;
  image: string;
  category: string;
  sustainable: boolean;
  isNew: boolean;
  bestseller: boolean;
};

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Eco Warrior Jacket",
    price: 329,
    priceDisplay: "$329",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    category: "Outerwear",
    sustainable: true,
    isNew: true,
    bestseller: false,
  },
  {
    id: 2,
    name: "Future Canvas Tee",
    price: 89,
    priceDisplay: "$89",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop",
    category: "Tops",
    sustainable: true,
    isNew: false,
    bestseller: true,
  },
  {
    id: 3,
    name: "Revolution Pants",
    price: 195,
    priceDisplay: "$195",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    category: "Bottoms",
    sustainable: true,
    isNew: true,
    bestseller: false,
  },
  {
    id: 4,
    name: "Conscious Collective Dress",
    price: 275,
    priceDisplay: "$275",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
    category: "Dresses",
    sustainable: true,
    isNew: false,
    bestseller: true,
  },
  {
    id: 5,
    name: "Sustainability Hoodie",
    price: 149,
    priceDisplay: "$149",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop",
    category: "Tops",
    sustainable: true,
    isNew: true,
    bestseller: false,
  },
  {
    id: 6,
    name: "Zero Waste Blazer",
    price: 399,
    priceDisplay: "$399",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=600&fit=crop",
    category: "Outerwear",
    sustainable: true,
    isNew: false,
    bestseller: true,
  }
];
