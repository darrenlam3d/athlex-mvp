import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';

interface AthleteProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  sport: string;
  age_verified: boolean;
}

const AthleteDashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<AthleteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [consentStatus, setConsentStatus] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get athlete profile
        const { data: athleteData, error: athleteError } = await supabase
          .from('athletes')
          .select('*')
          .eq('id', user.id)
          .single();

        if (athleteError) {
          console.error('Error loading athlete profile:', athleteError);
          setLoading(false);
          return;
        }

        setProfile(athleteData);

        // If athlete is not age verified, check parental consent status
        if (!athleteData.age_verified) {
          const { data: consentData, error: consentError } = await supabase
            .from('parental_consents')
            .select('consent_status')
            .eq('athlete_id', user.id)
            .maybeSingle();

          if (consentError) {
            console.error('Error loading consent status:', consentError);
          } else {
            setConsentStatus(consentData?.consent_status || false);
          }
        } else {
          setConsentStatus(true); // Adult athletes are automatically considered to have consent
        }
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

  return (
    <div className="min-h-screen bg-athlex-gray-50 pt-16 pb-12">
      <header className="bg-white shadow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-athlex-gray-900">
                Athlete Dashboard
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
        {/* Consent Warning */}
        {consentStatus === false && (
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
        )}

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
              <p className="text-sm text-gray-500">Sport</p>
              <p className="font-medium">{profile.sport}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{new Date(profile.birth_date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Your Performance</h2>
            <p className="text-athlex-gray-600">No performance data available yet.</p>
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
      </main>
    </div>
  );
};

export default AthleteDashboard;
