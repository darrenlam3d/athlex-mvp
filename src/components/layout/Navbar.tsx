
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    signOut
  } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If we're on the auth pages, don't show the navbar
  if (location.pathname.startsWith('/auth/')) {
    return null;
  }

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/8d80a549-8677-40a4-b998-647de9823d7b.png" alt="ATHLEX" className="h-8 w-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLinks />
          {isAuthenticated ? <div className="flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div> : <div className="flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button asChild className="cta-button">
                <Link to="/auth/register">Sign Up</Link>
              </Button>
            </div>}
        </nav>
        
        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden p-2" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw]">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <img src="/lovable-uploads/8d80a549-8677-40a4-b998-647de9823d7b.png" alt="ATHLEX" className="h-8 w-auto" />
              </Link>
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-4">
              <MobileNavLinks handleClick={() => setMobileMenuOpen(false)} />
              {isAuthenticated ? <>
                  <Link to="/dashboard" className="py-2 text-athlex-gray-700 hover:text-athlex-accent" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Button variant="outline" onClick={() => {
                signOut();
                setMobileMenuOpen(false);
              }}>
                    Sign Out
                  </Button>
                </> : <>
                  <Link to="/auth/login" className="py-2 text-athlex-gray-700 hover:text-athlex-accent" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Button className="cta-button" asChild>
                    <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </>}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>;
};

// Desktop Navigation Links
const NavLinks = () => {
  return <>
      <a href="/#features" className="text-athlex-gray-700 hover:text-athlex-accent transition-colors">Features</a>
      <a href="/#why" className="text-athlex-gray-700 hover:text-athlex-accent transition-colors">Why ATHLEX</a>
      <a href="/#testimonials" className="text-athlex-gray-700 hover:text-athlex-accent transition-colors">Testimonials</a>
      <a href="/#faqs" className="text-athlex-gray-700 hover:text-athlex-accent transition-colors">FAQs</a>
      <a href="/#community" className="text-athlex-gray-700 hover:text-athlex-accent transition-colors">Community</a>
    </>;
};

// Mobile Navigation Links
const MobileNavLinks = ({
  handleClick
}: {
  handleClick: () => void;
}) => {
  return <>
      <a href="/#features" className="py-2 text-athlex-gray-700 hover:text-athlex-accent" onClick={handleClick}>Features</a>
      <a href="/#why" className="py-2 text-athlex-gray-700 hover:text-athlex-accent" onClick={handleClick}>Why ATHLEX</a>
      <a href="/#testimonials" className="py-2 text-athlex-gray-700 hover:text-athlex-accent" onClick={handleClick}>Testimonials</a>
      <a href="/#faqs" className="py-2 text-athlex-gray-700 hover:text-athlex-accent" onClick={handleClick}>FAQs</a>
      <a href="/#community" className="py-2 text-athlex-gray-700 hover:text-athlex-accent" onClick={handleClick}>Community</a>
    </>;
};

export default Navbar;
