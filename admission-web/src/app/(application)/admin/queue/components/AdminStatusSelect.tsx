import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
import { AdminStatusBadge } from '@/app/(application)/admin/queue/components/AdminStatusBadge';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';

export function AdminStatusSelect({
  status,
  id,
}: {
  status: 'WAITING' | 'PROCESSING';
  id: string;
}) {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = async (newStatus: 'WAITING' | 'PROCESSING') => {
    setSelectedStatus(newStatus);
    if (newStatus === 'PROCESSING') {
      try {
        await AdminQueueApi.changePosition(id, { status: 'PROCESSING' });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await AdminQueueApi.changePosition(id, { status: 'WAITING' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Select onValueChange={handleStatusChange}>
      <SelectTrigger className='w-[180px] rounded-none border-transparent hover:outline-none focus:outline-none focus:ring-0'>
        <SelectValue
          placeholder={<AdminStatusBadge status={selectedStatus} />}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='WAITING'>
          <AdminStatusBadge status='WAITING' />
        </SelectItem>
        <SelectItem value='PROCESSING'>
          <AdminStatusBadge status='PROCESSING' />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
