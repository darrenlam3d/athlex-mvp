
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50 p-3 rounded-full bg-athlex-accent shadow-lg shadow-athlex-accent/20',
        'opacity-0 invisible transform translate-y-4 transition-all duration-300',
        isVisible && 'opacity-100 visible translate-y-0',
        'hover:bg-athlex-accent hover:shadow-xl hover:shadow-athlex-accent/30 focus:outline-none focus:ring-2 focus:ring-athlex-accent/50',
        'hidden md:flex items-center justify-center'
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="text-white w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
