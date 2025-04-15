
import React from 'react';
import { Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import LoginDemo from '@/pages/LoginDemo';
import AdminDashboard from '@/pages/AdminDashboard';
import Dashboard from '@/pages/Dashboard';
import Community from '@/pages/Community';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

export const publicRoutes = [
  <Route key="index" path="/" element={<Index />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="login-demo" path="/login-demo" element={<LoginDemo />} />,
  <Route key="admin" path="/admin" element={<AdminDashboard />} />,
  <Route key="dashboard" path="/dashboard" element={<Dashboard />} />,
  <Route key="community" path="/community" element={<Community />} />,
  <Route key="messages" path="/messages" element={<Messages />} />,
  <Route key="settings" path="/settings" element={<Settings />} />,
  <Route key="not-found" path="*" element={<NotFound />} />,
];
