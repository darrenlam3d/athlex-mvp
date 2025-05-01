
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/95 backdrop-blur-md border-b border-athlex-gray-200 shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
              alt="ATHLEX Logo" 
              className="h-7 md:h-7 w-auto" 
            />
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-athlex-gray-700 hover:text-athlex-gray-900 underline-hover">Features</a>
          <a href="#why" className="text-athlex-gray-700 hover:text-athlex-gray-900 underline-hover">Why ATHLEX</a>
          <a href="#community" className="text-athlex-gray-700 hover:text-athlex-gray-900 underline-hover">Community</a>
          <a href="#faq" className="text-athlex-gray-700 hover:text-athlex-gray-900 underline-hover">FAQ</a>
          <a href="#signup">
            <Button variant="default" className="cta-button">
              Join Waitlist
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-athlex-gray-800"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-athlex-gray-200 py-5 animate-fade-in shadow-md">
          <div className="container flex flex-col space-y-4">
            <a href="#features" className="text-athlex-gray-700 hover:text-athlex-gray-900 py-2" onClick={toggleMobileMenu}>Features</a>
            <a href="#why" className="text-athlex-gray-700 hover:text-athlex-gray-900 py-2" onClick={toggleMobileMenu}>Why ATHLEX</a>
            <a href="#community" className="text-athlex-gray-700 hover:text-athlex-gray-900 py-2" onClick={toggleMobileMenu}>Community</a>
            <a href="#faq" className="text-athlex-gray-700 hover:text-athlex-gray-900 py-2" onClick={toggleMobileMenu}>FAQ</a>
            <a href="#signup" onClick={toggleMobileMenu}>
              <Button variant="default" className="cta-button w-full">
                Join Waitlist
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
