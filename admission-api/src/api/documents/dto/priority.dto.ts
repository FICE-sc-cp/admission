import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { EducationProgramEnum } from '../../../globals/enums/education-program.enum';

class PriorityListDto {
  @ApiPropertyOptional()
  @IsOptional()
    1?: EducationProgramEnum;
  
  @ApiPropertyOptional()
  @IsOptional()
    2?: EducationProgramEnum;
  
  @ApiPropertyOptional()
  @IsOptional()
    3?: EducationProgramEnum;
}
  
export class PriorityDto {
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
  @IsNotEmpty({ message: 'Specialty cannot be empty' })
    specialty: string;
  
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
    email: string;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'Day cannot be empty' })
    day: string;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'isToAdmission cannot be empty' })
    isToAdmission: boolean;
  
  @ApiProperty()
  @ValidateNested()
  @Type(() => PriorityListDto)
    priorities: PriorityListDto;
}