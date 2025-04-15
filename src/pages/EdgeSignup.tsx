
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { supabase } from '@/lib/supabase';

const EdgeSignup = () => {
  const navigate = useNavigate();
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

  const sendNotification = async (signupData) => {
    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data?.session?.access_token || '';
      
      const response = await fetch('https://dndudgqkoiybenqnavoi.supabase.co/functions/v1/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          type: 'edge',
          data: signupData
        })
      });
      
      if (!response.ok) {
        console.warn(`Notification failed with status: ${response.status}`);
      } else {
        return await response.json();
      }
    } catch (error) {
      console.warn('Failed to send notification:', error);
      // Don't throw error, just log it so we don't block the signup process
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    setIsSubmitting(true);
    
    try {
      // Prepare signup data
      const signupData = {
        email,
        name,
        role,
        interests,
        feedback: feedback || null,
        gdpr_consent: gdprConsent,
        created_at: new Date().toISOString()
      };
      
      // Insert data into Supabase - now using waitlist_registrations instead of edge_signups
      const { error, data } = await supabase
        .from('waitlist_registrations')
        .insert([signupData]);

      if (error) {
        throw error;
      }
      
      console.log('Waitlist registration saved successfully:', data);
      
      // Try to send notification but don't block if it fails
      await sendNotification(signupData).catch(err => {
        console.warn('Notification sending failed but signup was successful:', err);
      });
      
      // Reset form
      setEmail('');
      setName('');
      setRole('');
      setInterests([]);
      setFeedback('');
      setGdprConsent(false);
      
      toast.success("You've successfully joined ATHLEX Edge! We'll be in touch soon.");
      
      // Navigate to home page after successful signup
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error during edge signup process:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
