
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

  // Handle route normalization
  useEffect(() => {
    // Check for old route format
    if (location.pathname.includes('/athlete-')) {
      // Convert old format to new format
      const newPath = location.pathname.replace('/athlete-', '/athlete/');
      console.log(`Redirecting from ${location.pathname} to ${newPath}`);
      navigate(newPath, { replace: true });
      return;
    }

    // Special handling for root path
    if (location.pathname === '/') {
      return; // Allow root path to render normally
    }
  }, [location.pathname, navigate]);

  // Reset transitioning state when location changes
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

  return (
    <Suspense fallback={<RouteLoader />}>
      {isTransitioning ? <RouteLoader /> : children}
    </Suspense>
  );
};

export default RouteTransitionHandler;
