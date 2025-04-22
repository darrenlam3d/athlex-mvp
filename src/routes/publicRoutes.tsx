
import React from 'react';
import { Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import PerformanceGoals from '@/pages/PerformanceGoals';
import AthleteDetailPage from '@/pages/AthleteDetailPage';
import MVP from '@/pages/MVP';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';

export const publicRoutes = [
  // Root route should always be first
  <Route key="index" path="/" element={<Index />} />,
  
  // Auth routes
  <Route key="login" path="/login" element={<Login />} />,
  
  // Dashboard routes
  <Route key="dashboard" path="/dashboard" element={<Dashboard />} />,
  <Route key="athlete-dashboard" path="/athlete-dashboard" element={<Dashboard />} />,
  <Route key="coach-dashboard" path="/coach-dashboard" element={<Dashboard />} />,
  <Route key="scout-dashboard" path="/scout-dashboard" element={<Dashboard />} />,
  
  // Feature routes
  <Route key="athlete-detail" path="/athlete/:id" element={<AthleteDetailPage />} />,
  <Route key="performance-goals" path="/athlete-performance-goals" element={<PerformanceGoals />} />,
  <Route key="profile" path="/profile" element={<Profile />} />,
  
  // MVP Demo route
  <Route key="mvp" path="/mvp" element={<MVP />} />,
  
  // Catch-all route should always be last
  <Route key="not-found" path="*" element={<NotFound />} />,
];
