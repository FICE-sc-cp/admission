import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { Role } from '$/utils/src/enums/RolesEnum';

export interface PersonalData {
  userId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  passportSeries: string | null;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  phoneNumber: string;
  idCode: string | null;
  region: string | null;
  settlement: string;
  address: string;
  index: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends Omit<PersonalData, 'userId'> {
  id: string;
  role: Role;
  benefit: boolean;
  competitivePoint: number;
  telegramId: bigint;
  expectedSpecialities: string;
  isDorm: boolean;
  printedEdbo: boolean;
  confirmedStudyPlace: boolean;
  phone: string;
  username: string;
}

export interface Entrant
  extends Omit<PersonalData, 'middleName' | 'firstName' | 'lastName'> {
  oldPassportTemplate: boolean;
}
