import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailOptionsDto } from './dto/email-options.dto';

@Injectable()
export class EmailService {
  constructor (
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail ({ to, subject, message, link }: EmailOptionsDto) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: path.resolve('./email/templates/template.hbs'),
      context: { message, link },
    });
  }
}