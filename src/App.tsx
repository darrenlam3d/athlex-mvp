
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase";
import Index from "./pages/Index";
import AthleteDashboard from "./pages/AthleteDashboard";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Training";
import TrainingLog from "./pages/TrainingLog";

// Create basic placeholder pages for the missing routes
import { Navigate } from "react-router-dom";

// Placeholder components for pages that don't exist yet
const PerformancePage = () => <Navigate to="/athlete-dashboard" replace />;
const GoalsPage = () => <Navigate to="/athlete-dashboard" replace />;
const NutritionPage = () => <Navigate to="/athlete-dashboard" replace />;
const CommunityPage = () => <Navigate to="/athlete-dashboard" replace />;
const SettingsPage = () => <Navigate to="/athlete-dashboard" replace />;

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
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/training" element={<Training />} />
            <Route path="/training-log" element={<TrainingLog />} />
            
            {/* Add routes for the remaining navigation items */}
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/performance-goals" element={<GoalsPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* Default route */}
            <Route path="*" element={<Navigate to="/athlete-dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
