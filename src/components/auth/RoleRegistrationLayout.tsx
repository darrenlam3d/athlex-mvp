
import React, { ReactNode } from 'react';
import RoleProgress from './RoleProgress';

interface RoleRegistrationLayoutProps {
  children: ReactNode;
  step: 'account' | 'profile';
}

const RoleRegistrationLayout = ({ children, step }: RoleRegistrationLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-4xl">
        <RoleProgress step={step} />
        {children}
      </div>
    </div>
  );
};

export default RoleRegistrationLayout;
