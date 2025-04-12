
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhySection from '@/components/sections/WhySection';
import QuoteSection from '@/components/sections/QuoteSection';
import SignUpSection from '@/components/sections/SignUpSection';
import CommunitySection from '@/components/sections/CommunitySection';
import FaqSection from '@/components/sections/FaqSection';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Button } from "@/components/ui/button";

const Index = () => {
  const { setUserRole } = useUserRole();

  // Add a function to set user role for testing
  const handleSetScoutRole = () => {
    setUserRole('scout');
    console.log("Set user role to 'scout'");
  };

  const handleSetCoachRole = () => {
    setUserRole('coach');
    console.log("Set user role to 'coach'");
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhySection />
      <QuoteSection />
      <CommunitySection />
      <FaqSection />
      <SignUpSection />
      <Footer />
      
      {/* Admin controls - only visible in development */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-50">
        <Button variant="secondary" size="sm" onClick={handleSetScoutRole}>
          Set Scout Role=
        </Button>
        <Button variant="secondary" size="sm" onClick={handleSetCoachRole}>
          Set Coach Role
        </Button>
      </div>
    </div>
  );
};

export default Index;
