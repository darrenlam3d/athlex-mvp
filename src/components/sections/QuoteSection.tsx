
import React from 'react';
import { Star } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const QuoteSection = () => {
  const mockups = [
    {
      id: 1,
      title: "Performance Dashboard",
      description: "Track your athletic progress with customizable metrics",
      image: "/lovable-uploads/4ad5d806-9dc4-4ccb-909d-a61789353676.png"
    },
    {
      id: 2,
      title: "Goal Setting Interface",
      description: "Set and monitor your training objectives",
      image: "/lovable-uploads/fffd7d28-3179-4c1e-acd9-cdde0b892e61.png"
    },
    {
      id: 3,
      title: "Opportunity Discovery",
      description: "Find camps, trials and scholarships matching your profile",
      image: "/lovable-uploads/8f087e79-abca-4837-ac54-e0f2ef1c9421.png"
    }
  ];

  return (
    <section className="section-padding bg-athlex-gray-50 py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Column */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-athlex-gray-200">
            <div className="flex space-x-1 text-amber-400 mb-4">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
            </div>
            
            <blockquote className="text-lg lg:text-xl font-light text-athlex-gray-800 mb-6 leading-relaxed">
              "ATHLEX helped me track my performance in ways I never could before. The insights showed me exactly where I needed to improve, and three months later I received an opportunity to join a development academy."
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
          
          {/* Mockup Carousel Column */}
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {mockups.map((mockup) => (
                  <CarouselItem key={mockup.id}>
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-athlex-gray-200">
                      <div className="bg-athlex-gray-900 rounded-lg p-2">
                        <img 
                          src={mockup.image} 
                          alt={mockup.title} 
                          className="rounded-lg shadow-inner w-full h-[220px] object-cover"
                        />
                      </div>
                      <div className="mt-4 text-center py-2">
                        <h3 className="text-lg font-bold text-athlex-gray-900">{mockup.title}</h3>
                        <p className="text-sm text-athlex-gray-600">{mockup.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <div className="flex items-center justify-center gap-2 mt-6">
                <CarouselPrevious className="relative static mr-2 border-athlex-accent/30 hover:border-athlex-accent hover:bg-athlex-accent/10" />
                <CarouselNext className="relative static ml-2 border-athlex-accent/30 hover:border-athlex-accent hover:bg-athlex-accent/10" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
