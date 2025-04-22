
import React from 'react';
import { Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

export const publicRoutes = [
  // Root route should always be first
  <Route key="index" path="/" element={<Index />} />,
  
  // Catch-all route should always be last
  <Route key="not-found" path="*" element={<NotFound />} />,
];
