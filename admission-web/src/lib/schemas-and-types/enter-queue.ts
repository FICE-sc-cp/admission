import { z } from 'zod';
import { phoneRegex } from '../constants/regex';

const allowedSpecialities = ['121', '123', '126'];

export const enterQueueFormSchema = z.object({
  phone: z
    .string({
      required_error: 'Будь ласка, введіть номер телефону',
    })
    .regex(phoneRegex, {
      message:
        'Будь ласка, введіть дійсний номер телефону у форматі +380 12 345 6789.',
    })
    .transform((val) => val.replace(/[^0-9]/g, ''))
    .refine((val) => val.length === 12, {
      message:
        'Будь ласка, введіть дійсний номер телефону у форматі +380 12 345 6789.',
    }),
  expectedSpecialities: z
    .string({
      required_error:
        'Будь ласка, оберіть спеціальності, на яку плануєте заповняти договори.',
    })
    .refine(
      (specialities: string) => {
        return specialities
          .split(',')
          .map((s) => s.trim())
          .every((spec) => allowedSpecialities.includes(spec));
      },
      {
        message: `Будь ласка, впишіть одну з наступних спеціальностей або декілька відразу через кому: ${allowedSpecialities.join(', ')}.`,
      }
    ),
  isDorm: z.boolean({
    required_error:
      'Будь ласка, вкажіть, чи плануєте ви селитися в гуртожиток.',
  }),
  printedEdbo: z.boolean({
    required_error: 'Будь ласка, вкажіть, чи роздрукували ви ЕДБО.',
  }),
  confirmedStudyPlace: z.boolean({
    required_error: 'Будь ласка, вкажіть, чи роздрукували ви ЕДБО.',
  }),
});

export type TEnterQueueForm = z.infer<typeof enterQueueFormSchema>;
