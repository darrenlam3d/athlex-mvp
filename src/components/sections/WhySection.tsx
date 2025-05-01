
import React from 'react';
import { Layers, Globe, Zap, LineChart } from 'lucide-react';

const WhySection = () => {
  return (
    <section id="why" className="section-padding py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Light purple gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-athlex-accent/5 to-white"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text inline-block">
            Why ATHLEX
          </h2>
          <p className="text-athlex-gray-700 text-lg md:text-xl">
            Transforming the sports ecosystem by addressing critical gaps in athlete development and discovery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <ValueCard
            icon={<Layers className="w-8 h-8 text-athlex-accent" />}
            title="Unified Platform"
            description="One integrated ecosystem for all your athletic needs"
          />
          <ValueCard
            icon={<Zap className="w-8 h-8 text-athlex-accent" />}
            title="Intelligent Discovery"
            description="AI-powered matching connects talent with opportunities"
          />
          <ValueCard
            icon={<Globe className="w-8 h-8 text-athlex-accent" />}
            title="Global Reach"
            description="Break geographical barriers, connect worldwide"
          />
          <ValueCard
            icon={<LineChart className="w-8 h-8 text-athlex-accent" />}
            title="Integrated Growth Tools"
            description="Holistic development—physical, mental, strategic"
          />
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
}) => {
  return (
    <div className="group bg-white border border-athlex-gray-200 p-8 rounded-lg hover:bg-athlex-gray-50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg shadow-sm animate-fade-in">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-athlex-accent/10 border border-athlex-accent/30 group-hover:animate-pulse-soft">
          {icon}
        </div>
        <h3 className="ml-4 text-athlex-accent font-bold text-xl group-hover:text-athlex-accent-alt transition-colors duration-300">{title}</h3>
      </div>
      <p className="text-athlex-gray-700 text-base group-hover:text-athlex-gray-900 transition-colors duration-300">{description}</p>
    </div>
  );
};

export default WhySection;
