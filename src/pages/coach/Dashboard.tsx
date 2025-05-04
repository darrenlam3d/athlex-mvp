
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface CoachProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  coach_role: 'head_coach' | 'assistant_coach' | 'trainer';
}

const CoachDashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<CoachProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('coaches')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error loading coach profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-athlex-accent"></div>
      </div>
    );
  }

  if (!user || !profile) {
    navigate('/auth/login');
    return null;
  }

  // Format coach role for display
  const formatRole = (role: string) => {
    return role
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-athlex-gray-50 pt-16 pb-12">
      <header className="bg-white shadow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-athlex-gray-900">
                Coach Dashboard
              </h1>
              <p className="mt-1 text-sm text-athlex-gray-600">
                Welcome, {profile.first_name} {profile.last_name}
              </p>
            </div>
            <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{profile.first_name} {profile.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Organization</p>
              <p className="font-medium">{profile.organization}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{formatRole(profile.coach_role)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Your Athletes</h2>
            <p className="text-athlex-gray-600">No athletes added yet.</p>
            <Button className="mt-4">Add Athletes</Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Training Plans</h2>
            <p className="text-athlex-gray-600">No training plans created yet.</p>
            <Button className="mt-4">Create Training Plan</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoachDashboard;
