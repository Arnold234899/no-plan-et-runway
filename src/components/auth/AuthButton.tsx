
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      const { data } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      setIsAdmin(!!data);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  if (loading) {
    return (
      <div className="w-8 h-8 bg-zinc-700 rounded-full animate-pulse" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 text-white">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">
            {user.email?.split('@')[0]}
          </span>
        </div>
        {isAdmin && (
          <Link to="/admin">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-zinc-300 hover:bg-zinc-800"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <Button
          onClick={signOut}
          variant="ghost"
          size="sm"
          className="text-white hover:text-zinc-300 hover:bg-zinc-800"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-zinc-950">
        Sign In
      </Button>
    </Link>
  );
};
