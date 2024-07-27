export interface PersonalDataBody {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  expectedSpecialities: string;
  isDorm: boolean;
  printedEdbo: boolean;
  confirmedStudyPlace: boolean;
  phone: string;
  entrantData: Entrant | null;
  representativeData: Representative | null;
  customerData: Representative | null;
}

interface Representative {
  id: string;
  userId: string;
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
}
