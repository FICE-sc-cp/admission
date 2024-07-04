import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponse {
  @ApiProperty({ description: 'User id' })
    id: string;

  @ApiProperty({ description: 'User email' })
    email: string;

  @ApiProperty({ description: 'User first name' })
    firstName: string;

  @ApiProperty({ description: 'User middle name' })
    middleName: string;

  @ApiProperty({ description: 'User last name' })
    lastName: string;

  @ApiProperty({
    description: 'User role',
    enum: Role,
  })
    role: Role;
}