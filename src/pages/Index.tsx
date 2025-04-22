
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white flex flex-col">
      <header className="px-4 py-8 text-center">
        <img 
          src="/lovable-uploads/4fa9ab4b-66d6-42dc-979f-661fee5226e5.png" 
          alt="ATHLEX Logo" 
          className="h-12 mx-auto mb-6" 
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-athlex-accent to-purple-400 bg-clip-text text-transparent">
          ATHLEX
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          The AI-powered platform connecting athletes with coaches and scouts
        </p>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <Link to="/athlex-mvp" className="group">
            <div className="relative bg-athlex-gray-900/80 border border-athlex-gray-800 rounded-xl p-6 h-full group-hover:border-athlex-accent transition-all duration-300">
              <div className="absolute -top-3 -right-3 bg-athlex-accent text-white px-2 py-1 text-xs font-bold rounded">NEW</div>
              <h2 className="text-xl font-bold mb-2 text-white">ATHLEX MVP Demo</h2>
              <p className="text-gray-400 mb-4">
                Experience our youth athlete dashboard with performance tracking, data logging, and AI insights.
              </p>
              <Button className="w-full bg-athlex-accent hover:bg-athlex-accent/90">
                Launch MVP Demo
              </Button>
            </div>
          </Link>
          
          <Link to="/login" className="group">
            <div className="bg-athlex-gray-900/80 border border-athlex-gray-800 rounded-xl p-6 h-full group-hover:border-athlex-accent transition-all duration-300">
              <h2 className="text-xl font-bold mb-2 text-white">ATHLEX Platform</h2>
              <p className="text-gray-400 mb-4">
                Log in to access the full platform with athlete, coach, and scout features.
              </p>
              <Button variant="outline" className="w-full border-athlex-gray-700">
                Sign In / Sign Up
              </Button>
            </div>
          </Link>
        </div>
      </main>
      
      <footer className="px-4 py-8 text-center text-gray-500 text-sm">
        <p>ATHLEX MVP Demo © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
