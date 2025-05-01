
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone } from 'lucide-react';
import { useWaitlistRegistration } from './useWaitlistRegistration';

const WaitlistForm = () => {
  const {
    email,
    setEmail,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    role,
    setRole,
    interests,
    setInterests,
    feedback,
    setFeedback,
    gdprConsent,
    setGdprConsent,
    isSubmitting,
    handleSubmit
  } = useWaitlistRegistration();

  const interestOptions = [
    { id: 'earlyAccess', label: 'Early Access & Beta Testing' },
    { id: 'contentInsights', label: 'Performance & Training Content' },
    { id: 'opportunities', label: 'Global Sport Opportunities' },
    { id: 'networking', label: 'Community & Networking' },
    { id: 'productFeedback', label: 'Providing Product Feedback' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-athlex-gray-800">
            Full Name <span className="text-red-400">*</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            className="bg-white border-athlex-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-athlex-gray-800">
            Email Address <span className="text-red-400">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="bg-white border-athlex-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2 flex items-center gap-2 text-athlex-gray-800">
            <Phone size={16} />
            Phone Number <span className="text-athlex-gray-500 text-xs">(Optional)</span>
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1 (234) 567-8910"
            className="bg-white border-athlex-gray-300"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-2 text-athlex-gray-800">
            Your Role <span className="text-red-400">*</span>
          </label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="bg-white border-athlex-gray-300">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="bg-white border-athlex-gray-300">
              <SelectItem value="athlete">Athlete</SelectItem>
              <SelectItem value="coach">Coach</SelectItem>
              <SelectItem value="scout">Scout</SelectItem>
              <SelectItem value="parent">Parent of Athlete</SelectItem>
              <SelectItem value="federation">Federation/Organization</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 text-athlex-gray-800">
            I'm interested in <span className="text-red-400">*</span>
          </label>
          <div className="space-y-3">
            {interestOptions.map((option) => (
              <div key={option.id} className="flex items-center">
                <Checkbox 
                  id={option.id}
                  checked={interests.includes(option.id)}
                  onCheckedChange={() => {
                    setInterests(current =>
                      current.includes(option.id)
                        ? current.filter(i => i !== option.id)
                        : [...current, option.id]
                    )
                  }}
                  className="mr-2"
                />
                <label htmlFor={option.id} className="text-sm text-athlex-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium mb-2 text-athlex-gray-800">
            If you have any questions or would like further clarification about ATHLEX, feel free to let us know.
          </label>
          <Textarea
            id="feedback"
            placeholder="Share your thoughts..."
            className="bg-white border-athlex-gray-300"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="flex items-start">
          <Checkbox 
            id="gdpr" 
            checked={gdprConsent} 
            onCheckedChange={() => setGdprConsent(!gdprConsent)}
            className="mt-1"
          />
          <label htmlFor="gdpr" className="ml-2 text-sm text-athlex-gray-600">
            I consent to ATHLEX collecting and storing the information I've provided. 
            I understand I can withdraw my consent at any time. 
            <a href="#" className="text-athlex-accent hover:underline ml-1">Privacy Policy</a>
          </label>
        </div>

        <Button 
          type="submit" 
          className="cta-button w-full text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Get Early Access"}
        </Button>
      </div>
    </form>
  );
};

export default WaitlistForm;
