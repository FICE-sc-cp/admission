import { DocumentState, EducationalDegree, EducationalProgramType, EducationProgram, FundingSource, PaymentType, Specialty, StudyForm } from '@prisma/client';
import { Optional } from 'src/globals/decorators';
import { CreatePriorityDto } from './create-priority.dto';

export class UpdateContractDto {
  @Optional({
    type: 'enum',
    enum: DocumentState,
  })
    state?: DocumentState;
  
  @Optional()
    number?: string;
  
  @Optional()
    date?: string;
  
  @Optional({
    type: 'enum',
    enum: EducationalDegree,
  })
    degree?: EducationalDegree;
  
  @Optional({
    type: 'enum',
    enum: EducationProgram,
  })
    educationalProgram?: EducationProgram;
  
  @Optional({
    type: 'enum',
    enum: EducationalProgramType,
  })
    programType?: EducationalProgramType;
  
  @Optional({
    type: 'enum',
    enum: PaymentType,
  })
    paymentType?: PaymentType;
  
  @Optional({
    type: 'enum',
    enum: Specialty,
  })
    specialty?: Specialty;
  
  @Optional({
    type: 'enum',
    enum: StudyForm,
  })
    studyForm?: StudyForm;
  
  @Optional({
    type: 'enum',
    enum: FundingSource,
  })
    fundingSource?: FundingSource;

  @Optional({
    type: 'enum',
    enum: DocumentState,
  })
    priorityState?: DocumentState;

  @Optional()
    priorityDate?: string;

  @Optional({
    type: CreatePriorityDto,
    isArray: true,
  })
    priorities?: CreatePriorityDto[];
}