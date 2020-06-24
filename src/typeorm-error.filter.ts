import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface TypeOrmError {
  message: string;
  detail: string | string[];
}

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeOrmError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      message: exception.message,
      errors: exception.detail,
    });
  }
}
