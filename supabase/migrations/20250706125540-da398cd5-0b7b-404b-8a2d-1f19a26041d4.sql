
-- Create inventory alerts table for low stock notifications
CREATE TABLE public.inventory_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('low_stock', 'out_of_stock', 'restock_needed')),
  threshold_quantity INTEGER NOT NULL DEFAULT 5,
  current_quantity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_triggered TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create customer profiles for enhanced user data
CREATE TABLE public.customer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  preferred_categories TEXT[],
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  average_order_value DECIMAL(10,2) DEFAULT 0,
  last_order_date TIMESTAMPTZ,
  customer_lifetime_value DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create analytics events table for tracking user behavior
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create sales analytics table for aggregated sales data
CREATE TABLE public.sales_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  period_type TEXT NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  total_orders INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  average_order_value DECIMAL(10,2) DEFAULT 0,
  new_customers INTEGER DEFAULT 0,
  returning_customers INTEGER DEFAULT 0,
  top_products JSONB DEFAULT '[]',
  top_categories JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(date, period_type)
);

-- Create email campaigns table
CREATE TABLE public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  template_type TEXT CHECK (template_type IN ('newsletter', 'promotional', 'transactional', 'abandoned_cart')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  recipient_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create email tracking table
CREATE TABLE public.email_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained')),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create abandoned cart tracking
CREATE TABLE public.abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  cart_data JSONB NOT NULL,
  total_value DECIMAL(10,2) NOT NULL,
  recovery_email_sent BOOLEAN DEFAULT false,
  recovery_email_sent_at TIMESTAMPTZ,
  recovered BOOLEAN DEFAULT false,
  recovered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.inventory_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for inventory_alerts
CREATE POLICY "Admins can manage inventory alerts" ON public.inventory_alerts
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for customer_profiles
CREATE POLICY "Users can manage their own profile" ON public.customer_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all customer profiles" ON public.customer_profiles
  FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for analytics_events
CREATE POLICY "Anyone can insert analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view analytics events" ON public.analytics_events
  FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for sales_analytics
CREATE POLICY "Admins can manage sales analytics" ON public.sales_analytics
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for email_campaigns
CREATE POLICY "Admins can manage email campaigns" ON public.email_campaigns
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for email_tracking
CREATE POLICY "Admins can manage email tracking" ON public.email_tracking
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- RLS Policies for abandoned_carts
CREATE POLICY "Users can view their own abandoned carts" ON public.abandoned_carts
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert abandoned carts" ON public.abandoned_carts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage abandoned carts" ON public.abandoned_carts
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_inventory_alerts_product_id ON public.inventory_alerts(product_id);
CREATE INDEX idx_inventory_alerts_variant_id ON public.inventory_alerts(variant_id);
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_sales_analytics_date ON public.sales_analytics(date);
CREATE INDEX idx_email_tracking_campaign_id ON public.email_tracking(campaign_id);
CREATE INDEX idx_abandoned_carts_user_id ON public.abandoned_carts(user_id);
CREATE INDEX idx_abandoned_carts_created_at ON public.abandoned_carts(created_at);

-- Create function to update inventory and trigger alerts
CREATE OR REPLACE FUNCTION public.update_inventory_and_check_alerts()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if stock is low for variants
  IF TG_TABLE_NAME = 'product_variants' THEN
    -- Insert or update low stock alert
    IF NEW.stock_quantity <= 5 AND NEW.stock_quantity > 0 THEN
      INSERT INTO public.inventory_alerts (variant_id, alert_type, threshold_quantity, current_quantity)
      VALUES (NEW.id, 'low_stock', 5, NEW.stock_quantity)
      ON CONFLICT (variant_id, alert_type) DO UPDATE SET
        current_quantity = NEW.stock_quantity,
        last_triggered = now(),
        updated_at = now();
    ELSIF NEW.stock_quantity = 0 THEN
      INSERT INTO public.inventory_alerts (variant_id, alert_type, threshold_quantity, current_quantity)
      VALUES (NEW.id, 'out_of_stock', 0, NEW.stock_quantity)
      ON CONFLICT (variant_id, alert_type) DO UPDATE SET
        current_quantity = NEW.stock_quantity,
        last_triggered = now(),
        updated_at = now();
    END IF;
  -- Check if stock is low for main products
  ELSIF TG_TABLE_NAME = 'products' THEN
    IF NEW.stock_quantity <= 5 AND NEW.stock_quantity > 0 THEN
      INSERT INTO public.inventory_alerts (product_id, alert_type, threshold_quantity, current_quantity)
      VALUES (NEW.id, 'low_stock', 5, NEW.stock_quantity)
      ON CONFLICT (product_id, alert_type) DO UPDATE SET
        current_quantity = NEW.stock_quantity,
        last_triggered = now(),
        updated_at = now();
    ELSIF NEW.stock_quantity = 0 THEN
      INSERT INTO public.inventory_alerts (product_id, alert_type, threshold_quantity, current_quantity)
      VALUES (NEW.id, 'out_of_stock', 0, NEW.stock_quantity)
      ON CONFLICT (product_id, alert_type) DO UPDATE SET
        current_quantity = NEW.stock_quantity,
        last_triggered = now(),
        updated_at = now();
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for inventory alerts
CREATE TRIGGER inventory_alert_trigger_variants
  AFTER UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE FUNCTION public.update_inventory_and_check_alerts();

CREATE TRIGGER inventory_alert_trigger_products
  AFTER UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_inventory_and_check_alerts();

-- Create function to update customer analytics
CREATE OR REPLACE FUNCTION public.update_customer_analytics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update customer profile when an order is completed
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    INSERT INTO public.customer_profiles (user_id, total_orders, total_spent, last_order_date)
    VALUES (NEW.user_id, 1, NEW.total_amount, NEW.created_at)
    ON CONFLICT (user_id) DO UPDATE SET
      total_orders = customer_profiles.total_orders + 1,
      total_spent = customer_profiles.total_spent + NEW.total_amount,
      average_order_value = (customer_profiles.total_spent + NEW.total_amount) / (customer_profiles.total_orders + 1),
      last_order_date = NEW.created_at,
      customer_lifetime_value = customer_profiles.total_spent + NEW.total_amount,
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for customer analytics
CREATE TRIGGER customer_analytics_trigger
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_customer_analytics();
