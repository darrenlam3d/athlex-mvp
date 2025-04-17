
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { athleteProfileSchema, type AthleteProfileFormValues } from './types';
import { CalendarIcon, MapPinIcon, Trophy } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface AthleteRegistrationFormProps {
  onSubmit: (data: AthleteProfileFormValues) => void;
  isLoading?: boolean;
}

const sportOptions = [
  "Football (Soccer)", "Basketball", "Tennis", "Running", "Swimming",
  "Cricket", "Baseball", "American Football", "Rugby", "Volleyball", 
  "Golf", "Athletics", "Cycling", "Boxing", "MMA", "Other"
];

const positionOptions = {
  "Football (Soccer)": ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  "Basketball": ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  "Tennis": ["Baseline Player", "Serve and Volley", "All-Court Player"],
  "American Football": ["Quarterback", "Running Back", "Wide Receiver", "Tight End", "Offensive Line", "Defensive Line", "Linebacker", "Cornerback", "Safety", "Special Teams"],
  "Rugby": ["Prop", "Hooker", "Lock", "Flanker", "Number 8", "Scrum-half", "Fly-half", "Center", "Wing", "Full-back"],
  "Cricket": ["Batsman", "Bowler", "All-rounder", "Wicket-keeper"],
  "Baseball": ["Pitcher", "Catcher", "Infielder", "Outfielder"],
  "Volleyball": ["Setter", "Outside Hitter", "Middle Blocker", "Opposite Hitter", "Libero"],
  "Other": ["Not Specified"]
};

const experienceLevelOptions = [
  { value: "beginner", label: "Beginner (0-2 years)" },
  { value: "amateur", label: "Amateur (2-5 years)" },
  { value: "semi_pro", label: "Semi-Pro (5-10 years)" },
  { value: "professional", label: "Professional (10+ years)" }
];

const AthleteRegistrationForm = ({ onSubmit, isLoading }: AthleteRegistrationFormProps) => {
  const form = useForm<AthleteProfileFormValues>({
    resolver: zodResolver(athleteProfileSchema),
    defaultValues: {
      sport: '',
      position: '',
      country: '',
      experienceLevel: 'amateur',
      height: undefined,
      weight: undefined,
      dateOfBirth: undefined
    }
  });

  const watchedSport = form.watch("sport");

  return (
    <Card className="w-full bg-gray-900/60 border-gray-800 text-white">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Sport</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white focus:ring-athlex-accent">
                          <SelectValue placeholder="Select your sport" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {sportOptions.map((sport) => (
                          <SelectItem key={sport} value={sport} className="focus:bg-athlex-accent/20 focus:text-white">
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Position</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      disabled={!watchedSport}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white focus:ring-athlex-accent">
                          <SelectValue placeholder="Select your position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {watchedSport && positionOptions[watchedSport as keyof typeof positionOptions] 
                          ? positionOptions[watchedSport as keyof typeof positionOptions].map((position) => (
                              <SelectItem key={position} value={position} className="focus:bg-athlex-accent/20 focus:text-white">
                                {position}
                              </SelectItem>
                            ))
                          : positionOptions["Other"].map((position) => (
                              <SelectItem key={position} value={position} className="focus:bg-athlex-accent/20 focus:text-white">
                                {position}
                              </SelectItem>
                            ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Country</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">
                          <MapPinIcon size={18} />
                        </span>
                        <Input
                          placeholder="Enter your country"
                          className="pl-10 bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-10 bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-500 w-full flex justify-start text-left font-normal",
                              !field.value && "text-gray-500"
                            )}
                          >
                            <div className="absolute left-3 top-2.5 text-gray-400">
                              <CalendarIcon size={18} />
                            </div>
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select your date of birth</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="bg-gray-800"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Height in centimeters"
                        className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-500"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Weight in kilograms"
                        className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-500"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Experience Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white focus:ring-athlex-accent">
                        <div className="flex items-center gap-2">
                          <Trophy size={18} className="text-gray-400" />
                          <SelectValue placeholder="Select your experience level" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {experienceLevelOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="focus:bg-athlex-accent/20 focus:text-white"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself as an athlete"
                      className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-500 resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-athlex-accent hover:bg-athlex-accent/90 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Profile...' : 'Complete Registration'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AthleteRegistrationForm;
