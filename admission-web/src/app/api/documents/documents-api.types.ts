import { mimeType } from '@/lib/types/documents.types';
import { StudyForm } from '$/utils/src/enums/StudyFormEnum';
import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { PaymentType } from '$/utils/src/enums/PaymentTypeEnum';
import { EducationalProgramType } from '$/utils/src/enums/EducationalProgramTypeEnum';
import { EducationalDegree } from '$/utils/src/enums/EducationalDegreeEnum';
import { DocumentState } from '$/utils/src/enums/DocumentStateEnum';
import { Specialities } from '@/lib/types/specialities.types';

export interface DocumentsApiBody {
  id: string;
  state: DocumentState;
  number: string;
  date: string | null;
  degree: EducationalDegree;
  educationalProgram: string | null;
  programType: EducationalProgramType | null;
  paymentType: PaymentType | null;
  specialty: Specialities | null;
  studyForm: StudyForm;
  fundingSource: FundingSource;
  priorityDate: string;
  userId: string;
  priorities: Priorities[];
}

export interface DownloadDocument {
  data: mimeType;
}

interface Priorities {
  number: number;
  program: string;
}
