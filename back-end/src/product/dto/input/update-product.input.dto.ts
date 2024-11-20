import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProductInputDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brand?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    volume_unit?: string;

    public isEmpty(): boolean {
        return this.name == null 
            && this.brand == null
            && this.type == null
            && this.volume_unit == null
    }
}