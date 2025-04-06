
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Trophy, Clock, Users, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ChallengesSection = () => {
  const challenges = [
    {
      id: 1,
      title: '5 Sprint Sessions This Week',
      category: 'Physical',
      period: 'Weekly',
      progress: 60,
      participants: 243,
      timeLeft: '2 days',
      joined: true,
    },
    {
      id: 2,
      title: 'Ball Mastery Challenge',
      category: 'Technical',
      description: 'Complete 3 ball control drills in 5 days',
      period: 'Weekly',
      progress: 33,
      participants: 187,
      timeLeft: '3 days',
      joined: true,
    },
    {
      id: 3,
      title: 'Tactical Awareness Quiz',
      category: 'Tactical',
      period: 'Monthly',
      progress: 0,
      participants: 156,
      timeLeft: '10 days',
      joined: false,
    },
  ];

  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-medium">Weekly Challenges</CardTitle>
          <Button variant="link" className="text-athlex-accent p-0 h-auto text-sm" size="sm">
            View All
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.map((challenge) => (
          <div 
            key={challenge.id} 
            className={`p-4 rounded-lg ${challenge.joined ? 'bg-gray-800' : 'bg-gray-800/50 hover:bg-gray-800 transition-colors'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs 
                  ${challenge.category === 'Physical' ? 'bg-blue-900/30 text-blue-300' : ''}
                  ${challenge.category === 'Technical' ? 'bg-green-900/30 text-green-300' : ''}
                  ${challenge.category === 'Tactical' ? 'bg-orange-900/30 text-orange-300' : ''}
                `}>
                  {challenge.category}
                </span>
                <h3 className="font-medium mt-1">{challenge.title}</h3>
                {challenge.description && (
                  <p className="text-sm text-gray-400 mt-1">{challenge.description}</p>
                )}
              </div>
              <Trophy className={`h-5 w-5 ${challenge.joined ? 'text-athlex-accent' : 'text-gray-500'}`} />
            </div>
            
            {challenge.joined && (
              <>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>
              </>
            )}
            
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{challenge.period}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{challenge.timeLeft} left</span>
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                <span>{challenge.participants} participants</span>
              </div>
            </div>
            
            {!challenge.joined && (
              <Button size="sm" className="w-full mt-3">Join Challenge</Button>
            )}
          </div>
        ))}
        
        <Button className="w-full" variant="outline">
          <Trophy className="mr-2 h-4 w-4" />
          Create Custom Challenge
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChallengesSection;
