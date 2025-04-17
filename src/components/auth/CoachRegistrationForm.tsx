
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { coachProfileSchema, type CoachProfileFormValues } from './types';
import { Check, ChevronsUpDown, Users, MapPin, Layout } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface CoachRegistrationFormProps {
  onSubmit: (data: CoachProfileFormValues) => void;
  isLoading?: boolean;
}

const sportOptions = [
  "Football (Soccer)", "Basketball", "Tennis", "Running", "Swimming",
  "Cricket", "Baseball", "American Football", "Rugby", "Volleyball", 
  "Golf", "Athletics", "Cycling", "Boxing", "MMA", "Other"
];

const ageGroupOptions = [
  "Under 10", "Under 12", "Under 14", "Under 16", "Under 18", 
  "Under 21", "Adult", "Senior", "Master"
];

const CoachRegistrationForm = ({ onSubmit, isLoading }: CoachRegistrationFormProps) => {
  const form = useForm<CoachProfileFormValues>({
    resolver: zodResolver(coachProfileSchema),
    defaultValues: {
      teamName: '',
      sport: '',
      country: '',
      coachingLevel: 'beginner',
      ageGroups: []
    }
  });

  const [openAgeGroups, setOpenAgeGroups] = React.useState(false);
  const [selectedAgeGroups, setSelectedAgeGroups] = React.useState<string[]>([]);

  return (
    <Card className="w-full bg-gray-900/60 border-gray-800 text-white">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Team or Club Name (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">
                          <Layout size={18} />
                        </span>
                        <Input
                          placeholder="Enter team or club name"
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
                          <SelectValue placeholder="Select sport you coach" />
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
                          <MapPin size={18} />
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
                name="coachingLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Coaching Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white focus:ring-athlex-accent">
                          <SelectValue placeholder="Select coaching level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="beginner" className="focus:bg-athlex-accent/20 focus:text-white">Beginner</SelectItem>
                        <SelectItem value="club" className="focus:bg-athlex-accent/20 focus:text-white">Club</SelectItem>
                        <SelectItem value="academy" className="focus:bg-athlex-accent/20 focus:text-white">Academy</SelectItem>
                        <SelectItem value="pro" className="focus:bg-athlex-accent/20 focus:text-white">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ageGroups"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Age Groups</FormLabel>
                  <Popover open={openAgeGroups} onOpenChange={setOpenAgeGroups}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openAgeGroups}
                          className={cn(
                            "w-full bg-gray-800/70 border-gray-700 text-white justify-between",
                            !field.value.length && "text-gray-500"
                          )}
                        >
                          <div className="flex items-center">
                            <Users size={18} className="mr-2 text-gray-400" />
                            {field.value.length > 0
                              ? `${field.value.length} age groups selected`
                              : "Select age groups"}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700 text-white">
                      <Command className="bg-gray-800">
                        <CommandInput placeholder="Search age groups..." className="text-white" />
                        <CommandEmpty className="text-gray-400">No age group found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {ageGroupOptions.map((ageGroup) => (
                            <CommandItem
                              key={ageGroup}
                              value={ageGroup}
                              onSelect={(currentValue) => {
                                const newValue = field.value.includes(currentValue)
                                  ? field.value.filter((item) => item !== currentValue)
                                  : [...field.value, currentValue];
                                
                                field.onChange(newValue);
                              }}
                              className="flex items-center cursor-pointer"
                            >
                              <div 
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gray-600", 
                                  field.value.includes(ageGroup) ? "bg-athlex-accent text-white" : "opacity-50"
                                )}
                              >
                                {field.value.includes(ageGroup) && <Check className="h-3 w-3" />}
                              </div>
                              <span>{ageGroup}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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

export default CoachRegistrationForm;
