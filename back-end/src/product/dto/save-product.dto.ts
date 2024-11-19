import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SaveProductDto {
    @IsString()
    @IsNotEmpty()
    barcode: string; // Código de barras (primary key)

    @IsString()
    @IsNotEmpty()
    name: string; // Nome (not null)

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brand?: string; // Marca (optional)

    @IsString()
    @IsNotEmpty()
    type: string; // Tipo (not null)

    @IsString()
    @IsNotEmpty()
    volumeUnit: string; // Unidade de volume (not null)
}