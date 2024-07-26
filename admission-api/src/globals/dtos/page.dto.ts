import { Optional } from '../decorators';
import { Transform } from 'class-transformer';

export class PageDto {
  @Optional()
  @Transform(({ value }) => +value)
    take: number;

  @Optional()
  @Transform(({ value }) => +value)
    skip: number;
}
