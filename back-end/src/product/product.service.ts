import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProductDto } from "./dto";
import { produto as ProductModel } from "@prisma/client";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async saveProduct(productDto: ProductDto): Promise<ProductModel> {
        console.log(`Creating new product:`, productDto);

        const savedProduct = await this.prisma.produto.create({
            data: {
                codigo_barras: productDto.barcode,
                nome: productDto.name,
                marca: productDto.brand,
                tipo: productDto.type,
                unidade_volume: productDto.volumeUnit
            }
        });

        console.log(`Product created! Barcode: '${savedProduct.codigo_barras}'`);
        return savedProduct;
    }

    async findProductByBarcode(barcode: string): Promise<ProductModel> {
        console.log(`Searching for product with barcode: "${barcode}"`)

        const foundProduct = await this.prisma.produto.findUnique({
            where: {codigo_barras: barcode}
        });

        if(!foundProduct){
            console.log(`Product not found`)
            throw new NotFoundException(`Product with barcode '${barcode}' not found`);
        }

        console.log(`Product found:`, foundProduct);
        return foundProduct;
    }   
    
}