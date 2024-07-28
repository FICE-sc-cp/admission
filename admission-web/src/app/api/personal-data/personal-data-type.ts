import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';

export interface PersonalDataBody {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  entrantData: Entrant | null;
  representativeData: Representative | null;
  customerData: Representative | null;
}

interface Representative {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  passportSeries: string;
  passportNumber: string;
  passportInstitute: string;
  passportDate: string;
  phoneNumber: string;
  idCode: string;
  region: string;
  settlement: string;
  address: string;
  index: string;
}

interface Entrant {
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
}

export interface GetPersonalData {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  benefit: boolean;
  competitivePoint: number;
  telegramId: number;
  expectedSpecialities: string;
  isDorm: boolean;
  printedEdbo: boolean;
  confirmedStudyPlace: boolean;
  phone: string;
  username: string;
  contracts: DocumentsApiBody;
  entrantData: Entrant;
  representativeData: Representative;
  customerData: Representative;
}
