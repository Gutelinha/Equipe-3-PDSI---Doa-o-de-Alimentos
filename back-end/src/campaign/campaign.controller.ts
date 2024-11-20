import { Body, Controller, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "../config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "../config/exception/filter/prisma.exception.filter";
import { CampaignService } from "./campaign.service";
import { CampaignCreateInputDto, CampaignOutputDto, CampaignUpdateInputDto } from "./dto";
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

    @Put(':name')
    async updateCampaignByName(@Param('name') name: string, @Body() updateInput: CampaignUpdateInputDto): Promise<CampaignOutputDto> {
        const updatedCampaign = await this.campaignService.updateByName(name, updateInput);
        return this.campaignMapper.toOutput(updatedCampaign);
    }

}