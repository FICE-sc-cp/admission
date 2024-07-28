export type Contract = {
  id: string;
  state: string;
  number: string;
  date: string;
  degree: string;
  educationalProgram: string;
  programType: string;
  paymentType: string;
  specialty: string;
  studyForm: string;
  fundingSource: string;
  priorityState: string;
  priorityDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  priorities: Priority[];
};

export type Priority = {
  contractId: string;
  number: number;
  program: string;
  createdAt: string;
  updatedAt: string;
};

export type Entrant = {
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
};

export type Representative = {
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
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: string;
  benefit: boolean;
  competitivePoint: number;
  telegramId: bigint;
  expectedSpecialities: string;
  isDorm: boolean;
  printedEdbo: boolean;
  phone: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  contracts: Contract[];
  entrantData?: Entrant;
  representativeData?: Representative;
  customerData?: Representative;
};
