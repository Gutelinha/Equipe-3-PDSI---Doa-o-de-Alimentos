import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "../config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "../config/exception/filter/prisma.exception.filter";
import { CampaignService } from "./campaign.service";
import { SaveCampaignInputDto, CampaignOutputDto } from "./dto";

@Controller('campaigns')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class CampaignController{
    constructor(private readonly campaignService: CampaignService) {}

    @Post()
    createCampaign(@Body() campaignDto: SaveCampaignInputDto): Promise<CampaignOutputDto> {
        return this.campaignService.create(campaignDto);
    }

}