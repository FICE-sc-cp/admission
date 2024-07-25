'use server';

import { cookies } from 'next/headers';
import { instance } from '../instance';
import { QueueUser } from '@/lib/schemas-and-types/queue';

export async function getQueueUser(id: string): Promise<QueueUser | null> {
  const sessionToken = cookies().get('session');

  if (!sessionToken) {
    return null;
  }

  const { data } = await instance.get<QueueUser>(`/queue/users/${id}`, {
    withCredentials: true,
    headers: {
      Cookie: `session=${sessionToken.value}`,
    },
  });
  return data;
}
