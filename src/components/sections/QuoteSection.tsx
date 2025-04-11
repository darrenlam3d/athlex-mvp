
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Define the quote data structure
interface Quote {
  text: string;
  author: string;
  highlight: string; // The phrase to highlight in purple
}

const QuoteSection = () => {
  // Array of quotes with highlighted phrases
  const quotes: Quote[] = [
    {
      text: "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
      author: "Michael Jordan",
      highlight: "And that is why I succeed"
    },
    {
      text: "Champions keep playing until they get it right.",
      author: "Billie Jean King",
      highlight: "until they get it right"
    },
    {
      text: "The miracle isn't that I finished. The miracle is that I had the courage to start.",
      author: "John Bingham",
      highlight: "The miracle is that I had the courage to start"
    },
    {
      text: "Run when you can, walk if you have to, crawl if you must; just never give up.",
      author: "Dean Karnazes",
      highlight: "just never give up"
    },
    {
      text: "Obstacles don't have to stop you. If you run into a wall, don't turn around and give up. Figure out how to climb it, go through it, or work around it.",
      author: "Michael Jordan",
      highlight: "Figure out how to climb it, go through it, or work around it"
    }
  ];

  // State for current quote index and fade animation
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');
  
  // Auto-rotate quotes every 8 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextQuote();
    }, 8000);
    
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentQuoteIndex]);

  // Handle navigating to the next quote
  const handleNextQuote = () => {
    setFadeState('fade-out');
    
    // Wait for fade out animation to complete before changing quote
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setFadeState('fade-in');
    }, 300);
  };

  // Handle navigating to the previous quote
  const handlePreviousQuote = () => {
    setFadeState('fade-out');
    
    // Wait for fade out animation to complete before changing quote
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
      );
      setFadeState('fade-in');
    }, 300);
  };

  // Function to render quote text with highlighted phrase
  const renderQuoteWithHighlight = (quote: Quote) => {
    if (!quote || !quote.text || !quote.highlight) {
      return quote?.text || "";
    }
    
    // Split the quote text by the highlight phrase
    const parts = quote.text.split(quote.highlight);
    
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="text-athlex-accent font-medium">{quote.highlight}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <section className="section-padding bg-gradient-to-b from-athlex-gray-900 to-athlex-background">
      <div className="container max-w-4xl mx-auto">
        <div className="relative min-h-[300px] flex flex-col items-center">
          <div className="text-6xl md:text-8xl text-athlex-accent opacity-30 absolute top-0 left-0 transform -translate-y-1/2">
            "
          </div>
          
          <blockquote 
            className={`text-xl md:text-2xl lg:text-3xl font-light text-center px-8 md:px-16 leading-relaxed transition-opacity duration-300 ${
              fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="mb-6">
              {renderQuoteWithHighlight(quotes[currentQuoteIndex])}
            </p>
            <footer className="text-lg md:text-xl text-white/60">
              — {quotes[currentQuoteIndex].author}
            </footer>
          </blockquote>
          
          <div className="text-6xl md:text-8xl text-athlex-accent opacity-30 absolute bottom-0 right-0 transform translate-y-1/2">
            "
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handlePreviousQuote}
              className="border-athlex-accent/30 hover:border-athlex-accent hover:bg-athlex-accent/10"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous quote</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleNextQuote}
              className="border-athlex-accent/30 hover:border-athlex-accent hover:bg-athlex-accent/10"
            >
              <ArrowRight className="h-5 w-5" />
              <span className="sr-only">Next quote</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
