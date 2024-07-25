'use client';
import AuthApi from '@/lib/api/auth-api';
import { ClockIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';

interface TokenPageProps {
  params: {
    token: string;
  };
}

export default function TokenPage({ params: { token } }: TokenPageProps) {
  const [isInvalid, setIsInvalid] = useState(true);
  const [loading, setLoading] = useState(true);
  const { replace } = useRouter();
  const { toastError } = useCommonToast();

  const verify = async () => {
    try {
      await AuthApi.verify(token);
      setIsInvalid(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toastError(
          'Ви впевнені, що перейшли за правильним посиланням?',
          'Посилання не існує'
        );
      } else {
        toastError('Спробуйте, будь ласка, пізніше');
      }
      setIsInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  if (loading)
    return (
      <div className='flex min-h-96 min-w-96 items-center justify-center'>
        <span>
          <Loader2 className='text-clay-700 animate-spin' size={80} />
        </span>
      </div>
    );

  if (!isInvalid) return replace('/');

  return (
    <div className='flex max-w-[420px] flex-col items-center justify-center gap-4 rounded-3xl px-4 py-5 text-center lg:px-5'>
      <ClockIcon size={44} />
      <div>
        <h1 className='mb-2 text-2xl font-semibold'>
          Посилання більше не активне
        </h1>
        <p className='text-sm'>
          Час для входу за одноразовим посиланням вичерпано. Для повторної
          відправки листа перейдіть на сторінку входу.
        </p>
      </div>
      <div className='flex w-full flex-col'>
        <Button className='w-full' variant='outline'>
          <Link href='/auth/sign-in'>Повернутися на сторінку входу</Link>
        </Button>
      </div>
    </div>
  );
}
