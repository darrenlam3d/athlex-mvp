
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CoachLayout from '@/layouts/CoachLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ClipboardList, 
  FileText, 
  BarChart3, 
  PlusCircle, 
  CheckCircle, 
  XCircle,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - would be replaced with Supabase queries in a real implementation
const assignedAthletes = [
  {
    athlete_id: "athlete_001",
    name: "Arif Rahman",
    sport: "Football",
    position: "Striker",
    club: "Tampines Elite",
    last_session: "2025-04-10",
    speed_kmh: 25.4,
    endurance_score: 82,
    profile_photo: null
  },
  {
    athlete_id: "athlete_002",
    name: "Lena Koh",
    sport: "Football",
    position: "Midfielder",
    club: "Phoenix Academy",
    last_session: "2025-04-09",
    speed_kmh: 23.1,
    endurance_score: 88,
    profile_photo: null
  },
  {
    athlete_id: "athlete_003",
    name: "Marcus Ng",
    sport: "Football",
    position: "Goalkeeper",
    club: "Tampines Elite",
    last_session: "2025-04-08",
    speed_kmh: 19.8,
    endurance_score: 75,
    profile_photo: null
  }
];

const pendingRequests = [
  {
    athlete_id: "athlete_006",
    name: "Javier Chua",
    sport: "Football",
    position: "Right Back",
    school: "Lakeside Secondary",
    club: "Harbour FC",
    profile_photo: null
  },
  {
    athlete_id: "athlete_007",
    name: "Sophia Tan",
    sport: "Football",
    position: "Left Wing",
    school: "Eastwood High",
    club: "Phoenix Academy",
    profile_photo: null
  }
];

const upcomingSessions = [
  {
    id: 1,
    date: "2025-04-13",
    type: "Speed & Recovery",
    duration: 45,
    assigned_athletes: ["Arif Rahman", "Marcus Ng"]
  },
  {
    id: 2,
    date: "2025-04-14",
    type: "Tactical Drill",
    duration: 60,
    assigned_athletes: ["Lena Koh"]
  },
  {
    id: 3,
    date: "2025-04-16",
    type: "Strength & Conditioning",
    duration: 75,
    assigned_athletes: ["Arif Rahman", "Lena Koh", "Marcus Ng"]
  }
];

