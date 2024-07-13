import { z } from 'zod';

export interface User {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
}

const SignUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
});

export type TSignUp = z.infer<typeof SignUpSchema>;
