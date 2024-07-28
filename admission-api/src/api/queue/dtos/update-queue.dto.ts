import { Optional } from '../../../globals/decorators';

export class UpdateQueueDto {
  @Optional()
    opened?: boolean;
}
