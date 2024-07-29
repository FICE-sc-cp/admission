'use client';
import { queueApi } from '@/app/api/queue/queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { isAxiosError } from 'axios';
import { Expand, Loader2, Shrink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { QueueNumberItem } from './components/queue-number-item/QueueNumberItem';
import { PositionInQueue } from '@/lib/schemas-and-types/queue';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function AdminCurrentNumberPage() {
  const params = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<PositionInQueue[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(
    params.get('fullscreen') === 'enable'
  );

  const { toastError } = useCommonToast();

  const fetchQueueUser = async () => {
    try {
      const { data } = await queueApi.getUsers('WAITING', 5, 0);
      setData(data.positions);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        setData(null);
      } else {
        toastError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueUser();
  }, []);

  if (isLoading || !data) {
    return (
      <div className='flex min-h-96 min-w-96 items-center justify-center'>
        <span>
          <Loader2 className='text-clay-700 animate-spin' size={80} />
        </span>
      </div>
    );
  }

  const firstRow = data.slice(0, 3);
  const secondRow = data.slice(3);

  return (
    <div
      className={`flex flex-col overflow-y-auto p-5 md:max-h-none md:min-h-[120vh] md:gap-16 lg:p-8 ${isExpanded && 'md:absolute md:left-0 md:right-0 md:top-0 md:bg-white'}`}
    >
      <Button
        variant='outline'
        className='hidden self-end px-4 md:inline-flex'
        onClick={() => {
          const newFullscreenState = !isExpanded;
          setIsExpanded(newFullscreenState);

          if (newFullscreenState) {
            replace(`${pathname}?fullscreen=enable`, {
              scroll: false,
            });
          } else {
            replace(pathname, { scroll: false });
          }
        }}
      >
        {isExpanded ? (
          <>
            Повернутись
            <Shrink className='ml-2 inline-block' />
          </>
        ) : (
          <>
            На весь екран
            <Expand className='ml-2 inline-block' />
          </>
        )}
      </Button>
      <div className='my-5 flex max-h-[90vh] gap-5 md:flex-col md:justify-normal md:gap-10 lg:p-8'>
        <div className='flex flex-auto flex-col items-center justify-around gap-10 md:h-auto md:flex-none md:flex-row'>
          {firstRow.map((positionInQueue) => (
            <QueueNumberItem
              key={positionInQueue.id}
              code={positionInQueue.code}
            />
          ))}
        </div>
        <div className='my-[25%] flex flex-auto flex-col items-center justify-around gap-10 md:mx-[17.5%] md:my-0 md:h-auto md:flex-none md:flex-row'>
          {secondRow.map((positionInQueue) => (
            <QueueNumberItem
              key={positionInQueue.id}
              code={positionInQueue.code}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
