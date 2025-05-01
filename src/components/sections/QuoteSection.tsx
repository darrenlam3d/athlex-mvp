
import React from 'react';
import ImpactMetrics from './ImpactMetrics';

const QuoteSection = () => {
  return (
    <section className="section-padding bg-athlex-gray-50 py-24 md:py-32">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <ImpactMetrics />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
