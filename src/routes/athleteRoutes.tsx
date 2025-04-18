
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
import AthleteLayout from '@/layouts/AthleteLayout';
import { Outlet } from 'react-router-dom';

const AthleteRoutes = () => (
  <Route 
    element={
      <RouteGuard requiredRole="athlete">
        <AthleteLayout>
          <Outlet />
        </AthleteLayout>
      </RouteGuard>
    }
  >
    <Route index element={<Navigate to="/athlete/dashboard" replace />} />
    <Route path="/athlete/dashboard" element={<AthleteDashboard />} />
    <Route path="/athlete/performance" element={<AthletePerformance />} />
    <Route path="/athlete/training-log" element={<AthleteTrainingLog />} />
    <Route path="/athlete/goals" element={<AthleteGoals />} />
    <Route path="/athlete/nutrition" element={<AthleteNutrition />} />
    <Route path="/athlete/community" element={<Community />} />
    <Route path="/athlete/settings" element={<AthleteSettings />} />
  </Route>
);

export default AthleteRoutes;
