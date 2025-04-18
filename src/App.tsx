
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SupabaseConfigWarning from "@/components/auth/SupabaseConfigWarning";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import { MockDataProvider } from "@/contexts/MockDataContext";
import athleteRoutes from "@/routes/athleteRoutes";
import scoutRoutes from "@/routes/scoutRoutes";
import coachRoutes from "@/routes/coachRoutes";
import { publicRoutes } from "@/routes/publicRoutes";
import RouteTransitionHandler from "@/components/layout/RouteTransitionHandler";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import LoginDemo from "@/pages/LoginDemo";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";

const queryClient = new QueryClient();

const App = () => {
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
                  <SupabaseConfigWarning />
                  <Routes>
                    {/* Public routes that don't require authentication */}
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-demo" element={<LoginDemo />} />
                    <Route path="/registration" element={publicRoutes.find(route => route.props.path === "/registration")?.props.element} />
                    
                    {/* Dashboard is a special case since it redirects based on role */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* Protected routes that require authentication */}
                    <Route element={<RouteTransitionHandler />}>
                      {athleteRoutes()}
                      {scoutRoutes()}
                      {coachRoutes()}
                      {publicRoutes.filter(route => 
                        !['/registration', '/', '/login', '/login-demo'].includes(route.props.path)
                      )}
                    </Route>

                    {/* 404 route */}
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
