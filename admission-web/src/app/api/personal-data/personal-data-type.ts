import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';
import { Entrant, PersonalData } from '@/lib/types/entrant.types';

export interface PersonalDataBody {
  email: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  entrantData: Omit<Entrant, 'userId' | 'createdAt'> | null;
  representativeData: Omit<PersonalData, 'userId' | 'createdAt'> | null;
  customerData: Omit<PersonalData, 'userId' | 'createdAt'> | null;
}

export interface GetPersonalData {
  id: string;
  email: string;
  firstName: string;
  middleName: string | null;
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
  contracts: DocumentsApiBody[];
  entrantData: Entrant;
  representativeData: PersonalData;
  customerData: PersonalData;
}
