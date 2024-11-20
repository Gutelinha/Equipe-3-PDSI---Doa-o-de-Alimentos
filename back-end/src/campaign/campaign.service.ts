import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { campanha as CampaignModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CampaignCreateInputDto, CampaignUpdateInputDto } from "./dto";

@Injectable()
export class CampaignService {
    constructor(private readonly prisma: PrismaService) {}

    async create(input: CampaignCreateInputDto): Promise<CampaignModel> {
        console.log(`Creating new campaign:`, input);

        const createdCampaign: CampaignModel = await this.prisma.campanha.create({
            data: {
                nome: input.name,
                data_inicio: input.start_date,
                data_fim: input.end_date
            }
        });

        console.log(`Campaign created!`);
        return createdCampaign;
    }

    async findByName(name: string): Promise<CampaignModel> {
        console.log(`Searching for campaign with name: '${name}'`);

        const foundCampaign: CampaignModel = await this.prisma.campanha.findUnique({
            where: {
                nome: name
            }
        });

        if(!foundCampaign){
            console.log(`Error: Campaign not found`)
            throw new NotFoundException(`Campanha não encontrada`);
        }

        console.log(`Campaign found:`, foundCampaign);
        return foundCampaign;
    }

    async updateByName(name: string, input: CampaignUpdateInputDto): Promise<CampaignModel> {
        await this.findByName(name);

        console.log(`Updating campaign with name '${name}' to:`, input);

        if(input.isEmpty()){
            console.log(`Error: No parameters were provided`);
            throw new BadRequestException(`Nenhum dado foi informado`);
        }

        const updatedCampaign = await this.prisma.campanha.update({
            data: {
                ativa: input.active,
                data_inicio: input.start_date,
                data_fim: input.end_date
            },
            where: {
                nome: name
            }
        });

        console.log(`Campaign updated`);
        return updatedCampaign;
    }

    async deleteByName(name: string): Promise<CampaignModel> {
        console.log(`Deleting campaign with name: '${name}'`);

        const deletedCampaign = await this.prisma.campanha.delete({
            where: {
                nome: name
            }
        });

        console.log(`Campaign deleted:`, deletedCampaign);
        return deletedCampaign;
    }

}