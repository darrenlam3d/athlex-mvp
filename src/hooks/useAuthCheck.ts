
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isDemoMode } from '@/lib/supabase';
import { toast } from 'sonner';

export const useAuthCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/login-demo', '/registration'];
  const isPublicPath = publicPaths.includes(location.pathname);

  useEffect(() => {
    if (!loading && !isPublicPath && !user && !isDemoMode()) {
      console.log('useAuthCheck - No authenticated user, redirecting to login');
      toast.error('Please log in to access this page');
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate, location.pathname, isPublicPath]);

  return { loading, isPublicPath };
};
