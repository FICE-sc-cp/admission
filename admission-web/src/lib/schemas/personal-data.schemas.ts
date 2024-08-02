import { z } from 'zod';
import { dateRegex, kirillicRegex, ukRegex } from '@/lib/constants/regex';
import { transformApostrophe, transformNullableApostrophe } from '@/lib/utils/transformApostrophe';
import {
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  middleNameSchema,
  phoneNumberSchema,
} from './common.schemas';
import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { StudyForm } from '$/utils/src/enums/StudyFormEnum';

// common schemas for both entrant and personal data
const newPassportInstituteSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .regex(/^\d{4}$/, 'Орган видачі має містити 4 цифри');

const passportSeriesSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .length(2, 'Серія паспорту має містити 2 символи')
  .regex(
    kirillicRegex,
    'Серія паспорту має містити кириличні літери верхнього регістру'
  )
  .nullable()
  .default(null);

const idCodeSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .nullable()
  .refine((value) => value === null || /^[0-9]{10}$/.test(value), {
    message: 'РНОКПП має містити 10 цифр',
  });

const passportDateSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .regex(dateRegex, 'Має бути формату dd.mm.yyyy');

export const regionSchema = z
  .string({
    required_error: 'Будь ласка оберіть регіон',
  })
  .nullable();

export const settlementSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .nullable()
  .refine((value) => value === null || ukRegex.test(value), {
    message: 'Має містити українські літери, апостроф або дефіс'
  })
  .transform(transformNullableApostrophe)
  .default(null);

export const addressSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
  .transform(transformApostrophe);

export const indexSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .refine((value) => /^[0-9]{5}$/.test(value), {
    message: 'Має містити 5 цифр',
  });

export const oldPassportNumberTemplate = z
  .string({ required_error: "Обов'язкове поле" })
  .refine((value) => /^[0-9]{6}$/.test(value), {
    message: 'Має містити 6 цифр',
  });

export const newPassportNumberTemplate = z
  .string({ required_error: "Обов'язкове поле" })
  .refine((value) => /^[0-9]{9}$/.test(value), {
    message: 'Має містити 9 цифр',
  });

export const commonSchema = {
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  passportDate: passportDateSchema,
  passportSeries: passportSeriesSchema,
  idCode: idCodeSchema,
  region: regionSchema,
  settlement: settlementSchema,
  address: addressSchema,
  index: indexSchema,
}

export const commonEntrantSchema = {
  ...commonSchema,
  study_type: z.nativeEnum(FundingSource).default(FundingSource.BUDGET),
  study_form: z.nativeEnum(StudyForm).default(StudyForm.FULL_TIME),
  submission_in_corpus: z.boolean().default(false),
}

export const oldPassportTemplate = z
  .object({
    ...commonEntrantSchema,
    passportNumber: oldPassportNumberTemplate,
    passportInstitute: z.string({ required_error: "Обов'язкове поле" }),
    oldPassportTemplate: z.literal(true),
  })

export const newPassportTemplate = z
  .object({
    ...commonEntrantSchema,
    passportNumber: newPassportNumberTemplate,
    passportInstitute: newPassportInstituteSchema,
    oldPassportTemplate: z.literal(false),
  })

export const EntrantSchema = z.discriminatedUnion('oldPassportTemplate', [oldPassportTemplate, newPassportTemplate]);

export const commonPersonalDataSchema = {
  ...commonSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  middleName: middleNameSchema,
}

export const oldPassportPersonalTemplate = z
  .object({
    ...commonPersonalDataSchema,
    passportNumber: oldPassportNumberTemplate,
    passportInstitute: z.string({ required_error: "Обов'язкове поле" }),
    oldPassportTemplate: z.literal(true),
  });

export const newPassportPersonalTemplate = z
  .object({
    ...commonPersonalDataSchema,
    passportNumber: newPassportNumberTemplate,
    passportInstitute: newPassportInstituteSchema,
    oldPassportTemplate: z.literal(false),
  });

// personal data schema for both representative and customer
export const PersonalDataSchema = z.discriminatedUnion('oldPassportTemplate', [oldPassportPersonalTemplate, newPassportPersonalTemplate]);

export type TEntrantSchema = z.infer<typeof EntrantSchema>;
export type TPersonalDataSchema = z.infer<typeof PersonalDataSchema>;
