import { ProductService } from './product.service';
import { Body, Controller, Post } from "@nestjs/common";
import { ProductDto } from './dto';
//
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    saveProduct(@Body() productDto: ProductDto) {
        console.log('Creating new product:', productDto);
        return this.productService.saveProduct(productDto);
    }

}