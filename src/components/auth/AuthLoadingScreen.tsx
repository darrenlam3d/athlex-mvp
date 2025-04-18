
import React from 'react';
import RouteLoader from '../ui/route-loader';

interface AuthLoadingScreenProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const AuthLoadingScreen = ({ isLoading, children }: AuthLoadingScreenProps) => {
  if (isLoading) {
    return <RouteLoader />;
  }

  return <>{children}</>;
};

export default AuthLoadingScreen;
