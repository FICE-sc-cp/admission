export type Contract = {
  id: string;
  state: string;
  number: string;
  date: string;
  degree: string;
  educationalProgram: string;
  programType: string | null;
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
