import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    saveProduct(@Body() productDto: ProductDto): Promise<ProductModel> {
        return this.productService.saveProduct(productDto);
    }

    @Get(':barcode')
    findProductByBarcode(@Param('barcode') barcode: string): Promise<ProductModel> {
        return this.productService.findProductByBarcode(barcode);
    }

}