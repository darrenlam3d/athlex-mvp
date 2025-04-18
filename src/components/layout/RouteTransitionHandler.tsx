
import React, { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RouteLoader from '../ui/route-loader';
import { toast } from 'sonner';

interface RouteTransitionHandlerProps {
  children: React.ReactNode;
}

const RouteTransitionHandler = ({ children }: RouteTransitionHandlerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Reset transitioning state when location changes
  useEffect(() => {
    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }

    // Show transition state for at least 200ms to prevent flickering
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

  // Handle navigation errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.message?.includes('Failed to fetch') || 
        event.error?.message?.includes('ChunkLoadError') ||
        event.error?.message?.includes('NetworkError')
      ) {
        console.error('Navigation error detected:', event.error);
        
        // Show error message to user
        toast.error('Network error. Trying to recover...');
        
        // Attempt to recover by forcing a reload of the current route
        navigate(location.pathname, { replace: true });
      }
    };

    // Handle 404 errors by redirecting to the closest valid route
    const handleRouteNotFound = () => {
      if (location.pathname.includes('/athlete-')) {
        // Convert old format to new format
        const newPath = location.pathname.replace('/athlete-', '/athlete/');
        console.log(`Redirecting from ${location.pathname} to ${newPath}`);
        navigate(newPath, { replace: true });
        return true;
      }
      
      return false;
    };

    // Try to handle route not found
    if (location.pathname.endsWith('-404')) {
      if (!handleRouteNotFound()) {
        // If we couldn't recover, show error
        toast.error('Page not found. Redirecting to dashboard.');
        navigate('/', { replace: true });
      }
    }

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [navigate, location]);

  return (
    <Suspense fallback={<RouteLoader />}>
      {isTransitioning ? <RouteLoader /> : children}
    </Suspense>
  );
};

export default RouteTransitionHandler;
