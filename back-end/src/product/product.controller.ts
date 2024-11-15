import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@Controller('products')
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
    deleteProductByBarcode(@Param('barcode') barcode: string): void {
        this.productService.deleteByBarcode(barcode);
    }

}