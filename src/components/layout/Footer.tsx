
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = new FormData(form).get("email") as string;
    
    if (email) {
      toast.success("Thank you for subscribing!");
      form.reset();
    }
  };

  return (
    <footer className="bg-athlex-gray-900 pt-16 pb-8 border-t border-athlex-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <a href="#" className="flex items-center mb-4">
              <span className="text-xl font-bold gradient-text">ATHLEX</span>
            </a>
            <p className="text-white/60 mb-4">
              Built by athletes, for athletes. Take control of your journey, track your growth, and get discovered.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white/60 hover:text-athlex-accent" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-athlex-accent" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="mailto:contact@athlex.example" className="text-white/60 hover:text-athlex-accent" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/60 hover:text-athlex-accent">Features</a></li>
              <li><a href="#why" className="text-white/60 hover:text-athlex-accent">Why ATHLEX</a></li>
              <li><a href="#community" className="text-white/60 hover:text-athlex-accent">Community</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-athlex-accent">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal?tab=privacy" className="text-white/60 hover:text-athlex-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal?tab=terms" className="text-white/60 hover:text-athlex-accent">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal?tab=cookies" className="text-white/60 hover:text-athlex-accent">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/60 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input 
                type="email" 
                name="email"
                placeholder="Your email"
                className="bg-athlex-gray-800 border-athlex-gray-700 rounded-r-none"
                required
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-athlex-accent text-white hover:bg-opacity-90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-athlex-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} ATHLEX. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/legal" className="text-white/60 hover:text-athlex-accent text-sm">
              Legal Policies
            </Link>
            <span className="mx-2 text-white/30">|</span>
            <a href="mailto:athlex.gaia@gmail.com" className="text-white/60 hover:text-athlex-accent text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
