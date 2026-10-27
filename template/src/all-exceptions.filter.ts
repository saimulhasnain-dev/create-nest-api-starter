import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

// One error shape for every failure: { error: { statusCode, message, requestId? } }. 5xx details stay in the logs.
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exceptions');

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: unknown = 'Internal server error';
    if (exception instanceof HttpException) {
      const r = exception.getResponse();
      message = typeof r === 'string' ? r : (r as any).message ?? exception.message;
    } else {
      this.logger.error(exception instanceof Error ? exception.stack : String(exception));
    }
    res.status(status).json({ error: { statusCode: status, message } });
  }
}
