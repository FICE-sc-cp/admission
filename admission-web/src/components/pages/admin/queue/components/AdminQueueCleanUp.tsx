import { Button } from '@/components/ui/button';
import React from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import AdminAlertDialog from '../../common/components/AdminAlertDialog';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { PositionInQueue } from '@/lib/types/queue.types';

export function AdminQueueCleanUp({
  refetch,
}: {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PositionInQueue[], Error>>;
}) {
  const { toastError } = useCommonToast();
  return (
    <AdminAlertDialog
      button={<Button>Очистити чергу</Button>}
      title='Очищення черги'
      description='Ви впевнені? Чергу зі вступниками буде повністю очищено. Цю дію неможливо буде відмінити'
      action={async () => {
        try {
          await AdminQueueApi.cleanUpTheQueue();
          await refetch();
        } catch (error) {
          toastError(error, 'Не вдалося очистити чергу');
        }
      }}
    />
  );
}
