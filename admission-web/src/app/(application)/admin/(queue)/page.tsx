'use client';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { LoadingPage } from '@/components/common/components/LoadingPage';
import { QueueColumns } from '@/components/pages/admin/queue/components/QueueColumns';
import { AdminQueueDataTable } from '@/components/pages/admin/queue/components/QueueDataTable';
import { usePrefetchQuery, useQuery } from '@tanstack/react-query';

export default function AdminQueue() {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['users-in-queue'],
    queryFn: AdminQueueApi.getUsers,
    refetchInterval: 15000,
    throwOnError: true,
    select: (data) => data.data.positions,
  });

  usePrefetchQuery({
    queryKey: ['queue-info'],
    queryFn: AdminQueueApi.getQueue,
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className='container mx-auto p-5'>
      <AdminQueueDataTable
        refetch={refetch}
        columns={QueueColumns}
        data={data || []}
      />
    </div>
  );
}
