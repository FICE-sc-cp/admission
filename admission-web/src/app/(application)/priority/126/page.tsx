import React from 'react';
import SelectForm from '@/app/(application)/priority/_components/SelectForm';
import { ISTeduPrograms } from '@/constants/priority-select-values';
import { Separator } from '@/components/ui/separator';

const PriorityPage126 = () => {
  return (
    <main className='flex flex-1 flex-col items-center gap-4 p-4 md:items-start lg:gap-6 lg:p-6'>
      <section className='flex flex-col gap-[10px]'>
        <p className='mt-[24px] text-xl font-medium md:mt-0 md:text-2xl'>
          126 Інформаційні системи та технології
        </p>

        <p className='md:text-md text-center text-sm md:text-start'>
          Доступні приорітети для обраної спеціальності
        </p>
        <Separator
          orientation='horizontal'
          className='m-auto w-[320px] bg-violet-500 md:m-0 md:w-[386px]'
        />
      </section>
      <SelectForm educationalPrograms={ISTeduPrograms} />
    </main>
  );
};

export default PriorityPage126;
