import { z } from 'zod';

export const priorityFormSchema = z.object({
  priority_1: z.string({
    required_error: 'Будь ласка оберіть приорітет',
  }),
  priority_2: z.string({
    required_error: 'Будь ласка оберіть приорітет',
  }),
  priority_3: z.string({
    required_error: 'Будь ласка оберіть приорітет',
  }),
  date: z.string().readonly(),
});

export const priorityFormType = z.infer<typeof priorityFormSchema>;
