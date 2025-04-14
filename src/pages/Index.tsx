
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhySection from '@/components/sections/WhySection';
import QuoteSection from '@/components/sections/QuoteSection';
import SignUpSection from '@/components/sections/SignUpSection';
import CommunitySection from '@/components/sections/CommunitySection';
import FaqSection from '@/components/sections/FaqSection';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";

const Index = () => {
  const { role } = useAuth();

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
      
      {/* Quick access floating button */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-50">
        {role ? (
          <Link to={`/${role}-dashboard`}>
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
              Go to Dashboard
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
              Login / Select Role
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Index;
