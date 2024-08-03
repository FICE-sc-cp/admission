import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { Loader2 } from 'lucide-react';

export function OpenQueueButton() {
  const [opened, setOpened] = useState(true);
  const [loading, setLoading] = useState(true);
  const { toastError, toastSuccess } = useCommonToast();

  async function fetchData() {
    try {
      const { data } = await AdminQueueApi.getQueue();
      setOpened(data.opened);
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
    return <Loader2 className='text-clay-700 animate-spin' size={80} />;
  }
  const handleClick = async () => {
    await AdminQueueApi.openQueue({ opened: !opened });
    setOpened(!opened);
    toastSuccess();
  };

  return (
    <Button onClick={handleClick}>{opened ? 'Закрити' : 'Відкрити'}</Button>
  );
}
