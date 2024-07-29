import { Button } from '@/components/ui/button';
import React from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import AdminAlertDialog from '@/app/(application)/admin/_components/AdminAlertDialog';

export function AdminQueueCleanUp() {
  return (
    <AdminAlertDialog
      button={<Button>Очистити чергу</Button>}
      title='Очищення черги'
      description='Ви впевнені? Чергу зі вступниками буде повністю очищено. Цю дію неможливо буде відмінити'
      action={async () => {
        try {
          await AdminQueueApi.cleanUpTheQueue();
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
}
