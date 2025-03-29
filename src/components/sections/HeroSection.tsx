
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-athlex-background overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-athlex-accent/10 to-transparent"></div>
      
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="block">ATHLEX</span>
            <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl text-white/90">
              Built by Athletes, For Athletes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Take control of your journey. Track your growth. Get discovered.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a href="#signup">
              <Button variant="default" className="cta-button text-base sm:text-lg w-full sm:w-auto">
                Join the Waitlist
              </Button>
            </a>
            <a href="#features">
              <Button variant="default" className="cta-button-secondary text-base sm:text-lg w-full sm:w-auto">
                I'm a Coach / Scout / Federation
              </Button>
            </a>
          </div>
          
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex justify-center">
              <a href="#features" className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
                <span className="text-sm">Discover More</span>
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

export default HeroSection;
