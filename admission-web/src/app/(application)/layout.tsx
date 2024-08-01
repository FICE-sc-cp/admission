'use client';

import { DesktopSidebarNavigation } from '@/app/(application)/_components/DesktopSidebarNavigation';
import MobileNavigationHeaderAndMenu from '@/app/(application)/_components/MobileNavigationHeaderAndMenu';
import { FC } from 'react';
import AuthProvider from '@/lib/providers/auth-provider';
import { Toaster } from '@/components/ui/toast/toaster';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div className='min-h-screen w-full md:flex'>
        <DesktopSidebarNavigation />

        <MobileNavigationHeaderAndMenu />

        <div className='h-full min-h-screen w-full overflow-x-auto p-2'>
          {children}
          <Toaster />
        </div>
      </div>
    </AuthProvider>
  );
};

export default ApplicationLayout;
