'use client';
import AuthApi from '@/lib/api/auth-api';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TokenPageProps {
  params: {
    token: string;
  };
}

const TokenPage: FC<TokenPageProps> = ({ params: { token } }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();

  const verify = async () => {
    try {
      await AuthApi.verify(token);
      router.push('/');
    } catch (error) {
      setIsInvalid(true);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      {isInvalid && (
        <div
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.80)' }}
          className='flex max-w-[426px] flex-col items-center justify-center gap-[16px] rounded-[15px] px-[16px] py-[20px] text-center lg:px-[20px]'
        >
          <ClockIcon size={44} />
          <div>
            <h1 className='mb-[10px] text-[24px] font-semibold'>
              Посилання більше не активне
            </h1>
            <p className='text-[14px]'>
              Час для входу за одноразовим посиланням вичерпано. Для повторної
              відправки листа, натисни на кнопку.
            </p>
          </div>
          <div className='flex w-full flex-col'>
            <Button onClick={verify} className='mb-[6px] w-full'>
              Надіслати лист
            </Button>
            <Button className='w-full' variant='outline'>
              <Link className='w-full lg:hidden' href='/main'>
                Повернутися на головну
              </Link>
              <Link href='/sign-in' className='hidden lg:block'>
                Повернутися на сторінку входу
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenPage;
