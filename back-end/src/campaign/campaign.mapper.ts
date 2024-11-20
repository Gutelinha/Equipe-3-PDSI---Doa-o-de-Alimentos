import { Injectable } from "@nestjs/common";
import { campanha as CampaignModel } from "@prisma/client";
import { CampaignOutputDto } from "./dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CampaignMapper{

    toOutput(model: CampaignModel): CampaignOutputDto {
        return plainToInstance(CampaignOutputDto, model, {
            excludeExtraneousValues: true
        });
    }

}