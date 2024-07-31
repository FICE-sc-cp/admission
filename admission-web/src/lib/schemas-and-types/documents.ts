import { z } from 'zod';
import { EducationProgram } from '$/utils/src';
import {
  PROFESSIONAL,
  SCIENTIFIC,
} from '@/lib/constants/documents-educational-programs';
import { getCurrentDate } from '@/lib/utils/getCurrentDate';

export interface IPrioritySelect {
  label: string;
  id: EducationProgram;
}

const prioritySchema = z.object(
  {
    number: z.number({
      required_error: "Обов'язкове поле",
    }),
    program: z.string({
      required_error: "Обов'язкове поле",
    }),
  },
  {
    required_error: "Обов'язкове поле",
  }
);

export const DocumentsSchema = z.object({
  degree: z.enum(['BACHELOR', 'MASTER'], {
    required_error: "Обов'язкове поле",
  }),
  fundingSource: z.enum(['BUDGET', 'CONTRACT'], {
    required_error: "Обов'язкове поле",
  }),
  studyForm: z.enum(['FULL_TIME', 'PART_TIME'], {
    required_error: "Обов'язкове поле",
  }),
  specialty: z
    .enum(['121', '123', '126'], {
      required_error: "Обов'язкове поле",
    })
    .nullable(),
  paymentType: z
    .enum(['QUARTERLY', 'SEMESTERLY', 'MONTHLY'], {
      required_error: "Обов'язкове поле",
    })
    .nullable(),
  priorities: z
    .array(prioritySchema, {
      required_error: "Обов'язкове поле",
    })
    .max(3, "Обов'язкове поле")
    .nullable(),
  priorityDate: z.string().readonly(),
  programType: z
    .enum(['PROFESSIONAL', 'SCIENTIFIC'], {
      required_error: "Обов'язкове поле",
    })
    .nullable(),
  educationalProgram: z
    //@ts-ignore
    .enum([...PROFESSIONAL, ...SCIENTIFIC], {
      required_error: "Обов'язкове поле",
    })
    .nullable(),
});
// .superRefine((data, ctx) => {
//   if (!data.priorities) return true;
//   const programs = data.priorities.map((priority) => priority.program);
//   const uniquePrograms = new Set(programs);
//   if (uniquePrograms.size !== programs.length) {
//     return ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Приорітети повинні бути унікальними',
//       path: ['priorities'],
//     });
//   }
//
//   return ctx;
// });

export const AdminDocumentsSchema = DocumentsSchema.extend({
  date: z.string().readonly(),
  number: z.string({ required_error: "Обов'язкове поле" }),
});

export type TAdminDocumentsSchema = z.infer<typeof AdminDocumentsSchema>;

export type TDocumentsSchema = z.infer<typeof DocumentsSchema>;
