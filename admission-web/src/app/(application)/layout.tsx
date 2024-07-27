'use client';

import { DesktopSidebarNavigation } from '@/app/(application)/_components/DesktopSidebarNavigation';
import MobileNavigationHeaderAndMenu from '@/app/(application)/_components/MobileNavigationHeaderAndMenu';
import { FC } from 'react';
import { Separator } from '@/components/ui/separator';
import AuthProvider from '@/providers/auth-provider';
import { AvatarAndName } from './_components/AvatarAndName';
import { Toaster } from '@/components/ui/toast/toaster';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <div className='sticky top-0 hidden h-screen border-r bg-muted/10 px-2 md:block'>
          <div className='flex h-full max-h-screen flex-col'>
            <div className='px-4 py-3'>
              <AvatarAndName size='default' />
            </div>

            <Separator />

            <div className='py-2'>
              <DesktopSidebarNavigation />
            </div>

            <Separator />
          </div>
        </div>

        <div className='relative flex flex-col'>
          <MobileNavigationHeaderAndMenu />
          {children}
          <Toaster />
        </div>
      </div>
    </AuthProvider>
  );
};

export default ApplicationLayout;
