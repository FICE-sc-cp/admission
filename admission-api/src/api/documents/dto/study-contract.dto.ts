import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EducationalDegreeEnum } from '../../../globals/enums/educational-degree.enum';
import { EducationalProgramTypeEnum } from '../../../globals/enums/educational-program-type.enum';
import { StudyTypeEnum } from '../../../globals/enums/study-type.enum';
import { StudyFormEnum } from '../../../globals/enums/study-form.enum';
import { PaymentTypeEnum } from '../../../globals/enums/payment-type.enum';

class MetaContractDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Degree cannot be empty' })
    degree: EducationalDegreeEnum;
  
  @ApiProperty()
  @IsOptional()
    educationalProgram?: string;
  
  @ApiProperty()
  @IsOptional()
    programType?: EducationalProgramTypeEnum;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'Specialty code cannot be empty' })
    specialty: string;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'Study type cannot be empty' })
    studyType: StudyTypeEnum;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'Study form cannot be empty' })
    studyForm: StudyFormEnum;
  
  @ApiPropertyOptional()
  @IsOptional()
    paymentType?: PaymentTypeEnum;
    
  @ApiProperty()
  @IsNotEmpty({ message: 'isToAdmission cannot be empty' })
    isToAdmission: boolean;
}
  
export class PersonalDataDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'First name cannot be empty' })
    firstName: string;
  
  @ApiPropertyOptional()
  @IsOptional()
    middleName?: string;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'Last name cannot be empty' })
    lastName: string;
  
  @ApiProperty()
    passportSeries: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Passport number cannot be empty' })
    passportNumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Passport Institute cannot be empty' })
    passportInstitute: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Passport date cannot be empty' })
    passportDate: string;

  @ApiPropertyOptional()
  @IsOptional()
    region: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Settlement cannot be empty' })
    settlement: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Address cannot be empty' })
    address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Index cannot be empty' })
    index: string;

  @ApiPropertyOptional()
  @IsOptional()
    idCode?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
    phoneNumber: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
    email: string;
}
  
export class StudyContractDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => PersonalDataDto)
    entrant: PersonalDataDto;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => PersonalDataDto)
    representative?: PersonalDataDto;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => PersonalDataDto)
    customer?: PersonalDataDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => MetaContractDto)
    meta: MetaContractDto;
}