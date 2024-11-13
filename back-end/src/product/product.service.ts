import { Injectable } from "@nestjs/common";
import { Produto } from "@prisma/client";

@Injectable()
export class ProductService {

    saveProduct(product: Produto) {
        return "Saved product";
    }
    
}