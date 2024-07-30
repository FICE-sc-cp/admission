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
import { QueuePositionStatus } from '@/lib/schemas-and-types/queue';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';

export function AdminStatusSelect({
  status,
  id,
}: {
  status: QueuePositionStatus;
  id: string;
}) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const { toastSuccess } = useCommonToast();

  const handleStatusChange = async (newStatus: QueuePositionStatus) => {
    setSelectedStatus(newStatus);
    await AdminQueueApi.changePosition(id, { status: newStatus });
    toastSuccess(
      'Статус оновлено!',
      'Оновіть сторінку, щоб побачити оновлений стан черги'
    );
  };

  return (
    <Select onValueChange={handleStatusChange}>
      <SelectTrigger className='w-[180px] rounded-none border-transparent hover:outline-none focus:outline-none focus:ring-0'>
        <SelectValue
          placeholder={<AdminStatusBadge status={selectedStatus} />}
        />
      </SelectTrigger>
      <SelectContent>
        {(['WAITING', 'PROCESSING'] as QueuePositionStatus[]).map((status) => {
          return (
            <SelectItem value={status as string} key={status}>
              <AdminStatusBadge status={status} />
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
