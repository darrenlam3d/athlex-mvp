
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import AuthLoadingScreen from '@/components/auth/AuthLoadingScreen';
import RouteLoader from '../ui/route-loader';

const RouteTransitionHandler = () => {
  const { loading } = useAuthCheck();
  
  return (
    <AuthLoadingScreen isLoading={loading}>
      <Suspense fallback={<RouteLoader />}>
        <Outlet />
      </Suspense>
    </AuthLoadingScreen>
  );
};

export default RouteTransitionHandler;
