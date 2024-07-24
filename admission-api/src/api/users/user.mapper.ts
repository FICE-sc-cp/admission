import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserMapper {
  getUser (user: UserDto) {
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
