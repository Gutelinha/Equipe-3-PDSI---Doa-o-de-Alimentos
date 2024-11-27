import { Injectable } from "@nestjs/common";
import { doacao as DonationModel } from "@prisma/client";
import { DonationOutputDto } from "./dto";
import { plainToInstance } from "class-transformer";
import { DonationDeleteOutputDto } from "./dto/output/donation-delete.output.dto";
import { DonationKeyOutputDto } from "./dto/output/donation-key-output.dto";

@Injectable()
export class DonationMapper{

    toOutput(model: DonationModel): DonationOutputDto {
        return plainToInstance(DonationOutputDto, model, {
            excludeExtraneousValues: true
        });
    }

    toDeleteOutput(model: DonationModel, customMessage: string): DonationDeleteOutputDto {
        const resourceId = plainToInstance(DonationKeyOutputDto, model, {
            excludeExtraneousValues: true
        });
        return new DonationDeleteOutputDto(resourceId, customMessage);
    }

}