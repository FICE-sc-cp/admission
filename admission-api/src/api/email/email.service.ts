import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailOptionsDto } from './dto/email-options.dto';

@Injectable()
export class EmailService {
  constructor (
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail ({ to, subject, message, link, attachments }: EmailOptionsDto) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: 'template',
      context: { message, link },
      attachments: attachments?.map(({ name, buffer, contentType }) => ({
        filename: name,
        content: buffer,
        contentType,
      })),
    });
  }
}