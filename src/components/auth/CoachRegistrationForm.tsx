
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { coachProfileSchema, type CoachProfileFormValues } from './types';

interface CoachRegistrationFormProps {
  onSubmit: (data: CoachProfileFormValues) => void;
  isLoading?: boolean;
}

const CoachRegistrationForm = ({ onSubmit, isLoading }: CoachRegistrationFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CoachProfileFormValues>({
    resolver: zodResolver(coachProfileSchema)
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Coach Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Team Name (Optional)"
              {...register('teamName')}
            />
          </div>
          
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
              placeholder="Country"
              {...register('country')}
              className={errors.country ? 'border-red-500' : ''}
            />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>

          <Select {...register('coachingLevel')}>
            <SelectTrigger>
              <SelectValue placeholder="Select coaching level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="club">Club</SelectItem>
              <SelectItem value="academy">Academy</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
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

export default CoachRegistrationForm;
