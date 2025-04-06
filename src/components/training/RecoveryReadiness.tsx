
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Battery, Moon, Activity, Heart } from 'lucide-react';

const RecoveryReadiness = () => {
  // Mock data for recovery metrics
  const readinessScore = 78;
  const sleepQuality = 65;
  const muscleReadiness = 72;
  const restingHeartRate = 62;
  
  // Determine overall status based on readiness score
  let statusColor, statusText;
  if (readinessScore >= 80) {
    statusColor = 'text-green-400 bg-green-900/30';
    statusText = 'Ready For High Intensity';
  } else if (readinessScore >= 70) {
    statusColor = 'text-yellow-400 bg-yellow-900/30';
    statusText = 'Moderate Training Advised';
  } else {
    statusColor = 'text-red-400 bg-red-900/30';
    statusText = 'Recovery Day Recommended';
  }

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Recovery & Readiness</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          Today's recovery status and readiness for training
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className={`text-center p-3 rounded-lg ${statusColor}`}>
            <div className="text-sm font-medium mb-1">Today's Training Status</div>
            <div className="text-lg font-bold">{statusText}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Battery className="h-5 w-5 text-athlex-accent" />
              <div>
                <div className="text-sm text-gray-400">Readiness Score</div>
                <div className="text-xl font-bold">{readinessScore}/100</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  readinessScore >= 80 ? 'bg-green-400' : 
                  readinessScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${readinessScore}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-2">Based on sleep, recovery, and recent match load</div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Moon className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Sleep Quality</div>
                <div className="text-xl font-bold">{sleepQuality}/100</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full"
                style={{ width: `${sleepQuality}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-2">7.2 hours | 3 disruptions | 68% deep sleep</div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="h-5 w-5 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Muscle Readiness</div>
                <div className="text-xl font-bold">{muscleReadiness}/100</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-400 h-2 rounded-full"
                style={{ width: `${muscleReadiness}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-2">Minor fatigue in calves and hamstrings</div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="h-5 w-5 text-red-400" />
              <div>
                <div className="text-sm text-gray-400">Resting Heart Rate</div>
                <div className="text-xl font-bold">{restingHeartRate} bpm</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              2 bpm above your 7-day average
            </div>
            <div className="text-xs text-yellow-400 mt-1">
              Slightly elevated, which may indicate incomplete recovery from your last match
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-800/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Recovery Recommendations</h4>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
              <span className="text-sm flex-1">Focus on light technical training today, avoid high-intensity sprints</span>
            </li>
            <li className="flex gap-2">
              <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
              <span className="text-sm flex-1">Hydrate more than usual (aim for additional 1L)</span>
            </li>
            <li className="flex gap-2">
              <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
              <span className="text-sm flex-1">Consider foam rolling for calves and hamstrings</span>
            </li>
            <li className="flex gap-2">
              <span className="h-2 w-2 bg-athlex-accent rounded-full mt-2"></span>
              <span className="text-sm flex-1">Target 8+ hours of sleep tonight</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecoveryReadiness;
