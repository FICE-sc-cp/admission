import { TPersonalDataSchema } from '@/lib/schemas/personal-data.schemas';
import { PersonalData } from '@/lib/types/entrant.types';

export function convertToPersonalData(
  data: TPersonalDataSchema
): Omit<PersonalData, 'userId'> {
  const region = data.region;
  return {
    ...data,
    region: region === 'м. Київ' ? null : region,
    settlement: region === 'м. Київ' ? region : data.settlement,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
