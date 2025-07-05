
-- Drop the problematic policies first
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Only owner can manage admin users" ON public.admin_users;

-- Create simpler, non-recursive policies
CREATE POLICY "Admins can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM admin_users au2 
      WHERE au2.user_id = auth.uid() AND au2.is_owner = true
    )
  );

CREATE POLICY "Only owner can manage admin users" 
  ON public.admin_users 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au2 
      WHERE au2.user_id = auth.uid() AND au2.is_owner = true
    )
  );

-- Also fix the products policy to avoid similar issues
DROP POLICY IF EXISTS "Admins can manage all products" ON public.products;

CREATE POLICY "Admins can manage all products" 
  ON public.products 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Make sure the owner record exists with the correct email
DELETE FROM public.admin_users WHERE email = 'ferdinandthandoarnold@gmail.com';
INSERT INTO public.admin_users (email, is_owner, user_id) 
VALUES ('ferdinandthandoarnold@gmail.com', true, NULL);
