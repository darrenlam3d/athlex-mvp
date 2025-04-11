
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
import Login from "./pages/Login";
import Home from "./pages/Home";
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
const SettingsPage = () => <Navigate to="/athlete-dashboard" replace />;
const CoachDashboardPage = () => <Navigate to="/athlete-dashboard" replace />;

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
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/training" element={<Training />} />
                <Route path="/training-log" element={<TrainingLog />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/performance-goals" element={<PerformanceGoals />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/community" element={<Community />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/scout-dashboard" element={<ScoutDashboard />} />
                <Route path="/coach-dashboard" element={<CoachDashboardPage />} />
                <Route path="/athlete/:id" element={<AthleteDetailPage />} />
                
                {/* Add route for settings */}
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
