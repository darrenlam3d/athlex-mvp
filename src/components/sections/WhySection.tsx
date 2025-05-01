
import React from 'react';
import { Layers, Globe, Zap, LineChart } from 'lucide-react';

const WhySection = () => {
  return (
    <section id="why" className="section-padding py-16 md:py-24 lg:py-32 relative overflow-hidden bg-white">
      {/* Light purple gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-athlex-accent/5 to-white"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 gradient-text inline-block">
            Why ATHLEX
          </h2>
          <p className="text-athlex-gray-700 text-base md:text-lg lg:text-xl px-4 md:px-0">
            Transforming the sports ecosystem by addressing critical gaps in athlete development and discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 max-w-5xl mx-auto px-4 md:px-0">
          <ValueCard
            icon={<Layers className="w-6 h-6 md:w-8 md:h-8 text-athlex-accent" />}
            title="Unified Platform"
            description="One integrated ecosystem for all your athletic needs"
          />
          <ValueCard
            icon={<Zap className="w-6 h-6 md:w-8 md:h-8 text-athlex-accent" />}
            title="Intelligent Discovery"
            description="AI-powered matching connects talent with opportunities"
          />
          <ValueCard
            icon={<Globe className="w-6 h-6 md:w-8 md:h-8 text-athlex-accent" />}
            title="Global Reach"
            description="Break geographical barriers, connect worldwide"
          />
          <ValueCard
            icon={<LineChart className="w-6 h-6 md:w-8 md:h-8 text-athlex-accent" />}
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
    <div className="group bg-white border border-athlex-gray-200 p-4 md:p-6 lg:p-8 rounded-lg hover:bg-athlex-gray-50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg shadow-sm animate-fade-in">
      <div className="flex items-center mb-4 md:mb-6">
        <div className="p-2 md:p-3 rounded-full bg-athlex-accent/10 border border-athlex-accent/30 group-hover:animate-pulse-soft">
          {icon}
        </div>
        <h3 className="ml-3 md:ml-4 text-athlex-accent font-bold text-lg md:text-xl group-hover:text-athlex-accent-alt transition-colors duration-300">{title}</h3>
      </div>
      <p className="text-athlex-gray-700 text-sm md:text-base group-hover:text-athlex-gray-900 transition-colors duration-300">{description}</p>
    </div>
  );
};

export default WhySection;
