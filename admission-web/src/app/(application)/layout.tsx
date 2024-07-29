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
        <div className='sticky top-0 hidden max-h-[97vh] md:block'>
          <div className='m-[10px] flex h-full flex-col rounded-md border border-[#CBD5E1] bg-muted/10 px-2 shadow-md shadow-[#00000040]'>
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

        <div>
          <MobileNavigationHeaderAndMenu />
          {children}
          <Toaster />
        </div>
      </div>
    </AuthProvider>
  );
};

export default ApplicationLayout;
