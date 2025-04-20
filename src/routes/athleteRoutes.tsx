
import React from 'react';
import { Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import AthleteLayout from '@/layouts/AthleteLayout';

const protectedAthleteRoute = (path: string, Component: React.ComponentType) => (
  <Route 
    key={path} 
    path={path} 
    element={
      <RouteGuard requiredRole="athlete">
        <AthleteLayout>
          <Component />
        </AthleteLayout>
      </RouteGuard>
    } 
  />
);

// Placeholder components for athlete routes
const DashboardPage = () => <h1>Athlete Dashboard</h1>;
const UploadPage = () => <h1>Upload Data</h1>;
const StatsPage = () => <h1>Stats</h1>;
const NutritionPage = () => <h1>Nutrition</h1>;
const CalendarPage = () => <h1>Calendar</h1>;
const RecommendationsPage = () => <h1>Recommendations</h1>;
const MessagesPage = () => <h1>Messages</h1>;
const SettingsPage = () => <h1>Settings</h1>;

export const athleteRoutes = [
  protectedAthleteRoute('/athlete/dashboard', DashboardPage),
  protectedAthleteRoute('/athlete/upload', UploadPage),
  protectedAthleteRoute('/athlete/stats', StatsPage),
  protectedAthleteRoute('/athlete/nutrition', NutritionPage),
  protectedAthleteRoute('/athlete/calendar', CalendarPage),
  protectedAthleteRoute('/athlete/recommendations', RecommendationsPage),
  protectedAthleteRoute('/athlete/messages', MessagesPage),
  protectedAthleteRoute('/athlete/settings', SettingsPage),
];
