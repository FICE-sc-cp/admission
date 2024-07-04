import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @ApiProperty({ description: 'Email token' })
  @IsNotEmpty({ message: 'Token is required' })
    token: string;
}
