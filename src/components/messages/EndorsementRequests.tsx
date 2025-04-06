
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle, Send, Shield, Award } from 'lucide-react';

const EndorsementRequests = () => {
  const sentRequests = [
    {
      id: 1,
      recipient: {
        name: 'Coach Taylor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        initials: 'CT',
        position: 'Head Coach',
      },
      attributes: ['Leadership', 'Game Vision', 'Work Rate'],
      status: 'pending',
      timeAgo: '2 days ago',
      relation: 'Coach',
    },
    {
      id: 2,
      recipient: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        initials: 'SJ',
        position: 'Team Captain',
      },
      attributes: ['Teamwork', 'Communication', 'Tactical Awareness'],
      status: 'accepted',
      timeAgo: '1 week ago',
      completedAt: '2 days ago',
      relation: 'Teammate',
    },
  ];
  
  const receivedRequests = [
    {
      id: 1,
      sender: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
        initials: 'MC',
        position: 'Central Midfielder',
      },
      attributes: ['Passing', 'Ball Control', 'Vision'],
      timeAgo: '1 day ago',
      relation: 'Teammate',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Sent Requests */}
      <Card className="border-gray-700 bg-card">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-medium">Sent Requests</CardTitle>
            <Button size="sm">
              <Send className="mr-2 h-4 w-4" />
              Request New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {sentRequests.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-800 p-4 rounded-full inline-block mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Endorsement Requests Sent</h3>
              <p className="text-gray-400 mb-4">
                Request endorsements from coaches, teammates or mentors to boost your profile.
              </p>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Send New Request
              </Button>
            </div>
          ) : (
            sentRequests.map((request) => (
              <div key={request.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.recipient.avatar} alt={request.recipient.name} />
                      <AvatarFallback>{request.recipient.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{request.recipient.name}</h3>
                      <p className="text-xs text-gray-400">
                        {request.recipient.position} • {request.relation}
                      </p>
                    </div>
                  </div>
                  
                  {request.status === 'pending' ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Pending</span>
                    </Badge>
                  ) : request.status === 'accepted' ? (
                    <Badge className="bg-green-900/20 text-green-400 border border-green-600/30 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Completed</span>
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Expired</span>
                    </Badge>
                  )}
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-300 mb-2">Attributes requested:</p>
                  <div className="flex flex-wrap gap-2">
                    {request.attributes.map((attr, index) => (
                      <Badge key={index} variant="outline">{attr}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Sent {request.timeAgo}</span>
                  {request.status === 'accepted' && (
                    <span>Completed {request.completedAt}</span>
                  )}
                </div>
                
                {request.status === 'pending' && (
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm">
                      <Send className="mr-2 h-3 w-3" />
                      Send Reminder
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
      
      {/* Received Requests */}
      <Card className="border-gray-700 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-medium">Received Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {receivedRequests.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-800 p-4 rounded-full inline-block mb-4">
                <Shield className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Pending Requests</h3>
              <p className="text-gray-400">
                When teammates or other players request endorsements from you, they will appear here.
              </p>
            </div>
          ) : (
            receivedRequests.map((request) => (
              <div key={request.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.sender.avatar} alt={request.sender.name} />
                      <AvatarFallback>{request.sender.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{request.sender.name}</h3>
                      <p className="text-xs text-gray-400">
                        {request.sender.position} • {request.relation}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className="bg-blue-900/20 text-blue-400 border border-blue-600/30">
                    New Request
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-300 mb-2">Requesting endorsement for:</p>
                  <div className="flex flex-wrap gap-2">
                    {request.attributes.map((attr, index) => (
                      <Badge key={index} variant="outline">{attr}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 mb-3">
                  Received {request.timeAgo}
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm">Decline</Button>
                  <Button size="sm">
                    <Award className="mr-2 h-3 w-3" />
                    Endorse
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      
      {/* Endorsement Guidelines */}
      <Card className="lg:col-span-2 border-gray-700 bg-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-900/30 p-2 rounded-full">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">Endorsement Guidelines</h3>
              <p className="text-sm text-gray-400 mt-1">
                Endorsements add credibility to your profile when they come from verified coaches, teammates, and mentors. 
                Maintain integrity by only requesting endorsements for skills you genuinely possess.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndorsementRequests;
