import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramGuard implements CanActivate {
  constructor (
    private readonly configService: ConfigService,
  ) {}

  canActivate (context: ExecutionContext)  {
    const request = context.switchToHttp().getRequest();
    const header: string = request.headers.authorization ?? '';

    if (header !== `Telegram ${this.configService.get<string>('botToken')}`) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
