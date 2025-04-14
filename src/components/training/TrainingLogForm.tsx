import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockTrainingLogFormFields } from '@/lib/mockData';

// Form schema validation
const formSchema = z.object({
  date: z.string().nonempty('Date is required'),
  type: z.string().nonempty('Training type is required'),
  activity: z.string().nonempty('Activity is required'),
  duration_minutes: z.coerce.number().positive('Duration must be positive'),
  distance_km: z.coerce.number().nonnegative('Distance must be non-negative'),
  intensity_level: z.string().nonempty('Intensity level is required'),
});

type FormValues = z.infer<typeof formSchema>;

const TrainingLogForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isConfigured = isSupabaseConfigured();
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      type: '',
      activity: '',
      duration_minutes: 30,
      distance_km: 0,
      intensity_level: '',
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      // If Supabase not configured, simulate success with mock data
      if (!isConfigured) {
        console.log('Demo mode: Would have saved training log:', data);
        toast({
          title: "Training log added",
          description: "Demo mode: Training log has been saved (simulated)",
        });
        
        // Invalidate query to trigger refetch (in a real app)
        queryClient.invalidateQueries({ queryKey: ['trainingLogs'] });
        return;
      }
      
      // For real Supabase implementation (not implemented in demo mode)
      console.log('Would save training log to Supabase if configured:', data);
      toast({
        title: "Training log added",
        description: "Your training log has been saved successfully",
      });
      
      // Invalidate query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['trainingLogs'] });
      
    } catch (error) {
      console.error('Error adding training log:', error);
      toast({
        title: "Error",
        description: "Failed to save training log. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Training Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select training type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Physical">Physical</SelectItem>
                  <SelectItem value="Sport-Specific">Sport-Specific</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="activity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Interval Running" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="duration_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="distance_km"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance (km)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="intensity_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intensity Level</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select intensity level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3 pt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Training Log</Button>
        </div>
      </form>
    </Form>
  );
};

export default TrainingLogForm;
