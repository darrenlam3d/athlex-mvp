
import React from 'react';
import { Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import ScoutDashboard from '@/pages/ScoutDashboard';
import ScoutReports from '@/pages/ScoutReports';
import ScoutNotes from '@/pages/ScoutNotes';

export const scoutRoutes = [
  <Route key="scout-dashboard" path="/scout-dashboard" element={
    <RouteGuard requiredRole="scout">
      <ScoutDashboard />
    </RouteGuard>
  } />,
  <Route key="scout-reports" path="/scout-reports" element={
    <RouteGuard requiredRole="scout">
      <ScoutReports />
    </RouteGuard>
  } />,
  <Route key="scout-notes" path="/scout-notes" element={
    <RouteGuard requiredRole="scout">
      <ScoutNotes />
    </RouteGuard>
  } />,
];
