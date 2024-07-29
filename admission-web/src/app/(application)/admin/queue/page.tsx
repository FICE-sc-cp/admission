'use client';
import { columns } from './columns';
import { AdminQueueDataTable } from '@/app/(application)/admin/queue/data-table';
import { useEffect, useState } from 'react';
import { QueuePosition } from '@/app/api/admin-queue/admin-queue-api.types';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { Loader2 } from 'lucide-react';

export default function AdminQueue() {
  const [data, setData] = useState<QueuePosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { positions } = await AdminQueueApi.getUsers();
        setData(positions);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [data]);

  if (loading) {
    return (
      <div className='flex min-h-96 min-w-96 items-center justify-center'>
        <span>
          <Loader2 className='text-clay-700 animate-spin' size={80} />
        </span>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-10'>
      <AdminQueueDataTable columns={columns} data={data} />
    </div>
  );
}
