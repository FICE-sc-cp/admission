'use client';
import { Separator } from '@/components/ui/separator';
import { DocumentsForm } from '@/components/pages/entrant/documents/components/DocumentsForm';
import useAuth from '@/lib/hooks/useAuth';
import { NoPersonalData } from '@/components/pages/entrant/documents/components/NoPersonalData';
import { useQuery } from '@tanstack/react-query';
import PersonalDataApi from '@/app/api/personal-data/personal-data';
import { LoadingPage } from '@/components/common/components/LoadingPage';

export default function Page() {
  const { user } = useAuth();

  if (!user) {
    return <LoadingPage />;
  }

  const { data: userData, isLoading } = useQuery({
    queryKey: ['personal-data', user.id],
    queryFn: () => PersonalDataApi.getPersonalData(user.id),
    select: (data) => data.data,
    throwOnError: true,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className='flex min-h-[90vh] flex-1 flex-col gap-2 p-4 lg:gap-3 lg:p-6'>
      {!userData?.entrantData ? (
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
