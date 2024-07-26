import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../users/dtos/user.dto';
import { Request } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class AdminOrMeGuard implements CanActivate {
  constructor (
    private readonly configService: ConfigService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const nodeEnv = this.configService.get<string>('nodeEnv');

    if (nodeEnv === 'local') return true;

    const request = context.switchToHttp().getRequest<Request & { user: UserDto }>();
    const user = request.user;

    if (!user) return false;

    return user.role === Role.ADMIN || request.params['userId'] === user.id;
  }
}
