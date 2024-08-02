import { z } from 'zod';
import { dateRegex, kirillicRegex, ukRegex } from '@/lib/constants/regex';
import { transformApostrophe } from '@/lib/utils/transformApostrophe';
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
const passportInstituteSchema = z
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
  .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
  .transform(transformApostrophe);

export const addressSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .regex(ukRegex, 'Має містити українські літери, апостроф або дефіс')
  .transform(transformApostrophe);

export const indexSchema = z
  .string({ required_error: "Обов'язкове поле" })
  .refine((value) => /^[0-9]{5}$/.test(value), {
    message: 'Має містити 5 цифр',
  });

// entrant schema
export const EntrantSchema = z
  .object({
    phoneNumber: phoneNumberSchema,
    email: emailSchema,
    passportNumber: z.string({ required_error: "Обов'язкове поле" }),
    passportDate: passportDateSchema,
    passportInstitute: passportInstituteSchema,
    passportSeries: passportSeriesSchema,
    idCode: idCodeSchema,
    region: regionSchema,
    settlement: settlementSchema,
    address: addressSchema,
    index: indexSchema,
    study_type: z.nativeEnum(FundingSource).default(FundingSource.BUDGET),
    study_form: z.nativeEnum(StudyForm).default(StudyForm.FULL_TIME),
    submission_in_corpus: z.boolean().default(false),
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

// personal data schema for both representative and customer
export const PersonalDataSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    middleName: middleNameSchema,
    email: emailSchema,
    phoneNumber: phoneNumberSchema,
    passportNumber: z.string({ required_error: "Обов'язкове поле" }),
    passportDate: passportDateSchema,
    passportInstitute: passportInstituteSchema,
    passportSeries: passportSeriesSchema,
    idCode: idCodeSchema,
    region: regionSchema,
    settlement: settlementSchema,
    address: addressSchema,
    index: indexSchema,
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
