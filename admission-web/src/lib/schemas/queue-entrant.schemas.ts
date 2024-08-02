import { z } from 'zod';
import { Specialities, SpecialitiesArray } from '../types/specialities.types';
import { phoneNumberSchema } from './common.schemas';

export const enterQueueFormSchema = z.object({
  phone: phoneNumberSchema,
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
          .every((spec) => SpecialitiesArray.includes(spec as Specialities));
      },
      {
        message: `Будь ласка, впишіть одну з наступних спеціальностей або декілька відразу через кому: ${SpecialitiesArray.join(', ')}.`,
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
