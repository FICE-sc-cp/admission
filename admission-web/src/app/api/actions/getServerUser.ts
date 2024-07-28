'use server';

import { cookies } from 'next/headers';
import { instance } from '../instance';
import { User } from '@/lib/schemas-and-types/auth';

export async function getServerUser(): Promise<User | null> {
  const sessionToken = cookies().get('session');

  if (!sessionToken) {
    return null;
  }

  const { data: user } = await instance.get<User>('/auth/me', {
    withCredentials: true,
    headers: {
      Cookie: `session=${sessionToken.value}`,
    },
  });

  return user;
}
