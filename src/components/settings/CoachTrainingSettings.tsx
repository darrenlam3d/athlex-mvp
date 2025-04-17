
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, FileText, Save, Scissors, Zap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';

interface TrainingSettingsFormValues {
  defaultTemplates: {
    warmup: string;
    cooldown: string;
  };
  aiSettings: {
    enableRecommendations: boolean;
    personalizeIntensity: boolean;
    trainingFocus: string[];
    adaptToProgress: boolean;
  };
  thresholds: {
    overtraining: number;
    heartRateMax: number;
    rpeThreshold: number;
  };
}

const CoachTrainingSettings = () => {
  const form = useForm<TrainingSettingsFormValues>({
    defaultValues: {
      defaultTemplates: {
        warmup: 'Dynamic stretching, light cardio (10 min)',
        cooldown: 'Static stretching, foam rolling (10 min)',
      },
      aiSettings: {
        enableRecommendations: true,
        personalizeIntensity: true,
        trainingFocus: ['technical', 'tactical', 'physical'],
        adaptToProgress: true,
      },
      thresholds: {
        overtraining: 85,
        heartRateMax: 180,
        rpeThreshold: 8,
      },
    },
  });

  const onSubmit = (data: TrainingSettingsFormValues) => {
    console.log('Training settings saved:', data);
    // TODO: Save to Supabase
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <FileText className="h-5 w-5 text-athlex-accent" />
              Default Templates
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Set default training components that will be applied to new sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="warmup">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Warm-up Routine
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="defaultTemplates.warmup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Default Warm-up</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter default warm-up routine"
                            className="resize-y h-24 bg-athlex-gray-800 border-athlex-gray-700 placeholder:text-athlex-gray-500"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cooldown">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Cool-down Routine
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="defaultTemplates.cooldown"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Default Cool-down</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter default cool-down routine"
                            className="resize-y h-24 bg-athlex-gray-800 border-athlex-gray-700 placeholder:text-athlex-gray-500"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="session-duration">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Session Durations
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FormLabel className="text-white">Training Session</FormLabel>
                      <Select defaultValue="60">
                        <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <FormLabel className="text-white">Recovery Session</FormLabel>
                      <Select defaultValue="30">
                        <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <Zap className="h-5 w-5 text-athlex-accent" />
              AI Recommendation Settings
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Configure how AI generates training recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="aiSettings.enableRecommendations"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <FormLabel className="text-white">Enable AI Recommendations</FormLabel>
                    <p className="text-sm text-athlex-gray-400">
                      Allow AI to suggest personalized training activities
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiSettings.personalizeIntensity"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <FormLabel className="text-white">Personalize Intensity</FormLabel>
                    <p className="text-sm text-athlex-gray-400">
                      Adjust training intensity based on athlete's capabilities
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiSettings.adaptToProgress"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <FormLabel className="text-white">Adapt to Progress</FormLabel>
                    <p className="text-sm text-athlex-gray-400">
                      Automatically adjust training difficulty based on performance
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="pt-2">
              <FormLabel className="text-white mb-3 block">Training Focus Areas</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['technical', 'tactical', 'physical', 'mental', 'recovery', 'team dynamics'].map((focus) => (
                  <FormField
                    key={focus}
                    control={form.control}
                    name="aiSettings.trainingFocus"
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
                          <FormLabel className="text-sm font-normal text-white capitalize cursor-pointer">
                            {focus}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <Scissors className="h-5 w-5 text-athlex-accent" />
              Training Thresholds
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Set thresholds for monitoring athlete performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="thresholds.overtraining"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-white">Overtraining Risk Threshold (%)</FormLabel>
                    <span className="text-sm text-athlex-accent">{field.value}%</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={50}
                      max={100}
                      step={5}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <p className="text-sm text-athlex-gray-400 mt-1">
                    Alert when athlete's workload exceeds this percentage of their capacity
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thresholds.heartRateMax"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-white">Max Heart Rate Threshold (bpm)</FormLabel>
                    <span className="text-sm text-athlex-accent">{field.value} bpm</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={140}
                      max={220}
                      step={5}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <p className="text-sm text-athlex-gray-400 mt-1">
                    Default maximum heart rate for planning high-intensity training
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thresholds.rpeThreshold"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-white">RPE Alert Threshold (1-10)</FormLabel>
                    <span className="text-sm text-athlex-accent">{field.value}/10</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <p className="text-sm text-athlex-gray-400 mt-1">
                    Alert when athlete reports RPE above this threshold
                  </p>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-athlex-accent hover:bg-athlex-accent-alt">
            <Save className="mr-2 h-4 w-4" />
            Save Training Settings
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CoachTrainingSettings;
