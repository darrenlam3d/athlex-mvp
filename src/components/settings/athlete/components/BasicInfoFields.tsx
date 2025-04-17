
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { ProfileFormValues } from '../types';

interface BasicInfoFieldsProps {
  control: Control<ProfileFormValues>;
}

const BasicInfoFields = ({ control }: BasicInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">First Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your first name" 
                  className="bg-athlex-gray-800 border-athlex-gray-700"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Last Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your last name" 
                  className="bg-athlex-gray-800 border-athlex-gray-700"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="displayName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Display Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="How you want to be known" 
                className="bg-athlex-gray-800 border-athlex-gray-700"
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfoFields;
