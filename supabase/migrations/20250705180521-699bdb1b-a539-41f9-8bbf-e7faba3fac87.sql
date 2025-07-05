
-- Create products table for dynamic product management
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_url text,
  category text NOT NULL,
  sustainable boolean DEFAULT true,
  is_new boolean DEFAULT false,
  bestseller boolean DEFAULT false,
  stock_quantity integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create admin users table (separate from regular users)
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  is_owner boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Enable RLS on admin_users table  
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS policies for products
CREATE POLICY "Anyone can view active products" 
  ON public.products 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage all products" 
  ON public.products 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- RLS policies for admin_users
CREATE POLICY "Admins can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Only owner can manage admin users" 
  ON public.admin_users 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() AND is_owner = true
    )
  );

-- Insert the owner as the first admin (replace with your actual email)
INSERT INTO public.admin_users (user_id, email, is_owner) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'owner@noplanetb.com' LIMIT 1),
  'owner@noplanetb.com',
  true
);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = $1
  );
$$;

-- Create function to check if user is owner
CREATE OR REPLACE FUNCTION public.is_owner(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = $1 AND is_owner = true
  );
$$;

-- Seed some initial products (you can modify these)
INSERT INTO public.products (name, description, price, image_url, category, sustainable, is_new, bestseller, stock_quantity) VALUES
('Eco Warrior Jacket', 'Sustainable outerwear made from recycled materials', 329, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop', 'Outerwear', true, true, false, 10),
('Future Canvas Tee', 'Organic cotton t-shirt with conscious design', 89, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop', 'Tops', true, false, true, 25),
('Revolution Pants', 'Sustainable denim made from organic cotton', 195, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop', 'Bottoms', true, true, false, 15),
('Conscious Collective Dress', 'Ethically made dress from sustainable fabrics', 275, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop', 'Dresses', true, false, true, 8),
('Sustainability Hoodie', 'Cozy hoodie made from recycled materials', 149, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop', 'Tops', true, true, false, 20),
('Zero Waste Blazer', 'Professional blazer with zero waste production', 399, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=600&fit=crop', 'Outerwear', true, false, true, 5);
