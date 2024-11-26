import { Catch, ArgumentsHost, HttpStatus, ExceptionFilter } from '@nestjs/common';;
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

	catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		let responseBody: {
            message: string,
            error: string,
            statusCode: number,
            timestamp?: string
        };
		
		switch (exception.code) {
			case 'P2002':
                responseBody = {
                    message: `${this.getModelName(request.url)} já existe`,
                    error: "Bad Request",
                    statusCode: HttpStatus.BAD_REQUEST
                };
                console.log(`Error: Entity already exists`)
				break;

			case 'P2025':
                responseBody = {
                    message: `${this.getModelName(request.url)} não encontrado`,
                    error: "Not Found",
                    statusCode: HttpStatus.NOT_FOUND
                };
                console.log(`Error: Entity not found`)
                break;

			default:
                responseBody = {
                    message: `Erro desconhecido do Prisma: ${exception.message}`,
                    error: "Internal Server Error",
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toISOString()
                };
                console.log(`Prisma Error: ${exception.message}`)
		}
	
		response.status(responseBody.statusCode).json(responseBody);
	}

    private getModelName(requestUrl: string): string {
        if(requestUrl.includes('/products'))
            return "Produto";

        if(requestUrl.includes('/campaigns'))
            return 'Campanha';

        return "Recurso"
    }

}