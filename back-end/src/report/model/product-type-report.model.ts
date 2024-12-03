import { ProductReportModel } from "./product-report.model";

export class ProductTypeReportModel {
    type: string;
    items_donated: number;
    donated_products: ProductReportModel[];

    constructor(type: string, products_donated: ProductReportModel[]) {
        this.type = type;
        this.items_donated = products_donated.length;
        this.donated_products = products_donated;
    }
}