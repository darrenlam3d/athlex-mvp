
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface FormField {
  label: string;
  type: string;
  options?: string[];
}

interface NewGoalFormProps {
  formFields: FormField[];
  onSuccess: () => void;
  onCancel: () => void;
}

const NewGoalForm: React.FC<NewGoalFormProps> = ({
  formFields,
  onSuccess,
  onCancel
}) => {
  const { toast } = useToast();
  
  // Form schema validation
  const formSchema = z.object({
    metric: z.string().min(1, 'Please select a performance metric'),
    target_value: z.coerce.number().positive('Must be a positive number'),
    start_date: z.date(),
    end_date: z.date()
  }).refine(data => data.end_date > data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metric: '',
      target_value: undefined,
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        // Simulate success for demo mode
        console.log('Demo mode: New goal would be created with:', values);
        setTimeout(onSuccess, 800);
        return;
      }
      
      // For real Supabase implementation
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');
      
      // Insert the new goal
      const { error } = await supabase.from('performance_goals').insert({
        user_id: userData.user.id,
        metric: values.metric,
        target_value: values.target_value,
        current_value: 0, // Starting value
        start_date: values.start_date.toISOString().split('T')[0],
        end_date: values.end_date.toISOString().split('T')[0],
        progress_percent: 0,
        status: 'Not Started'
      });
      
      if (error) throw error;
      
      onSuccess();
    } catch (error) {
      toast({
        title: 'Error creating goal',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="border-gray-700 bg-athlex-gray-900">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Create New Performance Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Performance Metric Field */}
            <FormField
              control={form.control}
              name="metric"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performance Metric</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a metric" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formFields.find(f => f.label === "Performance Metric")?.options?.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Target Value Field */}
            <FormField
              control={form.control}
              name="target_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Value</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter target value" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Start Date Field */}
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="pointer-events-auto p-3"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* End Date Field */}
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="pointer-events-auto p-3"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-4 pt-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Create Goal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewGoalForm;
