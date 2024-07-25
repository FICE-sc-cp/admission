'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QueueErrorMessages } from './constants/QueueErrorMessages';

export default function Error({
  error,
}: {
  error: Error & { message?: string };
}) {
  return (
    <section className='flex h-full items-center justify-center p-4'>
      <div className='flex w-full max-w-[460px] flex-col items-center gap-4 rounded-md border border-violet-300 bg-violet-50 p-5 px-6 py-5 shadow-md shadow-slate-600'>
        <h2 className='mb-2 text-center text-xl font-semibold leading-6 text-black md:text-2xl'>
          Помилка приєднання
        </h2>
        <p className='mb-4 text-center text-sm text-black md:mb-5'>
          {QueueErrorMessages[error.message] || QueueErrorMessages.generic}
        </p>
        <Link href='/queue'>
          <Button className='w-full'>Повторно приєднатися</Button>
        </Link>
      </div>
    </section>
  );
}
