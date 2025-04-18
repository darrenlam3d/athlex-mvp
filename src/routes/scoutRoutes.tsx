
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import ScoutDashboard from '@/pages/ScoutDashboard';
import ScoutReports from '@/pages/ScoutReports';
import ScoutNotes from '@/pages/ScoutNotes';
import ScoutCommunity from '@/pages/Community';
import ScoutSettings from '@/pages/ScoutSettings';
import ScoutLayout from '@/layouts/ScoutLayout';
import { Outlet } from 'react-router-dom';

const ScoutRoutes = () => (
  <Route 
    element={
      <RouteGuard requiredRole="scout">
        <ScoutLayout>
          <Outlet />
        </ScoutLayout>
      </RouteGuard>
    }
  >
    <Route path="/scout-dashboard" element={<ScoutDashboard />} />
    <Route path="/scout-reports" element={<ScoutReports />} />
    <Route path="/scout-notes" element={<ScoutNotes />} />
    <Route path="/scout-community" element={<ScoutCommunity />} />
    <Route path="/scout-settings" element={<ScoutSettings />} />
    <Route path="/scout" element={<Navigate to="/scout-dashboard" replace />} />
  </Route>
);

export default ScoutRoutes;
