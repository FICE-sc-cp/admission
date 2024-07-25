import { Optional } from '@nestjs/common';

export class UpdateQueueDto {
  @Optional()
    opened?: boolean;
}
