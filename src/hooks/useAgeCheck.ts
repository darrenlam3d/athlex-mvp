
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export const useAgeCheck = () => {
  const { user } = useAuth();
  const [needsParentalConsent, setNeedsParentalConsent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAge = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if user already has parental consent
        const { data: consent, error: consentError } = await supabase
          .from('parental_consent')
          .select('consent_status')
          .eq('child_user_id', user.id)
          .single();

        if (consentError && consentError.code !== 'PGRST116') {
          console.error('Error checking parental consent:', consentError);
        }

        // If consent exists and is approved, no need for parental consent
        if (consent?.consent_status === 'approved') {
          setNeedsParentalConsent(false);
          setIsLoading(false);
          return;
        }

        // Get user's date of birth from metadata or profile
        const dateOfBirth = user.user_metadata?.date_of_birth;
        
        if (!dateOfBirth) {
          setNeedsParentalConsent(false);
          setIsLoading(false);
          return;
        }

        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        
        // Check if birthday hasn't occurred this year
        if (
          today.getMonth() < birthDate.getMonth() || 
          (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
          calculatedAge--;
        }

        setNeedsParentalConsent(calculatedAge < 13);
      } catch (error) {
        console.error('Error in age check:', error);
        setNeedsParentalConsent(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAge();
  }, [user]);

  return { needsParentalConsent, isLoading };
};
