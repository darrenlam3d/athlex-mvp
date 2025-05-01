
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import ImpactMetrics from './ImpactMetrics';

const QuoteSection = () => {
  return (
    <section className="section-padding bg-athlex-gray-50 py-24 md:py-32">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Carousel>
            <CarouselContent>
              <CarouselItem className="flex justify-center">
                <ImpactMetrics />
              </CarouselItem>
            </CarouselContent>
            <div className="flex items-center justify-center gap-2 mt-6">
              <CarouselPrevious className="relative static mr-2 border-athlex-accent/30 hover:border-athlex-accent hover:bg-athlex-accent/10" />
              <CarouselNext className="relative static ml-2 border-athlex-accent/30 hover:border-athlex-accent hover:bg-athlex-accent/10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
