import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DocumentRepo } from 'src/database/repo/document.repo';
import { CONTRACT_WITH_SUCH_ID_DOES_NOT_EXIST_MSG } from '../constants';

@Injectable()
export class ContractByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private readonly documentRepo: DocumentRepo,
  ) {}

  async transform (contractId: string): Promise<string> {
    const contract = await this.documentRepo.find({ id: contractId });
    if (!contract) {
      throw new BadRequestException(CONTRACT_WITH_SUCH_ID_DOES_NOT_EXIST_MSG);
    }
    return contractId;
  }
}
