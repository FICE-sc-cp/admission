import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserDto } from '../../users/dtos/user.dto';
import { Request } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class AdminOrMeGuard implements CanActivate {
  constructor () {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user: UserDto }>();
    const user = request.user;

    if (!user) return false;

    return user.role === Role.ADMIN || request.params['userId'] === user.id;
  }
}
