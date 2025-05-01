
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ChartBar, Lightbulb, Target, Trophy } from 'lucide-react';

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("athletes");

  // Listen for changes to set the active tab
  useEffect(() => {
    // Function to check sessionStorage and set tab
    const checkStoredTab = () => {
      const storedTab = sessionStorage.getItem('activeTab');
      if (storedTab === 'coaches') {
        setActiveTab("coaches");
        // Clear after using
        sessionStorage.removeItem('activeTab');
      }
    };

    // Check initially
    checkStoredTab();

    // Listen for custom event
    const handleTabChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail === 'coaches') {
        setActiveTab("coaches");
      }
    };
    window.addEventListener('tabChange', handleTabChange as EventListener);
    return () => {
      window.removeEventListener('tabChange', handleTabChange as EventListener);
    };
  }, []);

  return (
    <section id="features" className="section-padding py-24 md:py-32 bg-gradient-to-b from-athlex-background to-athlex-gray-100">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text inline-block">Features</h2>
          <p className="text-athlex-gray-700 text-lg mb-4">
            Empowering athletes with the tools they need to <span className="text-athlex-accent font-bold">grow</span>, <span className="text-athlex-accent font-bold">excel</span>, and <span className="text-athlex-accent font-bold">connect</span> globally.
          </p>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-athlex-gray-100 p-1 rounded-lg overflow-hidden shadow-sm">
              <TabsTrigger 
                value="athletes" 
                className={`px-6 py-3 transition-all duration-300 ${activeTab === "athletes" ? "text-athlex-gray-900 gradient-text" : "text-athlex-gray-600 hover:text-athlex-gray-800"}`}
              >
                For Athletes
              </TabsTrigger>
              <TabsTrigger 
                value="coaches" 
                className={`px-6 py-3 transition-all duration-300 ${activeTab === "coaches" ? "text-athlex-gray-900 gradient-text" : "text-athlex-gray-600 hover:text-athlex-gray-800"}`}
              >
                For Coaches
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="athletes" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <FeatureCard 
                icon={<Shield size={28} className="text-athlex-accent" />} 
                title="Verified Athlete Profile"
                benefit="Your trusted digital ID that evolves with you"
                stat="100% verified credentials" />
              
              <FeatureCard 
                icon={<ChartBar size={28} className="text-athlex-accent" />} 
                title="Performance Tracking"
                benefit="Track progress across 20+ key metrics" 
                stat="20+ metrics tracked" />
              
              <FeatureCard 
                icon={<Lightbulb size={28} className="text-athlex-accent" />} 
                title="AI-Driven Insights"
                benefit="Get personalized training recommendations"
                stat="Weekly personalized insights" />
              
              <FeatureCard 
                icon={<Target size={28} className="text-athlex-accent" />} 
                title="Goal Setting & Milestones"
                benefit="Set objectives and celebrate achievements"
                stat="92% goal completion rate" />
              
              <FeatureCard 
                icon={<Trophy size={28} className="text-athlex-accent" />} 
                title="Global Opportunity Discovery"
                benefit="Connect with scholarships, camps & coaches"
                stat="200+ global opportunities" />
            </div>
          </TabsContent>

          <TabsContent value="coaches" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <FeatureCard 
                icon={<Shield size={28} className="text-athlex-accent" />} 
                title="Talent Discovery Engine" 
                benefit="Find athletes based on precise criteria"
                stat="Advanced filtering tools" />
              
              <FeatureCard 
                icon={<ChartBar size={28} className="text-athlex-accent" />} 
                title="Verified Performance Data" 
                benefit="Access clean, structured metrics you can trust"
                stat="100% verified data" />
              
              <FeatureCard 
                icon={<Lightbulb size={28} className="text-athlex-accent" />} 
                title="Development Analytics" 
                benefit="Track progression patterns"
                stat="Predictive growth modeling" />
              
              <FeatureCard 
                icon={<Target size={28} className="text-athlex-accent" />} 
                title="Endorsement Tools" 
                benefit="Provide credible athlete feedback"
                stat="Trust score system" />
              
              <FeatureCard 
                icon={<Trophy size={28} className="text-athlex-accent" />} 
                title="Direct Contact Requests" 
                benefit="Connect with matching talent"
                stat="Smart matching algorithm" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon,
  title,
  benefit,
  stat
}: {
  icon: React.ReactNode;
  title: string;
  benefit: string;
  stat: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white border border-athlex-gray-200 p-6 rounded-lg hover:border-athlex-accent transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-3 text-athlex-gray-800">{title}</h3>
      
      <div className="relative flex-grow flex items-center justify-center w-full">
        <p className={`text-athlex-gray-600 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          {benefit}
        </p>
        <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-athlex-accent font-medium">{stat}</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
