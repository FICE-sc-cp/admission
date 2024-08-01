'use client';

import { FC, useEffect } from 'react';
import { checkLocationPermission } from '../../../utils/checkLocationPermission';
import { useRouter } from 'next/navigation';
import { Location, QueueErorr } from '../../../types/QueueTypes';

interface Props {
  location: Location | null;
  setLocation: (location: Location) => void;
}

export const CheckGeolocation: FC<Props> = ({ location, setLocation }) => {
  const { push } = useRouter();

  useEffect(() => {
    checkLocationPermission().then((hasPermission) => {
      if (!hasPermission) {
        push('/queue/error?type=' + QueueErorr.NO_PERMISSION);
      }

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const { latitude, longitude } = coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not available');
      }
    });

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not available');
    }
  }, []);

  return <div className=''></div>;
};
