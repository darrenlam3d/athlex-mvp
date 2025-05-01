
import React from 'react';
import ImpactMetrics from './ImpactMetrics';
import TestimonialCarousel from './TestimonialCarousel';

const ImpactSection = () => {
  return (
    <section className="section-padding py-24 md:py-32 bg-athlex-gray-100">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text inline-block">
            Our Impact
          </h2>
          <p className="text-athlex-gray-700 text-lg">
            See how ATHLEX is transforming the athletic journey for athletes and coaches alike.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="md:pr-4">
            <ImpactMetrics />
          </div>
          <div className="md:pl-4 flex items-center">
            <TestimonialCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
