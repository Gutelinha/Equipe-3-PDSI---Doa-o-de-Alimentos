import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsOptional } from "class-validator";
import { parseDateString } from "../../../utils/date-converter";

export class CampaignUpdateInputDto {
    @IsBoolean()
    @IsOptional()
    active?: boolean

    @Transform(({value}) => parseDateString(value))
    @IsDate()
    @IsOptional()
    start_date?: Date

    @Transform(({value}) => parseDateString(value))
    @IsDate()
    @IsOptional()
    end_date?: Date

    isEmpty(): boolean {
        return this.active == null
            && this.start_date == null
            && this.end_date == null;
    }
}