import Link from 'next/link';
import DesktopSidebarNavigation from '@/app/(application)/_components/DesktopSidebarNavigation';
import MobileNavigationHeaderAndMenu from '@/app/(application)/_components/MobileNavigationHeaderAndMenu';
import { FC } from 'react';
import { Separator } from '@/components/ui/separator';
import AvatarAndName from './_components/AvatarAndName';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({ children }) => {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='sticky top-0 hidden h-screen border-r bg-muted/10 px-2 md:block'>
        <div className='flex h-full max-h-screen flex-col'>
          <div className='px-4 py-3'>
            <AvatarAndName name='Ярік Корнага' size='default' href='/' />
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
