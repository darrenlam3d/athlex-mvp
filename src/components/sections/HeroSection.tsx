
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Target, Award, Users, Search } from 'lucide-react';

const HeroSection = () => {
  // Function to handle click on the "Learn How It Works" button
  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
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
            A unified platform to train smarter, track progress, and get discovered—<span className="font-bold text-athlex-accent">globally</span>.
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
            <a href="#signup">
              <Button variant="default" className="cta-button text-base sm:text-lg w-full sm:w-auto">
                Join the Waitlist
              </Button>
            </a>
            <Button 
              variant="outline" 
              className="text-base sm:text-lg w-full sm:w-auto border-athlex-accent text-athlex-accent hover:bg-athlex-accent/10"
              onClick={handleLearnMoreClick}
            >
              Learn How It Works
            </Button>
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

export default HeroSection;
