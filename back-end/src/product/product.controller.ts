import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ProductService } from './product.service';
import { ProductOutputDto, SaveProductInputDto, UpdateProductInputDto } from './dto';
import { GlobalExceptionFilter } from "../config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "../config/exception/filter/prisma.exception.filter";
import { ResponseMessageDto } from "../common";

@Controller('products')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    saveProduct(@Body() input: SaveProductInputDto): Promise<ProductOutputDto> {
        return this.productService.save(input);
    }

    @Get(':barcode')
    findProductByBarcode(@Param('barcode') barcode: string): Promise<ProductOutputDto> {
        return this.productService.findByBarcode(barcode);
    }

    @Put(':barcode')
    updateProductByBarcode(@Param('barcode') barcode: string, @Body() input: UpdateProductInputDto): Promise<ProductOutputDto> {
        return this.productService.update(barcode, input);
    }

    @Delete(':barcode')
    deleteProductByBarcode(@Param('barcode') barcode: string): Promise<ResponseMessageDto> {
        return this.productService.deleteByBarcode(barcode);
    }

}