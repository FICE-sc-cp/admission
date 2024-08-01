'use client';
import React from 'react';
import { LogOut } from 'lucide-react';
import { authApi } from '@/app/api/auth/auth-api';
import { useRouter } from 'next/navigation';

export const LogoutNavMenuItem = () => {
  const { push } = useRouter();
  return (
    <div
      onClick={() => {
        authApi.logout();
        push('/auth/sign-in');
      }}
      className='flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent hover:text-accent-foreground'
    >
      <LogOut />
      <span>Вихід</span>
    </div>
  );
};
