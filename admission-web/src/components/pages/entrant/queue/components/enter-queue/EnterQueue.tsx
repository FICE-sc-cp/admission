'use client';
import { FC, useEffect, useState } from 'react';
import { EnterQueueForm } from './form/EnterQueueForm';
import { CheckGeolocation } from './check-geolocation/CheckGeolocation';
import { AskUserForGeolocation } from './ask-user-for-geolocation/AskUserForGeolocation';
import { Location, QueueErorr } from '../../types/QueueEntrant';
import { vincentyDistance } from '../../utils/vincentyDistance ';
import { useRouter } from 'next/navigation';
import { QueueUser } from '@/lib/types/queue.types';

interface EnteredQueueProps {
  userId: string;
  setData: (data: QueueUser | null) => void;
}

export const EnterQueue: FC<EnteredQueueProps> = ({ userId, setData }) => {
  const { push } = useRouter();
  const [isUserAllowed, setIsUserAllowed] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [isNearby, setIsNearby] = useState(false);
  const [skipChecking, setSkipChecking] = useState(false);
  const isPassed = (isUserAllowed && location && isNearby) || skipChecking;

  useEffect(() => {
    if (location && !skipChecking) {
      const distance = vincentyDistance(location);
      if (distance < 2) {
        setIsNearby(true);
      } else {
        push('/queue/error?type=' + QueueErorr.NOT_NEARBY);
      }
    }
  }, [location, skipChecking]);

  return (
    <section className='flex h-full items-center justify-center p-4'>
      {!isPassed ? (
        <AskUserForGeolocation
          setIsUserAllowed={setIsUserAllowed}
          setSkipChecking={setSkipChecking}
        />
      ) : (
        <EnterQueueForm
          userId={userId}
          setIsUserAllowed={setIsUserAllowed}
          setData={setData}
          setSkipChecking={setSkipChecking}
        />
      )}
      {isUserAllowed && !skipChecking && (
        <CheckGeolocation location={location} setLocation={setLocation} />
      )}
    </section>
  );
};
