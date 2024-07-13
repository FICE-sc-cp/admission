import React from 'react';
import { IPeduPrograms } from '@/constants/priority-select-values';
import { Separator } from '@/components/ui/separator';

const PriorityPage126 = () => {
  return (
    <main className='flex flex-1 flex-col items-center gap-4 p-4 md:items-start lg:gap-6 lg:p-6'>
      <section className='flex flex-col gap-[10px]'>
        <p className='mt-[24px] text-xl font-medium md:mt-0 md:text-2xl'>
          123 Комп’ютерна інженерія
        </p>
        <Separator
          orientation='horizontal'
          className='m-auto w-[320px] bg-violet-500 md:m-0 md:w-[386px]'
        />
        <p className='text-md md:text-xl'>
          Для обраної спеціальності відсутні пріоритети
        </p>
      </section>
    </main>
  );
};

export default PriorityPage126;
