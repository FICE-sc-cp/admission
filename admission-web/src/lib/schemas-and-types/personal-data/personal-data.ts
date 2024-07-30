import { z } from 'zod';
import {
  dateRegex,
  kirillicRegex,
  phoneRegex,
  ukRegex,
} from '@/lib/constants/regex';
import { transformApostrophe } from '@/lib/utils/transformApostrophe';

export const EntrantSchema = z
  .object({
    phoneNumber: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(phoneRegex, 'Номер має містити 9 цифр'),
    passportNumber: z.string({ required_error: "Обов'язкове поле" }),
    email: z
      .string({ required_error: `Обов'язкове поле` })
      .email('Введіть емейл'),
    passportDate: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(dateRegex, 'Має бути формату dd.mm.yyyy'),
    passportInstitute: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(/^\d{4}$/, 'Орган видачі має містити 4 цифри'),
    passportSeries: z
      .string({ required_error: "Обов'язкове поле" })
      .max(2, 'Серія паспорту має містити 2 символи')
      .regex(
        kirillicRegex,
        'Серія паспорту має містити кириличні літери верхнього регістру'
      )
      .nullable()
      .default(null),
    idCode: z
      .string({ required_error: "Обов'язкове поле" })
      .nullable()
      .refine((value) => value === null || /^[0-9]{10}$/.test(value), {
        message: 'РНОКПП має містити 10 цифр',
      }),
    region: z
      .string({ required_error: 'Будь ласка оберіть регіон' })
      .transform(transformApostrophe),
    settlement: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
      .transform(transformApostrophe)
      .nullable(),
    address: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
      .transform(transformApostrophe),
    index: z
      .string({ required_error: "Обов'язкове поле" })
      .refine((value) => /^[0-9]{5}$/.test(value), {
        message: 'Має містити 5 цифр',
      }),
    study_form: z.enum(['Бюджет', 'Контракт']).default('Контракт'),
    submission_in_corpus: z.boolean().default(false).optional(),
    oldPassportTemplate: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    const passportNumber = data.passportNumber;
    const oldPassportTemplate = data.oldPassportTemplate;
    const length = passportNumber.length;

    if (oldPassportTemplate && length !== 6) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Номер паспорту має містити 6 цифр',
        path: ['passportNumber'],
      });
    } else if (!oldPassportTemplate && length !== 9) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Номер паспорту має містити 9 цифр',
        path: ['passportNumber'],
      });
    }

    return ctx;
  });

export const PersonalDataSchema = z
  .object({
    lastName: z
      .string({ required_error: `Обов'язкове поле` })
      .min(2, 'Не коротше 2 символів')
      .max(40, 'Не довше 40 символів')
      .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
      .transform(transformApostrophe),
    firstName: z
      .string({ required_error: `Обов'язкове поле` })
      .min(2, 'Не коротше 2 символів')
      .max(40, 'Не довше 40 символів')
      .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
      .transform(transformApostrophe),
    middleName: z
      .string({ required_error: `Обов'язкове поле` })
      .min(2, 'Не коротше 2 символів')
      .max(40, 'Не довше 40 символів')
      .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
      .transform(transformApostrophe)
      .nullable(),
    email: z
      .string({ required_error: `Обов'язкове поле` })
      .email('Введіть емейл'),
    phoneNumber: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(phoneRegex, 'Номер має містити 9 цифр'),
    passportNumber: z.string({ required_error: "Обов'язкове поле" }),
    passportDate: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(dateRegex, 'Має бути формату dd.mm.yyyy'),
    passportInstitute: z
      .string({ required_error: "Обов'язкове поле" })
      .min(4, 'Орган видачі має містити 4 цифри'),
    passportSeries: z
      .string({ required_error: "Обов'язкове поле" })
      .max(2, 'Серія паспорту має містити 2 символи')
      .regex(
        kirillicRegex,
        'Серія паспорту має містити кириличні літери верхнього регістру'
      )

      .nullable()
      .default(null),
    idCode: z
      .string({ required_error: "Обов'язкове поле" })
      .nullable()
      .refine((value) => value === null || /^[0-9]{10}$/.test(value), {
        message: 'РНОКПП має містити 10 цифр',
      }),
    region: z.string({ required_error: 'Будь ласка оберіть регіон' }),
    settlement: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
      .transform(transformApostrophe),
    address: z
      .string({ required_error: "Обов'язкове поле" })
      .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
      .transform(transformApostrophe),
    index: z
      .string({ required_error: "Обов'язкове поле" })
      .refine((value) => /^[0-9]{5}$/.test(value), {
        message: 'Має містити 5 цифр',
      }),
    oldPassportTemplate: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    const passportNumber = data.passportNumber;
    const oldPassportTemplate = data.oldPassportTemplate;
    const length = passportNumber.length;

    if (oldPassportTemplate && length !== 6) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Номер паспорту має містити 6 цифр',
        path: ['passportNumber'],
      });
    } else if (!oldPassportTemplate && length !== 9) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Номер паспорту має містити 9 цифр',
        path: ['passportNumber'],
      });
    }

    return ctx;
  });

export type TEntrantSchema = z.infer<typeof EntrantSchema>;
export type TPersonalDataSchema = z.infer<typeof PersonalDataSchema>;
