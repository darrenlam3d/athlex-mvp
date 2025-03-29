
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("athletes");

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-athlex-background to-athlex-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-white/70 text-lg">
            ATHLEX provides tailored features for everyone in the sports ecosystem.
          </p>
        </div>

        <Tabs defaultValue="athletes" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-athlex-gray-800 p-1">
              <TabsTrigger 
                value="athletes" 
                onClick={() => setActiveTab("athletes")}
                className={`px-4 py-2 transition-all duration-300 ${activeTab === "athletes" ? "text-white" : "text-white/60"}`}
              >
                For Athletes
              </TabsTrigger>
              <TabsTrigger 
                value="coaches" 
                onClick={() => setActiveTab("coaches")}
                className={`px-4 py-2 transition-all duration-300 ${activeTab === "coaches" ? "text-white" : "text-white/60"}`}
              >
                For Coaches & Scouts
              </TabsTrigger>
              <TabsTrigger 
                value="teams" 
                onClick={() => setActiveTab("teams")}
                className={`px-4 py-2 transition-all duration-300 ${activeTab === "teams" ? "text-white" : "text-white/60"}`}
              >
                For High-Performance Teams
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="athletes" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon="📊"
                title="Verified Profile & Stats"
                description="Create a comprehensive profile with verified performance history to showcase your authentic athletic journey."
              />
              <FeatureCard
                icon="🔍"
                title="AI-Powered Training"
                description="Get personalized training suggestions and self-assessments powered by cutting-edge AI technology."
              />
              <FeatureCard
                icon="🏆"
                title="Goal Tracking"
                description="Set, track, and achieve your athletic goals with milestone badges to mark your progress."
              />
              <FeatureCard
                icon="🎓"
                title="Educational Content"
                description="Access exclusive video content designed to improve your skills and knowledge."
              />
              <FeatureCard
                icon="📈"
                title="Peer Benchmarking"
                description="Compare your stats with peers and participate in community challenges to push your limits."
              />
              <FeatureCard
                icon="🌎"
                title="Global Visibility"
                description="Get discovered by coaches and scouts looking for talent just like yours from around the world."
              />
            </div>
          </TabsContent>

          <TabsContent value="coaches" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon="🔍"
                title="Searchable Athlete Database"
                description="Find athletes that match your criteria with advanced filters for age, stats, region, and more."
              />
              <FeatureCard
                icon="📋"
                title="Shortlisting & Notes"
                description="Create lists of promising athletes and keep detailed notes on their development."
              />
              <FeatureCard
                icon="✅"
                title="Verified Statistics"
                description="Make informed decisions with access to verified athlete performance data and history."
              />
              <FeatureCard
                icon="💬"
                title="Direct Communication"
                description="Connect with athletes (with their consent) directly through the platform."
              />
              <FeatureCard
                icon="📊"
                title="Performance Analytics"
                description="Track athlete development over time with comprehensive analytics and reporting."
              />
              <FeatureCard
                icon="🤝"
                title="Endorsements"
                description="Provide meaningful endorsements that help athletes build credibility in their profile."
              />
            </div>
          </TabsContent>

          <TabsContent value="teams" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon="🗃️"
                title="Athlete Registry"
                description="Maintain a comprehensive registry of all athletes in your organization with compliance tools."
              />
              <FeatureCard
                icon="📈"
                title="Development Tracking"
                description="Monitor athlete progress across all your programs with detailed performance metrics."
              />
              <FeatureCard
                icon="👥"
                title="Staff Assignment"
                description="Easily assign coaches and staff to athletes or teams within your organization."
              />
              <FeatureCard
                icon="📊"
                title="Admin Dashboard"
                description="Access comprehensive reports and analytics for organizational decision-making."
              />
              <FeatureCard
                icon="🔄"
                title="Seamless Integration"
                description="Integrate with your existing systems for a unified high-performance ecosystem."
              />
              <FeatureCard
                icon="📱"
                title="Communication Hub"
                description="Centralize all communications between athletes, coaches, and administration."
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
    <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 p-6 rounded-lg hover:border-athlex-accent transition-all duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default FeaturesSection;
