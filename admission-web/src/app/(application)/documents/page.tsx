'use client';
import { Separator } from '@/components/ui/separator';
import { DocumentsForm } from '@/app/(application)/documents/_components/DocumentsForm';
import PersonalData from '@/app/api/personal-data/personal-data';
import useAuth from '@/lib/hooks/useAuth';
import { NoPersonalData } from '@/app/(application)/documents/_components/NoPersonalData';
import { useEffect, useState } from 'react';
import { GetPersonalData } from '@/app/api/personal-data/personal-data-type';

export default function Page() {
  const { user } = useAuth();
  const [personalData, setPersonalData] = useState<GetPersonalData | null>(
    null
  );

  async function fetchPersonalData() {
    const data = await PersonalData.getPersonalData(user?.id as string);
    setPersonalData(data.data);
  }

  useEffect(() => {
    if (user?.id) {
      fetchPersonalData();
    }
  }, [user?.id]);
  return (
    <main className='flex flex-1 flex-col gap-2 p-4 lg:gap-3 lg:p-6'>
      {!personalData?.entrantData ? (
        <NoPersonalData />
      ) : (
        <>
          <p className='text-xl font-medium md:text-2xl md:font-semibold'>
            Створення договору про навчання
          </p>
          <Separator
            orientation='horizontal'
            className='w-full bg-violet-600'
          />
          <DocumentsForm />
        </>
      )}
    </main>
  );
}
