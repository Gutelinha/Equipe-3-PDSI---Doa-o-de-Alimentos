import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "../config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "../config/exception/filter/prisma.exception.filter";
import { ProductService } from './product.service';
import { ProductCreateInputDto, ProductUpdateInputDto, ProductOutputDto, ProductDeleteOutputDto } from './dto';
import { ProductMapper } from './product.mapper';

@Controller('products')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly productMapper: ProductMapper
    ) {}

    @Post()
    async saveProduct(@Body() createInput: ProductCreateInputDto): Promise<ProductOutputDto> {
        const createdProduct = await this.productService.create(createInput);
        return this.productMapper.toOutput(createdProduct);
    }

    @Get(':barcode')
    async findProductByBarcode(@Param('barcode') barcode: string): Promise<ProductOutputDto> {
        const foundProduct = await this.productService.findByBarcode(barcode);
        return this.productMapper.toOutput(foundProduct);
    }

    @Put(':barcode')
    async updateProductByBarcode(@Param('barcode') barcode: string, @Body() updateInput: ProductUpdateInputDto): Promise<ProductOutputDto> {
        const updatedProduct = await this.productService.updateByBarcode(barcode, updateInput);
        return this.productMapper.toOutput(updatedProduct);
    }

    @Delete(':barcode')
    async deleteProductByBarcode(@Param('barcode') barcode: string): Promise<ProductDeleteOutputDto> {
        const deletedProduct = await this.productService.deleteByBarcode(barcode);
        return this.productMapper.toDeleteOutput(deletedProduct, "Produto removido com sucesso");
    }
}