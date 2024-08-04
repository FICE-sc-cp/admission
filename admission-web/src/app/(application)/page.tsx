'use client';
import { authApi } from '@/app/api/auth/auth-api';
import { useRouter } from 'next/navigation';
import { StudentPersonalDataBlock } from '@/components/pages/entrant/main/components/StudentPersonalDataBlock';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const { data: user } = useSuspenseQuery({
    queryKey: ['get-me'],
    queryFn: authApi.getMe,
    staleTime: Infinity,
    retry: false,
    select: (data) => data.data,
  });

  if (user.role === 'ADMIN') useRouter().replace('/admin');

  return <StudentPersonalDataBlock userId={user.id} />;
}
