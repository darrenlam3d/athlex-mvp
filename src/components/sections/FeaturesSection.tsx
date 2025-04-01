
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Award, Users, Video, Handshake, Lock } from 'lucide-react';

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("edge");

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
          <p className="text-white/70 text-lg mb-4 font-bold">
            ATHLEX: For every athlete, at every level — powered by technology to accelerate growth, performance, and global discovery.
          </p>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-athlex-gray-800 p-1">
              <TabsTrigger 
                value="edge" 
                className={`px-6 py-3 transition-all duration-300 font-semibold ${activeTab === "edge" ? "text-white gradient-text" : "text-white/60"}`}
              >
                ATHLEX Edge
              </TabsTrigger>
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

          <TabsContent value="edge" className="animate-fade-in">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-white/80 text-lg mb-6">
                ATHLEX Edge is the official newsletter and early-access community for the ATHLEX platform. 
                It serves as the inner circle for athletes, coaches, scouts, and performance leaders who want to grow with ATHLEX from the ground up.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard
                icon={<Smartphone className="text-athlex-accent" size={28} />}
                title="Early Access"
                description="Receive product updates and new features before they're released to the public."
              />
              <FeatureCard
                icon={<Award className="text-athlex-accent" size={28} />}
                title="Premium Content"
                description="High-value insights on performance, recovery, mindset, and athlete growth strategies."
              />
              <FeatureCard
                icon={<Users className="text-athlex-accent" size={28} />}
                title="Beta Testing"
                description="Exclusive access to beta testing and feature previews of the ATHLEX platform."
              />
              <FeatureCard
                icon={<Video className="text-athlex-accent" size={28} />}
                title="Global Opportunities"
                description="Discover scholarships, showcases, trials, and more opportunities in global sports."
              />
              <FeatureCard
                icon={<Handshake className="text-athlex-accent" size={28} />}
                title="Community Feedback"
                description="Have a voice in shaping ATHLEX through direct feedback and feature suggestions."
              />
              <FeatureCard
                icon={<Lock className="text-athlex-accent" size={28} />}
                title="Insider Benefits"
                description="Access exclusive perks and benefits only available to ATHLEX Edge members."
              />
            </div>
          </TabsContent>

          <TabsContent value="athletes" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard
                icon="🆔"
                title="Verified Athlete ID"
                description="A unified digital profile that evolves with you across teams, seasons, and borders."
              />
              <FeatureCard
                icon="📊"
                title="Performance & Benchmarking"
                description="Track key metrics and benchmark against peers by age, role, or sport."
              />
              <FeatureCard
                icon="🎯"
                title="Goal Setting & Milestones"
                description="Set personalized objectives and monitor progress over time."
              />
              <FeatureCard
                icon="🤖"
                title="AI-Driven Training Insights"
                description="Receive tailored training recommendations based on your performance profile."
              />
              <FeatureCard
                icon="📈"
                title="Structured Skill Development"
                description="Follow guided drills and progression pathways aligned to your sport and role."
              />
              <FeatureCard
                icon="🏆"
                title="Community & Achievement"
                description="Participate in challenges, earn recognition, and stay motivated through shared goals."
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

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 p-8 rounded-lg hover:border-athlex-accent transition-all duration-300">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default FeaturesSection;
