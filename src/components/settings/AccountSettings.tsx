
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Key, LogOut, Save, Trash2, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const AccountSettings = () => {
  const { signOut } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    console.log('Password change submitted:', data);
    // TODO: Implement password change functionality
    setTimeout(() => {
      form.reset();
    }, 1000);
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      // TODO: Implement account deletion
      console.log('Account deleted');
      setIsDeleting(false);
      setDeleteAccountDialogOpen(false);
    }, 1500);
  };

  return (
    <>
      <Card className="bg-athlex-gray-900 border-athlex-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-white">
            <Key className="h-5 w-5 text-athlex-accent" />
            Change Password
          </CardTitle>
          <CardDescription className="text-athlex-gray-400">
            Update your account password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Current Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your current password" 
                        className="bg-athlex-gray-800 border-athlex-gray-700"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your new password" 
                        className="bg-athlex-gray-800 border-athlex-gray-700"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Confirm your new password" 
                        className="bg-athlex-gray-800 border-athlex-gray-700"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-athlex-accent hover:bg-athlex-accent-alt">
                  <Save className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="mt-6 space-y-6">
        <Card className="bg-athlex-gray-900 border-athlex-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <LogOut className="h-5 w-5 text-athlex-accent" />
              Session Management
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Manage your account sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <Button 
                onClick={() => signOut()} 
                className="bg-athlex-gray-800 text-white hover:bg-athlex-gray-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-athlex-gray-900 border-athlex-gray-800 border-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-athlex-gray-400">
              Irreversible account actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <Dialog 
                open={deleteAccountDialogOpen}
                onOpenChange={setDeleteAccountDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-athlex-gray-900 border-athlex-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-athlex-gray-400">
                      This action cannot be undone. This will permanently delete your account
                      and remove all of your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-white font-medium">Type DELETE to confirm</p>
                    <Input 
                      className="mt-2 bg-athlex-gray-800 border-athlex-gray-700"
                      placeholder="Type DELETE to confirm"
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="ghost" 
                      onClick={() => setDeleteAccountDialogOpen(false)}
                      className="text-white hover:bg-athlex-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete Account"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AccountSettings;
