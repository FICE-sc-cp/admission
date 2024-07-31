'use client';
import { queueApi } from '@/app/api/queue/queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { Expand, Shrink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { QueueNumberItem } from './components/queue-number-item/QueueNumberItem';
import { PositionInQueue } from '@/lib/schemas-and-types/queue';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Loader } from '@/app/(application)/_components/Loader';

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
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueUser();
    const intervalId = setInterval(fetchQueueUser, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (document && isExpanded) {
      const queueLink = document.getElementById('queue-link');
      if (queueLink) {
        queueLink.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [document, isExpanded, isLoading]);

  if (isLoading || !data) {
    return <Loader />;
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

      <div className='my-5 flex max-h-[90vh] gap-[10px] md:flex-col md:justify-normal md:gap-5 lg:p-8'>
        <div className='flex flex-auto flex-col items-center justify-around gap-10 md:h-auto md:flex-none md:flex-row'>
          {firstRow.map((positionInQueue) => (
            <QueueNumberItem
              key={positionInQueue.id}
              code={positionInQueue.code}
            />
          ))}
        </div>
        <span
          className='queue-link invisible mt-[-400px] block h-[400px]'
          id='queue-link'
        ></span>
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
