import { z } from 'zod';
import { EducationProgram } from '$/utils/src';

export const priorityFormSchema = z.object({
  priority_1: z.string({
    required_error: 'Будь ласка оберіть приорітет',
  }),
  priority_2: z.string({
    required_error: 'Будь ласка оберіть приорітет',
  }),
  priority_3: z
    .string({
      required_error: 'Будь ласка оберіть приорітет',
    })
    .optional(),
  date: z.string().readonly(),
});

export const TPriorityForm = typeof priorityFormSchema;

export interface IPrioritySelect {
  label: string;
  id: EducationProgram;
}
