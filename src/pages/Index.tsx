
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhySection from '@/components/sections/WhySection';
import CommunitySection from '@/components/sections/CommunitySection';
import QuoteSection from '@/components/sections/QuoteSection';
import FaqSection from '@/components/sections/FaqSection';
import SignUpSection from '@/components/sections/SignUpSection';

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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
