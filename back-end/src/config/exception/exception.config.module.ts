import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filter/global.exception.filter';
import { PrismaExceptionFilter } from './filter/prisma.exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }, 
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    }
  ],
})
export class ExceptionConfigModule {}
