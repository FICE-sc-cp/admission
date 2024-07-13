'use client';

import DesktopSidebarNavigation from '@/app/(application)/_components/DesktopSidebarNavigation';
import MobileNavigationHeaderAndMenu from '@/app/(application)/_components/MobileNavigationHeaderAndMenu';
import { FC, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import AvatarAndName from './_components/AvatarAndName';
import useUser from '@/hooks/useUser';
import AuthApi from '@/lib/api/auth-api';
import { useRouter } from 'next/navigation';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({ children }) => {
  const { user } = useUser();

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='sticky top-0 hidden h-screen border-r bg-muted/10 px-2 md:block'>
        <div className='flex h-full max-h-screen flex-col'>
          <div className='px-4 py-3'>
            <AvatarAndName
              name={`${user?.firstName} ${user?.lastName}`}
              size='default'
              href='/'
            />
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
      </div>
    </div>
  );
};

export default ApplicationLayout;
