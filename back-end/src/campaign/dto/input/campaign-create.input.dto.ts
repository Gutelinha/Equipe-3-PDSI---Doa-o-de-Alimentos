import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { parseDateString } from "../../../utils/date-converter";

export class CampaignCreateInputDto {
    @IsString()
    @IsNotEmpty()
    name: string; // Nome (primary key)

    @Transform(({value}) => parseDateString(value))
    @IsDate()
    @IsNotEmpty()
    start_date: Date // D_ini (not null) 

    @Transform(({value}) => parseDateString(value))
    @IsDate()
    @IsOptional()
    end_date?: Date // D_fim (optional)
}