import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { UserRepo } from '../../../database/repo/user.repo';
import { Role, TokenType } from '@prisma/client';
import { TokenRepo } from '../../../database/repo/token.repo';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector,
    private readonly userRepo: UserRepo,
    private readonly tokenRepo: TokenRepo,
    private readonly configService: ConfigService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['session'];

    if (!token) return false;

    const user = await this.userRepo.find({
      tokens: {
        some: {
          value: token,
          type: TokenType.SESSION,
        },
      },
    });

    if (!user) return false;
    if (!(await this.checkToken(token))) return false;

    request.user = user;

    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;

    return roles.some((role: Role) => role === user.role);
  }

  private async checkToken (token: string) {
    const { createdAt } = await this.tokenRepo.findByValue(token);
    const sessionTtl = this.configService.get<number>('sessionTtl');
    return Date.now() - createdAt.getTime() <= sessionTtl;
  }
}
