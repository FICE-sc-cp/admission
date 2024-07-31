'use client';
import { useEffect, useState } from 'react';
import { AdminEntrantDataTable } from '@/app/(application)/admin/entrants/data-table';
import { columns } from '@/app/(application)/admin/entrants/columns';
import AdminEntrantsApi from '@/app/api/admin-entrants/admin-entrants-api';
import { User } from '@/app/api/admin-entrants/admin-entrants-api.types';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { Loader } from '@/app/(application)/_components/Loader';

export default function AdminEntrantsPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toastError } = useCommonToast();

  const fetchData = async () => {
    try {
      const users = await AdminEntrantsApi.getUsers();
      setData(users);
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='container mx-auto py-4'>
      <AdminEntrantDataTable
        fetchData={fetchData}
        columns={columns}
        data={data}
      />
    </div>
  );
}
