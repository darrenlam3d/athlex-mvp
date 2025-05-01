
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ChartBar, Lightbulb, Target, TrendingUp, Trophy, Search, BarChart, LineChart, ThumbsUp, ClipboardList, Mail } from 'lucide-react';

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <FeatureCard 
                icon={<Shield size={28} className="text-athlex-accent" />} 
                title="Verified Athlete Profile" 
                description="Build a trusted digital ID that evolves with you across teams, seasons, and competitions." />
              <FeatureCard 
                icon={<ChartBar size={28} className="text-athlex-accent" />} 
                title="Performance Tracking" 
                description="Monitor key metrics and benchmark against peers by age, role, and sport." />
              <FeatureCard 
                icon={<Lightbulb size={28} className="text-athlex-accent" />} 
                title="AI-Driven Training Insights" 
                description="Receive personalized recommendations based on your performance data." />
              <FeatureCard 
                icon={<Target size={28} className="text-athlex-accent" />} 
                title="Goal Setting & Milestones" 
                description="Set objectives, track progress, and celebrate achievements along your journey." />
              <FeatureCard 
                icon={<TrendingUp size={28} className="text-athlex-accent" />} 
                title="Skill Development Pathways" 
                description="Follow structured drills and progression plans aligned to your sport and position." />
              <FeatureCard 
                icon={<Trophy size={28} className="text-athlex-accent" />} 
                title="Global Opportunity Discovery" 
                description="Connect with coaches and opportunities worldwide." />
            </div>
          </TabsContent>

          <TabsContent value="coaches" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <FeatureCard 
                icon={<Search size={28} className="text-athlex-accent" />} 
                title="Talent Discovery Engine" 
                description="Find athletes based on sport, age, performance metrics, and more." />
              <FeatureCard 
                icon={<BarChart size={28} className="text-athlex-accent" />} 
                title="Verified Performance Data" 
                description="Access clean, structured athlete metrics you can trust." />
              <FeatureCard 
                icon={<LineChart size={28} className="text-athlex-accent" />} 
                title="Development Analytics" 
                description="Track progression patterns and identify high-potential talent early." />
              <FeatureCard 
                icon={<ThumbsUp size={28} className="text-athlex-accent" />} 
                title="Endorsement Tools" 
                description="Provide credible feedback that strengthens athlete profiles." />
              <FeatureCard 
                icon={<ClipboardList size={28} className="text-athlex-accent" />} 
                title="Athlete Shortlists" 
                description="Organize talent pipelines across age groups or competitions." />
              <FeatureCard 
                icon={<Mail size={28} className="text-athlex-accent" />} 
                title="Direct Contact Requests" 
                description="Connect with athletes that match your specific requirements." />
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
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white border border-athlex-gray-200 p-6 rounded-lg hover:border-athlex-accent transition-all duration-300 shadow-sm hover:shadow-md flex items-start gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-athlex-gray-800">{title}</h3>
        <p className="text-athlex-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeaturesSection;
