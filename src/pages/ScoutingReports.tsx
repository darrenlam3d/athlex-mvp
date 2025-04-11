
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar,
  Download,
  FileText, 
  Search,
  Share2,
  User,
  Filter
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScoutLayout from '@/layouts/ScoutLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useUserRole } from '@/contexts/UserRoleContext';
import { toast } from 'sonner';

// Mock data for scouting reports
const reports = [
  {
    report_id: "rep_001",
    athlete_id: "athlete_004",
    athlete_name: "Arif Rahman",
    profile_photo: null,
    sport: "Football",
    position: "Striker",
    club: "Tampines Elite",
    date_created: "2025-04-10",
    status: "Sent",
    download_link: "/reports/athlete_004_report.pdf"
  },
  {
    report_id: "rep_002",
    athlete_id: "athlete_005",
    athlete_name: "Lena Koh",
    profile_photo: null,
    sport: "Netball",
    position: "Wing Attack",
    club: "Civic Blaze",
    date_created: "2025-04-09",
    status: "Draft",
    download_link: "/reports/athlete_005_draft.pdf"
  },
  {
    report_id: "rep_003",
    athlete_id: "athlete_006",
    athlete_name: "Marcus Chen",
    profile_photo: null,
    sport: "Basketball",
    position: "Point Guard",
    club: "Skyline Ballers",
    date_created: "2025-04-07",
    status: "Downloaded",
    download_link: "/reports/athlete_006_report.pdf"
  },
  {
    report_id: "rep_004",
    athlete_id: "athlete_007",
    athlete_name: "Sarah Wong",
    profile_photo: null,
    sport: "Football",
    position: "Midfielder",
    club: "Northern Stars FC",
    date_created: "2025-04-05",
    status: "Sent",
    download_link: "/reports/athlete_007_report.pdf"
  },
  {
    report_id: "rep_005",
    athlete_id: "athlete_008",
    athlete_name: "Taufiq Ismail",
    profile_photo: null,
    sport: "Swimming",
    position: "Freestyle",
    club: "Aquatic Performance",
    date_created: "2025-04-03",
    status: "Draft",
    download_link: "/reports/athlete_008_draft.pdf"
  }
];

// Mock coaches for share modal
const coaches = [
  { id: "coach_001", name: "Michael Lee", team: "Tampines Elite" },
  { id: "coach_002", name: "Sarah Tan", team: "Northern Stars FC" },
  { id: "coach_003", name: "David Wong", team: "Skyline Ballers" },
  { id: "coach_004", name: "Li Wei", team: "Aquatic Performance" },
  { id: "coach_005", name: "Rebecca Chong", team: "Civic Blaze" }
];

