import { Expose } from "class-transformer"

export class DonationKeyOutputDto {
    @Expose({ name: 'codigo_barras_produto' })
    productBarcode: string;

    @Expose({ name: 'nome_campanha' })
    campaignName: string;
}