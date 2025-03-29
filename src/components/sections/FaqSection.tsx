
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FaqSection = () => {
  const faqs = [
    {
      question: "Is ATHLEX free?",
      answer: "ATHLEX will offer both free and premium tiers. The free tier will provide essential features for athletes to create profiles and track basic metrics, while premium features will unlock advanced analytics, AI recommendations, and enhanced visibility to scouts."
    },
    {
      question: "Who is it for?",
      answer: "ATHLEX is designed for the entire sports ecosystem: athletes seeking development and opportunities, coaches looking to discover and develop talent, scouts searching for promising prospects, and organizations managing athlete programs and data."
    },
    {
      question: "What sports does it support?",
      answer: "At launch, ATHLEX will support major team sports including soccer, basketball, volleyball, and baseball/softball, as well as individual sports like track & field, swimming, and tennis. We plan to expand to more sports based on community demand."
    },
    {
      question: "What happens after I sign up?",
      answer: "Once you sign up for early access, you'll receive updates about the platform's development and launch timeline. Early registrants will be invited to beta test the platform, providing valuable feedback before the public launch."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-athlex-background to-athlex-gray-900/70">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-athlex-accent/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-athlex-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
          <p className="text-white/70 text-lg">
            Everything you need to know about ATHLEX before joining the waitlist.
          </p>
        </div>

        <div className="bg-athlex-gray-800/50 rounded-2xl p-6 border border-athlex-gray-700/50 shadow-lg shadow-athlex-accent/5">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-athlex-gray-700/50 py-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 hover:text-athlex-accent group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-4 text-base pl-2 border-l-2 border-athlex-accent/30">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
