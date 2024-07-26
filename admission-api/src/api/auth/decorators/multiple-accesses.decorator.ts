import { SetMetadata } from '@nestjs/common';

export const MultipleAccesses = (...guards: any[]) =>
  SetMetadata('multipleAccesses', typeof guards === 'function' ? [guards] : guards);
