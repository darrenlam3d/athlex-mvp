
import React from 'react';
import { Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import PerformanceGoals from '@/pages/PerformanceGoals';
import AthleteDetailPage from '@/pages/AthleteDetailPage';
import MVP from '@/pages/MVP';
import Login from '@/pages/Login';
import LoginDemo from '@/pages/LoginDemo';
import Profile from '@/pages/Profile';
import AthleteMvpDashboard from '@/pages/AthleteMvpDashboard';
import LogTrainingPage from '@/pages/LogTrainingPage';
import LogWellnessPage from '@/pages/LogWellnessPage';
import LogTestResultPage from '@/pages/LogTestResultPage';
import GoalsPage from '@/pages/GoalsPage';

export const publicRoutes = [
  // Root route should always be first
  <Route key="index" path="/" element={<Index />} />,
  
  // Auth routes
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="login-demo" path="/login-demo" element={<LoginDemo />} />,
  
  // Dashboard routes
  <Route key="dashboard" path="/dashboard" element={<Dashboard />} />,
  <Route key="athlete-dashboard" path="/athlete-dashboard" element={<Dashboard />} />,
  <Route key="coach-dashboard" path="/coach-dashboard" element={<Dashboard />} />,
  <Route key="scout-dashboard" path="/scout-dashboard" element={<Dashboard />} />,
  
  // Feature routes
  <Route key="athlete-detail" path="/athlete/:id" element={<AthleteDetailPage />} />,
  <Route key="performance-goals" path="/athlete-performance-goals" element={<PerformanceGoals />} />,
  <Route key="profile" path="/profile" element={<Profile />} />,
  
  // MVP Demo routes
  <Route key="mvp" path="/mvp" element={<MVP />} />,
  <Route key="athlete-mvp" path="/athlex-mvp" element={<AthleteMvpDashboard />} />,
  <Route key="log-training" path="/log-training" element={<LogTrainingPage />} />,
  <Route key="log-wellness" path="/log-wellness" element={<LogWellnessPage />} />,
  <Route key="log-test-result" path="/log-test-result" element={<LogTestResultPage />} />,
  <Route key="goals" path="/goals" element={<GoalsPage />} />,
  
  // Catch-all route should always be last
  <Route key="not-found" path="*" element={<NotFound />} />,
];
