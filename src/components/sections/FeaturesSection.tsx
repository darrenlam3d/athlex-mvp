
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Award, Users, Video, Handshake, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <section id="features" className="section-padding py-24 md:py-32 bg-gradient-to-b from-athlex-background to-athlex-gray-100">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text inline-block">Platform Features</h2>
          <p className="text-athlex-gray-700 text-lg mb-4 font-bold">
            Empowering athletes at every level with{" "}
            <span className="text-athlex-accent">technology</span> that drives{" "}
            <span className="text-athlex-accent">growth</span>, elevates{" "}
            <span className="text-athlex-accent">performance</span>, and unlocks{" "}
            <span className="text-athlex-accent">global opportunity</span>.
          </p>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-athlex-gray-100 p-1">
              <TabsTrigger value="edge" className={`px-6 py-3 transition-all duration-300 font-semibold ${activeTab === "edge" ? "text-athlex-gray-900 gradient-text" : "text-athlex-gray-600"}`}>Built Different</TabsTrigger>
              <TabsTrigger value="athletes" className={`px-6 py-3 transition-all duration-300 font-semibold ${activeTab === "athletes" ? "text-athlex-gray-900 gradient-text" : "text-athlex-gray-600"}`}>
                For Athletes
              </TabsTrigger>
              <TabsTrigger value="coaches" className={`px-6 py-3 transition-all duration-300 font-semibold ${activeTab === "coaches" ? "text-athlex-gray-900 gradient-text" : "text-athlex-gray-600"}`}>
                For Coaches & Scouts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="edge" className="animate-fade-in">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-athlex-gray-700 text-lg mb-6">'Built Different' is the official newsletter and early-access community for the ATHLEX platform. It serves as the inner circle for athletes, coaches, scouts, and performance leaders who want to grow with ATHLEX from the ground up.</p>
              <div className="mt-8">
                <Link to="/edge-signup">
                  
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard icon={<Smartphone className="text-athlex-accent" size={28} />} title="Early Access" description="Receive product updates and new features before they're released to the public." />
              <FeatureCard icon={<Award className="text-athlex-accent" size={28} />} title="Premium Content" description="High-value insights on performance, recovery, mindset, and athlete growth strategies." />
              <FeatureCard icon={<Users className="text-athlex-accent" size={28} />} title="Beta Testing" description="Exclusive access to beta testing and feature previews of the ATHLEX platform." />
              <FeatureCard icon={<Video className="text-athlex-accent" size={28} />} title="Global Opportunities" description="Discover scholarships, showcases, trials, and more opportunities in global sports." />
              <FeatureCard icon={<Handshake className="text-athlex-accent" size={28} />} title="Community Feedback" description="Have a voice in shaping ATHLEX through direct feedback and feature suggestions." />
              <FeatureCard icon={<Lock className="text-athlex-accent" size={28} />} title="Insider Benefits" description="Access exclusive perks and benefits only available to ATHLEX Edge members." />
            </div>
          </TabsContent>

          <TabsContent value="athletes" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard 
                icon={<div className="text-athlex-accent"><HomeIcon /></div>} 
                title="Verified Athlete ID" 
                description="A unified digital profile that evolves with you across teams, seasons, and borders." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><ChartIcon /></div>} 
                title="Performance & Benchmarking" 
                description="Track key metrics and benchmark against peers by age, role, or sport." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><TargetIcon /></div>} 
                title="Goal Setting & Milestones" 
                description="Set personalized objectives and monitor progress over time." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><BrainIcon /></div>} 
                title="AI-Driven Training Insights" 
                description="Receive tailored training recommendations based on your performance profile." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><TrendingUpIcon /></div>} 
                title="Structured Skill Development" 
                description="Follow guided drills and progression pathways aligned to your sport and role." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><TrophyIcon /></div>} 
                title="Community & Achievement" 
                description="Participate in challenges, earn recognition, and stay motivated through shared goals." />
            </div>
          </TabsContent>

          <TabsContent value="coaches" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard 
                icon={<div className="text-athlex-accent"><SearchIcon /></div>} 
                title="Talent Discovery Engine" 
                description="Search for athletes based on sport, age, performance, and more." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><BarChartIcon /></div>} 
                title="Verified Performance Dashboards" 
                description="View clean, structured data across key metrics." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><TrendingUpAnalyticsIcon /></div>} 
                title="Performance Insights" 
                description="Access ML-driven analytics and AI-powered trend analysis to identify patterns in athlete development and performance progression." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><ThumbsUpIcon /></div>} 
                title="Endorsement Tools" 
                description="Support athletes with credibility and feedback." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><ClipboardIcon /></div>} 
                title="Shortlists & Notes" 
                description="Organize talent pipelines across age groups or competitions." />
              <FeatureCard 
                icon={<div className="text-athlex-accent"><MailIcon /></div>} 
                title="Direct Contact Requests" 
                description="Reach out to athletes (with permission) when ready." />
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
    <div className="bg-white border border-athlex-gray-200 p-8 rounded-lg hover:border-athlex-accent transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="text-xl font-semibold mb-4 text-athlex-gray-800">{title}</h3>
      <p className="text-athlex-gray-600">{description}</p>
    </div>
  );
};

// Custom Icon Components to replace emoji icons
const HomeIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
};

const ChartIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
};

const TargetIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
};

const BrainIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
};

const TrendingUpIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
};

const TrophyIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
};

const BarChartIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
};

const TrendingUpAnalyticsIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  );
};

const ThumbsUpIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  );
};

const ClipboardIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
};

const MailIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
};

export default FeaturesSection;
