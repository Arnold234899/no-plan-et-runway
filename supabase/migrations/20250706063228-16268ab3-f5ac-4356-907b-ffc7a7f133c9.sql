
-- Create orders table to store purchase transactions
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT CHECK (payment_method IN ('paypal', 'stripe', 'credit_card')),
  payment_id TEXT, -- PayPal transaction ID or Stripe payment intent ID
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order items table for individual products in each order
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create product variants table for sizes, colors, etc.
CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  size TEXT,
  color TEXT,
  material TEXT,
  sku TEXT UNIQUE,
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  price_adjustment DECIMAL(10,2) DEFAULT 0, -- Price difference from base product
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create customer profiles table for enhanced user management
CREATE TABLE public.customer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create shipping addresses table
CREATE TABLE public.shipping_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_default BOOLEAN NOT NULL DEFAULT false,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create wishlist table
CREATE TABLE public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create product reviews table
CREATE TABLE public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified_purchase BOOLEAN NOT NULL DEFAULT false,
  is_approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id, order_id)
);

-- Create inventory alerts table
CREATE TABLE public.inventory_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('low_stock', 'out_of_stock')),
  threshold_quantity INTEGER NOT NULL DEFAULT 5,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_triggered TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for order_items
CREATE POLICY "Users can view items from their orders" ON public.order_items
  FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can create order items for their orders" ON public.order_items
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can manage all order items" ON public.order_items
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for product_variants
CREATE POLICY "Anyone can view active product variants" ON public.product_variants
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage product variants" ON public.product_variants
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for customer_profiles
CREATE POLICY "Users can manage their own profile" ON public.customer_profiles
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for shipping_addresses
CREATE POLICY "Users can manage their own addresses" ON public.shipping_addresses
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for wishlist
CREATE POLICY "Users can manage their own wishlist" ON public.wishlist
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for product_reviews
CREATE POLICY "Anyone can view approved reviews" ON public.product_reviews
  FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can manage their own reviews" ON public.product_reviews
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all reviews" ON public.product_reviews
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for inventory_alerts
CREATE POLICY "Admins can manage inventory alerts" ON public.inventory_alerts
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_shipping_addresses_user_id ON public.shipping_addresses(user_id);
CREATE INDEX idx_wishlist_user_id ON public.wishlist(user_id);
CREATE INDEX idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX idx_product_reviews_user_id ON public.product_reviews(user_id);

-- Create function to update inventory when order is placed
CREATE OR REPLACE FUNCTION public.update_inventory_on_order()
RETURNS TRIGGER AS $$
BEGIN
  -- Update product variant stock if variant exists
  IF NEW.variant_id IS NOT NULL THEN
    UPDATE public.product_variants 
    SET stock_quantity = stock_quantity - NEW.quantity,
        updated_at = now()
    WHERE id = NEW.variant_id;
  ELSE
    -- Update main product stock
    UPDATE public.products 
    SET stock_quantity = stock_quantity - NEW.quantity,
        updated_at = now()
    WHERE id = NEW.product_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update inventory
CREATE TRIGGER update_inventory_trigger
  AFTER INSERT ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION public.update_inventory_on_order();

-- Create function to check low stock and create alerts
CREATE OR REPLACE FUNCTION public.check_low_stock()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if stock is low for variants
  IF TG_TABLE_NAME = 'product_variants' THEN
    IF NEW.stock_quantity <= 5 AND NEW.stock_quantity > 0 THEN
      INSERT INTO public.inventory_alerts (variant_id, alert_type, threshold_quantity)
      VALUES (NEW.id, 'low_stock', 5)
      ON CONFLICT DO NOTHING;
    ELSIF NEW.stock_quantity = 0 THEN
      INSERT INTO public.inventory_alerts (variant_id, alert_type, threshold_quantity)
      VALUES (NEW.id, 'out_of_stock', 0)
      ON CONFLICT DO NOTHING;
    END IF;
  -- Check if stock is low for main products
  ELSIF TG_TABLE_NAME = 'products' THEN
    IF NEW.stock_quantity <= 5 AND NEW.stock_quantity > 0 THEN
      INSERT INTO public.inventory_alerts (product_id, alert_type, threshold_quantity)
      VALUES (NEW.id, 'low_stock', 5)
      ON CONFLICT DO NOTHING;
    ELSIF NEW.stock_quantity = 0 THEN
      INSERT INTO public.inventory_alerts (product_id, alert_type, threshold_quantity)
      VALUES (NEW.id, 'out_of_stock', 0)
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for low stock alerts
CREATE TRIGGER low_stock_check_variants
  AFTER UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE FUNCTION public.check_low_stock();

CREATE TRIGGER low_stock_check_products
  AFTER UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.check_low_stock();

-- Insert some sample product variants for existing products
INSERT INTO public.product_variants (product_id, size, color, stock_quantity, sku)
SELECT 
  id,
  CASE 
    WHEN random() < 0.25 THEN 'XS'
    WHEN random() < 0.5 THEN 'S'
    WHEN random() < 0.75 THEN 'M'
    ELSE 'L'
  END,
  CASE 
    WHEN random() < 0.33 THEN 'Black'
    WHEN random() < 0.66 THEN 'White'
    ELSE 'Blue'
  END,
  floor(random() * 50 + 10)::integer,
  'SKU-' || substring(id::text from 1 for 8) || '-' || floor(random() * 1000)::text
FROM public.products 
WHERE id IN (SELECT id FROM public.products LIMIT 5);
