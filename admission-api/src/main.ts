import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './globals/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from '@fastify/cookie';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap () {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Admission API Documentation')
    .setDescription('Documentation for the Admission Service')
    .setVersion('1.0')
    .addCookieAuth('session')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');

  app.enableCors({
    origin: ['http://localhost:3000', configService.get<string>('frontendUrl')],
    credentials: true,
  });

  await app.listen(port, '0.0.0.0', () => console.info(`Server started on PORT: ${port}`));
}

bootstrap();
