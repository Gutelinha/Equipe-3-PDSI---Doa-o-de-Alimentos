import { Product } from 'src/product/interfaces/product.interface';
import { ProductService } from './product.service';
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    saveProduct(@Body() product: Product) {
        return this.productService.saveProduct(product);
    }

}