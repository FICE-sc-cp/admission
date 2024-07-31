'use client';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Loader } from '@/app/(application)/_components/Loader';

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
