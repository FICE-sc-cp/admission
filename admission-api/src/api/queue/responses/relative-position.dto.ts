import { QueuePositionDto } from '../dtos/queue-position.dto';
import { Required } from '../../../globals/decorators';
import { UserDto } from '../../users/dtos/user.dto';
import { OmitType } from '@nestjs/swagger';

export class RelativePositionDto extends QueuePositionDto {
  @Required({
    type: OmitType(UserDto, ['customerData', 'representativeData', 'contracts', 'entrantData']),
  })
    user: Omit<UserDto, 'customerData' | 'representativeData' | 'entrantData' | 'contracts'>;
}
