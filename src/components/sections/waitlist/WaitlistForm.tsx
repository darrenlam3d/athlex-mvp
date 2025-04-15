
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
    phoneNumber,
    setPhoneNumber,
    role,
    setRole,
    feedback,
    setFeedback,
    gdprConsent,
    setGdprConsent,
    isSubmitting,
    handleSubmit
  } = useWaitlistRegistration();

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address <span className="text-red-400">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="bg-athlex-gray-900 border-athlex-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Phone size={16} />
            Phone Number <span className="text-white/50 text-xs">(Optional)</span>
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1 (234) 567-8910"
            className="bg-athlex-gray-900 border-athlex-gray-700"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Your Role <span className="text-red-400">*</span>
          </label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="bg-athlex-gray-900 border-athlex-gray-700">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="bg-athlex-gray-900 border-athlex-gray-700">
              <SelectItem value="athlete">Athlete</SelectItem>
              <SelectItem value="coach">Coach</SelectItem>
              <SelectItem value="scout">Scout</SelectItem>
              <SelectItem value="federation">Federation/Organization</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium mb-2">
            If you have any questions or would like further clarification about ATHLEX, feel free to let us know.
          </label>
          <Textarea
            id="feedback"
            placeholder="Share your thoughts..."
            className="bg-athlex-gray-900 border-athlex-gray-700"
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
          <label htmlFor="gdpr" className="ml-2 text-sm text-white/70">
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
