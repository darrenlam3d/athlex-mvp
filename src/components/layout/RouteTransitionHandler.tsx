
import React, { Suspense } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RouteLoader from '../ui/route-loader';
import { toast } from 'sonner';
import { isDemoMode } from '@/lib/supabase';

const RouteTransitionHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/login-demo', '/registration'];
  const isPublicPath = publicPaths.includes(location.pathname);

  // Redirect unauthenticated users
  React.useEffect(() => {
    if (!loading && !isPublicPath && !user && !isDemoMode()) {
      console.log('RouteTransitionHandler - No authenticated user, redirecting to login');
      toast.error('Please log in to access this page');
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate, location.pathname, isPublicPath]);

  // Show loading state while checking auth
  if (loading) {
    return <RouteLoader />;
  }

  return (
    <Suspense fallback={<RouteLoader />}>
      <Outlet />
    </Suspense>
  );
};

export default RouteTransitionHandler;
