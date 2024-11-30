import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DonationKeyInputDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    productBarcode: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    campaignName: string;

    public isEmpty(): boolean {
        return !this.productBarcode && !this.campaignName;
    }

    public isIncomplete(): boolean {
        return !this.productBarcode || !this.campaignName;
    }

    public getIncompleteKeyMessage(): string {
        return `Tanto o código do produto quanto o nome da campanha devem ser informados`;
    }
}