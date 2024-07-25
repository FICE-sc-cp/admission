import { FC } from 'react';
import { SideSection } from '@/app/auth/components/side-section';
import Image from 'next/image';
import { Toaster } from '@/components/ui/toast/toaster';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex h-full min-h-screen w-full flex-col items-center lg:flex-row lg:gap-5 lg:px-5 lg:py-5 xl:px-10 2xl:px-20'>
      <SideSection />
      <Image
        className='object-cove z-0 h-full w-full bg-cover lg:hidden'
        src='/images/photo-kpi-mobile.jpg'
        alt='img'
        width={360}
        height={210}
      />
      {children}
      <Toaster />
    </div>
  );
};

export default AuthLayout;
