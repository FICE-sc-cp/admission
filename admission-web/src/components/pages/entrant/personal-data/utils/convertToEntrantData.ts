import { TEntrantSchema } from '@/lib/schemas/personal-data.schemas';
import { Entrant } from '@/lib/types/entrant.types';

export function convertToEntrantData(
  data: TEntrantSchema
): Omit<Entrant, 'userId'> {
  const region = data.region;
  return {
    email: data.email,
    passportSeries: data.oldPassportTemplate ? data.passportSeries : null,
    passportNumber: data.passportNumber,
    passportInstitute: data.passportInstitute,
    passportDate: data.passportDate,
    phoneNumber: data.phoneNumber,
    idCode: data.idCode,
    region: region === 'м. Київ' ? null : region,
    settlement: region === 'м. Київ' ? region : data.settlement,
    address: data.address,
    index: data.index,
    createdAt: new Date(),
    updatedAt: new Date(),
    oldPassportTemplate: data.oldPassportTemplate,
  };
}
