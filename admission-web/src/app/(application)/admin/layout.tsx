'use client';
import useAuth from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { replace } = useRouter();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className='flex min-h-96 min-w-96 items-center justify-center'>
        <span>
          <Loader2 className='text-clay-700 animate-spin' size={80} />
        </span>
      </div>
    );
  }

  if (user.role !== 'ADMIN') {
    replace('/auth/sign-up');
  }

  return children;
};

export default AdminLayout;
