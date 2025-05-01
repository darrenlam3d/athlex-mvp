
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { toast } from 'sonner';

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
  
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-athlex-gray-100 pt-16 pb-8 border-t border-athlex-gray-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Product Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-athlex-gray-800">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-athlex-gray-600 hover:text-athlex-accent">Features</a></li>
              <li><a href="#why" className="text-athlex-gray-600 hover:text-athlex-accent">Why ATHLEX</a></li>
              <li><a href="#faq" className="text-athlex-gray-600 hover:text-athlex-accent">FAQ</a></li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-athlex-gray-800">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-athlex-gray-600 hover:text-athlex-accent">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-athlex-gray-600 hover:text-athlex-accent">
                  Built Different Newsletter
                </a>
              </li>
              <li>
                <a href="mailto:athlex.gaia@gmail.com" className="text-athlex-gray-600 hover:text-athlex-accent">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-athlex-gray-800">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-athlex-gray-600 hover:text-athlex-accent">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-athlex-gray-600 hover:text-athlex-accent">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-athlex-gray-600 hover:text-athlex-accent">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Stay Updated Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-athlex-gray-800">Stay Updated</h3>
            <p className="text-athlex-gray-600 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex mb-4">
              <Input 
                type="email" 
                name="email"
                placeholder="Your email"
                className="bg-white border-athlex-gray-300 rounded-r-none"
                required
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-athlex-accent text-white hover:bg-opacity-90"
              >
                Subscribe
              </Button>
            </form>
            
            <Button 
              variant="default" 
              className="w-full cta-button"
              onClick={scrollToSignup}
            >
              Join Waitlist
            </Button>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-athlex-gray-500 hover:text-athlex-accent" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-athlex-gray-500 hover:text-athlex-accent" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="mailto:contact@athlex.example" className="text-athlex-gray-500 hover:text-athlex-accent" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-athlex-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-athlex-gray-500 text-sm">
            &copy; {currentYear} ATHLEX. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-athlex-gray-500 hover:text-athlex-accent text-sm">
              Legal Policies
            </a>
            <span className="mx-2 text-athlex-gray-400">|</span>
            <a href="mailto:athlex.gaia@gmail.com" className="text-athlex-gray-500 hover:text-athlex-accent text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
