'use client';
import AdminEntrantsApi from '@/app/api/admin-entrants/admin-entrants-api';
import { AdminEntrantDataTable } from '@/components/pages/admin/entrants/components/EntrantsDataTable';
import { EntrantsColumns } from '@/components/pages/admin/entrants/components/EntrantsColumns';
import { useQuery } from '@tanstack/react-query';
import { LoadingPage } from '@/components/common/components/LoadingPage';

export default function AdminEntrantsPage() {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['all-entrants'],
    queryFn: AdminEntrantsApi.getUsers,
    refetchInterval: 15000,
    throwOnError: true,
    select: (data) => data.data,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className='container mx-auto py-4'>
      <AdminEntrantDataTable
        refetch={refetch}
        columns={EntrantsColumns}
        data={data || []}
      />
    </div>
  );
}
