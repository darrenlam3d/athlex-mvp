
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Users, Search } from 'lucide-react';

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
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-athlex-gray-900 border border-gray-800 rounded-lg p-6 hover:border-athlex-accent transition-all">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Athletes</h3>
            <p className="text-gray-400 text-center text-sm mb-4">
              Track your performance, set goals, and get personalized training recommendations
            </p>
            <Link to="/athlete">
              <Button variant="ghost" className="w-full">
                Athlete Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="bg-athlex-gray-900 border border-gray-800 rounded-lg p-6 hover:border-athlex-accent transition-all">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Coaches</h3>
            <p className="text-gray-400 text-center text-sm mb-4">
              Manage athletes, create training plans, and monitor performance progress
            </p>
            <Link to="/coach">
              <Button variant="ghost" className="w-full">
                Coach Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="bg-athlex-gray-900 border border-gray-800 rounded-lg p-6 hover:border-athlex-accent transition-all">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-amber-900/30 flex items-center justify-center">
                <Search className="h-8 w-8 text-amber-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Scouts</h3>
            <p className="text-gray-400 text-center text-sm mb-4">
              Discover talent, analyze performance data, and build scouting reports
            </p>
            <Link to="/scout">
              <Button variant="ghost" className="w-full">
                Scout Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