const CoachDashboard = () => {
  const [activeSport, setActiveSport] = useState<string>("all");
  const [activeAgeGroup, setActiveAgeGroup] = useState<string>("all");
  const [activeClub, setActiveClub] = useState<string>("all");
  
  // In a real implementation, these would be fetched from Supabase
  const coachName = "Sarah Lim";
  
  // Mock handler functions - would interact with Supabase in a real implementation
  const handleApproveRequest = (athleteId: string) => {
    console.log(`Approved athlete: ${athleteId}`);
    // In real implementation: Update coach_requests status in Supabase
  };
  
  const handleRejectRequest = (athleteId: string) => {
    console.log(`Rejected athlete: ${athleteId}`);
    // In real implementation: Update coach_requests status in Supabase
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <CoachLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Coach Dashboard</h1>
            <p className="text-athlex-gray-400">Welcome back, {coachName}</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <div className="flex items-center">
              <Select value={activeSport} onValueChange={setActiveSport}>
                <SelectTrigger className="w-[130px] bg-athlex-gray-800 border-athlex-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sport" />
                </SelectTrigger>
                <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="athletics">Athletics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center">
              <Select value={activeAgeGroup} onValueChange={setActiveAgeGroup}>
                <SelectTrigger className="w-[130px] bg-athlex-gray-800 border-athlex-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Age Group" />
                </SelectTrigger>
                <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="u16">Under 16</SelectItem>
                  <SelectItem value="u18">Under 18</SelectItem>
                  <SelectItem value="u23">Under 23</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center">
              <Select value={activeClub} onValueChange={setActiveClub}>
                <SelectTrigger className="w-[150px] bg-athlex-gray-800 border-athlex-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Club/School" />
                </SelectTrigger>
                <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700">
                  <SelectItem value="all">All Clubs</SelectItem>
                  <SelectItem value="tampines_elite">Tampines Elite</SelectItem>
                  <SelectItem value="phoenix_academy">Phoenix Academy</SelectItem>
                  <SelectItem value="harbour_fc">Harbour FC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mb-6">
          <Button className="bg-athlex-accent text-white hover:bg-athlex-accent/90" asChild>
            <Link to="/assign-training">
              <PlusCircle className="mr-2 h-4 w-4" />
              Assign New Training
            </Link>
          </Button>
          <Button variant="outline" className="border-athlex-gray-700">
            <FileText className="mr-2 h-4 w-4" />
            View Scout Notes
          </Button>
          <Button variant="outline" className="border-athlex-gray-700">
            <BarChart3 className="mr-2 h-4 w-4" />
            Team Analytics
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assigned Athletes Overview */}
          <div className="lg:col-span-2">
            <Card className="bg-athlex-gray-900 border-athlex-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Assigned Athletes</CardTitle>
                <Button variant="outline" size="sm" className="border-athlex-gray-700">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedAthletes.map((athlete) => (
                    <div 
                      key={athlete.athlete_id}
                      className="flex items-start justify-between bg-athlex-gray-800/50 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={athlete.profile_photo || ''} />
                          <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent">
                            {getInitials(athlete.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{athlete.name}</p>
                          <p className="text-sm text-athlex-gray-400">
                            {athlete.sport} • {athlete.position} • {athlete.club}
                          </p>
                          <div className="flex gap-4 mt-1">
                            <span className="text-xs bg-athlex-gray-700 px-2 py-0.5 rounded-full">
                              Speed: {athlete.speed_kmh} km/h
                            </span>
                            <span className="text-xs bg-athlex-gray-700 px-2 py-0.5 rounded-full">
                              Endurance: {athlete.endurance_score}/100
                            </span>
                            <span className="text-xs bg-athlex-gray-700 px-2 py-0.5 rounded-full">
                              Last: {athlete.last_session}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-athlex-accent border-athlex-accent" asChild>
                        <Link to={`/athlete/${athlete.athlete_id}`}>
                          View Athlete
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                  
                  {assignedAthletes.length === 0 && (
                    <div className="text-center py-10 text-athlex-gray-400">
                      <p>No assigned athletes yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Training Sessions */}
            <Card className="bg-athlex-gray-900 border-athlex-gray-800 mt-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Training Sessions</CardTitle>
                <Button variant="outline" size="sm" className="border-athlex-gray-700" asChild>
                  <Link to="/assign-training">
                    <Calendar className="mr-2 h-4 w-4" />
                    Manage Training
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div 
                      key={session.id}
                      className="flex items-center justify-between bg-athlex-gray-800/50 p-3 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="bg-athlex-accent/20 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-athlex-accent" />
                          </div>
                          <div>
                            <p className="font-medium">{session.type}</p>
                            <p className="text-sm text-athlex-gray-400">
                              {session.date} • {session.duration} minutes
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 ml-12">
                          <p className="text-xs text-athlex-gray-400">Athletes:</p>
                          <p className="text-sm">{session.assigned_athletes.join(", ")}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ClipboardList className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {upcomingSessions.length === 0 && (
                    <div className="text-center py-10 text-athlex-gray-400">
                      <p>No upcoming sessions.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Pending Athlete Approvals */}
          <div>
            <Card className="bg-athlex-gray-900 border-athlex-gray-800">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div 
                      key={request.athlete_id}
                      className="bg-athlex-gray-800/50 p-4 rounded-lg space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.profile_photo || ''} />
                          <AvatarFallback className="bg-athlex-accent/20 text-athlex-accent">
                            {getInitials(request.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.name}</p>
                          <p className="text-sm text-athlex-gray-400">
                            {request.sport} • {request.position}
                          </p>
                          <p className="text-xs text-athlex-gray-500">
                            {request.school} • {request.club}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 bg-green-900/20 text-green-400 border-green-800 hover:bg-green-900/30 hover:text-green-300"
                          onClick={() => handleApproveRequest(request.athlete_id)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 bg-red-900/20 text-red-400 border-red-800 hover:bg-red-900/30 hover:text-red-300"
                          onClick={() => handleRejectRequest(request.athlete_id)}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-athlex-gray-400 hover:text-white"
                        asChild
                      >
                        <Link to={`/athlete/${request.athlete_id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  ))}
                  
                  {pendingRequests.length === 0 && (
                    <div className="text-center py-10 text-athlex-gray-400">
                      <p>No pending approval requests.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CoachLayout>
  );
};

export default CoachDashboard;
