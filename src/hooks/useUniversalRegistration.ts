
import { useState } from 'react';
import { UniversalFormValues } from '@/components/auth/UniversalRegistrationForm';
import { toast } from 'sonner';

export const useUniversalRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [universalFormData, setUniversalFormData] = useState<UniversalFormValues | null>(null);

  const handleUniversalSubmit = async (data: UniversalFormValues) => {
    try {
      setIsLoading(true);
      setUniversalFormData(data);
      toast.success('Account details saved! Complete your profile to finish registration.');
    } catch (error) {
      console.error('Error in universal registration step:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    universalFormData,
    handleUniversalSubmit
  };
};
