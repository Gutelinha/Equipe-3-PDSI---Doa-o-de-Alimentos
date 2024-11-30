import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "../config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "../config/exception/filter/prisma.exception.filter";
import { CampaignService } from "./campaign.service";
import { CampaignCreateInputDto, CampaignUpdateInputDto, CampaignFindAllFilterInputDto, CampaignOutputDto, CampaignDeleteOutputDto } from "./dto";
import { CampaignMapper } from "./campaign.mapper";

@Controller('campaigns')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class CampaignController{
    constructor(
        private readonly campaignService: CampaignService,
        private readonly campaignMapper: CampaignMapper
    ) {}

    @Post()
    async createCampaign(@Body() createInput: CampaignCreateInputDto): Promise<CampaignOutputDto> {
        const createdCampaign = await this.campaignService.create(createInput);
        return this.campaignMapper.toOutput(createdCampaign);
    }

    @Get(':name')
    async findCampaignByName(@Param('name') name: string): Promise<CampaignOutputDto> {
        const foundCampaign = await this.campaignService.findByName(name);
        return this.campaignMapper.toOutput(foundCampaign);
    }

    @Get()
    async findAllActiveCampaigns(@Query() input: CampaignFindAllFilterInputDto): Promise<CampaignOutputDto[]> {
        const activeCampaigns = await this.campaignService.findAllByActive(input.active);
        return activeCampaigns.map(campaign => this.campaignMapper.toOutput(campaign));
    }

    @Put(':name')
    async updateCampaignByName(@Param('name') name: string, @Body() updateInput: CampaignUpdateInputDto): Promise<CampaignOutputDto> {
        const updatedCampaign = await this.campaignService.updateByName(name, updateInput);
        return this.campaignMapper.toOutput(updatedCampaign);
    }

    @Delete(':name')
    async deleteCampaignByName(@Param('name') name: string): Promise<CampaignDeleteOutputDto> {
        const deletedCampaign = await this.campaignService.deleteByName(name);
        return this.campaignMapper.toDeleteOutput(deletedCampaign, "Campanha removida com sucesso");
    }

}