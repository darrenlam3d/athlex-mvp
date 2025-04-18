
import React, { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RouteLoader from '../ui/route-loader';
import { toast } from 'sonner';
import { isDemoMode } from '@/lib/supabase';

const RouteTransitionHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Check authentication
  useEffect(() => {
    if (!loading && !user && !isDemoMode()) {
      console.log('RouteTransitionHandler - No authenticated user, redirecting to login');
      toast.error('Please log in to access this page');
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Handle transitions
  useEffect(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }

    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
    
    setLoadingTimeout(timeout);

    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [location.pathname]);

  // Show loading state while checking auth
  if (loading) {
    return <RouteLoader />;
  }

  return (
    <Suspense fallback={<RouteLoader />}>
      {isTransitioning ? <RouteLoader /> : <Outlet />}
    </Suspense>
  );
};

export default RouteTransitionHandler;
