import { Button } from '@/components/ui/button';
import React from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function OpenQueueButton() {
  const { toastError, toastSuccess } = useCommonToast();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['queue-info'],
    queryFn: AdminQueueApi.getQueue,
    select: (data) => data.data.opened,
  });

  const mutation = useMutation({
    mutationFn: () => AdminQueueApi.openQueue({ opened: !data }),
    onSuccess: () => {
      toastSuccess();
      queryClient.setQueryData(['queue-info'], (oldData: any) => ({
        ...oldData,
        data: {
          ...oldData.data,
          opened: !data,
        },
      }));
    },
    onError: (error) => toastError(error),
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {data ? 'Закрити' : 'Відкрити'}
    </Button>
  );
}
