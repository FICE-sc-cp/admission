import { Injectable } from '@nestjs/common';
import { UserRepo } from '../../database/repo/user.repo';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepo: UserRepo
  ) {}

  updateById (id: string, user: UpdateUserDto) {
    const { entrantData, representativeData, customerData, ...data } = user;
    return this.userRepo.updateById(id, {
      ...data,
      entrantData: {
        delete: true,
        create: entrantData,
      },
      representativeData: {
        delete: true,
        create: representativeData,
      },
      customerData: {
        delete: true,
        create: customerData,
      },
    });
  }

  getProfile (id: string) {
    return this.userRepo.find({ id });
  }

  getAll () {
    //TODO calling user repo with pagination
  }
}
