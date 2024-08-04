'use client';
import { authApi } from '@/app/api/auth/auth-api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { replace } = useRouter();
  const { data: user } = useQuery({
    queryKey: ['get-me'],
    queryFn: authApi.getMe,
    select: (data) => data.data,
    staleTime: Infinity,
    retry: false,
  });

  if (user && user.role !== 'ADMIN') {
    replace('/auth/sign-up');
  }

  return children;
};

export default AdminLayout;
