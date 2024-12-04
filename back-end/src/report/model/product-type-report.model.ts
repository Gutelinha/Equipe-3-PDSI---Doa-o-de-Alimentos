import { ProductReportModel } from "./product-report.model";

export class ProductTypeReportModel {
    type: string;
    items_donated: number;
    donated_products: ProductReportModel[];

    constructor(type: string, items_donated: number) {
        this.type = type;
        this.items_donated = Number(items_donated);
    }
}