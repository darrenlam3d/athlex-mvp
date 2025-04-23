
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-athlex-background flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <img 
          src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
          alt="ATHLEX Logo" 
          className="h-12 mx-auto mb-6" 
        />
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          ATHLEX Platform
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto mb-8">
          The complete sports platform connecting athletes, coaches, and scouts with 
          data-driven performance analysis and AI-powered insights.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link to="/login">
            <Button className="w-full sm:w-auto">
              Continue to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          <Link to="/mvp">
            <Button variant="outline" className="w-full sm:w-auto">
              Try MVP Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
