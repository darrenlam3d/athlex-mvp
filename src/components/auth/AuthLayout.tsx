
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-athlex-background text-white flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <img 
          src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
          alt="ATHLEX Logo" 
          className="h-14 mx-auto mb-6" 
        />
        <h1 className="text-3xl font-bold mb-2">Welcome to ATHLEX</h1>
        <p className="text-gray-400">Sign in or create an account</p>
      </div>
      {children}
      <p className="mt-8 text-sm text-gray-500">
        By continuing, you agree to ATHLEX's <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default AuthLayout;
