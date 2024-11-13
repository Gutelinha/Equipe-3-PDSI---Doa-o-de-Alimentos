import { Injectable } from "@nestjs/common";
import { ProductDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async saveProduct(productDto: ProductDto) {
        const product = await this.prisma.produto.create({
            data: {
                codigo_barras: productDto.barcode,
                nome: productDto.name,
                marca: productDto.brand,
                tipo: productDto.type,
                unidade_volume: productDto.volumeUnit
            }
        });
        return product;
    }
    
}