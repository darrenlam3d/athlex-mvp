
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '@/pages/Landing';

export const publicRoutes = [
  <Route key="landing" path="/" element={<Landing />} />,
];
