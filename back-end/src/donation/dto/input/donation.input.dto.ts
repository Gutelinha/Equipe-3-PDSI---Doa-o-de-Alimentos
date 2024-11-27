import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { DonationKeyInputDto } from "./donation-key.input.dto";
import { Type } from "class-transformer";

export class DonationInputDto {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => DonationKeyInputDto)
    key: DonationKeyInputDto;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;
}