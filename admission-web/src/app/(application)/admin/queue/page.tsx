'use client';
import { useEffect, useState } from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { PositionInQueue } from '@/lib/types/queue.types';
import { QueueColumns } from '@/components/pages/admin/queue/components/QueueColumns';
import { AdminQueueDataTable } from '@/components/pages/admin/queue/components/QueueDataTable';
import { Loader } from '@/components/common/components/Loader';

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

    const interval = setInterval(fetchData, 15000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='container mx-auto p-5'>
      <AdminQueueDataTable
        fetchData={fetchData}
        columns={QueueColumns}
        data={data}
      />
    </div>
  );
}
