
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const MobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > scrollThreshold);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-athlex-gray-200 p-4 shadow-lg md:hidden transform transition-transform duration-300 z-40 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Button 
        className="w-full cta-button" 
        onClick={scrollToSignup}
      >
        Join Waitlist
      </Button>
    </div>
  );
};

export default MobileCTA;
