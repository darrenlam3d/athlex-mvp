
import React from 'react';

const QuoteSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-athlex-gray-900 to-athlex-background">
      <div className="container max-w-4xl mx-auto">
        <div className="relative">
          <div className="text-6xl md:text-8xl text-athlex-accent opacity-30 absolute top-0 left-0 transform -translate-y-1/2">
            "
          </div>
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-center px-8 md:px-16 leading-relaxed">
            <p className="mb-6">
              I've missed more than 9000 shots in my career. I've lost almost 300 games.
              26 times, I've been trusted to take the game winning shot and missed.
              I've failed over and over and over again in my life.
              <span className="text-athlex-accent font-medium"> And that is why I succeed.</span>
            </p>
            <footer className="text-lg md:text-xl text-white/60">
              — Michael Jordan
            </footer>
          </blockquote>
          <div className="text-6xl md:text-8xl text-athlex-accent opacity-30 absolute bottom-0 right-0 transform translate-y-1/2">
            "
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
