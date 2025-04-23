
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// The UI goal type to match GoalPage + ActiveGoalsList
interface UIGoal {
  goal_id: string;
  metric: string;
  target_value: number;
  current_value: number;
  unit: string;
  start_date: string;
  end_date: string;
  progress_percent: number;
  status: string;
}

// Form schema
const formSchema = z.object({
  metric: z.string().min(3, { message: "Metric name is required" }),
  target_value: z.string().min(1, { message: "Target value is required" }),
  current_value: z.string(),
  unit: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
});

interface GoalCreationFormProps {
  onSubmit: (data: UIGoal) => void;
  onCancel: () => void;
}

const GoalCreationForm: React.FC<GoalCreationFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metric: '',
      target_value: '',
      current_value: '0',
      unit: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const targetNum = parseFloat(values.target_value);
    const currentNum = parseFloat(values.current_value) || 0;
    const progress = targetNum > 0 ? Math.round((currentNum / targetNum) * 100) : 0;
    const newGoal: UIGoal = {
      goal_id: `goal_${Date.now()}`,
      metric: values.metric,
      target_value: targetNum,
      current_value: currentNum,
      unit: values.unit || '',
      start_date: values.start_date,
      end_date: values.end_date,
      progress_percent: progress,
      status: 'In Progress',
    };
    onSubmit(newGoal);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="metric"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metric Name</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Sprint Speed, Vertical Jump" {...field} className="bg-athlex-gray-800 border-athlex-gray-700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="target_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Value</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} className="bg-athlex-gray-800 border-athlex-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Value</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} className="bg-athlex-gray-800 border-athlex-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit (optional)</FormLabel>
              <FormControl>
                <Input placeholder="E.g., cm, kg, seconds" {...field} className="bg-athlex-gray-800 border-athlex-gray-700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="bg-athlex-gray-800 border-athlex-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="bg-athlex-gray-800 border-athlex-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Create Goal</Button>
        </div>
      </form>
    </Form>
  );
};

export default GoalCreationForm;

