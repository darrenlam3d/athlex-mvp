
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes } from "react-router-dom";
import SupabaseConfigWarning from "@/components/auth/SupabaseConfigWarning";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import { MockDataProvider } from "@/contexts/MockDataContext";
import athleteRoutes from "@/routes/athleteRoutes";
import scoutRoutes from "@/routes/scoutRoutes";
import coachRoutes from "@/routes/coachRoutes";
import { publicRoutes } from "@/routes/publicRoutes";

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
                    {publicRoutes}
                    {athleteRoutes()}
                    {scoutRoutes()}
                    {coachRoutes()}
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
