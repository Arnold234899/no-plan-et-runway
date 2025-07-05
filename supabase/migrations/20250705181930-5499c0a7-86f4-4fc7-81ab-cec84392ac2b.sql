
-- Update the owner email with the provided address
UPDATE public.admin_users 
SET email = 'ferdinandthandoarnold@gmail.com' 
WHERE is_owner = true;

-- If no owner exists yet, insert the owner record
INSERT INTO public.admin_users (email, is_owner) 
SELECT 'ferdinandthandoarnold@gmail.com', true
WHERE NOT EXISTS (
  SELECT 1 FROM public.admin_users WHERE is_owner = true
);
