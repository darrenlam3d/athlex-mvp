
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Target, Award, Users, Search, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Function to handle click on the "Join Waitlist" button
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-athlex-accent/10 to-white overflow-hidden pt-16">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in text-athlex-gray-900">
            Built by <span className="text-athlex-accent">Athletes</span>, For <span className="text-athlex-accent">Athletes</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-athlex-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Train smarter. Track progress. Get discovered—<span className="font-bold text-athlex-accent">globally</span>.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <FeatureIcon icon={<Shield className="text-athlex-accent" />} label="Verified Profile" />
            <FeatureIcon icon={<TrendingUp className="text-athlex-accent" />} label="Performance Tracking" />
            <FeatureIcon icon={<Award className="text-athlex-accent" />} label="AI-Driven Insights" />
            <FeatureIcon icon={<Target className="text-athlex-accent" />} label="Goal Setting" />
            <FeatureIcon icon={<Users className="text-athlex-accent" />} label="Skill Development" />
            <FeatureIcon icon={<Search className="text-athlex-accent" />} label="Talent Discovery" />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {isAuthenticated ? (
              <Button 
                variant="default" 
                className="cta-button text-base sm:text-lg w-full sm:w-auto"
                asChild
              >
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button 
                  variant="default" 
                  className="cta-button text-base sm:text-lg w-full sm:w-auto"
                  onClick={scrollToSignup}
                >
                  Join the Waitlist
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-base sm:text-lg w-full sm:w-auto border-athlex-accent text-athlex-accent hover:bg-athlex-accent/10"
                  asChild
                >
                  <Link to="/auth/login">Sign In</Link>
                </Button>
              </>
            )}
            
            <DemoModal />
          </div>
          
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex justify-center">
              <a href="#features" className="flex flex-col items-center text-athlex-gray-600 hover:text-athlex-accent transition-colors duration-300">
                <span className="text-sm">Explore Features</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mt-2 animate-pulse-soft"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white hover:bg-athlex-gray-50 transition-all duration-300 border border-athlex-gray-200 shadow-sm">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm text-athlex-gray-700">{label}</p>
    </div>
  );
};

const DemoModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="text-base sm:text-lg w-full sm:w-auto border-athlex-accent text-athlex-accent hover:bg-athlex-accent/10 gap-2"
        >
          <Play size={16} />
          See It in Action
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div className="aspect-video bg-athlex-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center p-8">
            <Play size={48} className="mx-auto text-athlex-accent mb-4" />
            <h3 className="text-xl font-bold text-athlex-gray-800 mb-2">ATHLEX Demo</h3>
            <p className="text-athlex-gray-600">
              30-second video showing how ATHLEX helps athletes track progress and get discovered
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeroSection;
