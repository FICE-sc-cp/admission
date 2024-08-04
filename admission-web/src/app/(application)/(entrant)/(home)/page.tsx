'use client';
import { authApi } from '@/app/api/auth/auth-api';
import { useRouter } from 'next/navigation';
import { StudentPersonalDataBlock } from '@/components/pages/entrant/main/components/StudentPersonalDataBlock';
import { useQuery } from '@tanstack/react-query';
import { LoadingPage } from '@/components/common/components/LoadingPage';

export default function Dashboard() {
  const { replace } = useRouter();

  const { data: user } = useQuery({
    queryKey: ['get-me'],
    queryFn: authApi.getMe,
    staleTime: Infinity,
    retry: false,
    select: (data) => data.data,
  });

  if (!user) return <LoadingPage />;

  if (user.role === 'ADMIN') replace('/admin');

  return <StudentPersonalDataBlock userId={user.id} />;
}
