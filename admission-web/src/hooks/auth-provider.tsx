'use client';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { User } from '@/schemas-and-types/auth';
import AuthApi from '@/lib/api/auth-api';
import { Session } from '@/hooks/types';
import { redirect, useRouter } from 'next/navigation';
import { router } from 'next/client';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   AuthApi.getMe()
  //     .then((res) => res.data)
  //     .then(setUser)
  //     .catch((_) => push('/sign-in'))
  //     .finally(() => setLoading(false));
  // }, [push]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
