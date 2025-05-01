
import React from 'react';

const IntegrationsSection = () => {
  const integrations = [
    { name: "HealthKit", logo: "/lovable-uploads/8f087e79-abca-4837-ac54-e0f2ef1c9421.png" },
    { name: "Garmin", logo: "/lovable-uploads/ad70cd9e-5e44-4990-af27-c3d2ced6ca96.png" },
    { name: "Fitbit", logo: "/lovable-uploads/be72010c-caea-4326-afca-023025383220.png" },
    { name: "Strava", logo: "/lovable-uploads/e12dab71-5a90-458e-88cc-029beadad04e.png" },
    { name: "WHOOP", logo: "/lovable-uploads/fffd7d28-3179-4c1e-acd9-cdde0b892e61.png" }
  ];

  return (
    <section className="py-16 bg-athlex-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">Seamless Integrations</h2>
          <p className="text-athlex-gray-700">Connect your favorite fitness apps and devices</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 px-4">
          {integrations.map((integration, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-sm border border-athlex-gray-200 mb-2">
                <img 
                  src={integration.logo} 
                  alt={`${integration.name} logo`} 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain" 
                />
              </div>
              <span className="text-sm font-medium text-athlex-gray-700">{integration.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
