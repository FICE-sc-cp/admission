import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './globals/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import awsLambdaFastify, { PromiseHandler } from '@fastify/aws-lambda';
import fastifyCookie from '@fastify/cookie';
import * as fastify from 'fastify';

let cachedNestApp;

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap () {
  const instance: fastify.FastifyInstance = fastify();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
    { cors: true },
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
  await app.init();

  return instance;
}

export const handler = async (
  event,
  context,
): Promise<PromiseHandler> => {
  // If there's no cached app
  if (!cachedNestApp) {
    // Bootstrap
    const nestApp = await bootstrap();
    // Create an AWS Lambda Fastify cached app from the Nest app
    cachedNestApp = awsLambdaFastify(nestApp);
  }

  return cachedNestApp(event, context);
};
