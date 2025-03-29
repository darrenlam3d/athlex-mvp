
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <section id="features" className="section-padding py-24 md:py-32 bg-gradient-to-b from-athlex-background to-athlex-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text inline-block">Platform Features</h2>
          <p className="text-white/70 text-lg mb-4">
            ATHLEX is designed for today's athlete — dynamic, ambitious, and ready to grow. Whether you're just getting started or playing at an elite level, ATHLEX gives you the tools to take control of your path.
          </p>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-athlex-gray-800 p-1">
              <TabsTrigger 
                value="athletes" 
                className={`px-6 py-3 transition-all duration-300 font-semibold ${activeTab === "athletes" ? "text-white gradient-text" : "text-white/60"}`}
              >
                For Athletes
              </TabsTrigger>
              <TabsTrigger 
                value="coaches" 
                className={`px-6 py-3 transition-all duration-300 font-semibold ${activeTab === "coaches" ? "text-white gradient-text" : "text-white/60"}`}
              >
                For Coaches & Scouts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="athletes" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard
                icon="🆔"
                title="Verified Digital Profile"
                description="Your official athlete identity that stays with you across teams, seasons, and countries."
              />
              <FeatureCard
                icon="📊"
                title="Performance Tracking"
                description="Record metrics across physical, technical, and tactical domains."
              />
              <FeatureCard
                icon="🎯"
                title="Goal Setting & Milestones"
                description="Define your targets and measure progress over time."
              />
              <FeatureCard
                icon="🤖"
                title="AI-Generated Training Suggestions"
                description="Get smart, role-specific training recommendations."
              />
              <FeatureCard
                icon="📈"
                title="Skill Development Pathways"
                description="Follow structured drills and progressions."
              />
              <FeatureCard
                icon="📚"
                title="Educational Resources"
                description="Learn from top-tier, curated videos and guides."
              />
              <FeatureCard
                icon="📊"
                title="Peer Benchmarking"
                description="Compare anonymously with athletes in your position, age, or sport."
              />
              <FeatureCard
                icon="🏆"
                title="Community Challenges & Badges"
                description="Stay motivated with trackable rewards and recognition."
              />
            </div>
          </TabsContent>

          <TabsContent value="coaches" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard
                icon="🔍"
                title="Talent Discovery Engine"
                description="Search for athletes based on sport, age, performance, and more."
              />
              <FeatureCard
                icon="📊"
                title="Verified Performance Dashboards"
                description="View clean, structured data across key metrics."
              />
              <FeatureCard
                icon="👍"
                title="Endorsement Tools"
                description="Support athletes with credibility and feedback."
              />
              <FeatureCard
                icon="📋"
                title="Shortlists & Notes"
                description="Organize talent pipelines across age groups or competitions."
              />
              <FeatureCard
                icon="✉️"
                title="Direct Contact Requests"
                description="Reach out to athletes (with permission) when ready."
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => {
  return (
    <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 p-8 rounded-lg hover:border-athlex-accent transition-all duration-300">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default FeaturesSection;
