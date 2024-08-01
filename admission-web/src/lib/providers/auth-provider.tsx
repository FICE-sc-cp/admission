'use client';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { authApi } from '@/app/api/auth/auth-api';

import { useRouter } from 'next/navigation';
import { Session, User } from '../types/auth.types';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    authApi
      .getMe()
      .then((res) => setUser(res.data))
      .catch(() => router.replace('/auth/sign-up'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
