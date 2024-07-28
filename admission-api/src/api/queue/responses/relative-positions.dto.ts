import { Required } from '../../../globals/decorators';
import { RelativePositionDto } from './relative-position.dto';

export class RelativePositionsDto {
  @Required({
    type: RelativePositionDto,
    isArray: true,
  })
    positions: RelativePositionDto[];
}
