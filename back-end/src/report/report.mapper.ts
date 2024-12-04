import { Injectable } from "@nestjs/common";
import { campanha as CampaignModel } from "@prisma/client";
import { CampaignReportModel } from './model/campaign-report.model';
import { plainToInstance } from "class-transformer";

@Injectable()
export class ReportMapper {

    toCampaignReportModel(model: CampaignModel, totalItemsDonated: number): CampaignReportModel {
        let campaignReport = plainToInstance(CampaignReportModel, model, {
            excludeExtraneousValues: true
        });
        campaignReport.total_items_donated = totalItemsDonated;
        return campaignReport;
    }

}