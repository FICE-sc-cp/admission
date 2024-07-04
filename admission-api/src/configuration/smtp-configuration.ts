import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmtpConfiguration {
  constructor (
    private readonly configService: ConfigService,
  ) {}

  get host (): string {
    return this.configService.get<string>('smtp.host');
  }

  get username (): string {
    return this.configService.get<string>('smtp.username');
  }

  get password (): string {
    return this.configService.get<string>('smtp.password');
  }
}
