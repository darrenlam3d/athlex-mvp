
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import AthleteDashboard from '@/pages/AthleteDashboard';
import AthletePerformance from '@/pages/Performance';
import AthleteTrainingLog from '@/pages/TrainingLog';
import AthleteGoals from '@/pages/PerformanceGoals';
import AthleteNutrition from '@/pages/Nutrition';
import Community from '@/pages/Community';
import AthleteSettings from '@/pages/AthleteSettings';
import { Outlet } from 'react-router-dom';

const athleteRoutes = () => (
  <Route 
    path="/athlete"
    element={
      <RouteGuard requiredRole="athlete">
        <Outlet />
      </RouteGuard>
    }
  >
    <Route index element={<Navigate to="/athlete/dashboard" replace />} />
    <Route path="dashboard" element={<AthleteDashboard />} />
    <Route path="performance" element={<AthletePerformance />} />
    <Route path="training-log" element={<AthleteTrainingLog />} />
    <Route path="goals" element={<AthleteGoals />} />
    <Route path="nutrition" element={<AthleteNutrition />} />
    <Route path="community" element={<Community />} />
    <Route path="settings" element={<AthleteSettings />} />
  </Route>
);

export default athleteRoutes;
