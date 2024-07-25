'use client';
import { FC, useEffect, useState } from 'react';
import { EnterQueueForm } from './form/EnterQueueForm';
import { CheckGeolocation } from './check-geolocation/CheckGeolocation';
import { AskUserForGeolocation } from './ask-user-for-geolocation/AskUserForGeolocation';
import { Location, QueueErorr } from '../../types/QueueTypes';
import { vincentyDistance } from '../../utils/vincentyDistance ';
import { useRouter } from 'next/navigation';

interface EnteredQueueProps {
  userId: string;
}

export const EnterQueue: FC<EnteredQueueProps> = ({ userId }) => {
  const { push } = useRouter();
  const [isUserAllowed, setIsUserAllowed] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [isNearby, setIsNearby] = useState(false);

  const isPassed = isUserAllowed && location && isNearby;

  useEffect(() => {
    if (location) {
      const distance = vincentyDistance(location);
      if (distance < 2000) {
        setIsNearby(true);
      } else {
        push('/queue/error?type=' + QueueErorr.NOT_NEARBY);
      }
    }
  }, [location]);

  return (
    <section className='flex h-full items-center justify-center p-4'>
      {!isPassed ? (
        <AskUserForGeolocation setIsUserAllowed={setIsUserAllowed} />
      ) : (
        <EnterQueueForm userId={userId} setIsUserAllowed={setIsUserAllowed} />
      )}
      {isUserAllowed && (
        <CheckGeolocation location={location} setLocation={setLocation} />
      )}
    </section>
  );
};
