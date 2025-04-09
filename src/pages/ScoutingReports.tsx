
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar,
  Download,
  Edit,
  Eye,
  FileText, 
  Search,
  Share2,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import PlayerReport from '@/components/scouting/PlayerReport';

// Mock data for scouting reports
const reports = [
  {
    id: 1,
    title: "James Rodríguez - Technical Analysis",
    player: "James Rodríguez",
    position: "Attacking Midfielder",
    club: "Central FC",
    date: "June 15, 2025",
    author: "Alex Thompson",
    rating: 8.7,
    tags: ["Technical Analysis", "Match Report"],
    status: "complete"
  },
  {
    id: 2,
    title: "Sara Martinez - Performance Evaluation",
    player: "Sara Martinez",
    position: "Forward",
    club: "East United",
    date: "June 10, 2025",
    author: "Michael Chen",
    rating: 8.2,
    tags: ["Performance Analysis", "Growth Potential"],
    status: "complete"
  },
  {
    id: 3,
    title: "David Chen - Defensive Capabilities",
    player: "David Chen",
    position: "Defender",
    club: "West Lions FC",
    date: "May 28, 2025",
    author: "Sophia Williams",
    rating: 7.9,
    tags: ["Defensive Analysis", "Physical Data"],
    status: "complete"
  },
  {
    id: 4,
    title: "Leila Johnson - Goalkeeper Assessment",
    player: "Leila Johnson",
    position: "Goalkeeper",
    club: "North Tigers",
    date: "May 22, 2025",
    author: "Marcus Rodriguez",
    rating: 8.5,
    tags: ["Goalkeeper Analysis", "Reaction Time"],
    status: "complete"
  },
  {
    id: 5,
    title: "Michael Kim - Youth Prospect",
    player: "Michael Kim",
    position: "Midfielder",
    club: "South Rovers Academy",
    date: "May 15, 2025",
    author: "Alex Thompson",
    rating: 7.6,
    tags: ["Youth Development", "Growth Potential"],
    status: "draft"
  }
];

const ScoutingReports = () => {
  const [activeReport, setActiveReport] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.club.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-2">Scouting Reports</h1>
              
              {activeReport === null ? (
                <>
                  {/* Search and filter bar */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search reports..."
                        className="pl-9 bg-gray-800 border-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      Create New Report
                    </Button>
                  </div>
                  
                  {/* Tabs for different sections */}
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="bg-gray-800 w-full sm:w-auto">
                      <TabsTrigger value="all">All Reports</TabsTrigger>
                      <TabsTrigger value="my-reports">My Reports</TabsTrigger>
                      <TabsTrigger value="shared">Shared with Me</TabsTrigger>
                      <TabsTrigger value="archived">Archived</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="mt-6 space-y-4">
                      {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                          <Card key={report.id} className="bg-card border-gray-700 hover:border-primary transition-all">
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                                <div className="flex items-start gap-4">
                                  <div className="hidden sm:block">
                                    <Avatar className="h-12 w-12">
                                      <AvatarFallback>{report.player.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-medium text-lg">{report.title}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 text-sm text-gray-400 mt-1">
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3" />
                                        <span>{report.rating.toFixed(1)}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{report.date}</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {report.tags.map((tag, idx) => (
                                        <span 
                                          key={idx}
                                          className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                      {report.status === "draft" && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-amber-900/30 text-amber-400">
                                          Draft
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4 md:mt-0">
                                  <Button 
                                    variant="outline" 
                                    className="w-full sm:w-auto" 
                                    onClick={() => setActiveReport(report.id)}
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Button>
                                  <div className="hidden sm:flex gap-2">
                                    <Button variant="ghost" size="icon">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center p-8 bg-gray-800 rounded-lg">
                          <FileText className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                          <h3 className="text-lg font-semibold">No reports found</h3>
                          <p className="text-gray-400 mt-1">Try adjusting your search or filters</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="my-reports">
                      <div className="p-8 text-center text-gray-400">
                        <p>Your authored reports will appear here.</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="shared">
                      <div className="p-8 text-center text-gray-400">
                        <p>Reports shared with you will appear here.</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="archived">
                      <div className="p-8 text-center text-gray-400">
                        <p>Archived reports will appear here.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="mb-4" 
                    onClick={() => setActiveReport(null)}
                  >
                    Back to Reports
                  </Button>
                  
                  {activeReport === 1 && <PlayerReport />}
                  
                  {activeReport !== 1 && (
                    <div className="text-center p-12 bg-gray-800 rounded-lg">
                      <FileText className="mx-auto h-16 w-16 text-gray-500 mb-3" />
                      <h3 className="text-lg font-semibold">Report under development</h3>
                      <p className="text-gray-400 mt-1">This player report is still being prepared</p>
                      <Button 
                        variant="outline" 
                        className="mt-4" 
                        onClick={() => setActiveReport(null)}
                      >
                        Return to Reports
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ScoutingReports;
