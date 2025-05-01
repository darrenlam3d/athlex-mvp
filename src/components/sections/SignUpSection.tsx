
import React from 'react';
import WaitlistHeader from './waitlist/WaitlistHeader';
import WaitlistForm from './waitlist/WaitlistForm';

const SignUpSection = () => {
  return (
    <section id="signup" className="section-padding bg-white">
      <div className="container max-w-3xl mx-auto">
        <WaitlistHeader />
        <div className="bg-white border border-athlex-gray-200 rounded-lg p-6 md:p-8 shadow-lg">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
