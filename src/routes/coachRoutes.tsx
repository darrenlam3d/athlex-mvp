
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import CoachDashboard from '@/pages/CoachDashboard';
import CoachAthletes from '@/pages/CoachAthletes';
import CoachTrainingPlans from '@/pages/CoachTrainingPlans';
import CoachNutrition from '@/pages/CoachNutritionLog';
import CoachPerformance from '@/pages/CoachPerformance';
import CoachReports from '@/pages/CoachReports';
import CoachSettings from '@/pages/CoachSettings';
import CoachLayout from '@/layouts/CoachLayout';
import { Outlet } from 'react-router-dom';

const CoachRoutes = () => (
  <Route 
    element={
      <RouteGuard requiredRole="coach">
        <CoachLayout>
          <Outlet />
        </CoachLayout>
      </RouteGuard>
    }
  >
    <Route path="/coach-dashboard" element={<CoachDashboard />} />
    <Route path="/coach-athletes" element={<CoachAthletes />} />
    <Route path="/coach-training-plans" element={<CoachTrainingPlans />} />
    <Route path="/coach-nutrition" element={<CoachNutrition />} />
    <Route path="/coach-performance" element={<CoachPerformance />} />
    <Route path="/coach-reports" element={<CoachReports />} />
    <Route path="/coach-settings" element={<CoachSettings />} />
    <Route path="/coach" element={<Navigate to="/coach-dashboard" replace />} />
  </Route>
);

export default CoachRoutes;
