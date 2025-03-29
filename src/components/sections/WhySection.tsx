
import React from 'react';

const WhySection = () => {
  return (
    <section id="why" className="section-padding bg-athlex-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why ATHLEX</h2>
          <p className="text-white/70 text-lg">
            ATHLEX transforms the sports ecosystem by addressing critical gaps in athlete development and discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <ComparisonCard
            negative="Scattered Tools"
            positive="Unified Platform"
            description="Replace disjointed systems with a single platform for all your athletic development needs."
          />
          <ComparisonCard
            negative="Hidden Talent"
            positive="Intelligent Discovery"
            description="Make talent visible with AI-powered matching between athletes and opportunities."
          />
          <ComparisonCard
            negative="Local Exposure"
            positive="Global Reach"
            description="Break geographical barriers and connect with opportunities worldwide."
          />
          <ComparisonCard
            negative="Fragmented Support"
            positive="Integrated Growth Tools"
            description="Access a comprehensive ecosystem of tools designed for holistic athletic development."
          />
        </div>
      </div>
    </section>
  );
};

const ComparisonCard = ({ negative, positive, description }: { negative: string, positive: string, description: string }) => {
  return (
    <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 p-6 rounded-lg hover:bg-athlex-gray-800/60 transition-all duration-300">
      <div className="flex items-start mb-4">
        <div className="mr-4 flex flex-col items-center">
          <span className="text-red-500 text-xl">❌</span>
          <div className="h-full w-px bg-athlex-gray-700 my-2"></div>
          <span className="text-athlex-accent text-xl">✓</span>
        </div>
        <div>
          <p className="text-red-400 line-through mb-2">{negative}</p>
          <p className="text-athlex-accent font-semibold text-lg">{positive}</p>
        </div>
      </div>
      <p className="text-white/70 ml-10">{description}</p>
    </div>
  );
};

export default WhySection;