const ScoutingReports = () => {
  const { userRole, setUserRole } = useUserRole();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState(reports);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedCoaches, setSelectedCoaches] = useState([]);
  const [coachSearchTerm, setCoachSearchTerm] = useState('');

  // Force user role to be scout for this page
  useEffect(() => {
    if (userRole !== 'scout') {
      setUserRole('scout');
    }
  }, [userRole, setUserRole]);

  // Filter reports based on search term and selected status
  useEffect(() => {
    let filtered = reports;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.athlete_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        report.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.club.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(report => report.status.toLowerCase() === selectedStatus.toLowerCase());
    }
    
    setFilteredReports(filtered);
  }, [searchTerm, selectedStatus]);

  // Handle download report
  const handleDownload = (report) => {
    // In a real app, this would download a file from Supabase storage
    toast.success(`Downloaded report for ${report.athlete_name}`, {
      description: `Report ${report.report_id} has been downloaded.`
    });
  };

  // Handle sharing report with coaches
  const handleShareReport = () => {
    if (selectedCoaches.length === 0) {
      toast.error("Please select at least one coach");
      return;
    }

    // In a real app, this would make a Supabase call to share the report
    toast.success(`Report shared with ${selectedCoaches.length} coaches`, {
      description: `The coaches will receive a notification.`
    });
    
    setSelectedCoaches([]);
    setSelectedReport(null);
  };

  // Handle toggling a coach selection
  const toggleCoachSelection = (coachId) => {
    if (selectedCoaches.includes(coachId)) {
      setSelectedCoaches(selectedCoaches.filter(id => id !== coachId));
    } else {
      setSelectedCoaches([...selectedCoaches, coachId]);
    }
  };

  // Filter coaches by search term
  const filteredCoaches = coaches.filter(coach =>
    coach.name.toLowerCase().includes(coachSearchTerm.toLowerCase()) ||
    coach.team.toLowerCase().includes(coachSearchTerm.toLowerCase())
  );

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return 'bg-blue-800/20 text-blue-400 border-blue-800/30';
      case 'downloaded':
        return 'bg-green-800/20 text-green-400 border-green-800/30';
      case 'draft':
        return 'bg-yellow-800/20 text-yellow-400 border-yellow-800/30';
      default:
        return 'bg-gray-800/20 text-gray-400 border-gray-800/30';
    }
  };

  return (
    <ScoutLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Reports</h1>
        
        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by athlete name, sport..."
              className="pl-9 bg-athlex-gray-800 border-athlex-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="bg-athlex-gray-800 border border-athlex-gray-700 rounded-md px-3 py-2 text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="sent">Sent</option>
              <option value="downloaded">Downloaded</option>
              <option value="draft">Draft</option>
            </select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span className="hidden md:inline">More Filters</span>
            </Button>
            
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>
        
        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <Card key={report.report_id} className="bg-athlex-gray-900 border-athlex-gray-800 hover:border-athlex-gray-700 transition-colors">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={report.profile_photo} />
                        <AvatarFallback>{report.athlete_name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{report.athlete_name}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 text-sm text-gray-400 mt-1">
                          <span>{report.sport}</span>
                          <span>•</span>
                          <span>{report.position}</span>
                          <span>•</span>
                          <span>{report.club}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className={getStatusBadgeColor(report.status)}>
                            {report.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>{report.date_created}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/athlete/${report.athlete_id}`)}
                        className="w-full sm:w-auto"
                      >
                        <User className="mr-2 h-4 w-4" />
                        View Athlete
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => handleDownload(report)}
                        className="w-full sm:w-auto"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedReport(report)}
                            className="w-full sm:w-auto"
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="bg-athlex-gray-900 border-athlex-gray-800">
                          <DialogHeader>
                            <DialogTitle>Share Report with Coaches</DialogTitle>
                          </DialogHeader>
                          
                          <div className="mt-4 space-y-4">
                            <Input
                              placeholder="Search coaches..."
                              className="bg-athlex-gray-800 border-athlex-gray-700"
                              value={coachSearchTerm}
                              onChange={(e) => setCoachSearchTerm(e.target.value)}
                            />
                            
                            <div className="max-h-60 overflow-y-auto border border-athlex-gray-800 rounded-md">
                              <Table>
                                <TableHeader>
                                  <TableRow className="border-athlex-gray-800">
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Team</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {filteredCoaches.map((coach) => (
                                    <TableRow 
                                      key={coach.id}
                                      className="border-athlex-gray-800 cursor-pointer hover:bg-athlex-gray-800"
                                      onClick={() => toggleCoachSelection(coach.id)}
                                    >
                                      <TableCell className="p-2">
                                        <input 
                                          type="checkbox"
                                          checked={selectedCoaches.includes(coach.id)}
                                          onChange={() => {}}
                                          className="rounded bg-athlex-gray-800 border-athlex-gray-700"
                                        />
                                      </TableCell>
                                      <TableCell>{coach.name}</TableCell>
                                      <TableCell>{coach.team}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                            
                            <div className="flex justify-end space-x-2 mt-4">
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button onClick={handleShareReport}>
                                Share with Selected ({selectedCoaches.length})
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-10 bg-athlex-gray-900 border border-athlex-gray-800 rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-gray-500 mb-3" />
              <h3 className="text-lg font-semibold">No reports found</h3>
              <p className="text-gray-400 mt-1">Adjust your filters or create a new report</p>
            </div>
          )}
        </div>
      </div>
    </ScoutLayout>
  );
};

export default ScoutingReports;
