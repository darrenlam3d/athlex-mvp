
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const MvpScoutFilters = () => {
  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-athlex-accent" />
          Advanced Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Collapsible className="space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span>Performance Metrics</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-2 px-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">xG (Expected Goals)</span>
                <Badge variant="outline">0.3+</Badge>
              </div>
              <Slider defaultValue={[30]} max={100} step={10} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Pass Completion %</span>
                <Badge variant="outline">75%+</Badge>
              </div>
              <Slider defaultValue={[75]} max={100} step={5} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Tackles per 90</span>
                <Badge variant="outline">5+</Badge>
              </div>
              <Slider defaultValue={[50]} max={100} step={10} />
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible className="space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span>Player Profile</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2 px-1">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-700">Age: U21</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-700">Age: 21-25</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-700">Age: 26-30</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-700">Age: 30+</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-athlex-accent cursor-pointer">Midfielder</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-700">Forward</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-700">Defender</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-700">Goalkeeper</Badge>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Button className="w-full bg-athlex-accent hover:bg-athlex-accent/90">Apply Filters</Button>
      </CardContent>
    </Card>
  );
};

export default MvpScoutFilters;
