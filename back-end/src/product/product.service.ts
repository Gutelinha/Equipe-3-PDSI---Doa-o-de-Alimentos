import { Injectable, NotFoundException } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { ProductDto } from "./dto";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async save(productDto: ProductDto): Promise<ProductModel> {
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

        console.log(`Product created!`);
        return savedProduct;
    }

    async findByBarcode(barcode: string): Promise<ProductModel> {
        console.log(`Searching for product with barcode: '${barcode}'`)

        const foundProduct = await this.prisma.produto.findUnique({
            where: {codigo_barras: barcode}
        });

        if(!foundProduct){
            console.log(`Product not found`)
            throw new NotFoundException(`Produto não encontrado`);
        }

        console.log(`Product found:`, foundProduct);
        return foundProduct;
    }

    async deleteByBarcode(barcode: string){
        console.log(`Deleting product with barcode: '${barcode}'`)

        const product = await this.prisma.produto.delete({
            where: {codigo_barras: barcode}
        })

        console.log(`Product deleted:`, product);
        return "Produto removido com sucesso";
    }
    
}