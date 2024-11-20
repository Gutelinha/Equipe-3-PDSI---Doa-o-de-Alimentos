import { Body, Controller, Get, Param, Post, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "../config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "../config/exception/filter/prisma.exception.filter";
import { CampaignService } from "./campaign.service";
import { SaveCampaignInputDto, CampaignOutputDto } from "./dto";
import { CampaignMapper } from "./campaign.mapper";

@Controller('campaigns')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class CampaignController{
    constructor(
        private readonly campaignService: CampaignService,
        private readonly campaignMapper: CampaignMapper
    ) {}

    @Post()
    createCampaign(@Body() campaignDto: SaveCampaignInputDto): Promise<CampaignOutputDto> {
        return this.campaignService.create(campaignDto);
    }

    @Get(':name')
    findCampaignByName(@Param('name') name: string): CampaignOutputDto {
        const campaign = this.campaignService.findByName(name);
        return this.campaignMapper.toOutput(campaign);
    }

}