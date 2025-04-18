
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, LockKeyhole, PlayCircle } from 'lucide-react';

const SkillBuilder = () => {
  const programs = [
    {
      id: 1,
      title: 'Elite Box-to-Box Midfielder Development',
      description: 'Master the essentials of all-round midfield play, stamina, and tactical awareness',
      progress: 65,
      totalStages: 5,
      completedStages: 3,
      currentStage: {
        title: 'Advanced Ball Control',
        description: 'Develop elite close control under pressure',
        drills: [
          { id: 1, name: 'First Touch Optimization', completed: true },
          { id: 2, name: 'Tight Space Control', completed: true },
          { id: 3, name: 'Progressive Carry Training', completed: false },
          { id: 4, name: 'Pressure Resistance Drills', completed: false }
        ]
      }
    },
    {
      id: 2,
      title: 'Explosive Winger Development',
      description: 'Develop pace, crossing accuracy and 1v1 dribbling skills',
      progress: 30,
      totalStages: 4,
      completedStages: 1,
      currentStage: {
        title: 'Take-On Fundamentals',
        description: 'Perfect your 1v1 skills against defenders',
        drills: [
          { id: 1, name: 'Step-Over Technique', completed: true },
          { id: 2, name: 'Pace Change Training', completed: false },
          { id: 3, name: 'Cut Inside Movement', completed: false },
          { id: 4, name: 'Sprint-Dribble Balance', completed: false }
        ]
      }
    }
  ];

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Skill Builder Programs</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          Position-specific training pathways with progressive milestones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {programs.map(program => (
            <div key={program.id} className="bg-gray-800/30 rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h3 className="font-medium">{program.title}</h3>
                <Badge variant="outline" className="text-xs bg-athlex-accent/20 text-athlex-accent border-athlex-accent/30">
                  {program.completedStages}/{program.totalStages} Stages
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-3">{program.description}</p>
              
              <div className="mb-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-athlex-accent h-2 rounded-full" 
                    style={{ width: `${program.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">{program.progress}% Complete</div>
              </div>
              
              <div className="border border-gray-700 rounded-lg p-3 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Current Stage: {program.currentStage.title}</h4>
                  <span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-0.5 rounded">In Progress</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{program.currentStage.description}</p>
                
                <h5 className="text-xs font-medium text-gray-300 mb-2">Recommended Drills:</h5>
                <ul className="space-y-2">
                  {program.currentStage.drills.map(drill => (
                    <li key={drill.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        {drill.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <div className="h-4 w-4 border border-gray-600 rounded-full"></div>
                        )}
                        <span className={drill.completed ? 'text-gray-400 line-through' : ''}>
                          {drill.name}
                        </span>
                      </div>
                      <button className="text-athlex-accent">
                        <PlayCircle className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <button className="text-sm text-athlex-accent">View Full Program</button>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <LockKeyhole className="h-3 w-3" />
                  Next stage unlocks at 80%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillBuilder;
