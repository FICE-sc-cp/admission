import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';

export function OpenQueueButton() {
  const [opened, setOpened] = useState(true);

  const handleClick = async () => {
    await AdminQueueApi.openQueue({ opened: opened });
    setOpened(!opened);
  };

  return (
    <Button onClick={handleClick}>{opened ? 'Відкрити' : 'Закрити'}</Button>
  );
}
