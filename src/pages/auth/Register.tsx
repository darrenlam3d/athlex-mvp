import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: 'athlete' | 'coach' | 'scout';
  birthdate?: string;
  agreeToTerms: boolean;
  parentEmail?: string;
}
const Register = () => {
  const {
    signUp
  } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'athlete' | 'coach' | 'scout'>('athlete');
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [isUnderage, setIsUnderage] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: {
      errors
    }
  } = useForm<RegisterFormValues>({
    defaultValues: {
      role: 'athlete',
      agreeToTerms: false
    }
  });
  const password = watch('password');
  const selectedRole = watch('role');

  // Handle date of birth change to check age
  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthdate = new Date(e.target.value);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || m === 0 && today.getDate() < birthdate.getDate()) {
      age--;
    }

    // If user is under 13, mark as underage and ask for parent email
    if (age < 13) {
      setIsUnderage(true);
      if (selectedRole === 'athlete') {
        setShowAgeModal(true);
      }
    } else {
      setIsUnderage(false);
    }
  };
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Check if the user agreed to terms
      if (!data.agreeToTerms) {
        toast.error("You must agree to the terms and privacy policy");
        return;
      }

      // For underage athletes, ensure parent email is provided
      if (isUnderage && data.role === 'athlete' && !data.parentEmail) {
        toast.error("Parent email is required for athletes under 13");
        return;
      }

      // Register the user
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        ageVerified: !isUnderage,
        birthdate: data.birthdate
      };
      const {
        error
      } = await signUp(data.email, data.password, userData);
      if (error) throw error;

      // If successful registration
      toast.success('Registration successful! Check your email to confirm your account.');

      // For underage athletes, we need to create a parental consent record
      if (isUnderage && data.role === 'athlete' && data.parentEmail) {
        // This will be handled by a trigger in the database when athlete profile is created

        // Navigate to a special page explaining the parental consent process
        navigate('/auth/parental-consent-pending');
      } else {
        // Navigate to login page or onboarding
        navigate('/auth/login');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      // Error is already handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="flex min-h-screen bg-athlex-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center">
            <img src="/lovable-uploads/b84ddeca-bec0-41af-8ad4-07c922bd1508.png" alt="ATHLEX Logo" className="h-12 w-auto" />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-athlex-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-athlex-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-athlex-accent hover:text-athlex-accent-dark">
              Sign in instead
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Role selection */}
              <div>
                <Label className="text-base">I am a:</Label>
                <Controller control={control} name="role" render={({
                field
              }) => <RadioGroup className="flex space-x-4 mt-2" value={field.value} onValueChange={(value: any) => {
                field.onChange(value);
                setRole(value);
              }}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="athlete" id="athlete" />
                        <Label htmlFor="athlete">Athlete</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="coach" id="coach" />
                        <Label htmlFor="coach">Coach</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        
                        
                      </div>
                    </RadioGroup>} />
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="mt-1">
                    <Input id="firstName" {...register("firstName", {
                    required: "First name is required"
                  })} className={errors.firstName ? "border-red-500" : ""} />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="mt-1">
                    <Input id="lastName" {...register("lastName", {
                    required: "Last name is required"
                  })} className={errors.lastName ? "border-red-500" : ""} />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email address</Label>
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

              {/* If role is athlete, add birthdate field */}
              {selectedRole === 'athlete' && <div>
                  <Label htmlFor="birthdate">Date of Birth</Label>
                  <div className="mt-1">
                    <Input id="birthdate" type="date" {...register("birthdate", {
                  required: "Date of birth is required for athletes"
                })} onChange={handleBirthdateChange} className={errors.birthdate ? "border-red-500" : ""} />
                    {errors.birthdate && <p className="mt-1 text-sm text-red-600">{errors.birthdate.message}</p>}
                  </div>
                </div>}

              {/* Parent email for underage athletes */}
              {isUnderage && selectedRole === 'athlete' && <div>
                  <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
                  <div className="mt-1">
                    <Input id="parentEmail" type="email" {...register("parentEmail", {
                  required: "Parent email is required for athletes under 13",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} className={errors.parentEmail ? "border-red-500" : ""} />
                    {errors.parentEmail && <p className="mt-1 text-sm text-red-600">{errors.parentEmail.message}</p>}
                    <p className="mt-1 text-sm text-athlex-gray-500">Required for users under 13 years old. A consent form will be sent to this email.</p>
                  </div>
                </div>}

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1">
                  <Input id="password" type="password" {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })} className={errors.password ? "border-red-500" : ""} />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <div className="mt-1">
                  <Input id="passwordConfirm" type="password" {...register("passwordConfirm", {
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })} className={errors.passwordConfirm ? "border-red-500" : ""} />
                  {errors.passwordConfirm && <p className="mt-1 text-sm text-red-600">{errors.passwordConfirm.message}</p>}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <Controller name="agreeToTerms" control={control} rules={{
                  required: "You must agree to the terms and privacy policy"
                }} render={({
                  field
                }) => <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />} />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-athlex-gray-700">
                    I agree to the{' '}
                    <Link to="/terms" className="text-athlex-accent hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-athlex-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>}
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full cta-button" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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
      
      {/* Age verification modal for underage athletes */}
      <Dialog open={showAgeModal} onOpenChange={setShowAgeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Parental Consent Required</DialogTitle>
            <DialogDescription>
              We've noticed you're under 13 years old. According to PDPA regulations, 
              we need parental consent before you can use ATHLEX. 
              
              Please provide your parent or guardian's email address. 
              We'll send them a consent form to complete.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-athlex-gray-600 mb-4">
              Your account will have limited access until parental consent is provided.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowAgeModal(false)}>
              I Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Register;