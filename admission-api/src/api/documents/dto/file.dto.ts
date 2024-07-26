import { Required } from '../../../globals/decorators';

export class FileDto {
  @Required()
    fileName: string;

  @Required()
    contentType: string;

  @Required()
    data: Buffer;
}
