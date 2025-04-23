
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  type: z.string({
    required_error: "Please select a training type",
  }),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  duration: z.coerce.number().min(1, {
    message: "Duration must be at least 1 minute",
  }),
  intensity: z.string({
    required_error: "Please select an intensity level",
  }),
  notes: z.string().optional(),
});

interface TrainingLogFormProps {
  onSuccess: () => void;
}

const TrainingLogForm: React.FC<TrainingLogFormProps> = ({ onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      title: "",
      duration: 30,
      intensity: "",
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Get existing sessions or use default
    const storedSessions = localStorage.getItem('athlex_sessions');
    const sessions = storedSessions ? JSON.parse(storedSessions) : [
      { week: 'Week 1', load: 350 },
      { week: 'Week 2', load: 400 },
      { week: 'Week 3', load: 300 },
      { week: 'Week 4', load: 450 },
      { week: 'Current', load: 600 },
    ];
    
    // Calculate the new load based on duration and intensity
    const intensityMultiplier = {
      "low": 3,
      "medium": 5,
      "high": 7,
      "very_high": 10
    };
    
    // @ts-ignore: Intensity key might not exist
    const loadFactor = intensityMultiplier[values.intensity] || 5;
    const additionalLoad = values.duration * loadFactor;
    
    // Update the current week's load
    if (sessions.length > 0) {
      const lastSessionIndex = sessions.length - 1;
      sessions[lastSessionIndex].load += additionalLoad;
    }
    
    // Save updated sessions
    localStorage.setItem('athlex_sessions', JSON.stringify(sessions));
    
    // Show success message
    toast.success("Training session logged successfully!", {
      description: `${values.title} - ${values.duration} minutes`,
    });
    
    // Trigger the success callback
    onSuccess();
  };

  return (
    <Card className="bg-athlex-gray-900/80 border-athlex-gray-800 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Training Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                      <SelectValue placeholder="Select training type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                    <SelectItem value="conditioning">Conditioning</SelectItem>
                    <SelectItem value="skill">Skill Development</SelectItem>
                    <SelectItem value="strength">Strength & Power</SelectItem>
                    <SelectItem value="recovery">Recovery Session</SelectItem>
                    <SelectItem value="team">Team Training</SelectItem>
                    <SelectItem value="match">Match/Game</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Morning Sprint Workout" {...field} className="bg-athlex-gray-800 border-athlex-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} className="bg-athlex-gray-800 border-athlex-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="intensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intensity Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="very_high">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional details about the session"
                    className="resize-none bg-athlex-gray-800 border-athlex-gray-700"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Log Training Session</Button>
        </form>
      </Form>
    </Card>
  );
};

export default TrainingLogForm;
