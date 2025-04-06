
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Legal from "./pages/Legal";
import EdgeSignup from "./pages/EdgeSignup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Performance from "./pages/Performance";
import Training from "./pages/Training";
import Community from "./pages/Community";
import TalentDiscovery from "./pages/TalentDiscovery";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/edge-signup" element={<EdgeSignup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/training" element={<Training />} />
          <Route path="/community" element={<Community />} />
          <Route path="/talent-discovery" element={<TalentDiscovery />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
