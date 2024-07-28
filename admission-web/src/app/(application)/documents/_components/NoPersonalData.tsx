'use client';

import { FilePenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const NoPersonalData = () => {
  const { push } = useRouter();
  return (
    <div className='m-auto flex h-auto w-[320px] flex-col items-center justify-center gap-[16px] border-[1px] border-violet-300 bg-violet-50 px-[28px] py-[20px] md:w-fit'>
      <FilePenLine className='h-12 w-12' />
      <p className='max-w-[320px] text-center text-xl'>
        Заповніть особисті дані, щоб створити договір про навчання
      </p>
      <Button onClick={() => push('/personal-data')} size='default'>
        Заповнити особисті дані
      </Button>
    </div>
  );
};
