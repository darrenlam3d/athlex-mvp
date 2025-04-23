
import React from 'react';
import { ProfileProvider } from '@/contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const MVP = () => {
  const navigate = useNavigate();
  
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gray-950">
        <div className="container py-8 px-4 mx-auto max-w-7xl">
          <header className="mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
                alt="ATHLEX Logo" 
                className="h-10" 
              />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2 gradient-text">ATHLEX MVP Demo</h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Experience the core features of ATHLEX platform — connecting athlete performance data with 
              AI-powered insights for athletes and coaches.
            </p>
          </header>
          
          <main className="mt-8 animate-fade-in">
            <Card className="bg-gray-900/60 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Choose your experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  The ATHLEX MVP demonstrates key aspects of our platform. Experience how athletes can track performance, log training, and receive AI-powered insights.
                </p>
                
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 pt-4">
                  <Button 
                    className="flex-1 bg-athlex-accent hover:bg-athlex-accent/90" 
                    onClick={() => navigate('/athlex-mvp')}
                  >
                    <span>Athlete Dashboard</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    className="flex-1" 
                    variant="outline" 
                    onClick={() => navigate('/login-demo')}
                  >
                    View All Role Options
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
        
        {/* Add scroll to top button for better UX */}
        <ScrollToTopButton />
      </div>
    </ProfileProvider>
  );
};

export default MVP;
