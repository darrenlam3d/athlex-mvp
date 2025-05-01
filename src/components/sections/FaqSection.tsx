
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  
  const faqCategories = [
    { id: "general", name: "General" },
    { id: "athletes", name: "For Athletes" },
    { id: "coaches", name: "For Coaches" }
  ];

  const faqs = {
    general: [
      {
        question: "What is ATHLEX?",
        answer: "ATHLEX is a digital performance and discovery platform designed for athletes and coaches. It helps athletes track growth, showcase their journey, and connect with real opportunities — all in one trusted space."
      },
      {
        question: "Where is ATHLEX launching first?",
        answer: "ATHLEX is launching in Southeast Asia, with early access available in Singapore, Malaysia, Indonesia, Philippines, and India."
      },
      {
        question: "Is ATHLEX free to use?",
        answer: "Yes — ATHLEX will launch with a freemium model. Core features are free for athletes, with optional upgrades for deeper insights, visibility, and performance tools."
      },
      {
        question: "What is ATHLEX Edge?",
        answer: "ATHLEX Edge is our weekly newsletter for athletes and coaches. It delivers elite training insights, mental tools, recovery routines, and global opportunities — all curated to give you an edge."
      }
    ],
    athletes: [
      {
        question: "What can athletes do on ATHLEX?",
        answer: "Build a verified profile with performance data and highlights. Track development over time with smart metrics. Receive tailored training insights. Discover global camps, scholarships, and trial opportunities. Connect with coaches and peers."
      },
      {
        question: "What sports are supported?",
        answer: "ATHLEX is starting with Football and general athletic metrics first. We will onboard Cricket, Hockey, Tennis, Volleyball, Table Tennis, Basketball, and other sports in the future."
      },
      {
        question: "How do I track my performance?",
        answer: "ATHLEX provides both manual entry tools and automated sync options for tracking key performance metrics specific to your sport and position."
      }
    ],
    coaches: [
      {
        question: "How does ATHLEX help coaches?",
        answer: "ATHLEX offers searchable athlete databases, development trends, shortlisting tools, and verified data — making it easier to track talent growth and connect with athletes globally."
      },
      {
        question: "Can I verify my coaching credentials?",
        answer: "Yes, ATHLEX provides verification processes for coaches to establish trusted profiles that athletes and parents can rely on."
      },
      {
        question: "How do I find specific types of athletes?",
        answer: "Our search engine allows filtering by sport, position, age, location, and specific performance metrics that matter most for your coaching needs."
      }
    ]
  };

  // Function to determine which FAQs to show
  const getFaqsToDisplay = () => {
    const categoryFaqs = faqs[activeCategory as keyof typeof faqs];
    return showAllFaqs ? categoryFaqs : categoryFaqs.slice(0, 3);
  };

  return (
    <section id="faq" className="section-padding py-24 md:py-32 bg-gradient-to-b from-white to-athlex-gray-100">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-athlex-accent/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-athlex-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
          <p className="text-athlex-gray-700 text-lg">
            Everything you need to know about ATHLEX before joining the waitlist.
          </p>
        </div>

        {/* FAQ Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-athlex-gray-200 flex">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-athlex-accent text-white"
                    : "text-athlex-gray-700 hover:bg-athlex-gray-100"
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setShowAllFaqs(false);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-athlex-gray-200 shadow-lg">
          <Accordion type="single" collapsible className="w-full">
            {getFaqsToDisplay().map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-athlex-gray-200 py-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 hover:text-athlex-accent group text-athlex-gray-800">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-athlex-gray-600 pb-4 text-base pl-2 border-l-2 border-athlex-accent/30">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {/* View All / View Less Toggle Button */}
          {faqs[activeCategory as keyof typeof faqs].length > 3 && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="border-athlex-accent/50 text-athlex-accent hover:bg-athlex-accent/10"
                onClick={() => setShowAllFaqs(!showAllFaqs)}
              >
                {showAllFaqs ? "View Less" : "View All"}
              </Button>
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <p className="text-athlex-gray-700">
            Still have questions? <a href="mailto:athlex.gaia@gmail.com" className="text-athlex-accent font-medium hover:underline">Contact Us</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
