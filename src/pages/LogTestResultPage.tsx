
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AthleteLayout from '@/layouts/AthleteLayout';
import TestResultForm from '@/components/athlete/TestResultForm';

const LogTestResultPage = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/athlex-mvp');
  };
  
  return (
    <AthleteLayout>
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/athlex-mvp')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold gradient-text">Log Test Result</h1>
        </div>
        
        <TestResultForm onSuccess={handleSuccess} />
      </div>
    </AthleteLayout>
  );
};

export default LogTestResultPage;
