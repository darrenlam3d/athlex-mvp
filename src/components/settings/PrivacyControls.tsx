
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Shield, Eye, EyeOff, Database } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useUserRole } from '@/contexts/UserRoleContext';

interface PrivacyFormValues {
  profileVisibility: string;
  dataSharing: boolean;
  anonymousStats: boolean;
  locationSharing: boolean;
  marketingConsent: boolean;
}

const PrivacyControls = () => {
  const { userRole } = useUserRole();
  
  const form = useForm<PrivacyFormValues>({
    defaultValues: {
      profileVisibility: 'authenticated',
      dataSharing: true,
      anonymousStats: true,
      locationSharing: userRole === 'athlete' ? false : true,
      marketingConsent: false,
    },
  });

  const onSubmit = (data: PrivacyFormValues) => {
    console.log('Privacy settings saved:', data);
    // TODO: Save to Supabase
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <Lock className="h-5 w-5 text-athlex-accent" />
              Privacy Controls
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Manage your privacy settings and data preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="profileVisibility"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-white font-medium flex items-center gap-2">
                        <Eye className="h-4 w-4 text-athlex-accent" />
                        Profile Visibility
                      </FormLabel>
                      <p className="text-sm text-athlex-gray-400 mt-1">
                        Control who can see your profile information
                      </p>
                    </div>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="space-y-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="public" id="public" />
                          </FormControl>
                          <FormLabel className="text-white font-normal" htmlFor="public">
                            Public - Anyone can view your profile
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="authenticated" id="authenticated" />
                          </FormControl>
                          <FormLabel className="text-white font-normal" htmlFor="authenticated">
                            Authenticated Users - Only registered users can view your profile
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="connections" id="connections" />
                          </FormControl>
                          <FormLabel className="text-white font-normal" htmlFor="connections">
                            Connections Only - Only your connections can view your profile
                          </FormLabel>
                        </FormItem>
                        {userRole === 'athlete' && (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="coaches" id="coaches" />
                            </FormControl>
                            <FormLabel className="text-white font-normal" htmlFor="coaches">
                              Coaches & Scouts - Only verified coaches and scouts can view your profile
                            </FormLabel>
                          </FormItem>
                        )}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-athlex-gray-800">
              <h3 className="text-white font-medium flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-athlex-accent" />
                Data Usage
              </h3>

              <FormField
                control={form.control}
                name="dataSharing"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel className="text-white">Performance Data Sharing</FormLabel>
                      <p className="text-sm text-athlex-gray-400">
                        Allow coaches or scouts to access your performance data
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
                name="anonymousStats"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel className="text-white">Anonymous Statistics</FormLabel>
                      <p className="text-sm text-athlex-gray-400">
                        Allow your data to be used in anonymized statistical analysis
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
                name="locationSharing"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel className="text-white">Location Sharing</FormLabel>
                      <p className="text-sm text-athlex-gray-400">
                        {userRole === 'athlete' 
                          ? 'Share your training location with coaches and teammates' 
                          : 'Share your location for regional networking opportunities'}
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
                name="marketingConsent"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel className="text-white">Marketing Communications</FormLabel>
                      <p className="text-sm text-athlex-gray-400">
                        Receive updates about new features and opportunities
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
            </div>

            <div className="pt-4 border-t border-athlex-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium flex items-center gap-2 mb-1">
                    <Database className="h-4 w-4 text-athlex-accent" />
                    Data Export
                  </h3>
                  <p className="text-sm text-athlex-gray-400">
                    Download a copy of all your data
                  </p>
                </div>
                <Button variant="outline" className="border-athlex-gray-700 text-white hover:bg-athlex-gray-800">
                  Request Data
                </Button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" className="bg-athlex-accent hover:bg-athlex-accent-alt">
                Save Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default PrivacyControls;
