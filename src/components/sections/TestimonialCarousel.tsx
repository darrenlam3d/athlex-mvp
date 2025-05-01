
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  photo: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "ATHLEX has completely changed how I track my progress. The performance insights helped me improve my game in ways I never expected.",
    name: "Sarah Jones",
    role: "College Soccer Player",
    photo: "/lovable-uploads/b84ddeca-bec0-41af-8ad4-07c922bd1508.png"
  },
  {
    quote: "As a coach, finding the right talent used to be challenging. ATHLEX makes the discovery process seamless and data-driven.",
    name: "Coach Michael",
    role: "High School Basketball Coach",
    photo: "/lovable-uploads/3d17cc64-d4eb-4c0d-8e6a-b2151b2e69e8.png"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full">
      <Card className="relative border-athlex-gray-200 bg-white rounded-xl shadow-md">
        <CardContent className="p-6 md:p-8">
          <div className="relative flex flex-col items-center">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 md:-left-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-athlex-gray-200 bg-white text-athlex-gray-600 hover:bg-athlex-accent hover:text-white transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4 px-12 text-center">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-athlex-accent shadow-sm">
                <img 
                  src={testimonials[currentIndex].photo} 
                  alt={testimonials[currentIndex].name}
                  className="h-full w-full object-cover" 
                />
              </div>
              
              <blockquote className="text-athlex-gray-700 italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div>
                <p className="font-bold text-athlex-gray-800">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-athlex-accent">{testimonials[currentIndex].role}</p>
              </div>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 md:-right-4">
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-athlex-gray-200 bg-white text-athlex-gray-600 hover:bg-athlex-accent hover:text-white transition-colors shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4 gap-1">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-athlex-accent w-4' : 'bg-athlex-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
