import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';

export function OpenQueueButton() {
  const [opened, setOpened] = useState(true);
  const [buttonText, setButtonText] = useState('Закрити');

  const handleClick = async () => {
    try {
      if (!opened) {
        await AdminQueueApi.openQueue({ opened: true });
        setOpened(true);
        setButtonText('Закрити');
      } else {
        await AdminQueueApi.openQueue({ opened: false });
        setOpened(false);
        setButtonText('Відкрити');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleClick}>{buttonText}</Button>;
}
