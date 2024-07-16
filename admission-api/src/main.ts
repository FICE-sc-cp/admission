import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './globals/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from '@fastify/cookie';

async function bootstrap () {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        credentials: true,
      },
    },
  );
  await app.register(fastifyCookie);
  app.useGlobalPipes(new ValidationPipe());
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

  await app.listen(port, () => console.info(`Server started on PORT: ${port}`));
}

bootstrap();
