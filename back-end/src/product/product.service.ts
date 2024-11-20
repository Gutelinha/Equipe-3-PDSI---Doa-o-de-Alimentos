import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { ProductOutputDto, SaveProductInputDto, UpdateProductInputDto } from "./dto";
import { ResponseMessageDto } from "../common";
import { ProductMapper } from "./product.mapper";

@Injectable()
export class ProductService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mapper: ProductMapper
    ) {}

    async save(input: SaveProductInputDto): Promise<ProductOutputDto> {
        console.log(`Creating new product:`, input);

        const savedProduct: ProductModel = await this.prisma.produto.create({
            data: {
                codigo_barras: input.barcode,
                nome: input.name,
                marca: input.brand,
                tipo: input.type,
                unidade_volume: input.volume_unit
            }
        });

        console.log(`Product created!`);
        return this.mapper.toOutput(savedProduct);
    }

    async findByBarcode(barcode: string): Promise<ProductOutputDto> {
        console.log(`Searching for product with barcode: '${barcode}'`)

        const foundProduct: ProductModel = await this.prisma.produto.findUnique({
            where: {
                codigo_barras: barcode
            }
        });

        if(!foundProduct){
            console.log(`Error: Product not found`)
            throw new NotFoundException(`Produto não encontrado`);
        }

        console.log(`Product found:`, foundProduct);
        return this.mapper.toOutput(foundProduct);
    }

    async update(barcode: string, input: UpdateProductInputDto): Promise<ProductOutputDto> {
        await this.findByBarcode(barcode);

        console.log(`Updating product with barcode '${barcode}' to:`, input);

        if(input.isEmpty()){
            console.log(`Error: No parameters were provided`);
            throw new BadRequestException(`Nenhum parâmetro foi informado`);
        }

        const updatedProduct: ProductModel = await this.prisma.produto.update({
            data: {
                nome: input.name,
                marca: input.brand,
                tipo: input.type,
                unidade_volume: input.volume_unit
            },
            where: {
                codigo_barras: barcode
            }
        })

        console.log(`Product updated`);
        return this.mapper.toOutput(updatedProduct);
    }

    async deleteByBarcode(barcode: string): Promise<ResponseMessageDto> {
        console.log(`Deleting product with barcode: '${barcode}'`)

        const product: ProductModel = await this.prisma.produto.delete({
            where: {
                codigo_barras: barcode
            }
        })

        console.log(`Product deleted:`, product);
        return new ResponseMessageDto("Produto removido com sucesso");
    }
    
}