import { PersonalDataBody } from '@/app/api/personal-data/personal-data-type';
import { RegionExceptions } from '@/lib/constants/regions';
import { TPersonalDataSchema } from '@/lib/schemas/personal-data.schemas';

export function convertToPersonalDataInAdmin(
  entrantData: TPersonalDataSchema,
  representativeData: TPersonalDataSchema,
  customerData: TPersonalDataSchema
): PersonalDataBody {
  const entrantRegion = entrantData.region;
  const entrantSettlement = entrantData.settlement;

  const representativeRegion = representativeData.region;
  const representativeSettlement = representativeData.settlement;

  const customerRegion = customerData.region;
  const customerSettlement = customerData.settlement;

  return {
    email: entrantData.email,
    firstName: entrantData.firstName,
    middleName: entrantData.middleName,
    lastName: entrantData.lastName,
    entrantData: entrantData && {
      ...entrantData,
      updatedAt: new Date(),
      region:
        entrantRegion === RegionExceptions.Kyiv ||
        entrantRegion === RegionExceptions.Sevastopol
          ? null
          : entrantRegion,
      settlement:
        entrantRegion === RegionExceptions.Kyiv ||
        entrantRegion === RegionExceptions.Sevastopol
          ? entrantRegion
          : entrantSettlement,
    },
    customerData: customerData?.firstName
      ? {
          ...customerData,
          updatedAt: new Date(),
          region:
            customerRegion === RegionExceptions.Kyiv ||
            customerRegion === RegionExceptions.Sevastopol
              ? null
              : customerRegion,
          settlement:
            customerRegion === RegionExceptions.Kyiv ||
            customerRegion === RegionExceptions.Sevastopol
              ? customerRegion
              : customerSettlement,
        }
      : null,
    representativeData: representativeData?.firstName
      ? {
          ...representativeData,
          updatedAt: new Date(),
          region:
            representativeRegion === RegionExceptions.Kyiv ||
            representativeRegion === RegionExceptions.Sevastopol
              ? null
              : representativeRegion,
          settlement:
            representativeRegion === RegionExceptions.Kyiv ||
            representativeRegion === RegionExceptions.Sevastopol
              ? representativeRegion
              : representativeSettlement,
        }
      : null,
  };
}
