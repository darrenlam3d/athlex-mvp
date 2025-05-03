
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

const ParentalConsentVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [childName, setChildName] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Missing verification token");
        setLoading(false);
        return;
      }

      try {
        // Find the consent record with this token
        const { data, error: findError } = await supabase
          .from('parental_consent')
          .select('child_user_id, consent_status')
          .eq('verification_token', token)
          .single();

        if (findError || !data) {
          throw new Error("Invalid or expired verification token");
        }

        // If already approved, just show success
        if (data.consent_status === 'approved') {
          setVerified(true);
          setLoading(false);
          return;
        }

        // Get child's name for display
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', data.child_user_id)
          .single();

        if (userData) {
          setChildName(`${userData.first_name} ${userData.last_name}`);
        }

        setLoading(false);
      } catch (err: any) {
        console.error("Verification error:", err);
        setError(err.message || "An error occurred during verification");
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleConsent = async (approve: boolean) => {
    if (!token) return;
    
    setLoading(true);
    
    try {
      // Update the consent record
      const { error: updateError } = await supabase
        .from('parental_consent')
        .update({
          consent_status: approve ? 'approved' : 'rejected',
          consent_date: new Date().toISOString()
        })
        .eq('verification_token', token);
        
      if (updateError) throw updateError;
      
      // If approved, update the user's age_verified status
      if (approve) {
        const { data: consentData } = await supabase
          .from('parental_consent')
          .select('child_user_id')
          .eq('verification_token', token)
          .single();
          
        if (consentData) {
          await supabase
            .from('profiles')
            .update({ age_verified: true })
            .eq('id', consentData.child_user_id);
        }
        
        setVerified(true);
        toast.success("Thank you! Parental consent has been provided.");
      } else {
        toast.error("You have denied consent for this account.");
        // Could redirect to a "consent denied" page
      }
      
    } catch (err: any) {
      console.error("Consent error:", err);
      setError(err.message || "An error occurred while processing your response");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-athlex-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-athlex-gray-200 rounded mb-4 mx-auto w-1/2"></div>
            <div className="h-6 bg-athlex-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-athlex-gray-200 rounded mb-2 w-5/6 mx-auto"></div>
            <div className="h-6 bg-athlex-gray-200 rounded w-4/6 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-athlex-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/b84ddeca-bec0-41af-8ad4-07c922bd1508.png" 
              alt="ATHLEX Logo" 
              className="h-12 w-auto" 
            />
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <X className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-athlex-gray-900 mb-2">
              Verification Error
            </h1>
            <p className="text-athlex-gray-600">
              {error}
            </p>
            
            <div className="mt-6">
              <Button asChild>
                <a href="mailto:support@athlex.info">
                  Contact Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-athlex-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/b84ddeca-bec0-41af-8ad4-07c922bd1508.png" 
              alt="ATHLEX Logo" 
              className="h-12 w-auto" 
            />
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-athlex-gray-900 mb-2">
              Thank You!
            </h1>
            <p className="text-athlex-gray-600">
              You have successfully provided parental consent for {childName || "your child"}'s ATHLEX account.
            </p>
            <p className="mt-2 text-athlex-gray-600">
              They now have full access to the platform.
            </p>
            
            <div className="mt-6">
              <Button onClick={() => navigate('/')}>
                Go to ATHLEX Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-athlex-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/b84ddeca-bec0-41af-8ad4-07c922bd1508.png" 
            alt="ATHLEX Logo" 
            className="h-12 w-auto" 
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-athlex-gray-900 mb-4">
          Parental Consent Request
        </h1>
        
        <div className="space-y-4 text-athlex-gray-700">
          <p>
            Your child, <span className="font-semibold">{childName || "a minor"}</span>, has created an account on ATHLEX, 
            a platform for athlete performance tracking and talent discovery.
          </p>
          
          <p>
            As required by PDPA regulations, we need your consent before allowing 
            users under 13 years old to use our platform.
          </p>
          
          <div className="bg-athlex-gray-100 p-4 rounded-md">
            <h3 className="font-medium text-athlex-gray-900">ATHLEX collects the following data:</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Basic profile information (name, age, sports interests)</li>
              <li>Athletic performance metrics</li>
              <li>Optional health data (such as height, weight)</li>
              <li>Training logs and goals</li>
            </ul>
          </div>
          
          <p>
            By providing consent, you agree to allow your child to use ATHLEX and 
            for us to collect and process this information in accordance with our 
            <a href="/privacy" className="text-athlex-accent hover:underline"> Privacy Policy</a>.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={() => handleConsent(true)}
              className="flex-1" 
              disabled={loading}
            >
              {loading ? 'Processing...' : 'I Approve'}
            </Button>
            
            <Button 
              onClick={() => handleConsent(false)}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              I Do Not Approve
            </Button>
          </div>
          
          <p className="text-sm text-center text-athlex-gray-500">
            Need help? <a href="mailto:support@athlex.info" className="text-athlex-accent hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentalConsentVerify;
