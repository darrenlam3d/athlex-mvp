
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, UserPlus, Check, Calendar, Clipboard, Save } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PermissionsFormValues {
  approvals: {
    autoApproveTrainingLogs: boolean;
    autoApproveNutritionLogs: boolean;
    requireApprovalThreshold: string;
  };
  selfLogging: {
    allowAthleteEdit: boolean;
    editTimeframe: string;
    notifyOnEdit: boolean;
  };
  requests: {
    autoAcceptRequests: string;
    maxAthletes: number;
    notifyOnNewRequests: boolean;
  };
}

const CoachPermissionsSettings = () => {
  const form = useForm<PermissionsFormValues>({
    defaultValues: {
      approvals: {
        autoApproveTrainingLogs: true,
        autoApproveNutritionLogs: false,
        requireApprovalThreshold: 'high',
      },
      selfLogging: {
        allowAthleteEdit: true,
        editTimeframe: '24h',
        notifyOnEdit: true,
      },
      requests: {
        autoAcceptRequests: 'none',
        maxAthletes: 30,
        notifyOnNewRequests: true,
      },
    },
  });

  const onSubmit = (data: PermissionsFormValues) => {
    console.log('Permissions settings saved:', data);
    // TODO: Save to Supabase
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <Shield className="h-5 w-5 text-athlex-accent" />
              Permissions & Approvals
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Configure how athlete data and requests are processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="auto-approvals">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Auto Approvals
                </AccordionTrigger>
                <AccordionContent className="space-y-4 mt-2">
                  <FormField
                    control={form.control}
                    name="approvals.autoApproveTrainingLogs"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center">
                        <div>
                          <FormLabel className="text-white">Auto-approve Training Logs</FormLabel>
                          <FormDescription className="text-athlex-gray-400">
                            Automatically approve athlete training logs
                          </FormDescription>
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
                    name="approvals.autoApproveNutritionLogs"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center">
                        <div>
                          <FormLabel className="text-white">Auto-approve Nutrition Logs</FormLabel>
                          <FormDescription className="text-athlex-gray-400">
                            Automatically approve athlete nutrition logs
                          </FormDescription>
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
                    name="approvals.requireApprovalThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Approval Required For</FormLabel>
                        <FormDescription className="text-athlex-gray-400 mb-2">
                          Select which intensity level requires manual approval
                        </FormDescription>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                              <SelectValue placeholder="Select threshold" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">No manual approval needed</SelectItem>
                            <SelectItem value="high">High intensity only</SelectItem>
                            <SelectItem value="medium">Medium & high intensity</SelectItem>
                            <SelectItem value="all">All intensities</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="self-logging">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Self-Logging Permissions
                </AccordionTrigger>
                <AccordionContent className="space-y-4 mt-2">
                  <FormField
                    control={form.control}
                    name="selfLogging.allowAthleteEdit"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center">
                        <div>
                          <FormLabel className="text-white">Allow Athletes to Edit Logs</FormLabel>
                          <FormDescription className="text-athlex-gray-400">
                            Let athletes edit their own submitted logs
                          </FormDescription>
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
                    name="selfLogging.editTimeframe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Edit Timeframe</FormLabel>
                        <FormDescription className="text-athlex-gray-400 mb-2">
                          Time window athletes can edit their logs after submission
                        </FormDescription>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!form.watch("selfLogging.allowAthleteEdit")}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                              <SelectValue placeholder="Select timeframe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1h">1 hour</SelectItem>
                            <SelectItem value="8h">8 hours</SelectItem>
                            <SelectItem value="24h">24 hours</SelectItem>
                            <SelectItem value="48h">48 hours</SelectItem>
                            <SelectItem value="7d">7 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="selfLogging.notifyOnEdit"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center">
                        <div>
                          <FormLabel className="text-white">Notify on Edit</FormLabel>
                          <FormDescription className="text-athlex-gray-400">
                            Receive notifications when logs are edited
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!form.watch("selfLogging.allowAthleteEdit")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="athlete-requests">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Athlete Requests
                </AccordionTrigger>
                <AccordionContent className="space-y-4 mt-2">
                  <FormField
                    control={form.control}
                    name="requests.autoAcceptRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Auto-accept Athlete Requests</FormLabel>
                        <FormDescription className="text-athlex-gray-400 mb-2">
                          Configure how new athlete connection requests are handled
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-3"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="none" id="auto-none" />
                              </FormControl>
                              <FormLabel className="text-white font-normal" htmlFor="auto-none">
                                None - Review all requests manually
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="all" id="auto-all" />
                              </FormControl>
                              <FormLabel className="text-white font-normal" htmlFor="auto-all">
                                All - Accept all athlete requests automatically
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="referred" id="auto-referred" />
                              </FormControl>
                              <FormLabel className="text-white font-normal" htmlFor="auto-referred">
                                Referred - Only accept referred athletes automatically
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requests.maxAthletes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Maximum Athletes</FormLabel>
                        <FormDescription className="text-athlex-gray-400 mb-2">
                          Set the maximum number of athletes you can manage
                        </FormDescription>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700">
                              <SelectValue placeholder="Select maximum" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="10">10 athletes</SelectItem>
                            <SelectItem value="20">20 athletes</SelectItem>
                            <SelectItem value="30">30 athletes</SelectItem>
                            <SelectItem value="50">50 athletes</SelectItem>
                            <SelectItem value="100">100 athletes</SelectItem>
                            <SelectItem value="0">Unlimited</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requests.notifyOnNewRequests"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center">
                        <div>
                          <FormLabel className="text-white">Notify on New Requests</FormLabel>
                          <FormDescription className="text-athlex-gray-400">
                            Receive notifications for new athlete connection requests
                          </FormDescription>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-athlex-accent hover:bg-athlex-accent-alt">
            <Save className="mr-2 h-4 w-4" />
            Save Permissions Settings
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CoachPermissionsSettings;
