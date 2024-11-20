import { Injectable } from "@nestjs/common";
import { campanha as CampaignModel } from "@prisma/client";
import { CampaignDeleteOutputDto, CampaignOutputDto } from "./dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CampaignMapper{

    toOutput(model: CampaignModel): CampaignOutputDto {
        return plainToInstance(CampaignOutputDto, model, {
            excludeExtraneousValues: true
        });
    }

    toDeleteOutput(model: CampaignModel, customMessage: string): CampaignDeleteOutputDto {
        let output = plainToInstance(CampaignDeleteOutputDto, model, {
            excludeExtraneousValues: true
        });
        output.message = customMessage;
        return output;
    }

}