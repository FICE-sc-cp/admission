import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch (exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    let error = 'Internal Server Error';
    let validations = undefined;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as any;
      status = exception.getStatus();
      error = errorResponse.message;

      if (Array.isArray(errorResponse.message)) {
        error = 'Invalid request data';
        validations = errorResponse.message;
      }
    }

    reply
      .status(status)
      .send({ error, validations });

    this.logger.error(exception.stack);
  }
}
