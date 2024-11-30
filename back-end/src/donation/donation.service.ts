import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { doacao as DonationModel } from "@prisma/client";
import { DonationInputDto, DonationKeyInputDto } from "./dto";

@Injectable()
export class DonationService {
    constructor(private readonly prisma: PrismaService) {}

    async create(input: DonationInputDto): Promise<DonationModel> {
        console.log(`Creating new donation:`, input);

        const createdDonation = await this.prisma.doacao.create({
            data: {
                codigo_barras_produto: input.key.productBarcode,
                nome_campanha: input.key.campaignName,
                quantidade: input.quantity
            }
        });

        console.log(`Donation created!`);
        return createdDonation;
    }

    async findByKey(key: DonationKeyInputDto): Promise<DonationModel> {
        console.log(`Searching for donation with key:`, key);

        const foundDonation: DonationModel = await this.prisma.doacao.findUnique({
            where: {
                nome_campanha_codigo_barras_produto: {
                    nome_campanha: key.campaignName,
                    codigo_barras_produto: key.productBarcode
                }
            }
        })

        if(!foundDonation){
            console.log(`Error: Donation not found`)
            throw new NotFoundException(`Doação não encontrada`);
        }

        console.log(`Donation found:`, foundDonation);
        return foundDonation;
    }

    async findAllByProductBarcode(productBarcode: string): Promise<DonationModel[]> {
        console.log(`Searching for all donations by product with barcode '${productBarcode}'`);

        const donationsByProduct : DonationModel[] = await this.prisma.doacao.findMany({
            where: {
                codigo_barras_produto: productBarcode
            }
        })

        if(donationsByProduct.length === 0){
            console.log(`Error: No donations found for this product`)
            throw new NotFoundException(`Nenhuma doação foi encontrada para esse produto`);
        }

        console.log(`${donationsByProduct.length} donations found`);
        return donationsByProduct;
    }

    async findAllByCampaignName(campaignName: string): Promise<DonationModel[]> {
        console.log(`Searching for all donations by campaign with name '${campaignName}'`);

        const donationsByCampaign: DonationModel[] = await this.prisma.doacao.findMany({
            where: {
                nome_campanha: campaignName
            }
        })

        if(donationsByCampaign.length === 0){
            console.log(`Error: No donations found for this campaign`)
            throw new NotFoundException(`Nenhuma doação foi encontrada para essa campanha`);
        }

        console.log(`${donationsByCampaign.length} donations found`);
        return donationsByCampaign;
    }

    async updateByKey(input: DonationInputDto): Promise<DonationModel> {
        await this.findByKey(input.key);

        console.log(`Updating donation to`, input);

        const updatedDonation = await this.prisma.doacao.update({
            data: {
                quantidade: input.quantity
            },
            where: {
                nome_campanha_codigo_barras_produto: {
                    nome_campanha: input.key.campaignName,
                    codigo_barras_produto: input.key.productBarcode
                }
            }
        });

        console.log(`Donation updated`);
        return updatedDonation;
    }

    async deleteByKey(key: DonationKeyInputDto): Promise<DonationModel> {
        console.log(`Deleting donation with key:`, key);

        const deletedDonation = await this.prisma.doacao.delete({
            where: {
                nome_campanha_codigo_barras_produto: {
                    nome_campanha: key.campaignName,
                    codigo_barras_produto: key.productBarcode
                }
            }
        });

        console.log(`Donation deleted:`, deletedDonation);
        return deletedDonation;
    }

}