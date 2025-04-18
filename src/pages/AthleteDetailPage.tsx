
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';
import { useUserRole } from '@/contexts/UserRoleContext';
import { getAthleteById } from '@/utils/athleteDetailUtils';
import AthleteDetailHeader from '@/components/athlete/detail/AthleteDetailHeader';
import AthleteDetailContent from '@/components/athlete/detail/AthleteDetailContent';
import AthleteDetailLayout from '@/components/athlete/detail/AthleteDetailLayout';

const AthleteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userRole } = useUserRole();
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Log the current user role for debugging
  useEffect(() => {
    console.log("Current user role on athlete detail page:", userRole);
  }, [userRole]);
  
  // Allow both scouts and coaches to view athlete profiles
  const hasAccess = userRole === 'scout' || userRole === 'coach';
  
  if (!hasAccess) {
    console.log("Access denied: user role is", userRole);
    toast.error("You don't have permission to view athlete profiles");
    return <Navigate to="/athlete-dashboard" />;
  }

  // Query for athlete data
  const { data: athlete, isLoading, isError } = useQuery({
    queryKey: ['athlete', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Athlete ID is required');
      }
      return await getAthleteById(id, isSupabaseConfigured(), supabase);
    }
  });

  // Check if athlete is in shortlist and connection status
  useEffect(() => {
    setIsShortlisted(Math.random() > 0.5);
    if (userRole === 'coach') {
      setIsConnected(Math.random() > 0.3);
    } else {
      setIsConnected(true);
    }
  }, [id, userRole]);

  const handleAddToShortlist = () => {
    if (athlete) {
      toast.success(`${athlete.name} added to shortlist`);
      setIsShortlisted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-athlex-background text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-athlex-accent"></div>
      </div>
    );
  }

  if (isError || !athlete) {
    return (
      <div className="min-h-screen bg-athlex-background text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Athlete Not Found</h2>
          <p className="text-gray-400 mb-6">The athlete you're looking for might not exist or you don't have permission to view it.</p>
          <AthleteDetailHeader />
        </div>
      </div>
    );
  }

  return (
    <AthleteDetailLayout>
      <AthleteDetailHeader />
      <AthleteDetailContent
        athlete={athlete}
        id={id || ''}
        isShortlisted={isShortlisted}
        isConnected={isConnected}
        onAddToShortlist={handleAddToShortlist}
      />
    </AthleteDetailLayout>
  );
};

export default AthleteDetailPage;
