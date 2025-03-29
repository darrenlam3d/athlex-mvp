
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhySection from '@/components/sections/WhySection';
import QuoteSection from '@/components/sections/QuoteSection';
import SignUpSection from '@/components/sections/SignUpSection';
import CommunitySection from '@/components/sections/CommunitySection';
import FaqSection from '@/components/sections/FaqSection';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const Index = () => {
  // Enhanced reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Add different animation classes based on data attribute
            const animationType = entry.target.getAttribute('data-animation');
            if (animationType) {
              entry.target.classList.add(animationType);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Update title and meta description for SEO
  useEffect(() => {
    document.title = "ATHLEX – Built by Athletes, For Athletes";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ATHLEX - The global platform for athletes to showcase their journey, track performance, connect with professionals, and unlock real opportunities.');
    }
    
    // Update Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    let ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) {
      ogTitle.setAttribute('content', 'ATHLEX – Built by Athletes, For Athletes');
    }
    
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Take control of your journey. Track your growth. Get discovered.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <div className="reveal" data-animation="animate-fade-in">
          <FeaturesSection />
        </div>
        <div className="reveal" data-animation="animate-fade-in">
          <WhySection />
        </div>
        <div className="reveal" data-animation="animate-fade-in">
          <QuoteSection />
        </div>
        <div className="reveal" data-animation="animate-fade-in">
          <SignUpSection />
        </div>
        <div className="reveal" data-animation="animate-fade-in">
          <CommunitySection />
        </div>
        <div className="reveal" data-animation="animate-fade-in">
          <FaqSection />
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
