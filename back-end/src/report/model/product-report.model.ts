import { extractVolumeNumberFromString, extractVolumeUnitFromString, volumeToString } from "src/utils/volume-converter";

export class ProductReportModel {
    name: string;
    volume_unit: string;
    quantity: number;
    total_volume: string;

    constructor(name: string, volume_unit: string, quantity: number) {
        this.name = name;
        this.volume_unit = volume_unit;
        this.quantity = Number(quantity);
        this.calculateTotalVolume();
    }

    private calculateTotalVolume(): void {
        const unit: string = extractVolumeUnitFromString(this.volume_unit);
        const volume: number = extractVolumeNumberFromString(this.volume_unit);
        let total: number = 0;

        if(volume !== null)
            total = volume * this.quantity;

        this.total_volume = volumeToString(total, unit);
    }
}