import { Injectable } from "@nestjs/common";
import { doacao as DonationModel } from "@prisma/client";
import { DonationOutputDto } from "./dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class DonationMapper{

    toOutput(model: DonationModel): DonationOutputDto {
        return plainToInstance(DonationOutputDto, model, {
            excludeExtraneousValues: true
        });
    }

}