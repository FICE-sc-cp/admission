'use client';
import { columns } from './columns';
import { AdminQueueDataTable } from '@/app/(application)/admin/queue/data-table';
import { useEffect, useState } from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { Loader2 } from 'lucide-react';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { PositionInQueue } from '@/lib/schemas-and-types/queue';

export default function AdminQueue() {
  const [data, setData] = useState<PositionInQueue[]>([]);
  const [loading, setLoading] = useState(true);
  const { toastError } = useCommonToast();

  async function fetchData() {
    try {
      const { positions } = await AdminQueueApi.getUsers();
      setData(positions);
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className='container mx-auto p-5'>
      <AdminQueueDataTable
        fetchData={fetchData}
        columns={columns}
        data={data}
      />
    </div>
  );
}
