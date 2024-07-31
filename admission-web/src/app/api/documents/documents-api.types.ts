export interface DocumentsApiBody {
  id?: string;
  state?: State;
  number?: string;
  date?: string | null;
  degree: Degree;
  educationalProgram: string | null;
  programType: ProgramType | null;
  paymentType: PaymentType | null;
  specialty: string | null;
  studyForm: StudyForm;
  fundingSource: FundingSource;
  priorityDate: string;
  userId: string;
  priorities: Priorities[];
}

interface Priorities {
  number: number;
  program: string;
}

enum Degree {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
}
enum ProgramType {
  PROFESSIONAL = 'PROFESSIONAL',
  SCIENTIFIC = 'SCIENTIFIC',
}

enum PaymentType {
  QUARTERLY = 'QUARTERLY',
  SEMESTERLY = 'SEMESTERLY',
  MONTHLY = 'MONTHLY',
}

enum StudyForm {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
}

enum FundingSource {
  BUDGET = 'BUDGET',
  CONTRACT = 'CONTRACT',
}

export enum State {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}
