import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config from '../configuration/configuration';
import { DocumentModule } from './documents/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    AuthModule,
    DocumentModule,
  ],
})
export class AppModule {}
