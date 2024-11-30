import { Catch, ArgumentsHost, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

	catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		
		switch (exception.code) {
			case 'P2002':
                this.uniqueKeyConstraintViolation(request, response);
				break;

            case 'P2003':
                this.foreignKeyConstraintViolation(response, exception.message);
                break;

			case 'P2025':
                this.recordDoesNotExistViolation(request, response);
                break;

			default:
                this.unknownPrismaError(response, exception.message);
                break;
		}
	}

    private uniqueKeyConstraintViolation(request: Request, response: Response) {
        const {modelName, alreadyExistsMessage} = this.getCustomErrorMessage(request.url);

        const responseBody = {
            message: `${alreadyExistsMessage}`,
            error: "Bad Request",
            statusCode: HttpStatus.BAD_REQUEST
        };

        console.log(`Error: ${modelName} already exists`);

        response.status(responseBody.statusCode).json(responseBody);
    }

    private foreignKeyConstraintViolation(response: Response, exceptionMessage: string) {
        const {foreignKey, responseMessage} = this.getForeignKeyData(exceptionMessage);

        const responseBody = {
            message: `${responseMessage}`,
            error: "Bad Request",
            statusCode: HttpStatus.BAD_REQUEST
        };

        console.log(`Error: Foreign key constraint violated - ${foreignKey}`);

        response.status(responseBody.statusCode).json(responseBody);
    }

    private recordDoesNotExistViolation(request: Request, response: Response) {
        const {modelName, notFoundMessage} = this.getCustomErrorMessage(request.url);

        const responseBody = {
            message: `${notFoundMessage}`,
            error: "Not Found",
            statusCode: HttpStatus.NOT_FOUND
        };

        console.log(`Error: ${modelName} not found`);

        response.status(responseBody.statusCode).json(responseBody);
    }

    private unknownPrismaError(response: Response, exceptionMessage: string) {
        const responseBody = {
            message: `Erro desconhecido do Prisma: ${exceptionMessage}`,
            error: "Internal Server Error",
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString()
        };

        console.log(`Prisma Error: ${exceptionMessage}`);

        response.status(responseBody.statusCode).json(responseBody);
    }

    private getCustomErrorMessage(requestUrl: string): {
        modelName: string,
        alreadyExistsMessage: string,
        notFoundMessage: string
    } {
        if(requestUrl.includes('/products')){
            return {
                modelName: 'Product',
                alreadyExistsMessage: 'Produto já existe',
                notFoundMessage: 'Produto não encontrado'
            };
        }

        if(requestUrl.includes('/campaigns')){
            return {
                modelName: 'Campaign',
                alreadyExistsMessage: 'Campanha já existe',
                notFoundMessage: 'Campanha não encontrada'
            };
        }

        if(requestUrl.includes('/donations')){
            return {
                modelName: 'Donation',
                alreadyExistsMessage: 'Doação já existe',
                notFoundMessage: 'Doação não encontrada'
            };
        }

        return {
            modelName: 'Record',
            alreadyExistsMessage: 'Recurso já existe',
            notFoundMessage: 'Recurso não encontrada'
        };
    }

    private getForeignKeyData(exceptionMessage: string): {
        foreignKey: string, 
        responseMessage: string
    } {
        if(exceptionMessage.includes('fk_produto'))
            return {foreignKey: 'FK_Produto', responseMessage: 'Produto não encontrado'};

        if(exceptionMessage.includes('fk_campanha'))
            return {foreignKey: 'FK_Campanha', responseMessage: 'Campanha não encontrada'};

        return {
            foreignKey: 'FK desconhecida',
            responseMessage: 'Chave estrangeira desconhecida não encontrada'
        };
    }

}