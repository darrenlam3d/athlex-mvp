
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { scoutProfileSchema, type ScoutProfileFormValues } from './types';

interface ScoutRegistrationFormProps {
  onSubmit: (data: ScoutProfileFormValues) => void;
  isLoading?: boolean;
}

const ScoutRegistrationForm = ({ onSubmit, isLoading }: ScoutRegistrationFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ScoutProfileFormValues>({
    resolver: zodResolver(scoutProfileSchema)
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Scout Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Organization (Optional)"
              {...register('organization')}
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

          <div>
            <Input
              placeholder="Scouting Region"
              {...register('scoutingRegion')}
              className={errors.scoutingRegion ? 'border-red-500' : ''}
            />
            {errors.scoutingRegion && (
              <p className="text-sm text-red-500">{errors.scoutingRegion.message}</p>
            )}
          </div>

          <Select {...register('scoutingLevel')}>
            <SelectTrigger>
              <SelectValue placeholder="Select scouting level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youth">Youth</SelectItem>
              <SelectItem value="semi_pro">Semi-Pro</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="national">National</SelectItem>
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

export default ScoutRegistrationForm;
