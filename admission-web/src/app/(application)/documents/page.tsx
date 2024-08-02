'use client';
import { Separator } from '@/components/ui/separator';
import { DocumentsForm } from '@/components/pages/entrant/documents/components/DocumentsForm';
import PersonalData from '@/app/api/personal-data/personal-data';
import useAuth from '@/lib/hooks/useAuth';
import { NoPersonalData } from '@/components/pages/entrant/documents/components/NoPersonalData';
import { useEffect, useState } from 'react';
import { GetPersonalData } from '@/app/api/personal-data/personal-data-type';
import { Loader } from '@/components/common/components/Loader';
import { useToast } from '@/components/ui/toast/use-toast';

export default function Page() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [personalData, setPersonalData] = useState<GetPersonalData | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(true);

  async function fetchPersonalData() {
    try {
      if (user?.id) {
        const data = await PersonalData.getPersonalData(user.id);
        setPersonalData(data.data);
      }
    } catch {
      toast({
        title: 'Щось пішло не так!',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchPersonalData();
    }
  }, [user?.id]);

  if (loading) return <Loader />;

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
