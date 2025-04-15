import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Award, Target, TrendingUp, Users, Search } from 'lucide-react';

const HeroSection = () => {
  // Function to handle click on the coach/scout button
  const handleCoachScoutClick = () => {
    // First, scroll to the features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Store a flag in sessionStorage to indicate that coaches tab should be active
    sessionStorage.setItem('activeTab', 'coaches');
    
    // Force a re-render of the FeaturesSection by dispatching a custom event
    window.dispatchEvent(new CustomEvent('tabChange', { detail: 'coaches' }));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-athlex-background overflow-hidden pt-16">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-silhouettes-of-people-training-in-a-gym-1393-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Fallback image if video doesn't load */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)',
          }}
        ></div>
      </div>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-athlex-accent/10 to-transparent z-[5]"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in text-shadow-black">
            By <span className="text-athlex-accent">Athletes</span>, For <span className="text-athlex-accent">Athletes</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-6 animate-fade-in text-shadow-black" style={{ animationDelay: "0.2s" }}>
            Empowering athletes to grow, connect, and get discovered—<span className="font-bold text-athlex-accent">globally</span>.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <FeatureIcon icon={<Shield className="text-athlex-accent" />} label="Verified Profile" />
            <FeatureIcon icon={<TrendingUp className="text-athlex-accent" />} label="Performance Tracking" />
            <FeatureIcon icon={<Target className="text-athlex-accent" />} label="Goal Setting" />
            <FeatureIcon icon={<Award className="text-athlex-accent" />} label="Skill Development" />
            <FeatureIcon icon={<Users className="text-athlex-accent" />} label="Peer Benchmarking" />
            <FeatureIcon icon={<Search className="text-athlex-accent" />} label="Talent Discovery" />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a href="#signup">
              <Button variant="default" className="cta-button text-base sm:text-lg w-full sm:w-auto">
                Join the Waitlist
              </Button>
            </a>
            <Button 
              variant="default" 
              className="cta-button-secondary text-base sm:text-lg w-full sm:w-auto"
              onClick={handleCoachScoutClick}
            >
              I'm a Coach / Scout / Federation
            </Button>
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

const FeatureIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-athlex-gray-800/40 hover:bg-athlex-gray-800/70 transition-all duration-300 border border-athlex-gray-700/50">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm text-white/80">{label}</p>
    </div>
  );
};

export default HeroSection;
