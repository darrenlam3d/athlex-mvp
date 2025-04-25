
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import MVP from '@/pages/MVP';
import Login from '@/pages/Login';
import LoginDemo from '@/pages/LoginDemo';
import Profile from '@/pages/Profile';
import RouteGuard from '@/components/auth/RouteGuard';

// Import Athlete Pages
import AthleteIndex from '@/pages/athlete/AthleteIndex';
import AthleteDashboard from '@/pages/athlete/AthleteDashboard';
import AthleteGoals from '@/pages/athlete/AthleteGoals';
import AthleteTrainingLog from '@/pages/athlete/AthleteTrainingLog';
import AthleteProfile from '@/pages/athlete/AthleteProfile';
import AthleteTestResult from '@/pages/athlete/AthleteTestResult';
import AthleteWellness from '@/pages/athlete/AthleteWellness';
import AthleteMvpDashboard from '@/pages/AthleteMvpDashboard';

// Import Coach Pages
import CoachIndex from '@/pages/coach/CoachIndex';
import CoachDashboard from '@/pages/coach/CoachDashboard';
import CoachAthletes from '@/pages/coach/CoachAthletes';
import CoachTrainingPlans from '@/pages/coach/CoachTrainingPlans';
import CoachReports from '@/pages/coach/CoachReports';

// Import Scout Pages
import ScoutIndex from '@/pages/scout/ScoutIndex';
import ScoutDashboard from '@/pages/scout/ScoutDashboard';
import AthleteDetailPage from '@/pages/AthleteDetailPage';

export const publicRoutes = [
  // Root route uses Landing component
  <Route key="landing" path="/" element={<Landing />} />,
  
  // Authentication routes
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="login-demo" path="/login-demo" element={<LoginDemo />} />,
  
  // Dashboard route - redirects to role-specific dashboards
  <Route key="dashboard" path="/dashboard" element={<Dashboard />} />,
  
  // The old Index component is moved to /dashboard-index
  <Route key="dashboard-index" path="/dashboard-index" element={<Index />} />,
  
  // MVP Demo Routes
  <Route key="mvp" path="/mvp" element={<MVP />} />,
  <Route key="athlex-mvp" path="/athlex-mvp" element={<AthleteMvpDashboard />} />,
  
  // Profile route
  <Route key="profile" path="/profile" element={<Profile />} />,

  // ATHLETE ROUTES
  <Route key="athlete-index" path="/athlete" element={
    <RouteGuard requiredRole="athlete">
      <AthleteIndex />
    </RouteGuard>
  } />,
  
  <Route key="athlete-dashboard" path="/athlete/dashboard" element={
    <RouteGuard requiredRole="athlete">
      <AthleteDashboard />
    </RouteGuard>
  } />,
  
  <Route key="athlete-goals" path="/athlete/goals" element={
    <RouteGuard requiredRole="athlete">
      <AthleteGoals />
    </RouteGuard>
  } />,
  
  <Route key="athlete-training" path="/athlete/training" element={
    <RouteGuard requiredRole="athlete">
      <AthleteTrainingLog />
    </RouteGuard>
  } />,
  
  <Route key="athlete-wellness" path="/athlete/wellness" element={
    <RouteGuard requiredRole="athlete">
      <AthleteWellness />
    </RouteGuard>
  } />,
  
  <Route key="athlete-test" path="/athlete/test" element={
    <RouteGuard requiredRole="athlete">
      <AthleteTestResult />
    </RouteGuard>
  } />,
  
  <Route key="athlete-profile" path="/athlete/profile" element={
    <RouteGuard requiredRole="athlete">
      <AthleteProfile />
    </RouteGuard>
  } />,
  
  // COACH ROUTES
  <Route key="coach-index" path="/coach" element={
    <RouteGuard requiredRole="coach">
      <CoachIndex />
    </RouteGuard>
  } />,
  
  <Route key="coach-dashboard" path="/coach/dashboard" element={
    <RouteGuard requiredRole="coach">
      <CoachDashboard />
    </RouteGuard>
  } />,
  
  <Route key="coach-athletes" path="/coach/athletes" element={
    <RouteGuard requiredRole="coach">
      <CoachAthletes />
    </RouteGuard>
  } />,
  
  <Route key="coach-training" path="/coach/training" element={
    <RouteGuard requiredRole="coach">
      <CoachTrainingPlans />
    </RouteGuard>
  } />,
  
  <Route key="coach-reports" path="/coach/reports" element={
    <RouteGuard requiredRole="coach">
      <CoachReports />
    </RouteGuard>
  } />,
  
  // SCOUT ROUTES
  <Route key="scout-index" path="/scout" element={
    <RouteGuard requiredRole="scout">
      <ScoutIndex />
    </RouteGuard>
  } />,
  
  <Route key="scout-dashboard" path="/scout/dashboard" element={
    <RouteGuard requiredRole="scout">
      <ScoutDashboard />
    </RouteGuard>
  } />,
  
  // Shared routes
  <Route key="athlete-detail" path="/athlete/:id" element={<AthleteDetailPage />} />,
  
  // Legacy routes with redirects
  <Route key="legacy-athlete-dashboard" path="/athlete-dashboard" element={<Navigate to="/athlete/dashboard" replace />} />,
  <Route key="legacy-coach-dashboard" path="/coach-dashboard" element={<Navigate to="/coach/dashboard" replace />} />,
  <Route key="legacy-scout-dashboard" path="/scout-dashboard" element={<Navigate to="/scout/dashboard" replace />} />,
  <Route key="legacy-goals" path="/goals" element={<Navigate to="/athlete/goals" replace />} />,
  <Route key="legacy-log-training" path="/log-training" element={<Navigate to="/athlete/training" replace />} />,
  <Route key="legacy-log-wellness" path="/log-wellness" element={<Navigate to="/athlete/wellness" replace />} />,
  <Route key="legacy-log-test" path="/log-test-result" element={<Navigate to="/athlete/test" replace />} />,
  <Route key="legacy-performance-goals" path="/athlete-performance-goals" element={<Navigate to="/athlete/goals" replace />} />,
  
  // Catch-all route should always be last
  <Route key="not-found" path="*" element={<NotFound />} />,
];
