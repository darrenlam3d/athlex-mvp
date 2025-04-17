
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Save, Download, Trash2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const ScoutReportTemplates = () => {
  const form = useForm({
    defaultValues: {
      defaultTemplate: 'comprehensive',
      metricWeights: {
        technical: 30,
        tactical: 25,
        physical: 20,
        mental: 25,
      },
      autoExport: true,
      exportFormat: ['pdf', 'csv'],
      templateSections: {
        playerBackground: true,
        technicalAnalysis: true,
        tacticalAnalysis: true,
        physicalProfile: true,
        mentalAttributes: true,
        potentialProjection: true,
        recommendedAction: true,
      },
      customTemplate: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Shortlist and report settings saved:', data);
    // TODO: Save to Supabase
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <FileText className="h-5 w-5 text-athlex-accent" />
              Evaluation Settings
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Customize your evaluation metrics and report templates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="metric-weights">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Metric Weight Customization
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 mt-4">
                    <FormField
                      control={form.control}
                      name="metricWeights.technical"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center mb-2">
                            <FormLabel className="text-sm font-medium text-white">
                              Technical Skills
                            </FormLabel>
                            <span className="text-sm text-athlex-accent">{field.value}%</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={5}
                              value={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                              className="py-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metricWeights.tactical"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center mb-2">
                            <FormLabel className="text-sm font-medium text-white">
                              Tactical Understanding
                            </FormLabel>
                            <span className="text-sm text-athlex-accent">{field.value}%</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={5}
                              value={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                              className="py-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metricWeights.physical"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center mb-2">
                            <FormLabel className="text-sm font-medium text-white">
                              Physical Attributes
                            </FormLabel>
                            <span className="text-sm text-athlex-accent">{field.value}%</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={5}
                              value={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                              className="py-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metricWeights.mental"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center mb-2">
                            <FormLabel className="text-sm font-medium text-white">
                              Mental Attributes
                            </FormLabel>
                            <span className="text-sm text-athlex-accent">{field.value}%</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={5}
                              value={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                              className="py-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shortlist-mgmt">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Shortlist Management
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 mt-4">
                    <FormField
                      control={form.control}
                      name="autoExport"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel className="text-white">Auto-export Reports</FormLabel>
                            <p className="text-sm text-athlex-gray-400">
                              Automatically export reports when finalized
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

                    <div className="space-y-3">
                      <FormLabel className="text-white">Export Formats</FormLabel>
                      <div className="space-y-2">
                        {['pdf', 'csv', 'xlsx'].map((format) => (
                          <FormField
                            key={format}
                            control={form.control}
                            name="exportFormat"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(format)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, format])
                                          : field.onChange(field.value?.filter((value: string) => value !== format));
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal text-white cursor-pointer">
                                    {format.toUpperCase()}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="template-sections">
                <AccordionTrigger className="text-white hover:text-athlex-accent">
                  Template Sections
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-4">
                    <FormLabel className="text-white">Include Sections</FormLabel>
                    {Object.entries({
                      playerBackground: "Player Background",
                      technicalAnalysis: "Technical Analysis",
                      tacticalAnalysis: "Tactical Analysis",
                      physicalProfile: "Physical Profile",
                      mentalAttributes: "Mental Attributes",
                      potentialProjection: "Potential Projection",
                      recommendedAction: "Recommended Action"
                    }).map(([key, label]) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={`templateSections.${key}` as any}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal text-white cursor-pointer">
                              {label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="customTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Custom Template</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter custom template structure or notes..."
                              className="resize-y h-32 bg-athlex-gray-800 border-athlex-gray-700 placeholder:text-athlex-gray-500"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button type="submit" className="bg-athlex-accent hover:bg-athlex-accent-alt">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
              <Button variant="outline" className="border-athlex-gray-700 text-white hover:bg-athlex-gray-800">
                <Download className="mr-2 h-4 w-4" />
                Export Template
              </Button>
              <Button variant="destructive" className="ml-auto">
                <Trash2 className="mr-2 h-4 w-4" />
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default ScoutReportTemplates;
