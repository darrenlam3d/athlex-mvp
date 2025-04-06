
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Medal } from 'lucide-react';

const Leaderboards = () => {
  const [leaderboardType, setLeaderboardType] = useState('consistency');
  
  const leaderboards = {
    consistency: [
      { rank: 1, name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004', initials: 'MC', position: 'CM', score: '27 days' },
      { rank: 2, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', initials: 'SJ', position: 'LW', score: '25 days' },
      { rank: 3, name: 'David Park', avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6', initials: 'DP', position: 'RB', score: '24 days' },
      { rank: 4, name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', initials: 'AT', position: 'PG', score: '21 days' },
      { rank: 5, name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453', initials: 'EW', position: 'LB', score: '20 days' }
    ],
    improvement: [
      { rank: 1, name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453', initials: 'EW', position: 'LB', score: '+18%' },
      { rank: 2, name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', initials: 'AT', position: 'PG', score: '+16%' },
      { rank: 3, name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004', initials: 'MC', position: 'CM', score: '+14%' },
      { rank: 4, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', initials: 'SJ', position: 'LW', score: '+12%' },
      { rank: 5, name: 'David Park', avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6', initials: 'DP', position: 'RB', score: '+11%' }
    ],
    speed: [
      { rank: 1, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', initials: 'SJ', position: 'LW', score: '33.2 km/h' },
      { rank: 2, name: 'David Park', avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6', initials: 'DP', position: 'RB', score: '32.7 km/h' },
      { rank: 3, name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', initials: 'AT', position: 'PG', score: '31.9 km/h' },
      { rank: 4, name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453', initials: 'EW', position: 'LB', score: '31.5 km/h' },
      { rank: 5, name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004', initials: 'MC', position: 'CM', score: '30.8 km/h' }
    ]
  };
  
  const currentLeaderboard = leaderboards[leaderboardType as keyof typeof leaderboards];
  
  // Check if the current user is on the leaderboard
  const userRank = currentLeaderboard.findIndex(player => player.name === 'Alex Thompson') + 1;
  
  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-medium">Leaderboards</CardTitle>
          <Select value={leaderboardType} onValueChange={setLeaderboardType}>
            <SelectTrigger className="w-[140px] h-8 text-sm bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="consistency">Consistency</SelectItem>
              <SelectItem value="improvement">Improvement</SelectItem>
              <SelectItem value="speed">Top Speed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {currentLeaderboard.map((player, index) => (
            <div 
              key={index} 
              className={`flex items-center p-2.5 rounded-lg ${
                player.name === 'Alex Thompson' ? 'bg-athlex-accent/20 border border-athlex-accent/30' : 'hover:bg-gray-800'
              }`}
            >
              <div className="w-6 text-center font-medium">
                {index === 0 && <Medal className="h-5 w-5 text-yellow-400 mx-auto" />}
                {index === 1 && <Medal className="h-5 w-5 text-gray-400 mx-auto" />}
                {index === 2 && <Medal className="h-5 w-5 text-amber-700 mx-auto" />}
                {index > 2 && index + 1}
              </div>
              <Avatar className="h-8 w-8 mx-3">
                <AvatarImage src={player.avatar} alt={player.name} />
                <AvatarFallback>{player.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{player.name}</p>
                <p className="text-xs text-gray-400">{player.position}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{player.score}</p>
                <p className="text-xs text-gray-400">
                  {leaderboardType === 'consistency' && 'Streak'}
                  {leaderboardType === 'improvement' && 'Monthly'}
                  {leaderboardType === 'speed' && 'Best'}
                </p>
              </div>
            </div>
          ))}
          
          {/* User's rank if not in top 5 */}
          {userRank === 0 && (
            <>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-2 text-xs text-gray-500">More players</span>
                </div>
              </div>
              
              <div className="flex items-center p-2.5 rounded-lg bg-athlex-accent/20 border border-athlex-accent/30">
                <div className="w-6 text-center font-medium">24</div>
                <Avatar className="h-8 w-8 mx-3">
                  <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" alt="Alex Thompson" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">Alex Thompson (You)</p>
                  <p className="text-xs text-gray-400">PG</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">
                    {leaderboardType === 'consistency' && '11 days'}
                    {leaderboardType === 'improvement' && '+6%'}
                    {leaderboardType === 'speed' && '28.4 km/h'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {leaderboardType === 'consistency' && 'Streak'}
                    {leaderboardType === 'improvement' && 'Monthly'}
                    {leaderboardType === 'speed' && 'Best'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboards;
