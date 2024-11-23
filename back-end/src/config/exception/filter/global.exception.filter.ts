import { Catch, ArgumentsHost, HttpStatus, HttpServer } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {

	handleUnknownError(exception: any, host: ArgumentsHost, applicationRef: AbstractHttpAdapter | HttpServer): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody = {
			status: httpStatus,
			timestamp: new Date().toISOString(),
			message: `Erro desconhecido: ${exception.message}`
		}

		response.status(httpStatus).json(responseBody);
	}

}