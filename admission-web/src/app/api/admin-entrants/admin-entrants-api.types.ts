import { Contract } from '@/lib/types/contract.types';
import { Entrant, PersonalData, User } from '@/lib/types/entrant.types';

export interface AdminUser extends User {
  firstName: string;
  middleName: string | null;
  lastName: string;
  contracts: Contract[];
  entrantData: Entrant;
  representativeData: PersonalData;
  customerData: PersonalData;
}

export interface EntrantData {
  userId: string;
  passportSeries: string;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  phoneNumber: string;
  idCode: string;
  email: string;
  region: string;
  settlement: string;
  address: string;
  index: string;
  createdAt: string;
  updatedAt: string;
}
