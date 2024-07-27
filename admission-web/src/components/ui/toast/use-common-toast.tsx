'use client';

import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import { useToast } from '@/components/ui/toast/use-toast';

export function useCommonToast() {
  const { toast } = useToast();

  const toastSuccess = (customTitle?: string, customDescription?: string) =>
    toast({
      variant: 'success',
      title: customTitle || 'Операція виконана успішно',
      description: customDescription,
    });

  const toastError = (error?: unknown, customTitle?: string) =>
    toast({
      variant: 'destructive',
      title: customTitle || 'Щось пішло не так',
      description: getErrorMessage(error),
    });

  return { toastSuccess, toastError };
}
