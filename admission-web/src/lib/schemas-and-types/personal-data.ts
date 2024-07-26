import { z } from 'zod';

const ukNumberRegex = /^\+380\d{9}$/;
const kirillicRegex = /^[А-Я]{2}$/;
const ukRegex = /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя0-9\-`'’‘“”*,. ]+$/;
const dateRegex =
  /^\s*((?:3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1-9])\.((?:19|20)\d{2}))\s*$/;

export const baseSchema = z.object({
  phoneNumber: z.string().regex(ukNumberRegex, 'Номер має містити 9 цифр'),
  passportNumber: z.string(),
  passportDate: z.string().regex(dateRegex, 'Має бути формату dd.mm.yyyy'),
  passportInstitute: z.string().min(4, 'Орган видачі має містити 4 цифри'),
  passportSeries: z
    .string()
    .max(2, 'Серія паспорту має містити 2 символи')
    .regex(
      kirillicRegex,
      'Серія паспорту має містити кириличні літери верхнього регістру'
    )
    .optional(),
  idCode: z.string().max(10, 'ІПН має містити 10 цифр').nullable(),
  region: z.string({ required_error: 'Будь ласка оберіть регіон' }),
  settlement: z
    .string()
    .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
    .nullable()
    .optional(),
  // .refine((val, ctx) => {
  //   const { region } = ctx.parent;
  //   if (region !== 'м. Київ' && !val) {
  //     return false;
  //   }
  //   return true;
  // }, "Обов'язкове поле"),
  address: z
    .string()
    .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс'),
  index: z.string().max(5, 'Має містити 5 цифр'),
  study_form: z.enum(['Бюджет', 'Контракт']).default('Контракт'),
  submission_in_corpus: z.boolean().default(false).optional(),
  oldPassportTemplate: z.boolean().default(false).optional(),
});

export const EntrantSchema = baseSchema.superRefine((data, ctx) => {
  const passportNumber = data.passportNumber;
  const oldPassportTemplate = data.oldPassportTemplate;
  const length = passportNumber.length;

  if (oldPassportTemplate && length !== 6) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['passportNumber'],
      message: 'Номер паспорту має містити 6 цифр для старих зразків',
    });
  } else if (!oldPassportTemplate && length !== 9) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['passportNumber'],
      message: 'Номер паспорту має містити 9 цифр',
    });
  }

  const validationResult = baseSchema.safeParse(data);
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue) => {
      ctx.addIssue(issue);
    });
  }
});

export const TEntrantSchema = typeof EntrantSchema;
