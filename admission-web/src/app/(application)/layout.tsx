import Link from 'next/link';
import { Package2 } from 'lucide-react';
import DesktopSidebarNavigation from '@/app/components/DesktopSidebarNavigation';
import Header from '@/app/components/Header';
import { FC } from 'react';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({ children }) => {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link
              href='/'
              className='flex items-center gap-2 font-semibold'
            >
              <Package2 className='h-6 w-6' />
              <span className=''>Admission</span>
            </Link>
          </div>
          <div className='flex-1'>
            <DesktopSidebarNavigation />
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default ApplicationLayout;
