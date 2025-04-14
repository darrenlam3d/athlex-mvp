import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import { MockDataProvider } from "@/contexts/MockDataContext";
import RouteGuard from "@/components/auth/RouteGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import LoginDemo from "./pages/LoginDemo";
import AthleteDashboard from "./pages/AthleteDashboard";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Training";
import TrainingLog from "./pages/TrainingLog";
import Performance from "./pages/Performance";
import PerformanceGoals from "./pages/PerformanceGoals";
import Nutrition from "./pages/Nutrition";
import NutritionLog from "./pages/NutritionLog";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import ScoutDashboard from "./pages/ScoutDashboard";
import AthleteDetailPage from "./pages/AthleteDetailPage";
import ScoutNotes from "./pages/ScoutNotes";
import ScoutingReports from "./pages/ScoutingReports";
import CoachDashboard from "./pages/CoachDashboard";
import CoachAthletes from "./pages/CoachAthletes";
import CoachTrainingPlans from "./pages/CoachTrainingPlans";
import CoachNutritionLog from "./pages/CoachNutritionLog";
import CoachPerformance from "./pages/CoachPerformance";
import CoachReports from "./pages/CoachReports";
import AssignTraining from "./pages/AssignTraining";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [showSupabaseWarning, setShowSupabaseWarning] = useState(true);
  
  useEffect(() => {
    // Check if Supabase is configured and show a warning if it's not
    if (!isSupabaseConfigured() && showSupabaseWarning) {
      toast.custom(
        (id) => (
          <div className="bg-red-950 border border-red-700 rounded-lg px-6 py-4 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-medium">
                  Supabase configuration is missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.
                </p>
              </div>
              <button 
                onClick={() => {
                  toast.dismiss(id);
                  setShowSupabaseWarning(false);
                }}
                className="text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          id: "supabase-config-error",
        }
      );
    }
  }, [showSupabaseWarning]);

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <AuthProvider>
          <UserRoleProvider>
            <MockDataProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner position="top-center" />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-demo" element={<LoginDemo />} />
                    
                    {/* Athlete Routes */}
                    <Route path="/athlete-dashboard" element={
                      <RouteGuard requiredRole="athlete">
                        <AthleteDashboard />
                      </RouteGuard>
                    } />
                    <Route path="/training" element={
                      <RouteGuard requiredRole="athlete">
                        <Training />
                      </RouteGuard>
                    } />
                    <Route path="/training-log" element={
                      <RouteGuard requiredRole="athlete">
                        <TrainingLog />
                      </RouteGuard>
                    } />
                    <Route path="/performance" element={
                      <RouteGuard requiredRole="athlete">
                        <Performance />
                      </RouteGuard>
                    } />
                    <Route path="/performance-goals" element={
                      <RouteGuard requiredRole="athlete">
                        <PerformanceGoals />
                      </RouteGuard>
                    } />
                    <Route path="/nutrition" element={
                      <RouteGuard requiredRole="athlete">
                        <Nutrition />
                      </RouteGuard>
                    } />
                    
                    {/* Scout Routes */}
                    <Route path="/scout-dashboard" element={
                      <RouteGuard requiredRole="scout">
                        <ScoutDashboard />
                      </RouteGuard>
                    } />
                    <Route path="/athlete/:id" element={
                      <RouteGuard requiredRole="scout">
                        <AthleteDetailPage />
                      </RouteGuard>
                    } />
                    <Route path="/scout-reports" element={
                      <RouteGuard requiredRole="scout">
                        <ScoutingReports />
                      </RouteGuard>
                    } />
                    <Route path="/scouting-reports" element={
                      <RouteGuard requiredRole="scout">
                        <ScoutingReports />
                      </RouteGuard>
                    } />
                    <Route path="/scout-notes" element={
                      <RouteGuard requiredRole="scout">
                        <ScoutNotes />
                      </RouteGuard>
                    } />
                    
                    {/* Coach Routes */}
                    <Route path="/coach-dashboard" element={
                      <RouteGuard requiredRole="coach">
                        <CoachDashboard />
                      </RouteGuard>
                    } />
                    <Route path="/coach-athletes" element={
                      <RouteGuard requiredRole="coach">
                        <CoachAthletes />
                      </RouteGuard>
                    } />
                    <Route path="/coach-training-plans" element={
                      <RouteGuard requiredRole="coach">
                        <CoachTrainingPlans />
                      </RouteGuard>
                    } />
                    <Route path="/nutrition-log" element={
                      <RouteGuard requiredRole="coach">
                        <CoachNutritionLog />
                      </RouteGuard>
                    } />
                    <Route path="/coach-performance" element={
                      <RouteGuard requiredRole="coach">
                        <CoachPerformance />
                      </RouteGuard>
                    } />
                    <Route path="/coach-reports" element={
                      <RouteGuard requiredRole="coach">
                        <CoachReports />
                      </RouteGuard>
                    } />
                    <Route path="/assign-training" element={
                      <RouteGuard requiredRole="coach">
                        <AssignTraining />
                      </RouteGuard>
                    } />
                    
                    {/* Shared Routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Settings />} />
                    
                    {/* Default route - 404 not found */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </MockDataProvider>
          </UserRoleProvider>
        </AuthProvider>
      </ProfileProvider>
    </QueryClientProvider>
  );
};

export default App;
