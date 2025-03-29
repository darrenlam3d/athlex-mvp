
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FaqSection = () => {
  const faqs = [
    {
      question: "What is ATHLEX?",
      answer: "ATHLEX is an athlete-first platform that helps you track performance, build a verified profile, connect with coaches and scouts, and unlock growth opportunities — all in one place."
    },
    {
      question: "Who is ATHLEX for?",
      answer: "It's built for athletes of all levels, as well as coaches, scouts, and high-performance teams looking to discover, manage, or support talent more effectively."
    },
    {
      question: "Is ATHLEX free?",
      answer: "Yes. ATHLEX will offer a free tier for all athletes. Premium features and services will be available as optional upgrades."
    },
    {
      question: "How do I get early access?",
      answer: "Just sign up for the waitlist. We'll roll out early access in phases and notify you when it's your turn."
    },
    {
      question: "I'm a coach or scout — what can I do on ATHLEX?",
      answer: "You'll be able to search and filter athletes, build shortlists, view verified performance data, and connect with athletes (with consent)."
    },
    {
      question: "What makes ATHLEX different from other sports platforms?",
      answer: "Unlike fragmented tools, ATHLEX brings everything together — athlete profiles, analytics, development tools, and discovery — in one unified, intelligent system."
    },
    {
      question: "Is my data safe and private?",
      answer: "Yes. You have full control over your profile visibility. ATHLEX is GDPR-compliant and built with athlete data privacy in mind."
    },
    {
      question: "When is ATHLEX launching?",
      answer: "We're currently in development and onboarding early users. Join the waitlist to stay updated and gain early access when available."
    },
    {
      question: "Can I share ATHLEX with my team or coach?",
      answer: "Yes! After signing up, you'll receive a referral link to invite teammates, coaches, or scouts to join the community."
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
