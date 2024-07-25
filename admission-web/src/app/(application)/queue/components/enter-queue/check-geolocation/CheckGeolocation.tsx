'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { checkLocationPermission } from '../../../utils/checkLocationPermission';
import { useRouter } from 'next/navigation';
import { Location, QueueErorr } from '../../../types/QueueTypes';

interface Props {
  location: Location | null;
  setLocation: (location: Location) => void;
}

export const CheckGeolocation: FC<Props> = ({ location, setLocation }) => {
  const { push } = useRouter();

  const fetchApiData = async ({ latitude, longitude }: Location) => {
    try {
      const res = await axios('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  useEffect(() => {
    if (location) {
      fetchApiData(location);
    }
  }, [location]);

  return <div className=''></div>;
};
