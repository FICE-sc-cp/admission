import { AdminEntrantDataTable } from '@/app/admin/entrants/data-table';
import { columns } from '@/app/admin/entrants/columns';
import AdminEntrantsApi from "@/lib/api/admin-entrants-api";

export default async function AdminEntrantsPage() {
  const data = await AdminEntrantsApi.getUsers();
  return (
    <div className='container mx-auto py-4'>
      <AdminEntrantDataTable columns={columns} data={data} />
    </div>
  );
}
