
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Legal = () => {
  const [activeTab, setActiveTab] = useState("privacy");
  const navigate = useNavigate();
  
  // Get the tab from URL params if available
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ['privacy', 'terms', 'cookies'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);
  
  // Update page title and meta description
  useEffect(() => {
    document.title = "ATHLEX – Legal Policies";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ATHLEX legal policies - Privacy Policy, Terms of Service, and Cookie Policy');
    }
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <Navbar />
      
      <main className="container py-12">
        <div className="mb-8 flex items-center">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="flex items-center text-athlex-accent hover:text-athlex-accent/80 mr-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold">Legal Policies</h1>
        </div>
        
        <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 rounded-lg p-6 mb-8">
          <p className="text-white/80">
            You are currently viewing our legal documentation. Use the tabs below to navigate between different policies.
          </p>
        </div>
        
        <Tabs defaultValue="privacy" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-athlex-gray-800 rounded-lg mb-6">
            <TabsTrigger value="privacy" className="text-sm md:text-base">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms" className="text-sm md:text-base">Terms of Service</TabsTrigger>
            <TabsTrigger value="cookies" className="text-sm md:text-base">Cookie Policy</TabsTrigger>
          </TabsList>
          
          <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 rounded-lg p-6">
            <TabsContent value="privacy">
              <ScrollArea className="h-[60vh] md:h-[70vh] pr-4">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                  <p className="text-sm text-white/70 mb-6"><strong>Effective Date:</strong> 30/03/2025</p>

                  <p className="mb-4">
                    ATHLEX ("we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and join our early access waitlist.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h3>
                  <p className="mb-2">We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email address, role (e.g., athlete, coach, scout), and any feedback or comments voluntarily submitted.</li>
                    <li><strong>Technical Data:</strong> Browser type, operating system, device information, and usage data via analytics tools (e.g., Google Analytics).</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> As explained in our Cookie Policy below.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h3>
                  <p className="mb-2">We use the collected information to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Communicate platform updates and early access opportunities</li>
                    <li>Improve user experience and optimize site functionality</li>
                    <li>Analyze feedback for product development</li>
                    <li>Send newsletters and occasional updates (with your consent)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3">3. Sharing Your Information</h3>
                  <p className="mb-4">
                    We do not sell, trade, or rent your personal data. We may share it with trusted service providers for analytics, 
                    email communication, or product improvement — all under strict confidentiality agreements.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">4. Data Retention</h3>
                  <p className="mb-4">
                    We retain personal data only for as long as necessary to fulfill the purpose for which it was collected, or as required by law.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">5. Your Rights</h3>
                  <p className="mb-2">You have the right to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Access, correct, or delete your personal data</li>
                    <li>Opt out of email communications at any time</li>
                    <li>Withdraw consent or request data portability</li>
                  </ul>
                  <p className="mb-4">
                    To exercise these rights, contact us at: <a href="mailto:athlex.gaia@gmail.com" className="text-athlex-accent hover:underline">athlex.gaia@gmail.com</a>
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">6. Data Security</h3>
                  <p className="mb-4">
                    We implement industry-standard security measures to protect your data. However, no digital transmission or storage method is completely secure.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">7. Changes to This Policy</h3>
                  <p className="mb-4">
                    We may update this Privacy Policy as our services evolve. Changes will be posted here with the "Effective Date" updated accordingly.
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          
            <TabsContent value="terms">
              <ScrollArea className="h-[60vh] md:h-[70vh] pr-4">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                  <p className="text-sm text-white/70 mb-6"><strong>Effective Date:</strong> 30/03/2025</p>

                  <p className="mb-4">
                    Welcome to ATHLEX. These Terms of Service ("Terms") govern your access to and use of our website and pre-launch waitlist services.
                    By accessing or using ATHLEX, you agree to these Terms.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">1. Use of the Site</h3>
                  <p className="mb-2">You agree to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide accurate and current information when joining our waitlist</li>
                    <li>Use the platform lawfully and respectfully</li>
                    <li>Not misuse or interfere with the site's functionality</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3">2. Eligibility</h3>
                  <p className="mb-4">
                    You must be at least 13 years old to access or provide data on our website. Users under 18 must have consent from a legal guardian.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">3. Intellectual Property</h3>
                  <p className="mb-4">
                    All content on this site, including logos, designs, and text, is the property of ATHLEX and may not be used or reproduced without permission.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">4. Early Access and Feedback</h3>
                  <p className="mb-4">
                    By submitting feedback, suggestions, or data via surveys, you grant us permission to use that information to improve our platform, 
                    with no expectation of compensation.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">5. Limitation of Liability</h3>
                  <p className="mb-4">
                    ATHLEX is not liable for any indirect, incidental, or consequential damages arising from your use of the website, waitlist, or associated services.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">6. Modifications</h3>
                  <p className="mb-4">
                    We reserve the right to update or modify these Terms at any time. Continued use of the site implies acceptance of the current Terms.
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          
            <TabsContent value="cookies">
              <ScrollArea className="h-[60vh] md:h-[70vh] pr-4">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
                  <p className="text-sm text-white/70 mb-6"><strong>Effective Date:</strong> 30/03/2025</p>

                  <p className="mb-4">
                    ATHLEX uses cookies and similar tracking technologies to improve your browsing experience and understand user interaction with our website.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">1. What Are Cookies?</h3>
                  <p className="mb-4">
                    Cookies are small data files placed on your device that help websites function and collect usage information.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">2. Types of Cookies We Use:</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for basic site functionality.</li>
                    <li><strong>Analytics Cookies:</strong> Used to collect anonymous usage data (e.g., via Google Analytics).</li>
                    <li><strong>Preference Cookies:</strong> Store your user role or survey response preferences.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3">3. How We Use Cookies</h3>
                  <p className="mb-2">Cookies help us:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Improve site performance and speed</li>
                    <li>Understand how visitors interact with our content</li>
                    <li>Customize user experience based on role (e.g., athlete, coach)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3">4. Managing Cookies</h3>
                  <p className="mb-4">
                    You can disable cookies through your browser settings. However, some site features may not function properly if cookies are disabled.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">5. Third-Party Cookies</h3>
                  <p className="mb-4">
                    We may use third-party cookies for analytics and embedded media. These providers have their own privacy policies.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">6. Changes to This Policy</h3>
                  <p className="mb-4">
                    We may update this Cookie Policy from time to time. Please review it periodically.
                  </p>

                  <div className="border-t border-athlex-gray-700 pt-6 mt-8">
                    <p className="text-white/70">
                      For questions about any of the above policies, contact us at: 
                      <a href="mailto:athlex.gaia@gmail.com" className="text-athlex-accent hover:underline ml-1 inline-flex items-center">
                        athlex.gaia@gmail.com
                        <Mail size={16} className="ml-1" />
                      </a>
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Legal;
