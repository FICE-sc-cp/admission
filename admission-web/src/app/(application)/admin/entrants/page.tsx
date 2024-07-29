'use client';
import { useEffect, useState } from 'react';
import { AdminEntrantDataTable } from '@/app/(application)/admin/entrants/data-table';
import { columns } from '@/app/(application)/admin/entrants/columns';
import AdminEntrantsApi from '@/app/api/admin-entrants/admin-entrants-api';
import { User } from '@/app/api/admin-entrants/admin-entrants-api.types';
import { Loader2 } from 'lucide-react';

export default function AdminEntrantsPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const users = await AdminEntrantsApi.getUsers();
      setData(users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    <div className='mx-auto py-4'>
      <AdminEntrantDataTable columns={columns} data={data} />
    </div>
  );
}
