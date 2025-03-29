
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

// Interface for waitlist registration data
interface WaitlistRegistration {
  email: string;
  role: string;
  feedback: string;
  timestamp: string;
  gdprConsent: boolean;
}

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<WaitlistRegistration[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(true);
  
  // Admin password - in production, use a proper authentication system
  const ADMIN_PASSWORD = 'athlex2024';

  useEffect(() => {
    if (isAuthenticated) {
      loadRegistrations();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsAuthDialogOpen(false);
      toast.success("Authentication successful");
      localStorage.setItem('adminAuthToken', btoa(Date.now().toString()));
    } else {
      toast.error("Invalid password");
    }
  };

  const loadRegistrations = () => {
    try {
      const storedRegistrations = localStorage.getItem('waitlistRegistrations');
      if (storedRegistrations) {
        const parsedRegistrations: WaitlistRegistration[] = JSON.parse(storedRegistrations);
        setRegistrations(parsedRegistrations);
      }
    } catch (error) {
      console.error('Error loading registrations:', error);
      toast.error("Failed to load registrations");
    }
  };

  const handleClearAllRegistrations = () => {
    if (window.confirm("Are you sure you want to delete all registrations? This action cannot be undone.")) {
      localStorage.removeItem('waitlistRegistrations');
      setRegistrations([]);
      toast.success("All registrations cleared");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Redirect if not authenticated
  if (!isAuthenticated && !isAuthDialogOpen) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-athlex-background text-white p-6">
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="bg-athlex-gray-800 text-white border-athlex-gray-700">
          <DialogHeader>
            <DialogTitle>Admin Authentication</DialogTitle>
            <DialogDescription className="text-white/70">
              Enter the admin password to access the dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-athlex-gray-900 border-athlex-gray-700"
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isAuthenticated && (
        <div>
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">ATHLEX Admin Dashboard</h1>
            <p className="text-white/70">View and manage waitlist registrations</p>
          </header>

          <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Waitlist Registrations</h2>
              <div className="space-x-2">
                <Button onClick={loadRegistrations} variant="outline">
                  Refresh
                </Button>
                <Button onClick={handleClearAllRegistrations} variant="destructive">
                  Clear All
                </Button>
              </div>
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-8 text-white/70">
                No registrations found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>GDPR Consent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{reg.email}</TableCell>
                        <TableCell>{reg.role}</TableCell>
                        <TableCell>{reg.feedback || "-"}</TableCell>
                        <TableCell>{new Date(reg.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{reg.gdprConsent ? "Yes" : "No"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            <div className="mt-4 text-sm text-white/50">
              Total registrations: {registrations.length}
            </div>
          </div>

          <Button onClick={() => {
            localStorage.removeItem('adminAuthToken');
            setIsAuthenticated(false);
            setIsAuthDialogOpen(true);
          }} variant="outline" className="mt-4">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
