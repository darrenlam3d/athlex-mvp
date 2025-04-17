
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminDashboard from '@/pages/AdminDashboard';
import Community from '@/pages/Community';
import Dashboard from '@/pages/Dashboard';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import LoginDemo from '@/pages/LoginDemo';
import Messages from '@/pages/Messages';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';

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

export const publicRoutes = [
  // Root route should always be first
  <Route key="index" path="/" element={<Index />} />,
  
  // Alphabetical order for all other routes
  <Route key="admin" path="/admin" element={<AdminDashboard />} />,
  <Route key="community" path="/community" element={<Community />} />,
  <Route key="dashboard" path="/dashboard" element={<Dashboard />} />,
  <Route key="edge-signup" path="/edge-signup" element={<EdgeSignupRedirect />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="login-demo" path="/login-demo" element={<LoginDemo />} />,
  <Route key="messages" path="/messages" element={<Messages />} />,
  <Route key="settings" path="/settings" element={<Settings />} />,
  
  // Catch-all route should always be last
  <Route key="not-found" path="*" element={<NotFound />} />,
];
