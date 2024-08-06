import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QueueErorr } from '../../../types/QueueEntrant';
import { Input } from '@/components/ui/input';

interface Props {
  setIsUserAllowed: (isUserAllowed: boolean) => void;
  setSkipChecking: (skipChecking: boolean) => void;
}

export const AskUserForGeolocation: FC<Props> = ({
  setIsUserAllowed,
  setSkipChecking,
}) => {
  const [adminCode, setAdminCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setSkipChecking(adminCode === '714'), 300);

    return () => clearTimeout(timer);
  }, [adminCode]);

  return (
    <div className='flex w-full flex-col items-center gap-4 rounded-md border border-violet-300 bg-violet-50 px-6 py-5 shadow-md shadow-slate-600'>
      <h2 className='mb-2 text-center text-2xl font-semibold leading-6 text-black'>
        Дозволити використовувати вашу геопозицію?
      </h2>
      <p className='mb-4 text-center text-sm text-black'>
        Якщо ви хочете увійти до черги, вам необхідно бути не менше ніж за 2 км
        від точки реєстрації
      </p>
      <Image
        priority
        className='mb-4'
        src='/images/map.png'
        alt='map image'
        width={488}
        height={206}
      />
      <Button className='w-full' onClick={() => setIsUserAllowed(true)}>
        Дозволити
      </Button>
      <Link
        href={'/queue/error?type=' + QueueErorr.NO_PERMISSION}
        className='w-full'
      >
        <Button className='w-full' variant='outline'>
          Не дозволяти
        </Button>
      </Link>
      <Input
        placeholder='Введіть код, щоб пропустити перевірку геолокації'
        className='w-[320px] md:w-[360px]'
        value={adminCode}
        onChange={(e) => setAdminCode(e.target.value)}
      />
    </div>
  );
};
