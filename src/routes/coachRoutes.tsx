
import React from 'react';
import { Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import CoachDashboard from '@/pages/CoachDashboard';
import CoachAthletes from '@/pages/CoachAthletes';
import CoachTrainingPlans from '@/pages/CoachTrainingPlans';
import CoachNutritionLog from '@/pages/CoachNutritionLog';
import CoachPerformance from '@/pages/CoachPerformance';
import CoachReports from '@/pages/CoachReports';
import AssignTraining from '@/pages/AssignTraining';

export const coachRoutes = [
  <Route key="coach-dashboard" path="/coach-dashboard" element={
    <RouteGuard requiredRole="coach">
      <CoachDashboard />
    </RouteGuard>
  } />,
  <Route key="coach-athletes" path="/coach-athletes" element={
    <RouteGuard requiredRole="coach">
      <CoachAthletes />
    </RouteGuard>
  } />,
  <Route key="coach-training-plans" path="/coach-training-plans" element={
    <RouteGuard requiredRole="coach">
      <CoachTrainingPlans />
    </RouteGuard>
  } />,
  <Route key="coach-nutrition" path="/nutrition-log" element={
    <RouteGuard requiredRole="coach">
      <CoachNutritionLog />
    </RouteGuard>
  } />,
  <Route key="coach-performance" path="/coach-performance" element={
    <RouteGuard requiredRole="coach">
      <CoachPerformance />
    </RouteGuard>
  } />,
  <Route key="coach-reports" path="/coach-reports" element={
    <RouteGuard requiredRole="coach">
      <CoachReports />
    </RouteGuard>
  } />,
  <Route key="assign-training" path="/assign-training" element={
    <RouteGuard requiredRole="coach">
      <AssignTraining />
    </RouteGuard>
  } />,
];
