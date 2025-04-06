
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, ArrowRight, Lock, Info, Trophy } from 'lucide-react';

const TalentPathway = () => {
  const pathwaySteps = [
    {
      id: 1,
      title: 'Profile Ready',
      description: 'Complete profile with basic stats and information',
      completed: true,
      current: false,
    },
    {
      id: 2,
      title: 'Verified Metrics',
      description: 'Upload performance data or video for AI verification',
      completed: true, 
      current: false,
    },
    {
      id: 3,
      title: 'Coach Endorsed',
      description: 'Get endorsements from coaches or trainers',
      completed: false,
      current: true,
      progress: 2,
      total: 3,
    },
    {
      id: 4,
      title: 'Scout Featured',
      description: 'Your profile appears in scout discovery module',
      completed: false,
      current: false,
      locked: true,
    },
  ];

  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-medium">Verified Talent Pathway</CardTitle>
          <Badge className="bg-athlex-accent hover:bg-athlex-accent/80">Tier 2</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-5">
          {pathwaySteps.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative flex ${
                index !== pathwaySteps.length - 1 ? 'pb-5' : ''
              }`}
            >
              {/* Connection line */}
              {index !== pathwaySteps.length - 1 && (
                <div className="absolute top-7 left-3.5 h-full w-0.5 bg-gray-700"></div>
              )}
              
              {/* Status icon */}
              <div className="mr-4 mt-0.5">
                {step.completed ? (
                  <CheckCircle className="h-7 w-7 text-green-500" />
                ) : step.current ? (
                  <Circle className="h-7 w-7 text-yellow-500 stroke-2" />
                ) : (
                  <div className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-gray-600 bg-gray-800">
                    {step.locked ? (
                      <Lock className="h-3 w-3 text-gray-500" />
                    ) : (
                      <span className="text-sm text-gray-500">{step.id}</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className={`font-medium ${
                      step.locked ? 'text-gray-500' : step.current ? 'text-yellow-500' : ''
                    }`}>{step.title}</h3>
                    <p className={`text-sm ${step.locked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                  
                  {step.completed && (
                    <Badge className="bg-green-900/20 text-green-400 border border-green-600/30">
                      Completed
                    </Badge>
                  )}
                  
                  {step.current && (
                    <Badge className="bg-yellow-900/20 text-yellow-400 border border-yellow-600/30">
                      In Progress ({step.progress}/{step.total})
                    </Badge>
                  )}
                </div>
                
                {step.current && (
                  <Button size="sm" className="mt-3">
                    {step.title === 'Coach Endorsed' ? 'Request Endorsement' : 'Continue'}
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium">Pathway Benefits</h4>
            <p className="text-sm text-gray-400 mt-1">
              Each tier unlocks new visibility features. Tier 3 profiles are 5x more likely to be discovered by talent scouts!
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="w-full">
            <Trophy className="mr-2 h-4 w-4" />
            View Pathway Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentPathway;
