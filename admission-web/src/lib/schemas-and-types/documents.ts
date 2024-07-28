import { z } from 'zod';

const educationalPrograms = {
  Наукова: [
    '121 Інженерія програмного забезпечення інформаційних систем',
    '121 Інженерія програмного забезпечення комп’ютерних систем',
    '123 Комп’ютерні системи та мережі',
    '126 Інформаційні управляючі системи та технології',
  ],
  Професійна: [
    '121 Інженерія програмного забезпечення інформаційних систем',
    '121 Інженерія програмного забезпечення комп’ютерних систем',
    '123 Комп’ютерні системи та мережі',
    '126 Інформаційні управляючі системи та технології',
    '126 Інтегровані інформаційні системи',
    '126 Інформаційне забезпечення робототехнічних систем',
  ],
};

export const DocumentsSchema = z.object({
  degree: z.enum(['Bachelor', 'Master'], {
    required_error: "Обов'язкове поле",
  }),
  fundingSource: z.enum(['Budget', 'Contract'], {
    required_error: "Обов'язкове поле",
  }),
  studyForm: z.enum(['Full_time', 'Part_time'], {
    required_error: "Обов'язкове поле",
  }),
  specialty: z
    .enum(
      [
        '121 Інженерія програмного забезпечення',
        '123 Комп’ютерна інженерія',
        '126 Інформаційні системи та технології',
      ],
      {
        required_error: "Обов'язкове поле",
      }
    )
    .nullable()
    .default(null),
  paymentType: z
    .enum(['Щоквартально', 'Щосеместрово', 'Щомісячно'], {
      required_error: "Обов'язкове поле",
    })
    .optional()
    .nullable()
    .default(null),
  // programType: z.enum(['Професійна', 'Наукова'], {
  //   required_error: "Обов'язкове поле",
  // }),
  // educationalProgram: z.enum(['']).optional(),
});

export type TDocumentsSchema = z.infer<typeof DocumentsSchema>;
