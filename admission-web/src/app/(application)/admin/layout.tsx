'use client';
import { LoadingPage } from '@/components/common/components/LoadingPage';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { replace } = useRouter();
  const { user } = useAuth();

  if (!user) {
    return <LoadingPage />;
  }

  if (user.role !== 'ADMIN') {
    replace('/auth/sign-up');
  }

  return children;
};

export default AdminLayout;
