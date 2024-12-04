export class ProductReportModel {
    name: string;
    volume_unit: string;
    quantity: number;
    total_volume: string;

    constructor(name: string, volume_unit: string, quantity: number) {
        this.name = name;
        this.volume_unit = volume_unit;
        this.quantity = Number(quantity);
    }
}