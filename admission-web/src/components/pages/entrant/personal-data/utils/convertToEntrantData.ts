import { TEntrantSchema } from '@/lib/schemas/personal-data.schemas';
import { Entrant } from '@/lib/types/entrant.types';

export function convertToEntrantData(
  data: TEntrantSchema
): Omit<Entrant, 'userId'> {
  return {
    email: data.email,
    passportSeries: data.oldPassportTemplate ? data.passportSeries : null,
    passportNumber: data.passportNumber,
    passportInstitute: data.passportInstitute,
    passportDate: data.passportDate,
    phoneNumber: data.phoneNumber,
    idCode: data.idCode,
    region: data.region,
    settlement: data.settlement,
    address: data.address,
    index: data.index,
    createdAt: new Date(),
    updatedAt: new Date(),
    submission_in_corpus: data.submission_in_corpus,
    oldPassportTemplate: data.oldPassportTemplate,
  };
}
