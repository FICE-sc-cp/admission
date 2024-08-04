'use client';
import { Button } from '@/components/ui/button';
import { ErrorMessages } from '@/lib/constants/errors';
import { isAxiosError } from 'axios';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { message?: string };
  reset: () => void;
}) {
  const { back } = useRouter();

  let message = 'Сталася невідома помилка.';

  if (isAxiosError(error)) {
    const statusCode = error.response?.status;
    if (statusCode && ErrorMessages[statusCode]) {
      message = ErrorMessages[statusCode];
    }
  }

  return (
    <section className='relative flex min-h-[90vh] items-center justify-center p-4'>
      <div className='absolute w-[580px]'>
        <Image
          src='/error-byaka.svg'
          alt='background image'
          width={580}
          height={450}
          priority
          className='bg-cover bg-no-repeat object-cover'
        />
      </div>
      <div className='relative z-10 flex w-full max-w-[420px] flex-col items-center justify-center rounded-md border border-[#CBD5E1] bg-[#F8FAFC] p-4 shadow-md shadow-slate-600'>
        <CircleX
          width={60}
          height={60}
          strokeWidth={1.5}
          className='mb-4 text-violet-700'
        />
        <h2 className='text-center text-2xl font-semibold md:text-3xl'>
          Упс.. Трапилася якась помилка!
        </h2>
        <p className='my-4 text-center'>{message}</p>
        <div className='flex gap-2'>
          <Button variant='outline' size='lg' onClick={() => back()}>
            Назад
          </Button>
          <Button size='lg' onClick={reset}>
            Спробувати знову
          </Button>
        </div>
      </div>
    </section>
  );
}
