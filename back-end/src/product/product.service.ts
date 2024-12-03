import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { produto as ProductModel, doacao as DonationModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { ProductCreateInputDto, ProductUpdateInputDto } from "./dto";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async create(input: ProductCreateInputDto): Promise<ProductModel> {
        console.log(`Creating new product:`, input);

        const createdProduct: ProductModel = await this.prisma.produto.create({
            data: {
                codigo_barras: input.barcode,
                nome: input.name,
                marca: input.brand,
                tipo: input.type,
                unidade_volume: input.volume_unit
            }
        });

        console.log(`Product created!`);
        return createdProduct;
    }

    async findByBarcode(barcode: string): Promise<ProductModel> {
        console.log(`Searching for product with barcode: '${barcode}'`);

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
        return foundProduct;
    }

    async update(barcode: string, input: ProductUpdateInputDto): Promise<ProductModel> {
        await this.findByBarcode(barcode);

        console.log(`Updating product with barcode '${barcode}' to:`, input);

        if(input.isEmpty()){
            console.log(`Error: No parameters were provided`);
            throw new BadRequestException(`Nenhum dado foi informado`);
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
        });

        console.log(`Product updated`);
        return updatedProduct;
    }

    async deleteByBarcode(barcode: string): Promise<ProductModel> {
        console.log(`Deleting product with barcode: '${barcode}'`);

        const deletedProduct: ProductModel = await this.prisma.produto.delete({
            where: {
                codigo_barras: barcode
            }
        });

        console.log(`Product deleted:`, deletedProduct);
        return deletedProduct;
    }

    async findAllProductTypes() {
        console.log(`Searching for all distinct product's types`);

        const types: string[] = await this.prisma.produto.findMany({
            distinct: ['tipo'],
            select: {
                tipo: true
            }
        }).then(result => result.map(product => product.tipo))

        console.log(`${types.length} types found`)
        return types;
    }

    async getDonatedProducts(donations: DonationModel[]): Promise<ProductModel[]> {
        return await this.prisma.produto.findMany({
          where: {
            doacao: {
                some: {
                    nome_campanha: { in: donations.map(d => d.nome_campanha) },
                    codigo_barras_produto: { in: donations.map(d => d.codigo_barras_produto) },
                }
            }
          }
        });
    }

}