'use client';

import { createContext, PropsWithChildren } from 'react';
import { authApi } from '@/app/api/auth/auth-api';

import { useRouter } from 'next/navigation';
import { Session } from '../types/auth.types';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['get-me'],
    queryFn: authApi.getMe,
    staleTime: Infinity,
    retry: false,
    select: (data) => data.data,
  });

  isError && useRouter().replace('/auth/sign-up');

  return (
    <AuthContext.Provider value={{ user: user || null, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
