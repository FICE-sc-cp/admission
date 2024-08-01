import { useContext } from 'react';
import { Session } from '../types/auth.types';
import { AuthContext } from '../providers/auth-provider';

const useAuth = (): Session => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth;
