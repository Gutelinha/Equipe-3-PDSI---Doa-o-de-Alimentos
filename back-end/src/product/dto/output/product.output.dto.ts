import { Expose } from "class-transformer";

export class ProductOutputDto {
    @Expose({ name: 'codigo_barras' })
    barcode: string;

    @Expose({ name: 'nome' })
    name: string;

    @Expose({ name: 'marca' })
    brand?: string;

    @Expose({ name: 'tipo' })
    type: string;

    @Expose({ name: 'unidade_volume' })
    volume_unit: string;
}