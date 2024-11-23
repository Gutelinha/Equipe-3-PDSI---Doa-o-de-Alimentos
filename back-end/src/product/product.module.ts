import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductMapper } from './product.mapper';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ProductMapper],
})
export class ProductModule {}
