'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const DataAlreadyExist = () => {
  const { push } = useRouter();
  return (
    <div className='m-auto flex flex-col items-center gap-[16px]'>
      <img
        src='/giphy-frog.gif'
        alt='frogs'
        className='w-[286px] md:w-[382px]'
      />
      <div className='flex flex-col items-center gap-[12px]'>
        <p className='text-center text-xl'>Особисту інформацію вже заповнено</p>
        <p className='text-md text-center'>
          Заповнену інформацію ви можете переглянути в профілі свого акаунту{' '}
        </p>
      </div>
      <Button className='w-fit' onClick={() => push('/')}>
        До профілю
      </Button>
    </div>
  );
};

export default DataAlreadyExist;
