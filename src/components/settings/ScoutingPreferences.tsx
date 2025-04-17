
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Award, Target, Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScoutingPreferencesFormValues {
  preferredRegions: string[];
  preferredPositions: string[];
  focusAreas: string[];
  ageRange: {
    min: number;
    max: number;
  };
}

const ScoutingPreferences = () => {
  const form = useForm<ScoutingPreferencesFormValues>({
    defaultValues: {
      preferredRegions: ['Europe', 'North America'],
      preferredPositions: ['Forward', 'Midfielder'],
      focusAreas: ['Technical', 'Tactical'],
      ageRange: {
        min: 16,
        max: 23,
      },
    },
  });

  const onSubmit = (data: ScoutingPreferencesFormValues) => {
    console.log('Scouting preferences saved:', data);
    // TODO: Save to Supabase
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <MapPin className="h-5 w-5 text-athlex-accent" />
              Preferred Regions
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Select regions where you primarily scout talent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Europe', 'North America', 'South America', 'Africa', 'Asia', 'Oceania'].map((region) => (
                <FormField
                  key={region}
                  control={form.control}
                  name="preferredRegions"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(region)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, region])
                                : field.onChange(field.value?.filter((value) => value !== region));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-white cursor-pointer">
                          {region}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <Target className="h-5 w-5 text-athlex-accent" />
              Preferred Positions
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Select positions you're most interested in scouting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Winger', 'Striker'].map((position) => (
                <FormField
                  key={position}
                  control={form.control}
                  name="preferredPositions"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(position)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, position])
                                : field.onChange(field.value?.filter((value) => value !== position));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-white cursor-pointer">
                          {position}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <Award className="h-5 w-5 text-athlex-accent" />
              Focus Areas
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Select skills and attributes you focus on when scouting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Technical', 'Tactical', 'Physical', 'Mental', 'Leadership', 'Teamwork'].map((focus) => (
                <FormField
                  key={focus}
                  control={form.control}
                  name="focusAreas"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(focus)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, focus])
                                : field.onChange(field.value?.filter((value) => value !== focus));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-white cursor-pointer">
                          {focus}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              Age Range Focus
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Set your preferred athlete age range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="ageRange.min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Age</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select minimum age" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 11 }, (_, i) => i + 12).map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} years
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ageRange.max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Age</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select maximum age" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 16 }, (_, i) => i + 18).map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} years
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-athlex-accent hover:bg-athlex-accent-alt">
            <Check className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScoutingPreferences;
