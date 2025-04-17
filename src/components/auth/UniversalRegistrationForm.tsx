
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, KeyRound, UserRound, UsersRound } from 'lucide-react';

// Define the schema for the form
const universalFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type UniversalFormValues = z.infer<typeof universalFormSchema>;

interface UniversalRegistrationFormProps {
  onSubmit: (data: UniversalFormValues) => void;
  selectedRole: 'athlete' | 'coach' | 'scout' | null;
  onSelectRole: (role: 'athlete' | 'coach' | 'scout') => void;
  isLoading?: boolean;
}

const UniversalRegistrationForm = ({ 
  onSubmit, 
  selectedRole,
  onSelectRole, 
  isLoading = false 
}: UniversalRegistrationFormProps) => {
  const form = useForm<UniversalFormValues>({
    resolver: zodResolver(universalFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleSubmit = (data: UniversalFormValues) => {
    if (!selectedRole) {
      form.setError('root', { 
        type: 'manual',
        message: 'Please select a role to continue'
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <Card className="w-full bg-gray-900/60 border-gray-800 text-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-athlex-accent to-purple-400 bg-clip-text text-transparent">
          Join ATHLEX
        </CardTitle>
        <CardDescription className="text-gray-300">
          Create your account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">
                        <User size={18} />
                      </span>
                      <Input
                        placeholder="Enter your full name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </span>
                      <Input
                        type="email"
                        placeholder="youremail@example.com"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">
                        <KeyRound size={18} />
                      </span>
                      <Input
                        type="password"
                        placeholder="Create a secure password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">
                        <KeyRound size={18} />
                      </span>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10 bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="py-4">
              <h3 className="mb-4 text-center text-gray-200">Select Your Role</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole === 'athlete' 
                      ? 'border-athlex-accent bg-gray-800/70' 
                      : 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50'
                  }`}
                  onClick={() => onSelectRole('athlete')}
                >
                  <div className="flex flex-col items-center text-center p-2">
                    <div className={`p-3 rounded-full mb-3 ${
                      selectedRole === 'athlete' ? 'bg-athlex-accent/20' : 'bg-gray-700/30'
                    }`}>
                      <UserRound size={24} className={selectedRole === 'athlete' ? 'text-athlex-accent' : 'text-gray-400'} />
                    </div>
                    <h3 className="text-base font-medium mb-1 text-gray-200">Athlete</h3>
                    <p className="text-xs text-gray-400">
                      Track your progress and get personalized training
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole === 'coach' 
                      ? 'border-athlex-accent bg-gray-800/70' 
                      : 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50'
                  }`}
                  onClick={() => onSelectRole('coach')}
                >
                  <div className="flex flex-col items-center text-center p-2">
                    <div className={`p-3 rounded-full mb-3 ${
                      selectedRole === 'coach' ? 'bg-athlex-accent/20' : 'bg-gray-700/30'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={selectedRole === 'coach' ? 'text-athlex-accent' : 'text-gray-400'}><path d="M2 4v16"/><path d="M22 4v16"/><path d="M12 7v4"/><path d="M12 15v.01"/><path d="M4 7h16"/><path d="M10 7V4"/><path d="M14 7V4"/></svg>
                    </div>
                    <h3 className="text-base font-medium mb-1 text-gray-200">Coach</h3>
                    <p className="text-xs text-gray-400">
                      Manage athletes and create training plans
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole === 'scout' 
                      ? 'border-athlex-accent bg-gray-800/70' 
                      : 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50'
                  }`}
                  onClick={() => onSelectRole('scout')}
                >
                  <div className="flex flex-col items-center text-center p-2">
                    <div className={`p-3 rounded-full mb-3 ${
                      selectedRole === 'scout' ? 'bg-athlex-accent/20' : 'bg-gray-700/30'
                    }`}>
                      <UsersRound size={24} className={selectedRole === 'scout' ? 'text-athlex-accent' : 'text-gray-400'} />
                    </div>
                    <h3 className="text-base font-medium mb-1 text-gray-200">Scout</h3>
                    <p className="text-xs text-gray-400">
                      Discover talent and monitor athlete performance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {form.formState.errors.root && (
              <p className="text-red-400 text-center">{form.formState.errors.root.message}</p>
            )}

            <Button 
              type="submit" 
              className="w-full bg-athlex-accent hover:bg-athlex-accent/90 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Continue to Profile Setup'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UniversalRegistrationForm;
