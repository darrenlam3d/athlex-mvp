
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  return (
    <AuthLayout>
      <Card className="w-full max-w-md bg-card border-gray-700">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* Add link to demo login page */}
      <div className="mt-4">
        <Button variant="link" onClick={() => navigate('/login-demo')} className="text-primary">
          Try Demo Mode (No auth required)
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;
