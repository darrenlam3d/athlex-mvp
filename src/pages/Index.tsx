
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

const Index = () => {
  // Reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
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
        
        <div className="reveal mb-10">
          <FeaturesSection />
        </div>
        
        <div className="reveal mb-10">
          <WhySection />
        </div>
        
        <div className="reveal mb-10">
          <QuoteSection />
        </div>
        
        <div className="reveal mb-10">
          <SignUpSection />
        </div>
        
        <div className="reveal mb-10">
          <CommunitySection />
        </div>
        
        <div className="reveal mb-10">
          <FaqSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
