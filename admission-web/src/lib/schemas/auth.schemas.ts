import { z } from 'zod';
import {
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  middleNameSchema,
} from './common.schemas';

export const SignUpSchema = z.object({
  email: emailSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  middleName: middleNameSchema,
});

export type TSignUp = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: emailSchema,
});

export type TSignIn = z.infer<typeof SignInSchema>;
