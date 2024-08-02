import { z } from 'zod';
import { StudyForm } from '$/utils/src/enums/StudyFormEnum';
import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { PaymentType } from '$/utils/src/enums/PaymentTypeEnum';
import { EducationalProgramType } from '$/utils/src/enums/EducationalProgramTypeEnum';
import { EducationalDegree } from '$/utils/src/enums/EducationalDegreeEnum';

export const prioritySchema = z.object(
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
  degree: z.nativeEnum(EducationalDegree, {
    required_error: "Обов'язкове поле",
  }),
  fundingSource: z.nativeEnum(FundingSource, {
    required_error: "Обов'язкове поле",
  }),
  studyForm: z.nativeEnum(StudyForm, {
    required_error: "Обов'язкове поле",
  }),
  specialty: z
    .enum(['121', '123', '126'], {
      required_error: "Обов'язкове поле",
    })
    .nullable(),
  paymentType: z
    .nativeEnum(PaymentType, {
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
    .nativeEnum(EducationalProgramType, {
      required_error: "Обов'язкове поле",
    })
    .nullable(),
  educationalProgram: z
    .string({
      required_error: "Обов'язкове поле",
    })
    .nullable(),
});

export const AdminDocumentsSchema = DocumentsSchema.extend({
  date: z.string({ required_error: "Обов'язкове поле" }).readonly(),
  number: z.string({ required_error: "Обов'язкове поле" }),
});

export type TAdminDocumentsSchema = z.infer<typeof AdminDocumentsSchema>;

export type TDocumentsSchema = z.infer<typeof DocumentsSchema>;
