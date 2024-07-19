import { z } from 'zod';
import { EducationProgram } from '$/utils/src';

export const priorityFormSchema = z
  .object({
    priority_1: z.string({
      required_error: 'Будь ласка оберіть пріорітет',
    }),
    priority_2: z.string({
      required_error: 'Будь ласка оберіть пріорітет',
    }),
    priority_3: z
      .string({
        required_error: 'Будь ласка оберіть пріорітет',
      })
      .optional(),
    date: z.string().readonly(),
  })
  .refine(({ priority_1, priority_2, priority_3 }) => {
    const priorities = [priority_1, priority_2, priority_3];

    for (let i = 0; i < priorities.length; i++) {
      for (let j = 0; j < priorities.length; j++) {
        if (i === j) continue;

        if (priorities[i] === priorities[j]) {
          console.log('match');
          return false;
        }
      }
    }
    return true;
  }, 'Пріорітети повинні бути унікальними');

export const TPriorityForm = typeof priorityFormSchema;

export interface IPrioritySelect {
  label: string;
  id: EducationProgram;
}
