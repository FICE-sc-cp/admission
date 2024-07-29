'use client';
import { EnterQueue } from './components/enter-queue/EnterQueue';
import { EnteredQueue } from './components/entered-queue/EnteredQueue';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { QueueUser } from '@/lib/schemas-and-types/queue';
import { instance } from '@/app/api/instance';
import { queueApi } from '@/app/api/queue/queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { isAxiosError } from 'axios';

export default function Page() {
  const [data, setData] = useState<QueueUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { toastError } = useCommonToast();

  const fetchQueueUser = async () => {
    if (user) {
      try {
        const { data } = await queueApi.getUser(user.id);
        setData(data);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) {
          setData(null);
        } else {
          toastError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchQueueUser();
  }, [user]);

  if (!user || (user && isLoading)) {
    return (
      <div className='flex min-h-96 min-w-96 items-center justify-center'>
        <span>
          <Loader2 className='text-clay-700 animate-spin' size={80} />
        </span>
      </div>
    );
  }

  return (
    <main className='my-[7%] flex flex-1 flex-col items-center gap-14'>
      {data ? (
        <EnteredQueue data={data} user={user} />
      ) : (
        <EnterQueue userId={user.id} setData={setData} />
      )}
    </main>
  );
}
