
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { athleteProfileSchema, type AthleteProfileFormValues } from './types';

interface AthleteRegistrationFormProps {
  onSubmit: (data: AthleteProfileFormValues) => void;
  isLoading?: boolean;
}

const AthleteRegistrationForm = ({ onSubmit, isLoading }: AthleteRegistrationFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AthleteProfileFormValues>({
    resolver: zodResolver(athleteProfileSchema)
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Athlete Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Sport"
              {...register('sport')}
              className={errors.sport ? 'border-red-500' : ''}
            />
            {errors.sport && (
              <p className="text-sm text-red-500">{errors.sport.message}</p>
            )}
          </div>
          
          <div>
            <Input
              placeholder="Position (Optional)"
              {...register('position')}
            />
          </div>

          <div>
            <Input
              placeholder="Country"
              {...register('country')}
              className={errors.country ? 'border-red-500' : ''}
            />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>

          <Select {...register('experienceLevel')}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="amateur">Amateur</SelectItem>
              <SelectItem value="semi_pro">Semi-Pro</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Complete Registration'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AthleteRegistrationForm;
