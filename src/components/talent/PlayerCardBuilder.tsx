
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Check, ChevronRight, Share2 } from 'lucide-react';

const PlayerCardBuilder = () => {
  const [selectedPosition, setSelectedPosition] = useState('CM');
  
  const stats = [
    { name: 'Top Speed', value: '31.2 km/h', highlight: true },
    { name: 'Avg. Sprints', value: '24 per game', highlight: false },
    { name: 'Pass Accuracy', value: '87%', highlight: true },
    { name: 'Distance per Game', value: '11.4 km', highlight: true },
  ];
  
  return (
    <Card className="border-gray-700 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Player Card Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-800 rounded-lg p-5 mb-5">
          <div className="text-center">
            <Avatar className="h-20 w-20 mx-auto border-2 border-athlex-accent">
              <AvatarImage src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" alt="Alex Thompson" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-xl mt-3">Alex Thompson</h3>
            <p className="text-sm text-gray-400">22 yrs • 183 cm • 76 kg</p>
            
            <div className="flex justify-center gap-2 mt-3">
              <Badge className="bg-athlex-accent hover:bg-athlex-accent/80">{selectedPosition}</Badge>
              <Badge variant="outline">Box-to-Box</Badge>
              <Badge variant="outline">High Stamina</Badge>
            </div>
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${
                  stat.highlight 
                    ? 'border-athlex-accent/30 bg-athlex-accent/10' 
                    : 'border-gray-700 bg-gray-700/50'
                }`}
              >
                <p className={`text-sm ${stat.highlight ? 'text-athlex-accent' : 'text-gray-400'}`}>
                  {stat.name}
                </p>
                <p className="text-lg font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
          
          {/* Last updated */}
          <div className="mt-5 text-center">
            <p className="text-xs text-gray-500">Last updated: Today at 3:24 PM</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 gap-2">
              <Upload className="h-4 w-4" />
              Upload Highlights
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              Share Card
            </Button>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Card Customization</h4>
                <p className="text-sm text-gray-400">Select what to showcase on your card</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Select Primary Position</h4>
            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select Position" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="ST">Striker (ST)</SelectItem>
                <SelectItem value="CF">Center Forward (CF)</SelectItem>
                <SelectItem value="LW">Left Wing (LW)</SelectItem>
                <SelectItem value="RW">Right Wing (RW)</SelectItem>
                <SelectItem value="CAM">Attacking Midfielder (CAM)</SelectItem>
                <SelectItem value="CM">Central Midfielder (CM)</SelectItem>
                <SelectItem value="CDM">Defensive Midfielder (CDM)</SelectItem>
                <SelectItem value="LB">Left Back (LB)</SelectItem>
                <SelectItem value="CB">Center Back (CB)</SelectItem>
                <SelectItem value="RB">Right Back (RB)</SelectItem>
                <SelectItem value="GK">Goalkeeper (GK)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Key Stats Selection</h4>
              <span className="text-xs text-gray-400">3 of 4 selected</span>
            </div>
            
            <div className="space-y-2">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-700">
                  <span>{stat.name}</span>
                  <Button 
                    size="sm" 
                    variant={stat.highlight ? "default" : "outline"}
                    className={stat.highlight ? "h-7 gap-1" : "h-7"}
                  >
                    {stat.highlight && <Check className="h-3 w-3" />}
                    {stat.highlight ? "Selected" : "Select"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCardBuilder;
