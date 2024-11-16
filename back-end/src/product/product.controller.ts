import { Body, Controller, Delete, Get, Param, Post, UseFilters } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { GlobalExceptionFilter } from "src/config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "src/config/exception/filter/prisma.exception.filter";

@Controller('products')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    saveProduct(@Body() productDto: ProductDto): Promise<ProductModel> {
        return this.productService.save(productDto);
    }

    @Get(':barcode')
    findProductByBarcode(@Param('barcode') barcode: string): Promise<ProductModel> {
        return this.productService.findByBarcode(barcode);
    }

    @Delete(':barcode')
    deleteProductByBarcode(@Param('barcode') barcode: string): Promise<string> {
        return this.productService.deleteByBarcode(barcode);
    }

}