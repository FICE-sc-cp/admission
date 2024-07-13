'use client';
import { useContext } from 'react';
import { AuthContext } from '@/hooks/auth-provider';
import { Session } from '@/hooks/types';

const useUser = () => {
  const { user, loading } = useContext(AuthContext) as Session;
  return { user, loading };
};

export default useUser;
