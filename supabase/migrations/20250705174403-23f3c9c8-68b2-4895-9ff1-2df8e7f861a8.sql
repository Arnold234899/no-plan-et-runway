
-- Create a table for website users (separate from existing profiles)
CREATE TABLE public.website_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create table for influencer applications
CREATE TABLE public.influencer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  instagram_handle TEXT,
  tiktok_handle TEXT,
  followers_count INTEGER,
  why_interested TEXT,
  collaboration_ideas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for contact messages
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  active BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.website_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for website_users
CREATE POLICY "Users can view their own profile" ON public.website_users
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.website_users
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.website_users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for influencer_applications
CREATE POLICY "Users can view their own applications" ON public.influencer_applications
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert applications" ON public.influencer_applications
  FOR INSERT WITH CHECK (true);

-- RLS Policies for contact_messages
CREATE POLICY "Users can view their own messages" ON public.contact_messages
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- RLS Policies for newsletter_subscriptions
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view subscriptions" ON public.newsletter_subscriptions
  FOR SELECT USING (true);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_website_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.website_users (user_id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create website_users entry when auth.users is created
CREATE TRIGGER on_auth_user_created_website
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_website_user();
