
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import Landing from "@/pages/Landing"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import ParentalConsentPending from "@/pages/auth/ParentalConsentPending"
import ParentalConsentVerify from "@/pages/auth/ParentalConsentVerify"
import Dashboard from "@/pages/Dashboard"
import AthleteDashboard from "@/pages/athlete/Dashboard"
import CoachDashboard from "@/pages/coach/Dashboard"
import ProtectedRoute from "@/components/ProtectedRoute"
import NavBar from "@/components/layout/Navbar"

const App = () => {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            
            {/* Authentication Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/parental-consent-pending" element={<ParentalConsentPending />} />
            <Route path="/auth/verify-consent/:token" element={<ParentalConsentVerify />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Role-Specific Dashboards */}
            <Route 
              path="/athlete/dashboard" 
              element={
                <ProtectedRoute>
                  <AthleteDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/coach/dashboard" 
              element={
                <ProtectedRoute>
                  <CoachDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;
