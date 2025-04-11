
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import Index from "./pages/Index";
import AthleteDashboard from "./pages/AthleteDashboard";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Training";
import TrainingLog from "./pages/TrainingLog";
import Performance from "./pages/Performance";
import PerformanceGoals from "./pages/PerformanceGoals";
import Nutrition from "./pages/Nutrition";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import ScoutDashboard from "./pages/ScoutDashboard";
import AthleteDetailPage from "./pages/AthleteDetailPage";
import NotFound from "./pages/NotFound";

// Create basic placeholder pages for the missing routes
const SettingsPage = () => <Navigate to="/dashboard" replace />;
const CoachDashboardPage = () => (
  <div className="min-h-screen bg-athlex-background text-white flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">Coach Dashboard</h2>
      <p className="text-gray-400 mb-6">This page is under development.</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Check if Supabase is configured and show a warning if it's not
    if (!isSupabaseConfigured()) {
      toast.error(
        "Supabase configuration is missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.",
        {
          duration: 10000,
          id: "supabase-config-error",
        }
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <UserRoleProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-center" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Athlete Routes */}
                <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
                <Route path="/training" element={<Training />} />
                <Route path="/training-log" element={<TrainingLog />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/performance-goals" element={<PerformanceGoals />} />
                <Route path="/nutrition" element={<Nutrition />} />
                
                {/* Scout Routes */}
                <Route path="/scout-dashboard" element={<ScoutDashboard />} />
                <Route path="/athlete/:id" element={<AthleteDetailPage />} />
                
                {/* Coach Routes */}
                <Route path="/coach-dashboard" element={<CoachDashboardPage />} />
                
                {/* Shared Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/community" element={<Community />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<SettingsPage />} />
                
                {/* Default route - 404 not found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UserRoleProvider>
      </ProfileProvider>
    </QueryClientProvider>
  );
};

export default App;
