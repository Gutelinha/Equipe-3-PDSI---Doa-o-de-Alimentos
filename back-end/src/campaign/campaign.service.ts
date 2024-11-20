import { Injectable } from "@nestjs/common";
import { campanha as CampaignModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CampaignMapper } from "./campaign.mapper";
import { SaveCampaignInputDto, CampaignOutputDto } from "./dto";

@Injectable()
export class CampaignService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mapper: CampaignMapper
    ) {}

    async create(input: SaveCampaignInputDto): Promise<CampaignOutputDto> {
        console.log(`Creating new campaign:`, input);

        const savedCampaign: CampaignModel = await this.prisma.campanha.create({
            data: {
                nome: input.name,
                data_inicio: input.start_date,
                data_fim: input.end_date
            }
        });

        console.log(`Campaign created!`);
        return this.mapper.toOutput(savedCampaign);
    }

}