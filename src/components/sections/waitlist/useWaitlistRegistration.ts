
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export const useWaitlistRegistration = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!role) {
      toast.error("Please select your role");
      return;
    }

    if (interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }
    
    if (!gdprConsent) {
      toast.error("Please accept the privacy policy");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Submitting waitlist registration:", { email, name, phoneNumber, role, interests, feedback, gdprConsent });
      
      const { data, error: dbError } = await supabase
        .from('waitlist_registrations')
        .insert({
          email,
          name,
          phone_number: phoneNumber || null,
          role,
          interests,
          feedback: feedback || null,
          gdpr_consent: gdprConsent,
        })
        .select();

      if (dbError) {
        console.error("Detailed Supabase Insert Error:", dbError);
        
        if (dbError.code === '23505') {
          toast.error("This email is already registered.");
        } else if (dbError.code === '22001') {
          toast.error("One of the fields exceeds its maximum length.");
        } else {
          toast.error(`Registration failed: ${dbError.message || 'Unknown error'}`);
        }
        throw dbError;
      }

      console.log("Registration successful:", data);
      
      // Reset form after successful submission
      setEmail('');
      setName('');
      setPhoneNumber('');
      setRole('');
      setInterests([]);
      setFeedback('');
      setGdprConsent(false);
      
    } catch (error: any) {
      console.error('Full registration error:', error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    role,
    setRole,
    interests,
    setInterests,
    feedback,
    setFeedback,
    gdprConsent,
    setGdprConsent,
    isSubmitting,
    handleSubmit
  };
};
