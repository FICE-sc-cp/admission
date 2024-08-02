'use client';
import { useEffect, useState } from 'react';
import AdminEntrantsApi from '@/app/api/admin-entrants/admin-entrants-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { AdminEntrantDataTable } from '@/components/pages/admin/entrants/components/EntrantsDataTable';
import { Loader } from 'lucide-react';
import { EntrantsColumns } from '@/components/pages/admin/entrants/components/EntrantsColumns';
import { AdminUser } from '@/app/api/admin-entrants/admin-entrants-api.types';

export default function AdminEntrantsPage() {
  const [data, setData] = useState<AdminUser[]>([]);
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
        columns={EntrantsColumns}
        data={data}
      />
    </div>
  );
}
