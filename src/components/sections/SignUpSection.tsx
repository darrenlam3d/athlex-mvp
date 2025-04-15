
import React from 'react';
import WaitlistHeader from './waitlist/WaitlistHeader';
import WaitlistForm from './waitlist/WaitlistForm';

const SignUpSection = () => {
  return (
    <section id="signup" className="section-padding bg-athlex-background">
      <div className="container max-w-3xl mx-auto">
        <WaitlistHeader />
        <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 rounded-lg p-6 md:p-8">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
