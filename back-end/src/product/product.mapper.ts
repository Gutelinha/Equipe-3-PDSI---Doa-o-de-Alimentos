import { Injectable } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { ProductOutputDto, ProductDeleteOutputDto } from "./dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductMapper {

    toOutput(model: ProductModel): ProductOutputDto {
        return plainToInstance(ProductOutputDto, model, {
            excludeExtraneousValues: true
        });
    }

    toDeleteOutput(model: ProductModel, customMessage: string): ProductDeleteOutputDto {
        let output = plainToInstance(ProductDeleteOutputDto, model, {
            excludeExtraneousValues: true
        });
        output.message = customMessage;
        return output;
    }

}