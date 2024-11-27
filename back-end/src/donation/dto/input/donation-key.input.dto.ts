import { IsNotEmpty, IsString } from "class-validator";

export class DonationKeyInputDto {
    @IsString()
    @IsNotEmpty()
    productBarcode: string;

    @IsString()
    @IsNotEmpty()
    campaignName: string;
}