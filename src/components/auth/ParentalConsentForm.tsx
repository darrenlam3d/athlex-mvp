
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const parentalConsentSchema = z.object({
  parentEmail: z.string().email('Valid parent email is required'),
  confirmParentEmail: z.string().email('Please confirm parent email')
}).refine(data => data.parentEmail === data.confirmParentEmail, {
  message: "Email addresses don't match",
  path: ["confirmParentEmail"],
});

type ParentalConsentFormValues = z.infer<typeof parentalConsentSchema>;

export const ParentalConsentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ParentalConsentFormValues>({
    resolver: zodResolver(parentalConsentSchema)
  });

  const onSubmit = async (data: ParentalConsentFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (!user) {
        throw new Error("You must be logged in to request parental consent");
      }
      
      const verificationToken = crypto.randomUUID();
      
      const { error } = await supabase
        .from('parental_consent')
        .insert({
          parent_email: data.parentEmail,
          verification_token: verificationToken,
          child_user_id: user.id  // Add the required child_user_id field
        });

      if (error) throw error;

      toast.success('Parent consent request sent', {
        description: 'Please ask your parent to check their email and confirm.',
      });

    } catch (error: any) {
      console.error('Error requesting parental consent:', error);
      toast.error('Failed to send consent request', {
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Parental Consent Required</CardTitle>
        <CardDescription>
          Since you're under 13, we need your parent's permission. Please provide their email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentEmail">Parent's Email</Label>
            <Input
              id="parentEmail"
              type="email"
              {...register('parentEmail')}
              placeholder="parent@example.com"
            />
            {errors.parentEmail && (
              <p className="text-sm text-red-500">{errors.parentEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmParentEmail">Confirm Parent's Email</Label>
            <Input
              id="confirmParentEmail"
              type="email"
              {...register('confirmParentEmail')}
              placeholder="parent@example.com"
            />
            {errors.confirmParentEmail && (
              <p className="text-sm text-red-500">{errors.confirmParentEmail.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Request Parent Consent'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
