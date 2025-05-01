
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhySection from '@/components/sections/WhySection';
import ImpactSection from '@/components/sections/ImpactSection';
import IntegrationsSection from '@/components/sections/IntegrationsSection';
import QuoteSection from '@/components/sections/QuoteSection';
import FaqSection from '@/components/sections/FaqSection';
import CommunitySection from '@/components/sections/CommunitySection';
import SignUpSection from '@/components/sections/SignUpSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import MobileCTA from '@/components/ui/MobileCTA';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <WhySection />
        <ImpactSection />
        <IntegrationsSection />
        <QuoteSection />
        <FaqSection />
        <CommunitySection />
        <SignUpSection />
      </main>
      <Footer />
      <ScrollToTopButton />
      <MobileCTA />
    </div>
  );
};

export default Landing;
