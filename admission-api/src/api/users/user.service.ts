import { Injectable } from '@nestjs/common';
import { UserRepo } from '../../database/repo/user.repo';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GetUsersQuery } from './queries/get-users.query';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepo: UserRepo
  ) {}

  updateById (id: string, user: UpdateUserDto) {
    const { entrantData, representativeData, customerData, ...data } = user;
    return this.userRepo.updateById(id, {
      ...data,
      entrantData: entrantData ? {
        delete: true,
        create: entrantData,
      } : undefined,
      representativeData: representativeData ? {
        delete: true,
        create: representativeData,
      } : undefined,
      customerData: customerData ? {
        delete: true,
        create: customerData,
      } : undefined,
    });
  }

  getProfile (id: string) {
    return this.userRepo.find({ id });
  }

  getAll (query: GetUsersQuery) {
    return this.userRepo.findMany({}, query.take, query.skip);
  }

  deleteById (id: string) {
    return this.userRepo.deleteById(id);
  }
}
