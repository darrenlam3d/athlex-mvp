import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Check, ChevronRight } from 'lucide-react';

const PublicEndorsements = () => {
  const endorsements = [
    {
      id: 1,
      attribute: 'Leadership',
      endorser: {
        name: 'Coach Taylor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        initials: 'CT',
        position: 'Head Coach',
        relation: 'Coach',
      },
      quote: "Alex has exceptional leadership qualities both on and off the field. He consistently motivates teammates and takes responsibility.",
      rating: 5,
      date: 'Nov 15, 2023',
      featured: true
    },
    {
      id: 2,
      attribute: 'Work Rate',
      endorser: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        initials: 'SJ',
        position: 'Team Captain',
        relation: 'Teammate',
      },
      quote: "Alex's work ethic is incredible. Always the first to arrive and last to leave practice, pushing everyone to their limits.",
      rating: 5,
      date: 'Jan 23, 2024',
      featured: true
    },
    {
      id: 3,
      attribute: 'Game Vision',
      endorser: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
        initials: 'MC',
        position: 'Central Midfielder',
        relation: 'Teammate',
      },
      quote: "Alex sees opportunities on the field that others don't. His passing and decision-making open up the game.",
      rating: 4,
      date: 'Feb 10, 2024',
      featured: true
    },
    {
      id: 4,
      attribute: 'Tactical Awareness',
      endorser: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6',
        initials: 'DP',
        position: 'Assistant Coach',
        relation: 'Coach',
      },
      quote: "Great understanding of positioning and team tactics. Adapts well to changing game situations.",
      rating: 4,
      date: 'Feb 28, 2024',
      featured: false
    },
    {
      id: 5,
      attribute: 'Teamwork',
      endorser: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453',
        initials: 'EW',
        position: 'Left Back',
        relation: 'Teammate',
      },
      quote: "Always supportive and communicative on the field. Makes everyone around him play better.",
      rating: 5,
      date: 'Mar 15, 2024',
      featured: false
    },
  ];
  
  // Separate featured and other endorsements
  const featuredEndorsements = endorsements.filter(e => e.featured);
  const otherEndorsements = endorsements.filter(e => !e.featured);

  return (
    <div className="space-y-6">
      {/* Featured Endorsements */}
      <Card className="border-gray-700 bg-card">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-medium">Featured Endorsements</CardTitle>
            <Badge className="bg-yellow-900/30 text-yellow-400 border border-yellow-600/30">
              Displayed on Profile
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {featuredEndorsements.map((endorsement) => (
            <div key={endorsement.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-900/20 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                  </div>
                  <h3 className="font-medium text-yellow-400">{endorsement.attribute}</h3>
                </div>
                
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < endorsement.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-gray-300 italic mb-4">
                "{endorsement.quote}"
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={endorsement.endorser.avatar} alt={endorsement.endorser.name} />
                    <AvatarFallback>{endorsement.endorser.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{endorsement.endorser.name}</p>
                    <p className="text-xs text-gray-400">{endorsement.endorser.relation}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{endorsement.date}</div>
              </div>
              
              <div className="mt-3 flex justify-end">
                <Button variant="outline" size="sm">
                  Remove from Featured
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Other Endorsements */}
      <Card className="border-gray-700 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-medium">Other Endorsements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {otherEndorsements.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400">No other endorsements available.</p>
            </div>
          ) : (
            otherEndorsements.map((endorsement) => (
              <div key={endorsement.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{endorsement.attribute}</h3>
                  </div>
                  
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < endorsement.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="text-gray-300 italic mb-4">
                  "{endorsement.quote}"
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={endorsement.endorser.avatar} alt={endorsement.endorser.name} />
                      <AvatarFallback>{endorsement.endorser.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{endorsement.endorser.name}</p>
                      <p className="text-xs text-gray-400">{endorsement.endorser.relation}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{endorsement.date}</div>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <Button size="sm">
                    <Trophy className="mr-2 h-4 w-4" />
                    Feature This
                  </Button>
                </div>
              </div>
            ))
          )}
          
          {otherEndorsements.length > 0 && (
            <Button variant="outline" className="w-full">
              View All Endorsements
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
      
      {/* Profile Impact */}
      <Card className="border-gray-700 bg-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-green-900/30 p-3 rounded-full">
              <Check className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-medium">Endorsement Impact</h3>
              <p className="text-sm text-gray-400 mt-1">
                Endorsements from verified coaches increase your profile visibility by up to 40%. Featured endorsements are visible to scouts viewing your profile.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicEndorsements;
