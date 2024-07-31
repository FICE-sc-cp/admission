'use client';

import { authApi } from '@/app/api/auth/auth-api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/app/(application)/_components/Loader';
import { StudentPersonalDataBlock } from '@/app/(application)/_components/student-profile-page/StudentPersonalDataBlock';

export default function Dashboard() {
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  async function fetchData() {
    try {
      const { data } = await authApi.getMe();
      setUserId(data.id);
      setRole(data.role);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (role === 'ADMIN') {
    push('/admin');
  }

  return <StudentPersonalDataBlock userId={userId} />;
}
