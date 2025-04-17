
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { ProfileFormValues } from '../types';

interface SportFieldsProps {
  control: Control<ProfileFormValues>;
}

const SportFields = ({ control }: SportFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={control}
        name="sport"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Sport</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Position</FormLabel>
            <FormControl>
              <Input 
                placeholder="Your position" 
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
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Age</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Your age" 
                className="bg-athlex-gray-800 border-athlex-gray-700"
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SportFields;
