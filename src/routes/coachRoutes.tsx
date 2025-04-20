
import React from 'react';
import { Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import CoachLayout from '@/layouts/CoachLayout';

const protectedCoachRoute = (path: string, Component: React.ComponentType) => (
  <Route 
    key={path} 
    path={path} 
    element={
      <RouteGuard requiredRole="coach">
        <CoachLayout>
          <Component />
        </CoachLayout>
      </RouteGuard>
    } 
  />
);

// Placeholder components for coach routes
const DashboardPage = () => <h1>Coach Dashboard</h1>;
const AthletesPage = () => <h1>My Athletes</h1>;
const AssignTrainingPage = () => <h1>Assign Training</h1>;
const NutritionLogsPage = () => <h1>Nutrition Logs</h1>;
const InsightsPage = () => <h1>Insights</h1>;
const MessagesPage = () => <h1>Messages</h1>;
const SettingsPage = () => <h1>Settings</h1>;

export const coachRoutes = [
  protectedCoachRoute('/coach/dashboard', DashboardPage),
  protectedCoachRoute('/coach/athletes', AthletesPage),
  protectedCoachRoute('/coach/assign', AssignTrainingPage),
  protectedCoachRoute('/coach/nutrition', NutritionLogsPage),
  protectedCoachRoute('/coach/insights', InsightsPage),
  protectedCoachRoute('/coach/messages', MessagesPage),
  protectedCoachRoute('/coach/settings', SettingsPage),
];
