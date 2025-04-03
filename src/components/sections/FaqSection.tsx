
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FaqSection = () => {
  const faqs = [
    {
      question: "What is ATHLEX?",
      answer: "ATHLEX is a digital performance and discovery platform designed for athletes, coaches, and scouts. It helps athletes track growth, showcase their journey, and connect with real opportunities — all in one trusted space."
    },
    {
      question: "Who is ATHLEX for?",
      answer: "ATHLEX is built for competitive athletes at all levels, especially youth, amateur, and semi-pro. It also serves coaches, scouts, federations, and academies looking to identify and develop talent more effectively."
    },
    {
      question: "What can athletes do on ATHLEX?",
      answer: "Build a verified profile with performance data and highlights. Track development over time with smart metrics. Receive tailored training insights. Discover global camps, scholarships, and trial opportunities. Connect with coaches, scouts, and peers."
    },
    {
      question: "Is ATHLEX free to use?",
      answer: "Yes — ATHLEX will launch with a freemium model. Core features are free for athletes, with optional upgrades for deeper insights, visibility, and performance tools."
    },
    {
      question: "How does ATHLEX help coaches and scouts?",
      answer: "ATHLEX offers searchable athlete databases, development trends, shortlisting tools, and verified data — making it easier to scout talent, track growth, and connect with athletes globally."
    },
    {
      question: "What sports are supported?",
      answer: "ATHLEX currently supports Football, Cricket, Hockey, Tennis, Volleyball, Table Tennis, and Basketball — with more to come."
    },
    {
      question: "Where is ATHLEX launching first?",
      answer: "ATHLEX is launching in Southeast Asia, with early access available in Singapore, Malaysia, Indonesia, Philippines, and India."
    },
    {
      question: "What is ATHLEX Edge?",
      answer: "ATHLEX Edge is our weekly newsletter for athletes and coaches. It delivers elite training insights, mental tools, recovery routines, and global opportunities — all curated to give you an edge."
    },
    {
      question: "How can I get early access?",
      answer: "Join the waitlist on this page. Early users will receive exclusive access to the platform, features, and the ATHLEX Edge newsletter."
    },
    {
      question: "Still have questions?",
      answer: "Reach out to us directly or follow us on LinkedIn and Instagram for updates."
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
