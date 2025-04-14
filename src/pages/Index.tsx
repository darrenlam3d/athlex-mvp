
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhySection from '@/components/sections/WhySection';
import CommunitySection from '@/components/sections/CommunitySection';
import QuoteSection from '@/components/sections/QuoteSection';
import FaqSection from '@/components/sections/FaqSection';
import SignUpSection from '@/components/sections/SignUpSection';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhySection />
        <CommunitySection />
        <QuoteSection />
        <FaqSection />
        <SignUpSection />
        
        {/* Add a demo mode banner */}
        <div className="bg-athlex-accent/10 py-6 px-4">
          <div className="container mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Want to try out ATHLEX without signing up?</h3>
            <p className="text-gray-300 mb-4">Explore the platform as an Athlete, Scout, or Coach to see all features</p>
            <Button asChild>
              <Link to="/login-demo">Try Demo Mode</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
