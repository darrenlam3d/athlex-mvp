
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export const useWaitlistRegistration = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!role) {
      toast.error("Please select your role");
      return;
    }
    
    if (!gdprConsent) {
      toast.error("Please accept the privacy policy");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Submitting waitlist registration:", { email, role, feedback, gdprConsent });
      
      // Insert into database
      const registrationData = {
        email,
        role,
        feedback: feedback || null,
        gdpr_consent: gdprConsent,
      };
      
      const { error: dbError } = await supabase
        .from('waitlist_registrations')
        .insert([registrationData]);

      if (dbError) {
        if (dbError.code === '23505') { // Unique violation
          throw new Error("This email is already registered.");
        }
        console.error("Database error:", dbError);
        throw dbError;
      }

      console.log("Registration successful - database insert complete");
      
      // After successful database insert, reset form
      setEmail('');
      setPhoneNumber('');
      setRole('');
      setFeedback('');
      setGdprConsent(false);
      
      toast.success("You're in! We'll be in touch soon.");
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    role,
    setRole,
    feedback,
    setFeedback,
    gdprConsent,
    setGdprConsent,
    isSubmitting,
    handleSubmit
  };
};
