
import React, { Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RouteLoader from '../ui/route-loader';

interface RouteTransitionHandlerProps {
  children: React.ReactNode;
}

const RouteTransitionHandler = ({ children }: RouteTransitionHandlerProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation errors
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('Failed to fetch') || 
          event.error?.message?.includes('ChunkLoadError')) {
        console.error('Navigation error detected:', event.error);
        // Attempt to recover by forcing a reload of the current route
        navigate(location.pathname, { replace: true });
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [navigate, location]);

  return (
    <Suspense fallback={<RouteLoader />}>
      {children}
    </Suspense>
  );
};

export default RouteTransitionHandler;
