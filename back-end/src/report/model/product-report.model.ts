export class ProductReportModel {
    name: string;
    quantity: number;
    total_volume: string;

    constructor(name: string, quantity: number, total_volume: string) {
        this.name = name;
        this.quantity = quantity;
        this.total_volume = total_volume;
    }
}