'use client';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { QueueColumns } from '@/components/pages/admin/queue/components/QueueColumns';
import { AdminQueueDataTable } from '@/components/pages/admin/queue/components/QueueDataTable';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function AdminQueue() {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['users-in-queue'],
    queryFn: AdminQueueApi.getUsers,
    refetchInterval: 15000,
  });

  return (
    <div className='container mx-auto p-5'>
      <AdminQueueDataTable
        refetch={refetch}
        columns={QueueColumns}
        data={data?.data?.positions || []}
      />
    </div>
  );
}
