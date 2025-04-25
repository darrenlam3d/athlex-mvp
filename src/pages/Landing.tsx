
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import SignUpSection from '@/components/sections/SignUpSection';
import WhySection from '@/components/sections/WhySection';
import QuoteSection from '@/components/sections/QuoteSection';
import FaqSection from '@/components/sections/FaqSection';
import CommunitySection from '@/components/sections/CommunitySection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-athlex-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhySection />
        <QuoteSection />
        <FaqSection />
        <CommunitySection />
        <SignUpSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
