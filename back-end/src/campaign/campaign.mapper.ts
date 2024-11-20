import { Injectable } from "@nestjs/common";
import { campanha as CampaignModel } from "@prisma/client";
import { CampaignOutputDto } from "./dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CampaignMapper{

    modelToOutput(model: CampaignModel): CampaignOutputDto {
        return plainToInstance(CampaignOutputDto, model, {
            excludeExtraneousValues: true
        });
    }

    toOutput(promiseModel: Promise<CampaignModel>): CampaignOutputDto {
        return plainToInstance(CampaignOutputDto, promiseModel, {
            excludeExtraneousValues: true
        })
    }

}