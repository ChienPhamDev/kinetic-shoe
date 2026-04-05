// filters/global-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // không tham số = bắt TẤT CẢ exception
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Xác định status và message
    let status: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      // Lỗi NestJS có sẵn (404, 400, 401...)
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof Error) {
      // Lỗi runtime: null reference, DB crash...
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Đã có lỗi xảy ra, vui lòng thử lại';

      // Log full error để debug — KHÔNG trả ra client
      this.logger.error(`${request.method} ${request.url}`, exception.stack);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Lỗi không xác định';
    }

    // Format response nhất quán
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      // requestId: request.headers['x-request-id'], // tracking
    });
  }
}
