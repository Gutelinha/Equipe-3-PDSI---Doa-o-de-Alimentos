import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { ProductDto } from "./dto";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    private async findByPrimaryKey(barcode: string): Promise<ProductModel> {
        return this.prisma.produto.findUnique({
            where: {codigo_barras: barcode}
        });
    } 

    async save(productDto: ProductDto): Promise<ProductModel> {
        console.log(`Creating new product:`, productDto);

        const productAlreadyExists = await this.findByPrimaryKey(productDto.barcode);
        if(productAlreadyExists){
            console.log(`Product already exists`);
            throw new BadRequestException(`O produto de código de barras '${productDto.barcode}' já foi cadastrado`)
        }

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
        const foundProduct = await this.findByPrimaryKey(barcode);

        if(!foundProduct){
            console.log(`Product not found`)
            throw new NotFoundException(`Nenhum produto com código de barras '${barcode}' foi encontrado`);
        }

        console.log(`Product found:`, foundProduct);
        return foundProduct;
    }

    async deleteByBarcode(barcode: string): Promise<void> {
        console.log(`Deleting product with barcode: '${barcode}'`)

        const product = await this.prisma.produto.delete({
            where: {codigo_barras: barcode}
        })

        console.log(`Product deleted:`, product);
    }
    
}