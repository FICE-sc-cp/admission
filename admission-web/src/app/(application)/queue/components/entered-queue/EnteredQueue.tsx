import { User } from '@/lib/types/auth.types';
import { QueueUser } from '@/lib/types/queue.types';
import { Circle } from 'lucide-react';
import { FC } from 'react';

interface EnteredQueueProps {
  user: User;
  data: QueueUser;
}

export const EnteredQueue: FC<EnteredQueueProps> = ({
  data: { position, id },
  user,
}) => {
  return (
    <div className='my-[7%] flex flex-1 flex-col items-center gap-14'>
      <div className='flex flex-col items-center justify-center gap-5 leading-6'>
        <h1 className='text-3xl font-medium'>Привіт {user.firstName}</h1>
        <p className='text-2xl'>Дякуємо за очікування!</p>
        <div className='flex gap-3'>
          <Circle
            width='10px'
            height='10px'
            className='text-violet-400'
            fill='#a78bfa'
          />
          <Circle
            width='10px'
            height='10px'
            className='text-violet-400'
            fill='#a78bfa'
          />
          <Circle
            width='10px'
            height='10px'
            className='text-violet-400'
            fill='#a78bfa'
          />
        </div>
        <p className='text-xl'>Ось твої дані для черги:</p>
      </div>

      <div className='flex items-center justify-center gap-4 px-4'>
        <div className='flex flex-col items-center gap-4 rounded-2xl bg-violet-600 px-4 py-12 shadow-md shadow-neutral-600 sm:gap-7 sm:p-16'>
          <h2 className='text-base font-medium text-white md:text-xl xl:text-2xl'>
            Поточний номер
          </h2>
          <span className='text-6xl font-semibold text-white'>{position}</span>
        </div>
        <div className='flex h-fit flex-col items-center gap-4 rounded-2xl bg-gray-100 px-6 py-8 shadow-md shadow-neutral-400 sm:gap-7 sm:px-14 sm:py-8'>
          <h2 className='text-base font-semibold text-violet-800 md:text-xl xl:text-2xl'>
            ID
          </h2>
          <span className='text-5xl font-semibold text-violet-800'>{id}</span>
        </div>
      </div>
    </div>
  );
};
