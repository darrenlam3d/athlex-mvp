
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ParentalConsentPending = () => {
  return (
    <div className="min-h-screen bg-athlex-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/3b9cb1f8-3d77-492e-840f-6b43dfe99a5f.png" 
            alt="ATHLEX Logo" 
            className="h-12 w-auto" 
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-athlex-gray-900 mb-4">
          Parental Consent Required
        </h1>
        
        <div className="space-y-4 text-athlex-gray-700">
          <p>
            Since you're under 13 years old, we need your parent or guardian's permission
            before you can fully use ATHLEX.
          </p>
          
          <p>
            We've sent an email to your parent/guardian at the address you provided.
            They'll need to click the link in that email to approve your account.
          </p>
          
          <div className="bg-athlex-gray-100 p-4 rounded-md">
            <h3 className="font-medium text-athlex-gray-900">What happens next?</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Your parent/guardian will receive an email with a consent form</li>
              <li>Once they approve, you'll have full access to ATHLEX</li>
              <li>Until then, your account will have limited functionality</li>
              <li>We'll notify you by email when consent is provided</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <Button asChild className="w-full">
            <Link to="/auth/login">
              Continue to Login
            </Link>
          </Button>
          
          <p className="text-sm text-center text-athlex-gray-500">
            Need help? <a href="mailto:support@athlex.info" className="text-athlex-accent hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentalConsentPending;
