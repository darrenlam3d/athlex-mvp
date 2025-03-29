
import React from 'react';
import { Trophy, Medal, Award, GraduationCap } from 'lucide-react';

const WhySection = () => {
  return (
    <section id="why" className="section-padding py-24 md:py-32 relative overflow-hidden">
      {/* Background athlete image with overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(60%)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-athlex-gray-900/90"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text inline-block">
            Why ATHLEX
          </h2>
          <p className="text-white/80 text-lg md:text-xl">
            ATHLEX transforms the sports ecosystem by addressing critical gaps in athlete development and discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <ComparisonCard
            negative="Scattered Tools"
            positive="Unified Platform"
            description="Replace disjointed systems with a single platform for all your athletic development needs."
            icon={<Trophy className="w-8 h-8" />}
          />
          <ComparisonCard
            negative="Hidden Talent"
            positive="Intelligent Discovery"
            description="Make talent visible with AI-powered matching between athletes and opportunities."
            icon={<Medal className="w-8 h-8" />}
          />
          <ComparisonCard
            negative="Local Exposure"
            positive="Global Reach"
            description="Break geographical barriers and connect with opportunities worldwide."
            icon={<Award className="w-8 h-8" />}
          />
          <ComparisonCard
            negative="Fragmented Support"
            positive="Integrated Growth Tools"
            description="Access a comprehensive ecosystem of tools designed for holistic athletic development."
            icon={<GraduationCap className="w-8 h-8" />}
          />
        </div>
      </div>
    </section>
  );
};

const ComparisonCard = ({ 
  negative, 
  positive, 
  description, 
  icon 
}: { 
  negative: string, 
  positive: string, 
  description: string,
  icon: React.ReactNode
}) => {
  return (
    <div className="group bg-athlex-gray-800/40 border border-athlex-gray-700 p-8 rounded-lg hover:bg-athlex-gray-800/60 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(155,135,245,0.3)] animate-fade-in">
      <div className="flex items-start mb-6">
        <div className="mr-5 flex flex-col items-center">
          <div className="text-red-500 text-2xl flex items-center justify-center mb-3 opacity-80">❌</div>
          <div className="h-20 w-px bg-gradient-to-b from-red-500/50 to-athlex-accent/50 my-1"></div>
          <div className="text-athlex-accent p-2 rounded-full bg-athlex-accent/10 border border-athlex-accent/30 mt-2 group-hover:animate-pulse-soft">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-6">
            <p className="text-red-400 line-through text-lg mb-2 opacity-90">{negative}</p>
            <h3 className="text-athlex-accent font-bold text-xl group-hover:text-white transition-colors duration-300">{positive}</h3>
          </div>
          <p className="text-white/80 text-base group-hover:text-white/95 transition-colors duration-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WhySection;
