import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserRepo } from 'src/database/repo/user.repo';
import { USER_WITH_SUCH_ID_DOES_NOT_EXIST_MSG } from '../constants';

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private readonly userRepo: UserRepo,
  ) {}

  async transform (entrantId: string): Promise<string> {
    const user = await this.userRepo.find({ id: entrantId });
    if (!user) {
      throw new BadRequestException(USER_WITH_SUCH_ID_DOES_NOT_EXIST_MSG);
    }
    return entrantId;
  }
}
