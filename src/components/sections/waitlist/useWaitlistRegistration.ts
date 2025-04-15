
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

  const sendNotification = async (registrationData: any) => {
    try {
      const response = await fetch('https://dndudgqkoiybenqnavoi.supabase.co/functions/v1/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'waitlist',
          data: registrationData
        })
      });
      
      if (!response.ok) {
        console.warn(`Notification service returned status: ${response.status}`);
        // Don't show warning toast here, as registration was successful
      }
    } catch (error) {
      console.warn('Notification service error:', error);
      // Don't show warning toast here, as registration was successful
    }
  };

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
      const registrationData = {
        email,
        role,
        feedback: feedback || null,
        gdpr_consent: gdprConsent,
        created_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('waitlist_registrations')
        .insert([registrationData]);

      if (error) {
        throw error;
      }
      
      // Send notification after successful registration
      await sendNotification(registrationData);
      
      // Reset form
      setEmail('');
      setPhoneNumber('');
      setRole('');
      setFeedback('');
      setGdprConsent(false);
      
      toast.success("You're in! We'll be in touch soon.");
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === '23505') { // Unique violation
        toast.error("This email is already registered.");
      } else {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
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
