import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { CookieUtils } from '../../../globals/cookie-utils';
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
    const nodeEnv = this.configService.get<string>('nodeEnv');

    if (nodeEnv !== 'production') return true;

    const request = context.switchToHttp().getRequest();
    const token = CookieUtils.getSessionToken(request);
    if (!token) throw new UnauthorizedException();

    const user = await this.userRepo.find({
      tokens: {
        some: {
          value: token,
          type: TokenType.SESSION,
        },
      },
    });

    if (!user) throw new UnauthorizedException();
    await this.checkToken(token);

    request.user = user;

    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;

    const isCorrectRole = roles.some((role: Role) => role === user.role);
    if (!isCorrectRole) throw new ForbiddenException();

    return true;
  }

  private async checkToken (token: string) {
    const { createdAt } = await this.tokenRepo.findByValue(token);
    const sessionTtl = this.configService.get<number>('sessionTtl');
    if (Date.now() - createdAt.getTime() > sessionTtl) {
      throw new UnauthorizedException();
    }
  }
}
