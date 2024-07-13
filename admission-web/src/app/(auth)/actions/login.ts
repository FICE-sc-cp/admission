'use server';

import AuthApi from '@/lib/api/auth-api';
import { redirect } from 'next/navigation';

export const login = async (formData: FormData) => {
  const email = formData.get('email') as string;
  if (!email) return;
  await AuthApi.login({ email });
  redirect('/auth/email');
};
