'use client';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { User } from '@/schemas-and-types/auth';
import AuthApi from '@/lib/api/auth-api';
import { Session } from '@/hooks/types';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    AuthApi.getMe()
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
