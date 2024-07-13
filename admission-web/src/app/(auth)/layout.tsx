'use client';
import { FC } from 'react';
import SideSection from '@/app/(auth)/components/side-section';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isConfirmPage = pathname.includes('/auth');
  const isValidPage = pathname !== '/main' || !isConfirmPage;
  return (
    <div
      className={`flex h-screen w-full flex-col justify-between lg:flex-row lg:gap-[20px] ${!isConfirmPage && 'lg:px-[20px] lg:py-[20px] xl:px-[40px] 2xl:px-[80px]'}`}
    >
      {!isConfirmPage && (
        <>
          <SideSection />
          <Image
            className='z-[-10] h-full max-h-[315px] w-full bg-[rgba(177,145,232,0.60)] bg-cover object-cover pt-[20px] lg:hidden'
            src='/images/photo-kpi-mobile.jpg'
            alt='img'
            width={360}
            height={210}
          />
          {isValidPage && (
            <Button
              className='absolute left-[20px] top-[20px] rounded-full p-[12px] lg:hidden'
              variant='outline'
            >
              <Link className='w-full' href='/main'>
                <ArrowLeft size={16} />
              </Link>
            </Button>
          )}
        </>
      )}
      {children}
    </div>
  );
};

export default AuthLayout;
