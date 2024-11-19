import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
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
    volumeUnit?: string;

    public isEmpty(): boolean {
        return this.name == null 
            && this.brand == null
            && this.type == null
            && this.volumeUnit == null
    }
}