import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { convertStringToBoolean } from "src/utils/boolean-converter";

export class CampaignFindAllFilterInputDto {

    @Transform(({value}) => convertStringToBoolean(value))
    @IsBoolean()
    @IsNotEmpty()
    active: boolean
    
}