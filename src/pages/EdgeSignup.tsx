
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

// Interface for edge signup data
interface EdgeSignup {
  email: string;
  name: string;
  role: string;
  interests: string[];
  feedback: string;
  timestamp: string;
  gdprConsent: boolean;
}

const EdgeSignup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    { id: 'earlyAccess', label: 'Early Access & Beta Testing' },
    { id: 'contentInsights', label: 'Performance & Training Content' },
    { id: 'opportunities', label: 'Global Sport Opportunities' },
    { id: 'networking', label: 'Community & Networking' },
    { id: 'productFeedback', label: 'Providing Product Feedback' },
  ];

  const handleInterestChange = (interest: string) => {
    setInterests(current => 
      current.includes(interest) 
        ? current.filter(i => i !== interest)
        : [...current, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!role) {
      toast.error("Please select your role");
      return;
    }

    if (interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }
    
    if (!gdprConsent) {
      toast.error("Please accept the privacy policy");
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // Create edge signup object
    const signupData: EdgeSignup = {
      email,
      name,
      role,
      interests,
      feedback,
      timestamp: new Date().toISOString(),
      gdprConsent
    };
    
    // Save to localStorage (in a real app, you'd send this to a server)
    saveEdgeSignup(signupData);
    
    setTimeout(() => {
      console.log("Edge signup saved:", signupData);
      
      // Reset form
      setEmail('');
      setName('');
      setRole('');
      setInterests([]);
      setFeedback('');
      setGdprConsent(false);
      setIsSubmitting(false);
      
      // Show success message
      toast.success("You've successfully joined ATHLEX Edge! We'll be in touch soon.");
    }, 1500);
  };

  // Function to save signup to localStorage
  const saveEdgeSignup = (signup: EdgeSignup) => {
    try {
      // Get existing signups
      const existingSignupsJSON = localStorage.getItem('edgeSignups');
      let signups: EdgeSignup[] = existingSignupsJSON 
        ? JSON.parse(existingSignupsJSON) 
        : [];
      
      // Add new signup
      signups.push(signup);
      
      // Save back to localStorage
      localStorage.setItem('edgeSignups', JSON.stringify(signups));
      
      console.log(`Edge signup saved successfully. Total signups: ${signups.length}`);
    } catch (error) {
      console.error('Error saving signup:', error);
    }
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <Navbar />
      
      <main className="py-20">
        <div className="container max-w-3xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-athlex-accent hover:underline mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Join ATHLEX Edge
            </h1>
            <p className="text-xl text-white/80 mb-2">Be part of our early-access community</p>
            <p className="text-white/70">
              Get exclusive updates, content, and opportunities as we build ATHLEX together.
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
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className="bg-athlex-gray-900 border-athlex-gray-700"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                      <SelectItem value="parent">Parent of Athlete</SelectItem>
                      <SelectItem value="federation">Federation/Organization</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    I'm interested in <span className="text-red-400">*</span>
                  </label>
                  <div className="space-y-3">
                    {interestOptions.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <Checkbox 
                          id={option.id}
                          checked={interests.includes(option.id)}
                          onCheckedChange={() => handleInterestChange(option.id)}
                          className="mr-2"
                        />
                        <label htmlFor={option.id} className="text-sm text-white/90">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium mb-2">
                    What sport(s) are you involved in? Any specific areas you're interested in?
                  </label>
                  <Textarea
                    id="feedback"
                    placeholder="Share more about your sports background and interests..."
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
                    <Link to="/legal" className="text-athlex-accent hover:underline ml-1">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="cta-button w-full text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Join ATHLEX Edge"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default EdgeSignup;
