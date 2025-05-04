
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';

interface Profile {
  role: 'athlete' | 'coach' | 'scout';
  first_name: string;
  last_name: string;
  age_verified: boolean;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsConsent, setNeedsConsent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        let roleData;
        
        // First check if user is an athlete
        const { data: athleteData, error: athleteError } = await supabase
          .from('athletes')
          .select('first_name, last_name, age_verified')
          .eq('id', user.id)
          .maybeSingle();
          
        if (athleteData) {
          roleData = {
            role: 'athlete' as const,
            ...athleteData
          };
          
          // If user is an athlete and not age verified, check for consent status
          if (!athleteData.age_verified) {
            const { data: consentData, error: consentError } = await supabase
              .from('parental_consents')
              .select('consent_status')
              .eq('athlete_id', user.id)
              .maybeSingle();

            if (consentError) throw consentError;
            setNeedsConsent(consentData?.consent_status !== true);
          }
        } else {
          // If not an athlete, check if user is a coach
          const { data: coachData, error: coachError } = await supabase
            .from('coaches')
            .select('first_name, last_name')
            .eq('id', user.id)
            .maybeSingle();
            
          if (coachData) {
            roleData = {
              role: 'coach' as const,
              ...coachData,
              age_verified: true // Coaches don't need age verification
            };
          }
        }
        
        setProfile(roleData || null);
      } catch (error) {
        console.error('Error loading user profile:', error);
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

  // Render different dashboard based on user role
  const renderDashboard = () => {
    if (needsConsent) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-500 mr-4 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800">Parental Consent Required</h3>
              <p className="mt-2 text-yellow-700">
                Since you are under 13, your parent or guardian needs to approve your account.
                We've sent an email to the parent email you provided during registration.
                Some features may be limited until consent is provided.
              </p>
            </div>
          </div>
        </div>
      );
    }

    switch (profile.role) {
      case 'athlete':
        return <AthleteDashboard />;
      case 'coach':
        return <CoachDashboard />;
      case 'scout':
        return <ScoutDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-athlex-gray-50 pt-16 pb-12">
      <header className="bg-white shadow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-athlex-gray-900">
              Welcome, {profile?.first_name}
            </h1>
            <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        {/* Role-based dashboard content */}
        {renderDashboard()}
      </main>
    </div>
  );
};

// Placeholder dashboard components for different roles
const AthleteDashboard = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Your Performance</h2>
      <p className="text-athlex-gray-600">Athlete dashboard coming soon!</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Training Sessions</h2>
      <p className="text-athlex-gray-600">No training sessions yet.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Your Goals</h2>
      <p className="text-athlex-gray-600">Set your first goal to get started!</p>
    </div>
  </div>
);

const CoachDashboard = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Your Athletes</h2>
      <p className="text-athlex-gray-600">Coach dashboard coming soon!</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Training Plans</h2>
      <p className="text-athlex-gray-600">Create your first training plan.</p>
    </div>
  </div>
);

const ScoutDashboard = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Athlete Discovery</h2>
      <p className="text-athlex-gray-600">Scout dashboard coming soon!</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Your Shortlist</h2>
      <p className="text-athlex-gray-600">Add athletes to your shortlist.</p>
    </div>
  </div>
);

export default Dashboard;
