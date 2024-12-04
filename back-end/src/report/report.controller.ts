import { Controller, Get, Param, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "../config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "../config/exception/filter/prisma.exception.filter";
import { ReportService } from "./report.service";
import { CampaignReportModel } from "./model";

@Controller('reports')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get(':campaignName')
    async getCampaignReport(@Param('campaignName') campaignName: string): Promise<CampaignReportModel> {
        return this.reportService.generateCampaignReport(campaignName);
    }

}