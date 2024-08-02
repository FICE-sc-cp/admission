import { TPersonalDataSchema } from '@/lib/schemas/personal-data.schemas';
import { PersonalData } from '@/lib/types/entrant.types';

export function convertToPersonalData(
  data: TPersonalDataSchema
): Omit<PersonalData, 'userId'> {
  return {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
