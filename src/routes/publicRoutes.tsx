
import React from 'react';
import { Route, Navigate, useParams } from 'react-router-dom';
import AdminDashboard from '@/pages/AdminDashboard';
import Community from '@/pages/Community';
import Dashboard from '@/pages/Dashboard';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';
import Registration from '@/components/auth/Registration';

// Create a component for the edge-signup redirect
const EdgeSignupRedirect = () => {
  React.useEffect(() => {
    setTimeout(() => {
      const signupElement = document.getElementById('signup');
      if (signupElement) {
        signupElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  return <Navigate to="/#signup" replace />;
};

const RoleRegistrationPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 text-white px-4 py-8">
    <div className="w-full max-w-4xl">
      <Registration />
    </div>
  </div>
);

// Create a component to handle legacy athlete route redirects
const LegacyAthleteRouteRedirect = () => {
  const params = useParams<{ page: string }>();
  const newPath = `/athlete/${params.page}`;
  return <Navigate to={newPath} replace />;
};

export const publicRoutes = [
  <Route key="registration" path="/registration" element={<RoleRegistrationPage />} />,
  <Route key="admin" path="/admin" element={<AdminDashboard />} />,
  <Route key="community" path="/community" element={<Community />} />,
  <Route key="dashboard" path="/dashboard" element={<Dashboard />} />,
  <Route key="edge-signup" path="/edge-signup" element={<EdgeSignupRedirect />} />,
  <Route key="messages" path="/messages" element={<Messages />} />,
  <Route key="settings" path="/settings" element={<Settings />} />,
  <Route key="legacy-athlete" path="/athlete-:page" element={<LegacyAthleteRouteRedirect />} />,
];
