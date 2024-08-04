import { RegionExceptions } from '@/lib/constants/regions';
import { TPersonalDataSchema } from '@/lib/schemas/personal-data.schemas';
import { PersonalData } from '@/lib/types/entrant.types';

export function convertToPersonalData(
  data: TPersonalDataSchema
): Omit<PersonalData, 'userId'> {
  const region = data.region;
  return {
    ...data,
    region:
      region === RegionExceptions.Kyiv || region === RegionExceptions.Sevastopol
        ? null
        : region,
    settlement:
      region === RegionExceptions.Kyiv || region === RegionExceptions.Sevastopol
        ? region
        : data.settlement,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
