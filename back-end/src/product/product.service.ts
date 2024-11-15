import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { ProductDto } from "./dto";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    private async findProductByPrimaryKey(barcode: string): Promise<ProductModel> {
        return this.prisma.produto.findUnique({
            where: {codigo_barras: barcode}
        });
    } 

    async saveProduct(productDto: ProductDto): Promise<ProductModel> {
        console.log(`Creating new product:`, productDto);

        const productAlreadyExists = await this.findProductByPrimaryKey(productDto.barcode);

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

    async findProductByBarcode(barcode: string): Promise<ProductModel> {
        console.log(`Searching for product with barcode: "${barcode}"`)
        const foundProduct = await this.findProductByPrimaryKey(barcode);

        if(!foundProduct){
            console.log(`Product not found`)
            throw new NotFoundException(`Nenhum produto com código de barras '${barcode}' foi encontrado`);
        }

        console.log(`Product found:`, foundProduct);
        return foundProduct;
    }
    
}