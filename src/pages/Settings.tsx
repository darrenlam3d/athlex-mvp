
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  AlertTriangle,
  ArrowLeft,
  Download,
  Save
} from 'lucide-react';
import { useUserRole } from '@/contexts/UserRoleContext';
import BasicInfo from '@/components/settings/BasicInfo';
import FootballProfile from '@/components/settings/FootballProfile';
import NotificationPreferences from '@/components/settings/NotificationPreferences';
import PrivacyControls from '@/components/settings/PrivacyControls';
import ProgressSnapshot from '@/components/settings/ProgressSnapshot';

const Settings = () => {
  const navigate = useNavigate();
  const { userRole } = useUserRole();
  const [activeTab, setActiveTab] = useState('basic-info');
  
  // Go back function
  const handleGoBack = () => {
    if (userRole === 'athlete') {
      navigate('/athlete-dashboard');
    } else if (userRole === 'coach') {
      navigate('/coach-dashboard');
    } else if (userRole === 'scout') {
      navigate('/scout-dashboard');
    } else {
      navigate('/dashboard');
    }
  };
  
  // Handle account deletion
  const handleDeleteAccount = () => {
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone. Your account and all data will be permanently deleted.",
      action: (
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={() => {
              toast({
                title: "Account Deleted",
                description: "Your account has been successfully deleted",
              });
              navigate('/');
            }}
            size="sm"
          >
            Yes, Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.dismiss()}
            size="sm"
          >
            Cancel
          </Button>
        </div>
      ),
      duration: 10000,
    });
  };
  
  // Handle data export
  const handleExportData = () => {
    toast({
      title: "Preparing Your Data",
      description: "Your data export is being prepared and will download shortly.",
    });
    
    // Simulate data export - in a real app, this would call an API
    setTimeout(() => {
      const mockData = {
        profile: {
          name: "Jordan Lee",
          bio: "Midfielder with strong tactical awareness and stamina.",
          sport: "Football",
          position: "Central Midfielder",
          school: "Springfield High",
          club: "Eastside United"
        },
        notifications: {
          reminders: true,
          meal_prompts: false,
          message_alerts: true,
          show_availability: true
        },
        performances: [
          { date: "2023-04-01", rating: 8.5 },
          { date: "2023-04-08", rating: 7.8 },
          { date: "2023-04-15", rating: 9.2 }
        ]
      };
      
      // Create download link
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "athlex_user_data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      toast({
        title: "Data Export Complete",
        description: "Your data has been exported successfully.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleGoBack}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <h1 className="text-2xl md:text-3xl font-bold">Settings & Profile</h1>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main settings area - 2/3 width */}
                <div className="lg:col-span-2">
                  <Tabs 
                    defaultValue="basic-info" 
                    className="w-full"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-gray-800">
                      <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                      <TabsTrigger value="football-profile">Sports Profile</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic-info" className="space-y-6">
                      <BasicInfo />
                    </TabsContent>
                    
                    <TabsContent value="football-profile" className="space-y-6">
                      <FootballProfile />
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="space-y-6">
                      <NotificationPreferences />
                    </TabsContent>
                    
                    <TabsContent value="privacy" className="space-y-6">
                      <PrivacyControls />
                    </TabsContent>
                  </Tabs>
                  
                  {/* Danger Zone - At the bottom of the settings */}
                  {activeTab === 'privacy' && (
                    <Card className="mt-6 border-red-900/50 bg-red-950/20">
                      <CardContent className="pt-6 space-y-4">
                        <h3 className="text-lg font-medium flex items-center text-red-400">
                          <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                          Danger Zone
                        </h3>
                        
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
                          <div>
                            <h4 className="font-medium">Export Your Data</h4>
                            <p className="text-sm text-gray-400">Download all your personal data in JSON format</p>
                          </div>
                          <Button 
                            variant="outline" 
                            className="border-green-700 text-green-400 hover:bg-green-900/20"
                            onClick={handleExportData}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
                          </Button>
                        </div>
                        
                        <div className="border-t border-red-900/30 my-2 pt-4"></div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                          <div>
                            <h4 className="font-medium">Delete Account</h4>
                            <p className="text-sm text-gray-400">Permanently remove your account and all data</p>
                          </div>
                          <Button 
                            variant="destructive" 
                            onClick={handleDeleteAccount}
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Right sidebar - 1/3 width */}
                <div>
                  <ProgressSnapshot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Settings;
