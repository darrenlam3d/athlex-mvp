import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, Info, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/supabase';
import CoachLayout from '@/layouts/CoachLayout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// Define the form schema with validation
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  date: z.date({ required_error: 'Please select a date' }),
  startTime: z.string().min(1, { message: 'Please enter a start time' }),
  duration: z.number().min(5, { message: 'Duration must be at least 5 minutes' }),
  type: z.string().min(1, { message: 'Please select a session type' }),
  intensity: z.string().min(1, { message: 'Please select an intensity level' }),
  notes: z.string().optional(),
});

// Types for the form values
type FormValues = z.infer<typeof formSchema>;

// Mock data for assigned athletes (to be replaced with Supabase query)
const mockAssignedAthletes = [
  {
    id: "athlete_001",
    name: "Arif Rahman",
    sport: "Football",
    position: "Striker",
    club: "Tampines Elite",
    profile_photo: null
  },
  {
    id: "athlete_002",
    name: "Lena Koh",
    sport: "Football",
    position: "Midfielder",
    club: "Phoenix Academy",
    profile_photo: null
  },
  {
    id: "athlete_003",
    name: "Marcus Ng",
    sport: "Football",
    position: "Goalkeeper",
    club: "Tampines Elite",
    profile_photo: null
  },
  {
    id: "athlete_004",
    name: "Sophia Tan",
    sport: "Football",
    position: "Left Wing",
    club: "Phoenix Academy",
    profile_photo: null
  }
];

const AssignTraining = () => {
  const navigate = useNavigate();
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: undefined,
      startTime: '',
      duration: 30,
      type: '',
      intensity: '',
      notes: '',
    },
  });

  // Toggle athlete selection
  const toggleAthleteSelection = (athleteId: string) => {
    setSelectedAthletes(prev => 
      prev.includes(athleteId)
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  // Handle "Select All" action
  const handleSelectAll = () => {
    if (selectedAthletes.length === mockAssignedAthletes.length) {
      // If all are already selected, deselect all
      setSelectedAthletes([]);
    } else {
      // Otherwise, select all
      setSelectedAthletes(mockAssignedAthletes.map(athlete => athlete.id));
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    // Validate that at least one athlete is selected
    if (selectedAthletes.length === 0) {
      toast.error('Please select at least one athlete');
      return;
    }

    setIsSubmitting(true);

    try {
      // For mock demonstration, we'll just simulate a submission and show a success toast
      // In a real implementation, this would insert data into Supabase
      
      console.log('Submission payload:', {
        ...data,
        assigned_athletes: selectedAthletes
      });

      // Check if Supabase is configured
      if (isSupabaseConfigured()) {
        // In a real implementation, you would insert the data into Supabase here
        // const { error } = await supabase.from('training_sessions').insert({
        //   title: data.title,
        //   date: data.date.toISOString().split('T')[0],
        //   start_time: data.startTime,
        //   duration: data.duration,
        //   type: data.type,
        //   intensity: data.intensity,
        //   notes: data.notes,
        //   coach_id: 'current_user_id' // This would be replaced with the actual coach ID
        // });
        
        // if (error) throw error;
        
        // Then add entries for each athlete
        // for (const athleteId of selectedAthletes) {
        //   const { error: assignmentError } = await supabase.from('training_session_athletes').insert({
        //     training_session_id: 'new_session_id', // This would be the ID of the newly created session
        //     athlete_id: athleteId
        //   });
        //   if (assignmentError) throw assignmentError;
        // }
      }

      // Show success toast
      toast.success('Training session assigned successfully!');
      
      // Redirect back to coach dashboard after a brief delay
      setTimeout(() => {
        navigate('/coach-dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Error assigning training session:', error);
      toast.error('Failed to assign training session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <CoachLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/coach-dashboard')}
              className="p-0 h-auto"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Assign Training</h1>
          </div>
          <p className="text-athlex-gray-400 mt-1">
            Create a new training session and assign it to your athletes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Training Session Form */}
          <div className="lg:col-span-2">
            <Card className="bg-athlex-gray-900 border-athlex-gray-800">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Training Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Speed & Agility Drill" 
                              className="bg-athlex-gray-800 border-athlex-gray-700"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full bg-athlex-gray-800 border-athlex-gray-700 justify-start text-left font-normal",
                                      !field.value && "text-athlex-gray-400"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-athlex-gray-800 border-athlex-gray-700" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  type="time" 
                                  className="bg-athlex-gray-800 border-athlex-gray-700"
                                  {...field} 
                                />
                                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-athlex-gray-400 pointer-events-none" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                className="bg-athlex-gray-800 border-athlex-gray-700"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
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
                            <FormLabel>Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                                <SelectItem value="Physical">Physical</SelectItem>
                                <SelectItem value="Sport-Specific">Sport-Specific</SelectItem>
                                <SelectItem value="Recovery">Recovery</SelectItem>
                                <SelectItem value="Tactical">Tactical</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="intensity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Intensity</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                                  <SelectValue placeholder="Select intensity" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
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
                          <FormLabel>Session Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Add any additional details about this training session..." 
                              className="bg-athlex-gray-800 border-athlex-gray-700 min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-athlex-accent hover:bg-athlex-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Assigning...' : 'Assign Training Session'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Athlete Selection */}
          <div>
            <Card className="bg-athlex-gray-900 border-athlex-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-athlex-accent" />
                    <h3 className="font-medium">Select Athletes</h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSelectAll}
                    className="text-xs h-8 border-athlex-gray-700"
                  >
                    {selectedAthletes.length === mockAssignedAthletes.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {mockAssignedAthletes.map((athlete) => (
                    <div 
                      key={athlete.id}
                      className={cn(
                        "flex items-center p-3 rounded-lg cursor-pointer transition-colors",
                        selectedAthletes.includes(athlete.id) 
                          ? "bg-athlex-accent/20 border border-athlex-accent/30" 
                          : "bg-athlex-gray-800 hover:bg-athlex-gray-800/80"
                      )}
                      onClick={() => toggleAthleteSelection(athlete.id)}
                    >
                      <Checkbox 
                        checked={selectedAthletes.includes(athlete.id)}
                        onCheckedChange={() => toggleAthleteSelection(athlete.id)}
                        className="mr-4 border-athlex-gray-600 data-[state=checked]:bg-athlex-accent data-[state=checked]:border-athlex-accent"
                      />
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 border border-athlex-gray-700">
                          <AvatarImage src={athlete.profile_photo || ''} />
                          <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent">
                            {getInitials(athlete.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="truncate">
                          <p className="font-medium truncate">{athlete.name}</p>
                          <p className="text-sm text-athlex-gray-400 truncate">
                            {athlete.sport} • {athlete.position} • {athlete.club}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {mockAssignedAthletes.length === 0 && (
                    <div className="text-center py-8 text-athlex-gray-400">
                      <p>No athletes assigned to you yet</p>
                    </div>
                  )}
                </div>
                
                {selectedAthletes.length > 0 && (
                  <div className="mt-4 flex justify-between items-center p-3 bg-athlex-gray-800/70 rounded-lg">
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-athlex-accent" />
                      <span className="text-sm">
                        {selectedAthletes.length} athlete{selectedAthletes.length !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CoachLayout>
  );
};

export default AssignTraining;
