
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound, UsersRound, HeartPulse } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const Login = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  // Function to handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isDemoMode()) {
      // Demo mode login (role selector)
      handleDemoLogin();
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        // Fetch user profile to get role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError.message);
        }
        
        const userRole = profileData?.role as 'athlete' | 'scout' | 'coach';
        
        toast.success('Logged in successfully');
        
        // If we have a role, navigate to the appropriate dashboard
        if (userRole) {
          setUserRole(userRole);
          navigate(`/${userRole}-dashboard`);
        } else {
          // Default to athlete if no role found
          setUserRole('athlete');
          navigate('/athlete-dashboard');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error.message);
      toast.error('Login failed', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isDemoMode()) {
      // Demo mode sign up (role selector)
      handleDemoLogin();
      return;
    }
    
    try {
      // Create a new user with additional metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: 'athlete', // Default role is athlete
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        toast.success('Sign up successful', {
          description: 'Please check your email to verify your account.',
        });
        
        // Set default role to athlete
        setUserRole('athlete');
        
        // For development, we can skip email verification and log in immediately
        navigate('/athlete-dashboard');
      }
    } catch (error: any) {
      console.error('Sign up error:', error.message);
      toast.error('Sign up failed', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle demo login by role selection
  const handleDemoLogin = (role: 'athlete' | 'scout' | 'coach' = 'athlete') => {
    setUserRole(role);
    
    // Show success toast
    toast.success(`Logged in as ${role}`, {
      description: `You now have ${role} privileges.`,
      duration: 3000,
    });
    
    // Redirect to the appropriate dashboard
    navigate(`/${role}-dashboard`);
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <img 
          src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
          alt="ATHLEX Logo" 
          className="h-14 mx-auto mb-6" 
        />
        <h1 className="text-3xl font-bold mb-2">Welcome to ATHLEX</h1>
        <p className="text-gray-400">
          {isDemoMode() ? 'Select your role to continue' : 'Sign in or create an account'}
        </p>
      </div>
      
      {isDemoMode() ? (
        // Demo mode: show role selection cards
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <Card className="bg-card border-gray-700 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-900/30 p-4 rounded-full mb-4">
                <UserRound className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle>Athlete</CardTitle>
              <CardDescription className="text-gray-400">Track your performance and get discovered</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-center text-gray-400">
              <p>Access your performance metrics, training plans, and increase your visibility to scouts worldwide.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleDemoLogin('athlete')} className="w-full">
                Log in as Athlete
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-card border-gray-700 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-orange-900/30 p-4 rounded-full mb-4">
                <UsersRound className="h-8 w-8 text-orange-400" />
              </div>
              <CardTitle>Scout</CardTitle>
              <CardDescription className="text-gray-400">Discover and evaluate talent</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-center text-gray-400">
              <p>Find promising athletes, analyze their stats, and manage your recruitment pipeline effectively.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleDemoLogin('scout')} className="w-full">
                Log in as Scout
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-card border-gray-700 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-900/30 p-4 rounded-full mb-4">
                <HeartPulse className="h-8 w-8 text-green-400" />
              </div>
              <CardTitle>Coach</CardTitle>
              <CardDescription className="text-gray-400">Develop and manage your athletes</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-center text-gray-400">
              <p>Track athlete progress, assign training sessions, and provide personalized development guidance.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleDemoLogin('coach')} className="w-full">
                Log in as Coach
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        // Real auth mode: show login/signup form
        <Card className="w-full max-w-md bg-card border-gray-700">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>Enter your credentials to access your dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Enter your details to register</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      )}
      
      <p className="mt-8 text-sm text-gray-500">
        By continuing, you agree to ATHLEX's <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default Login;
