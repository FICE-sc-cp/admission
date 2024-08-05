'use client';
import useAuth from '@/lib/hooks/useAuth';
import { queueApi } from '@/app/api/queue/queue-api';
import { EnterQueue } from '@/components/pages/entrant/queue/components/enter-queue/EnterQueue';
import { EnteredQueue } from '@/components/pages/entrant/queue/components/entered-queue/EnteredQueue';
import { LoadingPage } from '@/components/common/components/LoadingPage';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const { user } = useAuth();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['queue-user-by-id', user && user.id],
    queryFn: () => user && queueApi.getUser(user.id),
    select: (data) => data?.data,
    throwOnError: true,
    refetchInterval: 15000,
  });

  if (isLoading || !user) {
    return <LoadingPage />;
  }

  return (
    <main className='my-[7%] flex flex-1 flex-col items-center gap-14'>
      {userData ? (
        <EnteredQueue data={userData} user={user} />
      ) : (
        <EnterQueue userId={user.id} />
      )}
    </main>
  );
}
