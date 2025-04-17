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
import { scoutProfileSchema, type ScoutProfileFormValues } from './types';
import { Building, Check, ChevronsUpDown, MapPin, Target } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ScoutRegistrationFormProps {
  onSubmit: (data: ScoutProfileFormValues) => void;
  isLoading?: boolean;
}

const positionOptions = [
  // Football positions
  "Goalkeeper", "Center Back", "Right Back", "Left Back", "Defensive Midfielder",
  "Central Midfielder", "Attacking Midfielder", "Right Winger", "Left Winger", "Striker",
  
  // Basketball positions
  "Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center",
  
  // Other common positions
  "Defender", "Midfielder", "Forward", "Pitcher", "Catcher", "Batsman", "Bowler"
];

const ScoutRegistrationForm = ({ onSubmit, isLoading }: ScoutRegistrationFormProps) => {
  const form = useForm<ScoutProfileFormValues>({
    resolver: zodResolver(scoutProfileSchema),
    defaultValues: {
      organization: '',
      country: '',
      scoutingRegion: '',
      scoutingLevel: 'youth',
      preferredPositions: []
    }
  });

  const [openPositions, setOpenPositions] = React.useState(false);

  return (
    <Card className="w-full bg-gray-900/60 border-gray-800 text-white">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Organization (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">
                          <Building size={18} />
                        </span>
                        <Input
                          placeholder="Enter organization or club"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scoutingRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Scouting Region</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">
                          <Target size={18} />
                        </span>
                        <Input
                          placeholder="Region you scout in (e.g. Europe, West Africa)"
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
                name="scoutingLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Scouting Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white focus:ring-athlex-accent">
                          <SelectValue placeholder="Select scouting level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="youth" className="focus:bg-athlex-accent/20 focus:text-white">Youth</SelectItem>
                        <SelectItem value="semi_pro" className="focus:bg-athlex-accent/20 focus:text-white">Semi-Professional</SelectItem>
                        <SelectItem value="pro" className="focus:bg-athlex-accent/20 focus:text-white">Professional</SelectItem>
                        <SelectItem value="national" className="focus:bg-athlex-accent/20 focus:text-white">National</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="preferredPositions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Preferred Positions to Scout</FormLabel>
                  <Popover open={openPositions} onOpenChange={setOpenPositions}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPositions}
                          className={cn(
                            "w-full bg-gray-800/70 border-gray-700 text-white justify-between",
                            !field.value.length && "text-gray-500"
                          )}
                        >
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-400"><rect x="6" y="3" width="12" height="6" rx="2" /><rect x="6" y="15" width="12" height="6" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /></svg>
                            {field.value.length > 0
                              ? `${field.value.length} positions selected`
                              : "Select positions to scout"}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700 text-white">
                      <Command className="bg-gray-800">
                        <CommandInput placeholder="Search positions..." className="text-white" />
                        <CommandEmpty className="text-gray-400">No position found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {positionOptions.map((position) => (
                            <CommandItem
                              key={position}
                              value={position}
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
                                  field.value.includes(position) ? "bg-athlex-accent text-white" : "opacity-50"
                                )}
                              >
                                {field.value.includes(position) && <Check className="h-3 w-3" />}
                              </div>
                              <span>{position}</span>
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

export default ScoutRegistrationForm;
