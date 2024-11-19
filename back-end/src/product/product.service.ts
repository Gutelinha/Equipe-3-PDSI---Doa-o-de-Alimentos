import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { SaveProductDto, UpdateProductDto } from "./dto";
import { ResponseMessageDto } from "../common";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async save(productDto: SaveProductDto): Promise<ProductModel> {
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
            where: {
                codigo_barras: barcode
            }
        });

        if(!foundProduct){
            console.log(`Error: Product not found`)
            throw new NotFoundException(`Produto não encontrado`);
        }

        console.log(`Product found:`, foundProduct);
        return foundProduct;
    }

    async update(barcode: string, productDto: UpdateProductDto): Promise<ProductModel> {
        await this.findByBarcode(barcode);

        console.log(`Updating product with barcode '${barcode}' to:`, productDto);

        if(productDto.isEmpty()){
            console.log(`Error: No parameters were provided`);
            throw new BadRequestException(`Nenhum parâmetro foi informado`);
        }

        const updatedProduct = await this.prisma.produto.update({
            data: {
                nome: productDto.name,
                marca: productDto.brand,
                tipo: productDto.type,
                unidade_volume: productDto.volumeUnit
            },
            where: {
                codigo_barras: barcode
            }
        })

        console.log(`Product updated`);
        return updatedProduct;
    }

    async deleteByBarcode(barcode: string): Promise<ResponseMessageDto> {
        console.log(`Deleting product with barcode: '${barcode}'`)

        const product = await this.prisma.produto.delete({
            where: {
                codigo_barras: barcode
            }
        })

        console.log(`Product deleted:`, product);
        return new ResponseMessageDto("Produto removido com sucesso");
    }
    
}