import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { resolve } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigurationModule } from '../../configuration/configuration.module';
import { SmtpConfiguration } from '../../configuration/smtp-configuration';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (smtpConfiguration: SmtpConfiguration) => {
        return {
          transport: {
            host: smtpConfiguration.host,
            secure: false,
            auth: {
              user: smtpConfiguration.username,
              pass: smtpConfiguration.password,
            },
          },
          defaults: {
            from: '"FICE Advisor" <noreply@ficeadvisor.com>',
          },
          template: {
            dir: resolve(process.env.LAMBDA_TASK_ROOT, 'admission-api/email/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [SmtpConfiguration],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}