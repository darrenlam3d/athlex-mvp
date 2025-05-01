
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const QuoteSection = () => {
  // State for current mockup index
  const [currentMockupIndex, setCurrentMockupIndex] = useState(0);
  
  const mockups = [
    {
      id: 1,
      title: "Performance Dashboard",
      description: "Track your athletic progress with customizable metrics",
      image: "/lovable-uploads/fffd7d28-3179-4c1e-acd9-cdde0b892e61.png" // Using an existing image as placeholder
    },
    {
      id: 2,
      title: "Goal Setting Interface",
      description: "Set and monitor your training objectives",
      image: "/lovable-uploads/fffd7d28-3179-4c1e-acd9-cdde0b892e61.png" // Using an existing image as placeholder
    },
    {
      id: 3,
      title: "Opportunity Discovery",
      description: "Find camps, trials and scholarships matching your profile",
      image: "/lovable-uploads/fffd7d28-3179-4c1e-acd9-cdde0b892e61.png" // Using an existing image as placeholder
    }
  ];

  // Handle navigating to the next mockup
  const handleNextMockup = () => {
    setCurrentMockupIndex((prevIndex) => (prevIndex + 1) % mockups.length);
  };

  // Handle navigating to the previous mockup
  const handlePreviousMockup = () => {
    setCurrentMockupIndex((prevIndex) => 
      prevIndex === 0 ? mockups.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="section-padding bg-athlex-gray-50 py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Column */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-athlex-gray-200">
            <div className="flex items-center mb-6">
              <div className="flex space-x-1 text-amber-400 mb-4">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>
            </div>
            
            <blockquote className="text-lg lg:text-xl font-light text-athlex-gray-800 mb-6 leading-relaxed">
              "ATHLEX helped me connect with scouts I never would have met otherwise. The performance tracking tools showed me exactly where I needed to improve, and three months later I received an offer from a Division 1 school."
            </blockquote>
            
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-athlex-accent/20 flex items-center justify-center text-athlex-accent font-bold text-lg">
                MS
              </div>
              <div className="ml-4">
                <p className="font-medium text-athlex-gray-900">Michael S.</p>
                <p className="text-sm text-athlex-gray-600">Track & Field Athlete, Class of 2023</p>
              </div>
            </div>
          </div>
          
          {/* Mockup Slider Column */}
          <div className="relative">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-athlex-gray-200 overflow-hidden">
              <div className="bg-athlex-gray-900 rounded-lg p-2">
                <img 
                  src={mockups[currentMockupIndex].image} 
                  alt={mockups[currentMockupIndex].title} 
                  className="rounded-lg shadow-inner w-full"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-athlex-gray-900">{mockups[currentMockupIndex].title}</h3>
                <p className="text-sm text-athlex-gray-600">{mockups[currentMockupIndex].description}</p>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handlePreviousMockup}
                className="border-athlex-accent/30 hover:border-athlex-accent hover:bg-athlex-accent/10"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Previous mockup</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleNextMockup}
                className="border-athlex-accent/30 hover:border-athlex-accent hover:bg-athlex-accent/10"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Next mockup</span>
              </Button>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {mockups.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentMockupIndex ? "w-6 bg-athlex-accent" : "w-2 bg-athlex-gray-300"
                  }`}
                  onClick={() => setCurrentMockupIndex(index)}
                  aria-label={`Go to mockup ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
