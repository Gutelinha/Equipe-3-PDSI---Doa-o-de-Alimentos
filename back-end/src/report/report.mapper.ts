import { Injectable } from "@nestjs/common";
import { campanha as CampaignModel } from "@prisma/client";
import { CampaignReportModel } from './model/campaign-report.model';
import { plainToInstance } from "class-transformer";
import { ProductReportModel } from "./model";

@Injectable()
export class ReportMapper {

    toCampaignReportModel(model: CampaignModel): CampaignReportModel {
        return plainToInstance(CampaignReportModel, model, {
            excludeExtraneousValues: true
        });
    }

}