
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';
import CoachLayout from '@/layouts/CoachLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CalendarPlus, Users, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Extend the page to handle URL parameters for pre-selecting athletes
const AssignTraining = () => {
  const { userRole } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get athlete_id from URL if it exists
  const queryParams = new URLSearchParams(location.search);
  const preSelectedAthleteId = queryParams.get('athlete_id');
  
  // Mock data - would be replaced with Supabase queries in a real implementation
  const [assignedAthletes, setAssignedAthletes] = useState([
    {
      id: "athlete_001",
      name: "Arif Rahman",
      sport: "Football",
      position: "Striker",
      club: "Tampines Elite",
      profile_photo: null,
      selected: false
    },
    {
      id: "athlete_002",
      name: "Lena Koh",
      sport: "Football",
      position: "Midfielder",
      club: "Phoenix Academy",
      profile_photo: null,
      selected: false
    },
    {
      id: "athlete_003",
      name: "Marcus Ng",
      sport: "Football",
      position: "Goalkeeper",
      club: "Tampines Elite",
      profile_photo: null,
      selected: false
    }
  ]);
  
  // Pre-select athlete if athlete_id is provided in URL
  useEffect(() => {
    if (preSelectedAthleteId) {
      setAssignedAthletes(athletes => 
        athletes.map(athlete => ({
          ...athlete,
          selected: athlete.id === preSelectedAthleteId
        }))
      );
    }
  }, [preSelectedAthleteId]);
  
  // Form setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      date: new Date().toISOString().split('T')[0],
      startTime: "08:00",
      duration: 60,
      type: "Physical",
      intensity: "Medium",
      notes: ""
    }
  });
  
  // Redirect if not a coach
  if (userRole !== 'coach') {
    toast.error("Only coaches can assign training sessions");
    navigate('/dashboard');
    return null;
  }
  
  const onSubmit = (data: any) => {
    const selectedAthleteIds = assignedAthletes
      .filter(athlete => athlete.selected)
      .map(athlete => athlete.id);
    
    if (selectedAthleteIds.length === 0) {
      toast.error("Please select at least one athlete");
      return;
    }
    
    // Prepare payload (would be sent to Supabase in real implementation)
    const payload = {
      ...data,
      assigned_athletes: selectedAthleteIds
    };
    
    console.log("Submitted training session:", payload);
    toast.success("Training session assigned successfully");
    
    // Navigate back to dashboard after successful submission
    setTimeout(() => {
      navigate('/coach-dashboard');
    }, 1500);
  };
  
  const toggleAthleteSelection = (athleteId: string) => {
    setAssignedAthletes(athletes => 
      athletes.map(athlete => 
        athlete.id === athleteId 
          ? { ...athlete, selected: !athlete.selected }
          : athlete
      )
    );
  };
  
  const selectAllAthletes = () => {
    setAssignedAthletes(athletes => 
      athletes.map(athlete => ({ ...athlete, selected: true }))
    );
  };
  
  const deselectAllAthletes = () => {
    setAssignedAthletes(athletes => 
      athletes.map(athlete => ({ ...athlete, selected: false }))
    );
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const getSelectedAthletesCount = () => {
    return assignedAthletes.filter(athlete => athlete.selected).length;
  };
  
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  return (
    <CoachLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button 
              variant="ghost" 
              className="mb-2" 
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Assign Training</h1>
            <p className="text-athlex-gray-400">Create and schedule a new training session</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            {/* Training Session Details */}
            <Card className="bg-athlex-gray-900 border-athlex-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarPlus className="h-5 w-5 text-athlex-accent" />
                  Training Session Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Training Title */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Training Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Speed & Agility Drill"
                      className="bg-athlex-gray-800 border-athlex-gray-700"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message?.toString()}</p>
                    )}
                  </div>
                  
                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="bg-athlex-gray-800 border-athlex-gray-700"
                      {...register("date", { required: "Date is required" })}
                    />
                    {errors.date && (
                      <p className="text-sm text-red-500">{errors.date.message?.toString()}</p>
                    )}
                  </div>
                  
                  {/* Start Time */}
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      className="bg-athlex-gray-800 border-athlex-gray-700"
                      {...register("startTime", { required: "Start time is required" })}
                    />
                    {errors.startTime && (
                      <p className="text-sm text-red-500">{errors.startTime.message?.toString()}</p>
                    )}
                  </div>
                  
                  {/* Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="15"
                      max="180"
                      step="5"
                      className="bg-athlex-gray-800 border-athlex-gray-700"
                      {...register("duration", {
                        required: "Duration is required",
                        min: { value: 15, message: "Minimum duration is 15 minutes" },
                        max: { value: 180, message: "Maximum duration is 180 minutes" }
                      })}
                    />
                    {errors.duration && (
                      <p className="text-sm text-red-500">{errors.duration.message?.toString()}</p>
                    )}
                  </div>
                  
                  {/* Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select defaultValue="Physical" {...register("type")}>
                      <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                        <SelectItem value="Physical">Physical</SelectItem>
                        <SelectItem value="Sport-Specific">Sport-Specific</SelectItem>
                        <SelectItem value="Recovery">Recovery</SelectItem>
                        <SelectItem value="Tactical">Tactical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Intensity */}
                  <div className="space-y-2">
                    <Label htmlFor="intensity">Intensity</Label>
                    <Select defaultValue="Medium" {...register("intensity")}>
                      <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                      <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Notes */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Session Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Describe the session objectives and key focus areas..."
                      className="min-h-[100px] bg-athlex-gray-800 border-athlex-gray-700"
                      {...register("notes")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Athlete Selection */}
            <Card className="bg-athlex-gray-900 border-athlex-gray-800">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-athlex-accent" />
                    Assign Athletes
                  </CardTitle>
                  <p className="text-sm text-athlex-gray-400 mt-1">
                    Select the athletes who will participate in this session
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={selectAllAthletes}
                    className="border-athlex-gray-700 text-xs"
                  >
                    Select All
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={deselectAllAthletes}
                    className="border-athlex-gray-700 text-xs"
                  >
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {assignedAthletes.length === 0 ? (
                    <div className="text-center py-8">
                      <Info className="h-12 w-12 mx-auto text-athlex-gray-600" />
                      <p className="mt-2 text-athlex-gray-400">No athletes assigned to you yet</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {assignedAthletes.map((athlete) => (
                          <div 
                            key={athlete.id}
                            className={`flex items-center space-x-3 p-3 rounded-lg border ${
                              athlete.selected 
                                ? 'bg-athlex-accent/10 border-athlex-accent/40' 
                                : 'bg-athlex-gray-800/50 border-athlex-gray-700'
                            }`}
                          >
                            <Checkbox 
                              id={athlete.id} 
                              checked={athlete.selected}
                              onCheckedChange={() => toggleAthleteSelection(athlete.id)}
                              className="data-[state=checked]:bg-athlex-accent data-[state=checked]:border-athlex-accent"
                            />
                            <div className="flex flex-1 items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={athlete.profile_photo || ''} />
                                <AvatarFallback className="bg-athlex-gray-700 text-athlex-accent">
                                  {getInitials(athlete.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <label 
                                  htmlFor={athlete.id}
                                  className="font-medium cursor-pointer"
                                >
                                  {athlete.name}
                                </label>
                                <p className="text-xs text-athlex-gray-400">
                                  {athlete.sport} • {athlete.position}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-sm text-athlex-gray-400">
                        Selected {getSelectedAthletesCount()} of {assignedAthletes.length} athletes
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg"
                className="bg-athlex-accent hover:bg-athlex-accent/90"
              >
                Assign Training Session
              </Button>
            </div>
          </div>
        </form>
      </div>
    </CoachLayout>
  );
};

export default AssignTraining;
