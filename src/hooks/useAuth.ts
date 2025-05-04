
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Hook for using the auth context
export const useAuth = () => useContext(AuthContext);
