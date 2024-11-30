import { Expose } from "class-transformer";

export class DonationOutputDto {
    @Expose({ name: 'codigo_barras_produto' })
    productBarcode: string;

    @Expose({ name: 'nome_campanha' })
    campaignName: string;

    @Expose({ name: 'quantidade' })
    quantity: number;
}
