
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
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
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
      <ScrollToTopButton />
    </div>
  );
};

export default Landing;
