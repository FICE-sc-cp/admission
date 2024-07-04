import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { EmailDto } from './email.dto';

export class RegistrationDto extends EmailDto {
  @ApiProperty({ description: 'User first name' })
  @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

  @ApiPropertyOptional({ description: 'User middle name' })
  @IsOptional()
    middleName?: string;

  @ApiProperty({ description: 'User last name' })
  @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;
}
