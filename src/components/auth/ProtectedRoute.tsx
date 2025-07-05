
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      if (loading) return;

      if (!user) {
        navigate('/auth');
        return;
      }

      if (requireAdmin) {
        try {
          const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error || !data) {
            navigate('/');
            return;
          }
        } catch (error) {
          navigate('/');
          return;
        }
      }

      setIsAuthorized(true);
      setChecking(false);
    };

    checkAccess();
  }, [user, loading, requireAdmin, navigate]);

  if (loading || checking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};
