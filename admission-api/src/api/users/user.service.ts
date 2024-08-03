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
        upsert: {
          update: entrantData,
          create: entrantData,
        },
      } : undefined,
      representativeData: representativeData ? {
        upsert: {
          update: representativeData,
          create: representativeData,
        },
      } : undefined,
      customerData: customerData ? {
        upsert: {
          update: customerData,
          create: customerData,
        },
      } : undefined,
    });
  }

  getProfile (id: string) {
    return this.userRepo.find({ id });
  }

  getAll (query: GetUsersQuery) {
    return this.userRepo.findMany({}, query.take, query.skip, [{
      role: 'asc',
    }, {
      lastName: 'asc',
    }, {
      firstName: 'asc',
    }, {
      middleName: 'asc',
    }]);
  }

  deleteById (id: string) {
    return this.userRepo.deleteById(id);
  }
}
