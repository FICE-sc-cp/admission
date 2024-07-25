import { z } from 'zod';

export interface User {
  id: string;
  email: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  role: string;
}

const ukRegex = /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`ʼ' ]+$/;

export const SignUpSchema = z.object({
  email: z
    .string({ required_error: 'Введіть пошту' })
    .email({ message: 'Це не є поштовою адресою' }),
  firstName: z
    .string()
    .min(2, { message: "Введіть ім'я" })
    .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс'),
  lastName: z
    .string()
    .min(2, { message: 'Введіть прізвище' })
    .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс'),

  middleName: z
    .string()
    .min(2, { message: 'Введіть по-батькові' })
    .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
    .nullable(),
});

export type TSignUp = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z
    .string({ required_error: 'Введіть пошту' })
    .email({ message: 'Це не є поштовою адресою' }),
});

export type TSignIn = z.infer<typeof SignInSchema>;
