import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
interface LoginFormValues {
  email: string;
  password: string;
}
const Login = () => {
  const {
    signIn
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Use the state passed via redirect
  const from = location.state?.from?.pathname || '/dashboard';
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<LoginFormValues>();
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const {
        error
      } = await signIn(data.email, data.password);
      if (error) throw error;

      // Success - navigate to the page the user was trying to access
      toast.success('Login successful!');
      navigate(from, {
        replace: true
      });
    } catch (error: any) {
      console.error('Login error:', error);
      // Error is already handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="flex min-h-screen bg-athlex-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center">
            
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-athlex-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-athlex-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-medium text-athlex-accent hover:text-athlex-accent-dark">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="email">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input id="email" type="email" autoComplete="email" {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} className={errors.email ? "border-red-500" : ""} />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="password">
                  Password
                </Label>
                <div className="mt-1">
                  <Input id="password" type="password" autoComplete="current-password" {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })} className={errors.password ? "border-red-500" : ""} />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-athlex-accent focus:ring-athlex-accent" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-athlex-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/auth/forgot-password" className="font-medium text-athlex-accent hover:text-athlex-accent-dark">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full cta-button" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img className="absolute inset-0 h-full w-full object-cover" src="/lovable-uploads/e12dab71-5a90-458e-88cc-029beadad04e.png" alt="Athletes training" />
        <div className="absolute inset-0 bg-athlex-accent/30"></div>
      </div>
    </div>;
};
export default Login;