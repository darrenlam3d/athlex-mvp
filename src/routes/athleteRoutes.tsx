
import React from 'react';
import { Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import AthleteDashboard from '@/pages/AthleteDashboard';
import Training from '@/pages/Training';
import TrainingLog from '@/pages/TrainingLog';
import Performance from '@/pages/Performance';
import PerformanceGoals from '@/pages/PerformanceGoals';
import Nutrition from '@/pages/Nutrition';

export const athleteRoutes = [
  <Route key="athlete-dashboard" path="/athlete-dashboard" element={
    <RouteGuard requiredRole="athlete">
      <AthleteDashboard />
    </RouteGuard>
  } />,
  <Route key="training" path="/training" element={
    <RouteGuard requiredRole="athlete">
      <Training />
    </RouteGuard>
  } />,
  <Route key="training-log" path="/training-log" element={
    <RouteGuard requiredRole="athlete">
      <TrainingLog />
    </RouteGuard>
  } />,
  <Route key="performance" path="/performance" element={
    <RouteGuard requiredRole="athlete">
      <Performance />
    </RouteGuard>
  } />,
  <Route key="performance-goals" path="/performance-goals" element={
    <RouteGuard requiredRole="athlete">
      <PerformanceGoals />
    </RouteGuard>
  } />,
  <Route key="nutrition" path="/nutrition" element={
    <RouteGuard requiredRole="athlete">
      <Nutrition />
    </RouteGuard>
  } />,
];
