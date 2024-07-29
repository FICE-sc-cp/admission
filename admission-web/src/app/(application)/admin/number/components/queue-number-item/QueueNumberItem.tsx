import { FC } from 'react';

interface QueueNumberItemProps {
  code: number;
}

export const QueueNumberItem: FC<QueueNumberItemProps> = ({ code }) => {
  return (
    <article className='flex aspect-square h-full max-h-80 w-full max-w-80 items-center justify-center rounded-[50px] bg-gradient-to-b from-[#8548EF] to-[#27114C] text-center text-7xl font-semibold leading-normal text-white sm:text-9xl lg:text-[130px]'>
      {code}
    </article>
  );
};
