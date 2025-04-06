
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, Trophy, TrendingUp } from 'lucide-react';

const FootballAchievements = () => {
  const achievements = [
    {
      id: 1,
      name: "Pass Master",
      description: "Achieved 90%+ pass completion in 5 consecutive sessions",
      date: "Apr 3, 2025",
      icon: "🎯"
    },
    {
      id: 2,
      name: "Endurance King",
      description: "Covered 10+ km in a single match simulation",
      date: "Mar 28, 2025",
      icon: "🏃"
    },
    {
      id: 3,
      name: "Technical Wizard",
      description: "Completed advanced technical assessment with distinction",
      date: "Mar 15, 2025",
      icon: "✨"
    }
  ];

  const rankings = [
    {
      category: "Ball Control",
      rank: "#12",
      percentile: "Top 8%",
      total: "152 players"
    },
    {
      category: "Vision & Passing",
      rank: "#8",
      percentile: "Top 5%",
      total: "152 players"
    },
    {
      category: "Stamina",
      rank: "#24",
      percentile: "Top 16%",
      total: "152 players"
    }
  ];

  return (
    <Card className="bg-card text-card-foreground border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Achievements & Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-500" />
              Achievements Unlocked
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className="bg-gray-800/30 rounded-lg p-4 flex items-start">
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div>
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-gray-400 mt-1">{achievement.description}</div>
                    <div className="text-xs text-gray-500 mt-1">Earned: {achievement.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-blue-400" />
              Position Rankings (Central Midfielders)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {rankings.map((ranking, idx) => (
                <div key={idx} className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-400">{ranking.category}</div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+3</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-athlex-accent mt-1">{ranking.rank}</div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{ranking.percentile}</span>
                    <span>of {ranking.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FootballAchievements;
