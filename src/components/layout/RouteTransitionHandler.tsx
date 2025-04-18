
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import AuthLoadingScreen from '@/components/auth/AuthLoadingScreen';
import RouteLoader from '../ui/route-loader';

const RouteTransitionHandler = () => {
  const { loading } = useAuthCheck();
  const location = useLocation();
  
  // Define public paths that should bypass auth checks
  const publicPaths = ['/', '/login', '/login-demo', '/registration'];
  const isPublicPath = publicPaths.includes(location.pathname);
  
  // For public paths, we'll skip the auth loading screen
  if (isPublicPath) {
    return (
      <Suspense fallback={<RouteLoader />}>
        <Outlet />
      </Suspense>
    );
  }
  
  return (
    <AuthLoadingScreen isLoading={loading}>
      <Suspense fallback={<RouteLoader />}>
        <Outlet />
      </Suspense>
    </AuthLoadingScreen>
  );
};

export default RouteTransitionHandler;
