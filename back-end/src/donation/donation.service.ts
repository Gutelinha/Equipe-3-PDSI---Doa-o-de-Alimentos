import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { doacao as DonationModel } from "@prisma/client";
import { DonationInputDto, DonationKeyInputDto } from "./dto";

@Injectable()
export class DonationService {
    constructor(private readonly prisma: PrismaService) {}

    async createDonation(input: DonationInputDto): Promise<DonationModel> {
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

    async findDonationByKey(key: DonationKeyInputDto) {
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

    async updateDonationByKey(input: DonationInputDto) {
        await this.findDonationByKey(input.key);

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

    async deleteDonationByKey(key: DonationKeyInputDto) {}

}