import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserRepo } from 'src/database/repo/user.repo';
import { ENTRANT_WITH_SUCH_ID_DOES_NOT_EXIST_MSG, USER_WITH_SUCH_ID_DOES_NOT_EXIST_MSG } from '../constants';

@Injectable()
export class EntrantByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private readonly userRepo: UserRepo,
  ) {}

  async transform (entrantId: string): Promise<string> {
    const user = await this.userRepo.find({ id: entrantId });
    if (!user) {
      throw new BadRequestException(USER_WITH_SUCH_ID_DOES_NOT_EXIST_MSG);
    }
    if (user.role !== Role.ENTRANT) {
      throw new BadRequestException(ENTRANT_WITH_SUCH_ID_DOES_NOT_EXIST_MSG);
    }
    return entrantId;
  }
}
