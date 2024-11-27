import { Injectable } from "@nestjs/common";
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

    async findDonationByKey(key: DonationKeyInputDto) {}

    async updateDonationByKey(input: DonationInputDto) {}

    async deleteDonationByKey(key: DonationKeyInputDto) {}

}