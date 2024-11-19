import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { ProductService } from './product.service';
import { SaveProductDto, UpdateProductDto } from './dto';
import { GlobalExceptionFilter } from "src/config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "src/config/exception/filter/prisma.exception.filter";
import { ResponseMessageDto } from "src/common";

@Controller('products')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    saveProduct(@Body() productDto: SaveProductDto): Promise<ProductModel> {
        return this.productService.save(productDto);
    }

    @Get(':barcode')
    findProductByBarcode(@Param('barcode') barcode: string): Promise<ProductModel> {
        return this.productService.findByBarcode(barcode);
    }

    @Put(':barcode')
    updateProductByBarcode(@Param('barcode') barcode: string, @Body() productDto: UpdateProductDto): Promise<ProductModel> {
        return this.productService.update(barcode, productDto);
    }

    @Delete(':barcode')
    deleteProductByBarcode(@Param('barcode') barcode: string): Promise<ResponseMessageDto> {
        return this.productService.deleteByBarcode(barcode);
    }

}