
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  soreness_score: z.string().min(1, {
    message: "Please select a soreness score",
  }),
  fatigue_score: z.string().min(1, {
    message: "Please select a fatigue score",
  }),
  mood_score: z.string().min(1, {
    message: "Please select a mood score",
  }),
  notes: z.string().optional(),
});

interface WellnessLogFormProps {
  onSuccess: () => void;
}

const WellnessLogForm: React.FC<WellnessLogFormProps> = ({ onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soreness_score: "",
      fatigue_score: "",
      mood_score: "",
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create wellness data object
    const wellnessData = {
      soreness_score: parseInt(values.soreness_score),
      fatigue_score: parseInt(values.fatigue_score),
      mood_score: parseInt(values.mood_score),
      notes: values.notes,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('athlex_wellness', JSON.stringify(wellnessData));
    
    // Show success message
    toast.success("Wellness data logged successfully!");
    
    // Trigger success callback
    onSuccess();
  };

  const scoreOptions = [1, 2, 3, 4, 5];

  return (
    <Card className="bg-athlex-gray-900/80 border-athlex-gray-800 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 mb-4">
            <h3 className="text-lg font-medium">How are you feeling today?</h3>
            <p className="text-sm text-gray-400">
              Rate each aspect from 1 (minimal) to 5 (severe)
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="soreness_score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Muscle Soreness</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                      <SelectValue placeholder="Select soreness level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                    {scoreOptions.map(score => (
                      <SelectItem key={`soreness-${score}`} value={score.toString()}>
                        {score} - {score === 1 ? 'Minimal' : score === 5 ? 'Severe' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="fatigue_score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fatigue Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                      <SelectValue placeholder="Select fatigue level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                    {scoreOptions.map(score => (
                      <SelectItem key={`fatigue-${score}`} value={score.toString()}>
                        {score} - {score === 1 ? 'Fresh' : score === 5 ? 'Exhausted' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="mood_score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overall Mood</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                      <SelectValue placeholder="Select mood level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                    {scoreOptions.map(score => (
                      <SelectItem key={`mood-${score}`} value={score.toString()}>
                        {score} - {score === 1 ? 'Very Low' : score === 5 ? 'Excellent' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific details about how you're feeling"
                    className="resize-none bg-athlex-gray-800 border-athlex-gray-700"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Log Wellness Data</Button>
        </form>
      </Form>
    </Card>
  );
};

export default WellnessLogForm;
