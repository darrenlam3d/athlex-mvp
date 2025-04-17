
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Save, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { profileSchema, type ProfileFormValues } from './types';
import ProfilePhoto from './components/ProfilePhoto';
import BasicInfoFields from './components/BasicInfoFields';
import SportFields from './components/SportFields';

const ProfileSettings = () => {
  const { user } = useAuth();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.user_metadata?.first_name || '',
      lastName: user?.user_metadata?.last_name || '',
      displayName: `${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`.trim(),
      age: '',
      sport: '',
      position: '',
      tacticalRole: '',
      bio: '',
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log('Profile data:', data);
    toast.success('Profile updated successfully');
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <User className="h-5 w-5 text-athlex-accent" />
          Profile Information
        </CardTitle>
        <CardDescription className="text-athlex-gray-400">
          Manage your personal information and profile details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfilePhoto 
          avatarUrl={user?.user_metadata?.avatar_url}
          firstName={user?.user_metadata?.first_name}
          lastName={user?.user_metadata?.last_name}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <BasicInfoFields control={form.control} />
            <SportFields control={form.control} />
            
            <div className="flex justify-end">
              <Button type="submit" className="bg-athlex-accent hover:bg-athlex-accent-alt">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
