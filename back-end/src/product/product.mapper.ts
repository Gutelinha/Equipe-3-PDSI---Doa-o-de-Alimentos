import { Injectable } from "@nestjs/common";
import { produto as ProductModel } from "@prisma/client";
import { ProductOutputDto } from "./dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductMapper {

    toOutput(model: ProductModel): ProductOutputDto {
        return plainToInstance(ProductOutputDto, model, {
            excludeExtraneousValues: true
        })
    }

}