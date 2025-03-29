
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { Phone } from 'lucide-react';

// Interface for waitlist registration data
interface WaitlistRegistration {
  email: string;
  phoneNumber?: string;
  role: string;
  feedback: string;
  timestamp: string;
  gdprConsent: boolean;
}

// Admin email address
const ADMIN_EMAIL = "athlex.gaia@gmail.com";

const SignUpSection = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdminSettings, setShowAdminSettings] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!role) {
      toast.error("Please select your role");
      return;
    }
    
    if (!gdprConsent) {
      toast.error("Please accept the privacy policy");
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // Create waitlist registration object
    const registration: WaitlistRegistration = {
      email,
      ...(phoneNumber && { phoneNumber }),
      role,
      feedback,
      timestamp: new Date().toISOString(),
      gdprConsent
    };
    
    // Save to localStorage for now (in a real app, you'd send this to a server)
    saveWaitlistRegistration(registration);
    
    // Always send email to the specified admin address
    sendEmailNotification(registration);
    
    setTimeout(() => {
      console.log("Registration saved:", registration);
      
      // Reset form
      setEmail('');
      setPhoneNumber('');
      setRole('');
      setFeedback('');
      setGdprConsent(false);
      setIsSubmitting(false);
      
      // Show success message
      toast.success("You're in! We'll be in touch soon.");
    }, 1500);
  };

  // Function to save registration to localStorage
  const saveWaitlistRegistration = (registration: WaitlistRegistration) => {
    try {
      // Get existing registrations
      const existingRegistrationsJSON = localStorage.getItem('waitlistRegistrations');
      let registrations: WaitlistRegistration[] = existingRegistrationsJSON 
        ? JSON.parse(existingRegistrationsJSON) 
        : [];
      
      // Add new registration
      registrations.push(registration);
      
      // Save back to localStorage
      localStorage.setItem('waitlistRegistrations', JSON.stringify(registrations));
      
      console.log(`Registration saved successfully. Total registrations: ${registrations.length}`);
    } catch (error) {
      console.error('Error saving registration:', error);
    }
  };

  // Function to send email notification
  const sendEmailNotification = (registration: WaitlistRegistration) => {
    // In a production environment, this would be a server API call
    // For now, we'll use mailto for demonstration purposes
    try {
      const subject = encodeURIComponent("New ATHLEX Waitlist Registration");
      const body = encodeURIComponent(`
New waitlist registration:

Email: ${registration.email}
${registration.phoneNumber ? `Phone: ${registration.phoneNumber}` : ''}
Role: ${registration.role}
Feedback: ${registration.feedback}
Timestamp: ${registration.timestamp}
GDPR Consent: ${registration.gdprConsent ? "Yes" : "No"}
      `);
      
      // Create a hidden link to trigger the email
      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);
      
      console.log("Email notification sent to:", ADMIN_EMAIL);
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  };

  // Toggle admin settings
  const toggleAdminSettings = () => {
    setShowAdminSettings(!showAdminSettings);
  };

  return (
    <section id="signup" className="section-padding bg-athlex-background">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Movement.<br />
            <span className="text-athlex-accent">Elevate the Next Generation</span>
          </h2>
          <p className="text-white/70 text-lg">
            Be among the first to experience ATHLEX and help us build the platform that truly serves your needs.
          </p>
        </div>

        <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 rounded-lg p-6 md:p-8">
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
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
