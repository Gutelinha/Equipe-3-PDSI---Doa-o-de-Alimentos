import { Injectable } from "@nestjs/common";
import { Product } from "./interfaces/product.interface";

@Injectable()
export class ProductService {

    saveProduct(product: Product) {
        return "Saved product";
    }
    
}