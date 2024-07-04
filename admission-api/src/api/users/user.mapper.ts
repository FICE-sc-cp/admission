import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserMapper {
  getUser (user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      role: user.role,
    };
  }
}
