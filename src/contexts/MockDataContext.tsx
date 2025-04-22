
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import mockDataProvider, { setCurrentUser } from '@/lib/mock/mockDataProvider';
import { isDemoMode } from '@/lib/supabase';

// Create the context
interface MockDataContextType {
  isDemo: boolean;
  mockData: typeof mockDataProvider;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

// Provider component
export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  const { user, role } = useAuth();
  const [isDemo, setIsDemo] = useState(false);

  // Check if we're in demo mode and set up appropriate mock user
  useEffect(() => {
    const checkDemoMode = () => {
      const demoModeActive = isDemoMode();
      setIsDemo(demoModeActive);
      
      if (demoModeActive && role) {
        // In demo mode, set the current user based on role
        // Handle different roles for mockDataProvider
        const effectiveRole = (() => {
          if (role === 'athlete' || role === 'coach') return role;
          // Default to 'athlete' for scout or any other role
          return 'athlete';
        })();
        
        const userId = `${effectiveRole}_001`; // Use the first user of each role type
        setCurrentUser(userId, effectiveRole);
        console.log(`Mock data initialized for demo user: ${userId} with role: ${effectiveRole}`);
      }
    };
    
    checkDemoMode();
  }, [role]);

  // Value provided by the context
  const value = {
    isDemo,
    mockData: mockDataProvider
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};

// Hook to use the mock data context
export const useMockData = () => {
  const context = useContext(MockDataContext);
  
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  
  return context;
};
