
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface CoachLayoutProps {
  children: ReactNode;
}

const CoachLayout: React.FC<CoachLayoutProps> = ({ children }) => {
  const { role, loading } = useAuth();
  
  console.log('CoachLayout - Current role:', role);
  console.log('CoachLayout - Loading state:', loading);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
      </div>
    );
  }

  // Redirect non-coach users to their appropriate dashboard
  if (role && role !== 'coach') {
    console.log('CoachLayout - Redirecting non-coach user to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-athlex-background text-white">
        <DashboardSidebar />
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CoachLayout;
