'use client';
import { Loader } from '@/components/common/components/Loader';
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
    return <Loader />;
  }

  if (user.role !== 'ADMIN') {
    replace('/auth/sign-up');
  }

  return children;
};

export default AdminLayout;
