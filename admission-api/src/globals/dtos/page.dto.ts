import { Optional } from '../decorators';

export class PageDto {
  @Optional()
    take: number;

  @Optional()
    skip: number;
}
