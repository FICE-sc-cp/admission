'use client';
import { columns } from './columns';
import { AdminQueueDataTable } from '@/app/(application)/admin/queue/data-table';
import { useEffect, useState } from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { PositionInQueue } from '@/lib/schemas-and-types/queue';
import { Loader } from '@/app/(application)/_components/Loader';

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
    return <Loader />;
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
